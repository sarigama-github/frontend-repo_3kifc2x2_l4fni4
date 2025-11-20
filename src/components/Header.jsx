import React from 'react'

function Header({ cartCount = 0, onCartClick }) {
  return (
    <header className="relative z-10 flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-500 shadow-[6px_6px_16px_#0a0c17,-6px_-6px_16px_#141833]" />
        <span className="text-xl font-semibold text-amber-200">Auric</span>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-amber-100/80">
        <a href="#catalog" className="hover:text-amber-300">Catalog</a>
        <a href="#about" className="hover:text-amber-300">About</a>
        <a href="#contact" className="hover:text-amber-300">Contact</a>
      </nav>

      <button
        onClick={onCartClick}
        className="px-4 py-2 rounded-xl bg-white/5 text-amber-100 border border-white/10 hover:bg-white/10 transition flex items-center gap-2"
      >
        <span>Cart</span>
        <span className="px-2 py-0.5 rounded-md bg-amber-400 text-black text-sm font-semibold">{cartCount}</span>
      </button>
    </header>
  )
}

export default Header
