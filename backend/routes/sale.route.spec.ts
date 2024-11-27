import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import saleRouter from './sale.route'

const app = express()
app.use(express.json())
app.use('/api', saleRouter)

const prisma = new PrismaClient()

describe('sale-route', () => {
  beforeEach(async () => {
    // Clean up database before each test
    await prisma.orderItem.deleteMany()
    await prisma.paymentInfo.deleteMany()
    await prisma.order.deleteMany()
    await prisma.address.deleteMany()
  })

  afterEach(async () => {
    // Clean up database after each test
    await prisma.orderItem.deleteMany()
    await prisma.paymentInfo.deleteMany()
    await prisma.order.deleteMany()
    await prisma.address.deleteMany()
  })

  describe('get-order', () => {
    it('Should get an order from the frontend', async () => {
      // First create a shipping address
      const address = await prisma.address.create({
        data: {
          country: 'US',
          addressLine1: '123 Test St',
          state: 'CA',
          city: 'Test City',
          postalCode: '12345',
        },
      })

      // Then create an order
      const orderData = {
        guestEmail: 'test@example.com',
        guestPhone: '1234567890',
        status: 'PENDING',
        totalAmount: 100,
        paymentMethod: 'CREDIT_CARD',
        paymentStatus: 'PENDING',
        shippingAddressId: address.id,
      }

      const createdOrder = await prisma.order.create({
        data: {
          guestEmail: orderData.guestEmail,
          guestPhone: orderData.guestPhone,
          status: orderData.status,
          totalAmount: orderData.totalAmount,
          paymentMethod: orderData.paymentMethod,
          paymentStatus: orderData.paymentStatus,
          shippingAddressId: orderData.shippingAddressId,
          paymentInfo: {
            create: {
              paymentMethod: orderData.paymentMethod,
              amount: orderData.totalAmount,
              status: 'PENDING',
            },
          },
        },
        include: {
          shippingAddress: true,
          paymentInfo: true,
          orderItems: true,
        },
      })

      // Then try to get it through the API
      const response = await request(app).get(`/api/orders/${createdOrder.id}`).expect(200)

      expect(response.body).toMatchObject({
        id: createdOrder.id,
        guestEmail: orderData.guestEmail,
        guestPhone: orderData.guestPhone,
        status: orderData.status,
        totalAmount: orderData.totalAmount,
        paymentMethod: orderData.paymentMethod,
        paymentStatus: orderData.paymentStatus,
        shippingAddressId: orderData.shippingAddressId,
      })
    })

    it('Should return 404 if order does not exist', async () => {
      const response = await request(app).get('/api/orders/999999').expect(404)

      expect(response.body).toEqual({
        error: 'Order not found',
      })
    })
  })
})
