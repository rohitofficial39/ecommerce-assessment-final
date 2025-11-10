const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()

const productsRouter = require('./routes/products')
const cartRouter = require('./routes/cart')

const app = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log('Server running on port', PORT))
  })
  .catch(err => {
    console.error('MongoDB connection error', err)
  })
