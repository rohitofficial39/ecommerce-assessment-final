import React, { useEffect, useMemo, useState } from 'react'
import API from '../api/api'
import ProductCard from '../components/ProductCard'
import { useLocation, useNavigate } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('featured')
  const [q, setQ] = useState('')
  const query = useQuery()
  const navigate = useNavigate()

  useEffect(() => {
    API.get('/products').then(res => setProducts(res.data)).catch(console.error)
  }, [])

  useEffect(() => {
    const urlQ = query.get('q') || ''
    setQ(urlQ)
  }, [query])

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category || 'General'))
    return ['all', ...Array.from(set)]
  }, [products])

  const filtered = useMemo(() => {
    let list = products.slice()
    if (filter !== 'all') list = list.filter(p => (p.category || 'General') === filter)
    if (q) {
      const low = q.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(low) || (p.description || '').toLowerCase().includes(low))
    }
    if (sort === 'price-asc') list.sort((a,b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a,b) => b.price - a.price)
    return list
  }, [products, filter, sort, q])

  function onSearch(e) {
    e.preventDefault()
    navigate(`/products?q=${encodeURIComponent(q)}`)
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-4xl font-extrabold">Products</h1>
        <form onSubmit={onSearch} className="hidden sm:flex items-center gap-2">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" className="px-3 py-2 border rounded-md" />
          <button className="px-3 py-2 rounded-md bg-violet-600 text-white">Search</button>
        </form>
      </div>

      <div className="flex gap-6 mb-6 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Category</label>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="px-2 py-1 border rounded-md">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Sort</label>
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-2 py-1 border rounded-md">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
        <div className="ml-auto text-sm text-slate-500">{filtered.length} items</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  )
}
