import express, { RequestHandler } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

interface OrderItem {
  productId: number
  variantId?: number
  quantity: number
  price: number
}

interface ShippingAddress {
  country: string
  addressLine1: string
  addressLine2?: string
  state: string
  city: string
  postalCode: string
  description?: string
}

interface OrderRequestBody {
  email: string
  phoneNumber: string
  totalAmount: number
  paymentMethod: string
  paymentDetails: {
    cardNumber: string
    cardHolderName: string
    expirationMonth: string
    expirationYear: string
    securityCode: string
  }
  shippingAddress: ShippingAddress
  items: OrderItem[]
}

const createOrder: RequestHandler<Record<string, never>, unknown, OrderRequestBody> = async (
  req,
  res
) => {
  try {
    const { email, phoneNumber, totalAmount, paymentMethod, shippingAddress, items } = req.body

    // Verificar que los productos existen antes de crear la orden
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })
      if (!product) {
        res.status(400).json({ error: `Product with id ${item.productId} does not exist` })
        return
      }
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        guestEmail: email,
        guestPhone: phoneNumber,
        status: 'PENDING',
        totalAmount,
        paymentMethod,
        paymentStatus: 'PENDING',
        shippingAddress: {
          create: {
            ...shippingAddress,
          },
        },
        orderItems: {
          create: items.map((item: OrderItem) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            price: item.price,
          })),
        },
        paymentInfo: {
          create: {
            paymentMethod,
            amount: totalAmount,
            status: 'PENDING',
          },
        },
      },
      include: {
        shippingAddress: true,
        orderItems: true,
        paymentInfo: true,
      },
    })

    // Simulating payment process
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: 'COMPLETED',
        status: 'PROCESSING',
        paymentInfo: {
          update: {
            status: 'COMPLETED',
            transactionId: 'SIMULATED-' + Date.now(),
          },
        },
      },
    })

    res.status(201).json(updatedOrder)
  } catch (error) {
    console.error('Error creating order:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        res.status(400).json({
          error: 'A unique constraint would be violated on Order. Details: ' + error.message,
        })
        return
      }
    }
    res.status(500).json({
      error: 'An error occurred while creating the order',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

router.post('/orders', createOrder)

export default router
