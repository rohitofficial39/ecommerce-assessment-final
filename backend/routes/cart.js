const express = require('express')
const router = express.Router()
const CartItem = require('../models/CartItem')
const Product = require('../models/Product')

// helper: get or create cartId from cookie
function getCartId(req, res) {
  let cartId = req.cookies.cartId
  if (!cartId) {
    cartId = Math.random().toString(36).substring(2, 12)
    res.cookie('cartId', cartId, { httpOnly: true })
  }
  return cartId
}

// GET /api/cart
router.get('/', async (req, res) => {
  try {
    const cartId = getCartId(req, res)
    const items = await CartItem.find({ cartId }).populate('productId').exec()
    res.json({ cartId, items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/cart - add item
router.post('/', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body
    const cartId = getCartId(req, res)
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    let item = await CartItem.findOne({ cartId, productId })
    if (item) {
      item.quantity = item.quantity + quantity
      await item.save()
    } else {
      item = new CartItem({ cartId, productId, quantity, priceAtAdd: product.price })
      await item.save()
    }
    const items = await CartItem.find({ cartId }).populate('productId')
    res.json({ cartId, items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT /api/cart/:id - update quantity
router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body
    const item = await CartItem.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    if (quantity <= 0) {
      await item.remove()
    } else {
      item.quantity = quantity
      await item.save()
    }
    const items = await CartItem.find({ cartId: item.cartId }).populate('productId')
    res.json({ cartId: item.cartId, items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /api/cart/:id
router.delete('/:id', async (req, res) => {
  try {
    const item = await CartItem.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    const cartId = item.cartId
    await item.remove()
    const items = await CartItem.find({ cartId }).populate('productId')
    res.json({ cartId, items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
