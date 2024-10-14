import express from 'express'
import cors from 'cors'
import saleRouter from './routes/sale.route'

const app = express()

// Enable CORS for all routes
app.use(cors())

app.use(express.json())
app.use('/api', saleRouter)

app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})

export default app
