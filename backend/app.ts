import express from 'express'
import cors from 'cors'
import bookRouter from './routes/book.route'

const app = express()

// Enable CORS for all routes
app.use(cors())

app.use(express.json())
app.use('/books', bookRouter)

export default app
