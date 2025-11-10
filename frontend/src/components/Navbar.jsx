import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function Navbar() {
  const { cart } = useCart()
  const itemCount = cart.items ? cart.items.reduce((s, i) => s + i.quantity, 0) : 0
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  function onSearch(e) {
    e.preventDefault()
    navigate(`/products?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="bg-white border-b">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between p-4 gap-4">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setOpen(o => !o)} aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <Link to="/" className="flex items-end gap-2">
            <div className="text-2xl font-extrabold text-violet-700">Diligent</div>
            <div className="text-sm text-slate-400">Shop</div>
          </Link>
        </div>

        <form onSubmit={onSearch} className="hidden md:flex items-center gap-2 flex-1 max-w-xl">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search products, e.g. earbuds"
            className="w-full px-3 py-2 rounded-l-md border border-r-0 border-gray-200 bg-white placeholder:text-slate-400 focus:outline-none"
          />
          <button className="px-4 py-2 rounded-r-md bg-violet-600 text-white font-medium">Search</button>
        </form>

        <nav className="flex items-center gap-4">
          <Link to="/products" className="hidden md:inline-block text-sm font-medium text-slate-700 hover:text-violet-600">Products</Link>
          <Link to="/cart" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"/></svg>
            <span className="text-sm font-medium">Cart</span>
            <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold leading-4 rounded-full bg-violet-600 text-white">{itemCount}</span>
          </Link>
        </nav>
      </div>

      {/* mobile nav */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="p-4 flex flex-col gap-3">
            <form onSubmit={onSearch} className="flex gap-2">
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" className="flex-1 px-3 py-2 border rounded-md" />
              <button className="px-3 py-2 rounded-md bg-violet-600 text-white">Go</button>
            </form>
            <Link to="/products" onClick={() => setOpen(false)} className="py-2">Products</Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="py-2">Cart ({itemCount})</Link>
          </div>
        </div>
      )}
    </header>
  )
}
