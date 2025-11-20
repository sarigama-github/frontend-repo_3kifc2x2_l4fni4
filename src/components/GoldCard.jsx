import React from 'react'
import NeumorphicCard from './NeumorphicCard'
import Spline from '@splinetool/react-spline'

function GoldCard({ item, onAdd }) {
  const { name, type, purity, weight_grams, price_usd, image, badge, three_d_url } = item

  return (
    <NeumorphicCard className="overflow-hidden">
      <div className="flex flex-col gap-4">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-amber-300/20">
          {three_d_url ? (
            <Spline scene={three_d_url} />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-6xl">
              {type === 'bar' ? '🧱' : '🪨'}
            </div>
          )}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30" />
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
