import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import GoldCard from './components/GoldCard'
import NeumorphicCard from './components/NeumorphicCard'
import Spline from '@splinetool/react-spline'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cart, setCart] = useState([])

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${backend}/api/gold`)
        if (!res.ok) throw new Error('Failed to load catalog')
        const data = await res.json()
        // seed demo items if empty
        if (!data || data.length === 0) {
          const demo = [
            {
              name: '24K Bar • 100g',
              type: 'bar',
              purity: 24,
              weight_grams: 100,
              price_usd: 7800,
              badge: 'Best Seller',
              three_d_url: 'https://prod.spline.design/8Eub7mhQMV8qfO1c/scene.splinecode'
            },
            {
              name: '22K Nugget • 35g',
              type: 'nugget',
              purity: 22,
              weight_grams: 35,
              price_usd: 2500,
              badge: 'New',
              three_d_url: 'https://prod.spline.design/yFQGz1w6b7sJm4qA/scene.splinecode'
            },
            {
              name: '24K Bar • 1oz',
              type: 'bar',
              purity: 24,
              weight_grams: 31.1,
              price_usd: 2450,
              badge: 'Limited',
              three_d_url: 'https://prod.spline.design/jm5r1v8xk2F0jYj6/scene.splinecode'
            }
          ]
          setItems(demo)
        } else {
          setItems(data)
        }
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.name === item.name)
      if (existing) {
        return prev.map((p) => (p.name === item.name ? { ...p, qty: p.qty + 1 } : p))
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const total = cart.reduce((sum, i) => sum + i.price_usd * i.qty, 0)

  return (
    <div className="min-h-screen bg-[#0e1123] relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute -top-48 right-0 w-[38rem] h-[38rem] bg-amber-500/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-48 -left-24 w-[40rem] h-[40rem] bg-yellow-400/10 blur-3xl rounded-full" />

      <div className="container mx-auto px-6">
        <Header />

        {/* Hero with 3D gold */}
        <section className="grid md:grid-cols-2 gap-10 items-center pt-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-amber-200 to-yellow-400 text-transparent bg-clip-text">
              Premium Gold, Beautifully Presented
            </h1>
            <p className="mt-4 text-amber-100/80 text-lg">
              Explore bars and natural nuggets with a soft, tactile design and immersive 3D viewing.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#catalog" className="px-5 py-3 rounded-2xl bg-amber-400 text-black font-semibold shadow-[6px_6px_16px_#0a0c17,-6px_-6px_16px_#141833] hover:bg-amber-300">
                Shop now
              </a>
              <a href="#about" className="px-5 py-3 rounded-2xl bg-white/5 text-amber-100 border border-white/10 hover:bg-white/10">
                Learn more
              </a>
            </div>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[20px_20px_60px_#0a0c17,-20px_-20px_60px_#141833]">
            {/* 3D Scene */}
            <Spline scene="https://prod.spline.design/gold-demo/scene.splinecode" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20" />
          </div>
        </section>

        {/* Catalog */}
        <section id="catalog" className="py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-amber-200">Catalog</h2>
            <NeumorphicCard>
              <div className="flex items-center gap-4">
                <span className="text-amber-100/80">Cart</span>
                <span className="text-amber-200 font-bold">{cart.length} items</span>
                <span className="text-amber-300 font-extrabold">${total.toLocaleString()}</span>
              </div>
            </NeumorphicCard>
          </div>

          {loading ? (
            <p className="text-amber-100/70">Loading...</p>
          ) : error ? (
            <p className="text-red-300">{error}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((it, idx) => (
                <GoldCard key={idx} item={it} onAdd={addToCart} />
              ))}
            </div>
          )}
        </section>

        {/* About */}
        <section id="about" className="pb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <NeumorphicCard>
              <h3 className="text-amber-200 text-xl font-semibold mb-2">Guaranteed Purity</h3>
              <p className="text-amber-100/80">All bars and nuggets are tested and certified. Your purchase includes full documentation.</p>
            </NeumorphicCard>
            <NeumorphicCard>
              <h3 className="text-amber-200 text-xl font-semibold mb-2">Insured Shipping</h3>
              <p className="text-amber-100/80">We ship worldwide with discrete, insured delivery and real-time tracking.</p>
            </NeumorphicCard>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
