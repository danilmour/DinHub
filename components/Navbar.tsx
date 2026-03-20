// components/Navbar.tsx
'use client'
import { useState } from 'react'
import { useScrollDirection } from '@/hooks/useScrollDirection'

export function Navbar() {
  const isVisible = useScrollDirection()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div 
        className="backdrop-blur-xl border-b border-border"
        style={{ background: 'rgba(8,8,8,0.8)' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="font-serif text-xl text-text-primary hover:text-amber-500 transition-colors">
            DinHub
          </a>

          {/* CTA Button */}
          <div className="relative">
            <a
              href="/login"
              className="inline-flex items-center px-5 py-2 text-sm text-text-primary border border-border rounded-md hover:border-border-hover hover:bg-accent-dim transition-all"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Entrar
            </a>
            
            {/* Hover microcopy */}
            <span 
              className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 text-[10px] text-text-tertiary whitespace-nowrap transition-opacity duration-200 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Aceder às reservas
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
