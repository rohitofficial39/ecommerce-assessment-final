import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'

export default function CartPage() {
  const { cart, loading, updateItem, removeItem } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)

  if (loading) return <div>Loading cart...</div>

  const subtotal = cart.items.reduce((s, it) => s + it.quantity * it.productId.price, 0)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.items.length === 0 ? <div className="text-slate-600">Cart is empty</div> : (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-soft">
            {cart.items.map(it => (
              <div key={it._id} className="flex items-center gap-4 border-b last:border-b-0 py-3">
                <img src={it.productId.image} alt={it.productId.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="font-semibold">{it.productId.name}</div>
                  <div className="text-sm text-slate-500">₹{it.productId.price} each</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateItem(it._id, it.quantity - 1)} className="px-2 py-1 rounded-md border">-</button>
                  <div className="px-3">{it.quantity}</div>
                  <button onClick={() => updateItem(it._id, it.quantity + 1)} className="px-2 py-1 rounded-md border">+</button>
                  <button onClick={() => removeItem(it._id)} className="ml-4 text-sm text-red-600">Remove</button>
                </div>
                <div className="w-32 text-right font-medium">₹{it.productId.price * it.quantity}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-4 shadow-soft flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Subtotal</div>
              <div className="text-2xl font-bold">₹{subtotal}</div>
            </div>
            <div>
              <button onClick={() => setCheckingOut(true)} className="px-4 py-2 rounded-md bg-violet-600 text-white">Checkout</button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout stub modal */}
      {checkingOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-2">Checkout (demo)</h3>
            <p className="text-sm text-slate-600">This is a checkout stub — for the assessment, you can mention this as a placeholder for payment integration.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setCheckingOut(false)} className="px-3 py-2 rounded-md border">Close</button>
              <button onClick={() => { setCheckingOut(false); alert('Thank you — demo order placed!') }} className="px-3 py-2 rounded-md bg-violet-600 text-white">Place order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
