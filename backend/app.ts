import express from 'express'
import bookRouter from './routes/book.route'
const app = express()
app.use(express.json())
app.use('/books', bookRouter)
export default app