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
  // Verificar si la autenticación está deshabilitada
  const isAuthDisabled = process.env.DISABLE_AUTH === 'true'

  if (isAuthDisabled) {
    console.log('⚠️ Advertencia: Autenticación deshabilitada en modo desarrollo')
    // Establecer un usuario ficticio para desarrollo
    req.user = { id: 0, email: 'dev@example.com' }
    next()
    return
  }

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
