import React, { useMemo, useState } from 'react'
import NeumorphicCard from './NeumorphicCard'

function CartRow({ item, onInc, onDec, onRemove }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="text-amber-200 font-medium">{item.name}</div>
        <div className="text-amber-100/60 text-sm">{item.qty} × ${item.price_usd.toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onDec(item)} className="w-8 h-8 rounded-lg bg-white/5 text-amber-100 border border-white/10 hover:bg-white/10">-</button>
        <button onClick={() => onInc(item)} className="w-8 h-8 rounded-lg bg-white/5 text-amber-100 border border-white/10 hover:bg-white/10">+</button>
        <button onClick={() => onRemove(item)} className="ml-2 px-3 py-1 rounded-lg bg-red-400/20 text-red-200 border border-red-400/30 hover:bg-red-400/30">Remove</button>
      </div>
    </div>
  )
}

export default function CartSheet({ open, onClose, items = [], onUpdateQty, onCheckout }) {
  const total = useMemo(() => items.reduce((s, i) => s + i.price_usd * i.qty, 0), [items])
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' })

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md h-full md:h-auto md:max-h-[90vh] md:rounded-l-3xl bg-transparent">
        <NeumorphicCard className="h-full md:h-auto md:max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-amber-200 text-xl font-semibold">Your Cart</h3>
            <button onClick={onClose} className="px-3 py-1 rounded-lg bg-white/5 text-amber-100 border border-white/10 hover:bg-white/10">Close</button>
          </div>

          {items.length === 0 ? (
            <p className="text-amber-100/70">Your cart is empty.</p>
          ) : (
            <>
              <div className="divide-y divide-white/5">
                {items.map((it, idx) => (
                  <CartRow
                    key={idx}
                    item={it}
                    onInc={(i) => onUpdateQty(i, i.qty + 1)}
                    onDec={(i) => onUpdateQty(i, Math.max(1, i.qty - 1))}
                    onRemove={(i) => onUpdateQty(i, 0)}
                  />
                ))}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-amber-100/80">
                  <span>Subtotal</span>
                  <span className="text-amber-200 font-bold">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <h4 className="text-amber-200 font-medium">Checkout</h4>
                <input
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 text-amber-100 border border-white/10 placeholder:text-amber-100/50"
                />
                <input
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="Email"
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 text-amber-100 border border-white/10 placeholder:text-amber-100/50"
                />
                <textarea
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Shipping address"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 text-amber-100 border border-white/10 placeholder:text-amber-100/50"
                />
                <button
                  onClick={() => onCheckout?.(customer)}
                  className="w-full px-4 py-3 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-300"
                >
                  Place order
                </button>
              </div>
            </>
          )}
        </NeumorphicCard>
      </div>
    </div>
  )
}
