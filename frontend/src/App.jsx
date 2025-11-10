import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import { CartProvider } from './contexts/CartContext'

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </CartProvider>
  )
}
