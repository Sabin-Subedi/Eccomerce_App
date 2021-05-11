import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// ? Environment Variable Setup
dotenv.config()

// ! Connect Database
connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('Server is running')
})

// ! Routes
app.use('/api/products', productRoutes)

// ! Error Middleware
app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server Running at Port ${PORT}`)
})
