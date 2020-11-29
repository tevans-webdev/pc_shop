import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import db from './config/db.js'
import { notFound, errHandler } from './middleware/error.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

const app = express()
db()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}`.green.inverse.underline)
)
