// hooks/useScrollDirection.ts
// Navbar hide/show based on scroll direction
'use client'
import { useEffect, useState } from 'react'

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const threshold = 100

      if (currentScrollY < threshold) {
        // Always show near top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > threshold) {
        // Scrolling down
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return isVisible
}
