import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition p-3 flex flex-col">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="mt-3 flex-1">
        <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>
        <p className="text-sm text-slate-500 mt-1">{product.category || 'General'}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-lg font-bold text-violet-700">₹{product.price}</div>
        <Link to={`/products/${product._id}`} className="px-3 py-1 rounded-md bg-violet-600 text-white text-sm">View</Link>
      </div>
    </div>
  )
}
