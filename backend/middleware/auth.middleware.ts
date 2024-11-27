import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: {
    id: number
    email: string
  }
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      res.status(401).json({ error: 'No token provided' })
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    req.user = decoded as { id: number; email: string }
    next()
  } catch (err) {
    console.error('Error in auth middleware:', err)
    res.status(401).json({ error: 'Please authenticate' })
  }
}
