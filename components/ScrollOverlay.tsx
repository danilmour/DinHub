// components/ScrollOverlay.tsx
// Reusable GSAP-controlled text overlay primitive
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

interface ScrollOverlayProps {
  sectionId: string
  progressStart: number
  progressEnd: number
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
  verticalPosition?: 'top' | 'center' | 'bottom'
}

export function ScrollOverlay({
  sectionId,
  progressStart,
  progressEnd,
  children,
  align = 'left',
  verticalPosition = 'center',
}: ScrollOverlayProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set initial state
    gsap.set(el, { opacity: 0, y: 20 })

    const trigger = ScrollTrigger.create({
      trigger: `#${sectionId}`,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress
        
        // Fade in zone: progressStart to progressStart + 0.05
        // Hold zone: progressStart + 0.05 to progressEnd - 0.05
        // Fade out zone: progressEnd - 0.05 to progressEnd
        
        const fadeInStart = progressStart
        const fadeInEnd = progressStart + 0.05
        const fadeOutStart = progressEnd - 0.05
        const fadeOutEnd = progressEnd
        
        let opacity = 0
        let yOffset = 20
        
        if (progress >= fadeInStart && progress <= fadeInEnd) {
          // Fading in
          const fadeProgress = (progress - fadeInStart) / (fadeInEnd - fadeInStart)
          opacity = fadeProgress
          yOffset = 20 * (1 - fadeProgress)
        } else if (progress > fadeInEnd && progress < fadeOutStart) {
          // Fully visible
          opacity = 1
          yOffset = 0
        } else if (progress >= fadeOutStart && progress <= fadeOutEnd) {
          // Fading out
          const fadeProgress = (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart)
          opacity = 1 - fadeProgress
          yOffset = -20 * fadeProgress
        }
        
        gsap.set(el, { opacity, y: yOffset })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [sectionId, progressStart, progressEnd])

  const alignmentClasses = {
    left: 'left-0 text-left',
    center: 'left-1/2 -translate-x-1/2 text-center',
    right: 'right-0 text-right',
  }

  const verticalClasses = {
    top: 'top-[15%]',
    center: 'top-1/2 -translate-y-1/2',
    bottom: 'bottom-[15%]',
  }

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none z-10 px-[clamp(1.5rem,5vw,6rem)] max-w-2xl ${alignmentClasses[align]} ${verticalClasses[verticalPosition]}`}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  )
}
