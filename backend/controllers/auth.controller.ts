import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

interface RegisterRequestBody {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
}

interface LoginRequestBody {
  email: string
  password: string
}

type AuthResponse = {
  user: {
    id: number
    email: string
    firstName: string
    lastName: string
  }
  token: string
}

export const register = async (
  req: Request<never, AuthResponse, RegisterRequestBody>,
  res: Response<AuthResponse | { error: string }>
): Promise<void> => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      res.status(400).json({ error: 'User already exists' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
      },
    })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    })
  } catch (err) {
    console.error('Error in register:', err)
    res.status(500).json({ error: 'Error creating user' })
  }
}

export const login = async (
  req: Request<never, AuthResponse, LoginRequestBody>,
  res: Response<AuthResponse | { error: string }>
): Promise<void> => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    })
  } catch (err) {
    console.error('Error in login:', err)
    res.status(500).json({ error: 'Error logging in' })
  }
}
