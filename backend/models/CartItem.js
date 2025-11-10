const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  cartId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  priceAtAdd: { type: Number, required: true }
}, { timestamps: true })

module.exports = mongoose.model('CartItem', cartItemSchema)
