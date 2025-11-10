import React, { createContext, useContext, useEffect, useState } from 'react'
import API from '../api/api'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ cartId: null, items: [] })
  const [loading, setLoading] = useState(true)

  async function fetchCart() {
    try {
      setLoading(true)
      const res = await API.get('/cart')
      setCart(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCart() }, [])

  async function addToCart(productId, quantity = 1) {
    const res = await API.post('/cart', { productId, quantity })
    setCart(res.data)
  }

  async function updateItem(itemId, quantity) {
    const res = await API.put('/cart/' + itemId, { quantity })
    setCart(res.data)
  }

  async function removeItem(itemId) {
    const res = await API.delete('/cart/' + itemId)
    setCart(res.data)
  }

  const value = { cart, loading, addToCart, updateItem, removeItem, fetchCart }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
