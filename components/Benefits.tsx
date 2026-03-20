// components/Benefits.tsx
// 2D canvas scroll section with RSVP list animation
'use client'
import { useRef } from 'react'
import { useFrameScrubber } from '@/hooks/useFrameScrubber'
import { benefitsFrame } from '@/lib/frameDrawers'
import { ScrollOverlay } from './ScrollOverlay'

export function Benefits() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useFrameScrubber(canvasRef, 'benefits-scroll-driver', 60, benefitsFrame)

  return (
    <div id="benefits-scroll-driver" className="h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: 'var(--background)' }}
        />

        {/* Overlay: 30% — "Chega de 'quem vai?'" */}
        <ScrollOverlay 
          sectionId="benefits-scroll-driver" 
          progressStart={0.20} 
          progressEnd={0.55} 
          align="right" 
          verticalPosition="center"
        >
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-text-primary leading-tight">
            Chega de<br />
            <span className="relative">
              <span className="text-text-tertiary line-through decoration-amber-500/50 decoration-2">
                {"'"}quem vai?{"'"}
              </span>
            </span>
          </h2>
        </ScrollOverlay>

        {/* Overlay: 70% — "Confirmados sempre à vista." */}
        <ScrollOverlay 
          sectionId="benefits-scroll-driver" 
          progressStart={0.60} 
          progressEnd={0.95} 
          align="right" 
          verticalPosition="center"
        >
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-text-primary leading-tight">
            Confirmados<br />
            <em className="text-amber-500 italic">sempre à vista.</em>
          </h2>
          <p className="mt-4 text-sm text-text-secondary font-sans italic">
            A equipa agradece.
          </p>
        </ScrollOverlay>
      </div>
    </div>
  )
}
