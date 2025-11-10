import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api/api'
import { useCart } from '../contexts/CartContext'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    API.get('/products/' + id).then(res => setProduct(res.data)).catch(console.error)
  }, [id])

  if (!product) return <div>Loading...</div>

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="bg-white rounded-2xl p-4 shadow-soft">
        <img src={product.image} alt={product.name} className="w-full h-[420px] object-cover rounded-lg" />
      </div>
      <div className="p-2">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-slate-500 mt-2">{product.description}</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="text-2xl font-extrabold text-violet-700">₹{product.price}</div>
          <div className="px-2 py-1 text-sm rounded-md bg-green-100 text-green-700">{product.stock > 0 ? 'In stock' : 'Out of stock'}</div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <label className="text-sm">Qty</label>
          <input type="number" min="1" value={qty} onChange={e => setQty(parseInt(e.target.value || '1'))} className="w-20 px-2 py-1 border rounded-md" />
          <button onClick={() => addToCart(product._id, qty)} className="ml-4 px-4 py-2 rounded-md bg-violet-600 text-white font-medium">Add to cart</button>
        </div>

        <div className="mt-6 text-sm text-slate-600">
          <strong>Category:</strong> {product.category || 'General'}
        </div>
      </div>
    </div>
  )
}
