import React from 'react'
import NeumorphicCard from './NeumorphicCard'

function GoldCard({ item, onAdd }) {
  const { name, type, purity, weight_grams, price_usd, image, badge } = item

  return (
    <NeumorphicCard className="overflow-hidden">
      <div className="flex items-center gap-6">
        <div className="relative w-28 h-28 shrink-0">
          {/* Gold gradient circle */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-300 via-amber-300 to-yellow-500" />
          {/* Inner inset to simulate 3D */}
          <div className="absolute inset-1 rounded-2xl bg-gradient-to-br from-[#2a2314] to-[#4a3a1a] border border-amber-300/30 shadow-inner" />
          {/* Icon/emoji fallback */}
          <div className="absolute inset-0 grid place-items-center text-4xl">
            {type === 'bar' ? '🧱' : '🪨'}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-amber-200">{name}</h3>
            {badge && (
              <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-300/20">{badge}</span>
            )}
          </div>
          <p className="text-sm text-amber-100/70">{type} • {purity}K • {weight_grams}g</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-2xl font-bold text-amber-300">${price_usd.toLocaleString()}</span>
            <button
              onClick={() => onAdd?.(item)}
              className="px-4 py-2 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-300 active:translate-y-[1px] transition"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </NeumorphicCard>
  )
}

export default GoldCard
