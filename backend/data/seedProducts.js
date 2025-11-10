const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const Product = require('../models/Product')

const products = [
  { name: 'Classic Tee', description: 'Cotton T-shirt', price: 599, image: 'https://via.placeholder.com/300x300?text=Classic+Tee', stock: 50, category: 'Apparel' },
  { name: 'Wireless Earbuds', description: 'Bluetooth earbuds', price: 4999, image: 'https://via.placeholder.com/300x300?text=Earbuds', stock: 30, category: 'Electronics' },
  { name: 'Minimalist Mug', description: 'Ceramic mug', price: 399, image: 'https://via.placeholder.com/300x300?text=Mug', stock: 100, category: 'Home' },
  { name: 'Notebook', description: 'Hardcover notebook', price: 199, image: 'https://via.placeholder.com/300x300?text=Notebook', stock: 200, category: 'Stationery' }
]

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Product.deleteMany({})
    await Product.insertMany(products)
    console.log('Seeded products')
    mongoose.disconnect()
  })
  .catch(err => {
    console.error(err)
  })
