// hooks/useFrameScrubber.ts
// GSAP scroll→frame for 2D canvas sections (Benefits only)
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

type FrameDrawer = (
  frame: number,
  total: number,
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) => void

export function useFrameScrubber(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  scrollTriggerId: string,
  totalFrames: number,
  drawer: FrameDrawer
) {
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      drawer(frameRef.current, totalFrames, ctx, rect.width, rect.height)
    }

    resize()

    const prog = { value: 0 }

    const tween = gsap.to(prog, {
      value: 1,
      ease: 'none',
      scrollTrigger: {
        id: scrollTriggerId,
        trigger: `#${scrollTriggerId}`,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          const frame = Math.floor(self.progress * totalFrames)
          if (frame !== frameRef.current) {
            frameRef.current = frame
            const rect = canvas.getBoundingClientRect()
            drawer(frame, totalFrames, ctx, rect.width, rect.height)
          }
        },
      },
    })

    window.addEventListener('resize', resize)

    return () => {
      tween.kill()
      ScrollTrigger.getById(scrollTriggerId)?.kill()
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef, scrollTriggerId, totalFrames, drawer])
}
