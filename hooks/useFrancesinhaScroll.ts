// hooks/useFrancesinhaScroll.ts
// Bridges GSAP ScrollTrigger → Three.js scene.update(progress)
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createFrancesinhaScene, type FrancesinhaScene } from '@/lib/francesinhaScene'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export function useFrancesinhaScroll(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  scrollWrapperId: string
) {
  const sceneRef = useRef<FrancesinhaScene | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = createFrancesinhaScene(canvas)
    sceneRef.current = scene

    // Initial render
    scene.update(0)
    scene.resize(canvas.clientWidth, canvas.clientHeight)

    const prog = { value: 0 }

    const tween = gsap.to(prog, {
      value: 1,
      ease: 'none',
      scrollTrigger: {
        id: 'francesinha-scroll',
        trigger: `#${scrollWrapperId}`,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          scene.update(self.progress)
        },
      },
    })

    const handleResize = () => {
      scene.resize(canvas.clientWidth, canvas.clientHeight)
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      tween.kill()
      ScrollTrigger.getById('francesinha-scroll')?.kill()
      window.removeEventListener('resize', handleResize)
      scene.dispose()
    }
  }, [canvasRef, scrollWrapperId])
}
