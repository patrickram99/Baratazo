import express from 'express'
import cors from 'cors'
import saleRouter from './routes/sale.route'
import authRouter from './routes/auth.route'
import { authMiddleware } from './middleware/auth.middleware'

const app = express()

// Enable CORS for all routes
app.use(cors())

app.use(express.json())

// Rutas públicas (no requieren autenticación)
app.use('/api/auth', authRouter)

// Rutas protegidas (requieren autenticación)
app.use('/api/sales', authMiddleware, saleRouter)

app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})

export default app
