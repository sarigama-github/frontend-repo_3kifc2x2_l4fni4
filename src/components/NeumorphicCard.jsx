import React from 'react'

function NeumorphicCard({ children, className = '' }) {
  return (
    <div
      className={
        'relative rounded-3xl p-6 bg-[#0f1220] text-white ' +
        'shadow-[20px_20px_60px_#0a0c17,-20px_-20px_60px_#141833] ' +
        'border border-white/5 ' +
        className
      }
      style={{
        background:
          'linear-gradient(145deg, rgba(20,24,51,0.9), rgba(10,12,23,0.9))',
      }}
    >
      {/* Light sheen */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl [mask-image:radial-gradient(80%_80%_at_20%_10%,#0000_35%,#000_36%)]">
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/10 blur-2xl rounded-full" />
      </div>
      {children}
    </div>
  )
}

export default NeumorphicCard
