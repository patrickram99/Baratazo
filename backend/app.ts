import express from 'express'
import cors from 'cors'
import bookRouter from './routes/book.route'
import saleRoutes from './routes/sale.route';
const app = express()

// Enable CORS for all routes
app.use(cors())

app.use(express.json())
app.use('/books', bookRouter)
app.use('/sales', saleRoutes);

export default app
