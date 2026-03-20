// components/FrancesinhaSection.tsx
// Wraps Hero + HowItWorks into a single 1100vh scroll block.
// The background video is sticky. Text overlays are GSAP-controlled.
'use client'
import { useRef } from 'react'
import { useScrollVideo } from '@/hooks/useScrollVideo'
import { ScrollOverlay } from './ScrollOverlay'

export function FrancesinhaSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useScrollVideo(videoRef, 'francesinha-scroll-driver', 'francesinha-video-scroll')

  return (
    <div id="francesinha-scroll-driver" className="h-[1100vh] md:h-[1100vh]" style={{ height: 'clamp(700vh, 100vw, 1100vh)' }}>
      {/* Sticky background video — full viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/francesinha.mp4"
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Overlay: Hero copy — visible at scroll 0%→25% */}
        <ScrollOverlay 
          sectionId="francesinha-scroll-driver" 
          progressStart={0} 
          progressEnd={0.25} 
          align="left" 
          verticalPosition="center"
        >
          <p className="text-xs uppercase tracking-[0.12em] text-amber-500 mb-4 font-sans">
            DinHub
          </p>
          <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-text-primary">
            Jantar<br />
            <em className="text-amber-500 italic">marcado.</em>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-md font-sans leading-relaxed">
            Convite → confirmação → calendário.
          </p>
          <div className="mt-8 flex flex-col gap-3 pointer-events-auto">
            <a 
              href="/app" 
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 text-amber-900 font-medium text-sm rounded-md hover:bg-amber-600 transition-all hover:scale-[1.02] active:scale-[0.98] w-fit"
            >
              Marcar jantar
            </a>
            <a 
              href="/login" 
              className="text-xs text-text-tertiary hover:text-text-secondary underline underline-offset-4 w-fit transition-colors"
            >
              Já tens conta? Entrar
            </a>
          </div>
        </ScrollOverlay>

        {/* Overlay: Hero second copy — visible at scroll 25%→45% */}
        <ScrollOverlay 
          sectionId="francesinha-scroll-driver" 
          progressStart={0.25} 
          progressEnd={0.45} 
          align="right" 
          verticalPosition="center"
        >
          <p className="text-text-secondary text-xl max-w-sm leading-relaxed font-sans">
            Cria o jantar,<br />
            <span className="text-text-primary">a equipa confirma no WhatsApp</span><br />
            <em className="font-serif text-amber-500 italic">e o resto é automático.</em>
          </p>
        </ScrollOverlay>

        {/* Overlay: Explode — Step 1 — visible at scroll 45%→58% */}
        <ScrollOverlay 
          sectionId="francesinha-scroll-driver" 
          progressStart={0.45} 
          progressEnd={0.58} 
          align="left" 
          verticalPosition="top"
        >
          <p className="text-xs uppercase tracking-[0.15em] text-amber-500 mb-2 font-sans">
            01 — Criar
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-text-primary leading-tight">
            Tu marcas.
          </h2>
        </ScrollOverlay>

        {/* Overlay: Step 2 — visible at scroll 58%→72% */}
        <ScrollOverlay 
          sectionId="francesinha-scroll-driver" 
          progressStart={0.58} 
          progressEnd={0.72} 
          align="right" 
          verticalPosition="center"
        >
          <p className="text-xs uppercase tracking-[0.15em] text-amber-500 mb-2 font-sans">
            02 — Confirmar
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-text-primary leading-tight">
            A equipa responde.
          </h2>
          <p className="mt-3 text-sm text-text-tertiary font-sans">
            Sem troca de mensagens intermináveis.
          </p>
        </ScrollOverlay>

        {/* Overlay: Step 3 — visible at scroll 85%→100% */}
        <ScrollOverlay 
          sectionId="francesinha-scroll-driver" 
          progressStart={0.85} 
          progressEnd={1} 
          align="center" 
          verticalPosition="bottom"
        >
          <p className="text-xs uppercase tracking-[0.15em] text-amber-500 mb-2 font-sans">
            03 — Agendar
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-text-primary leading-tight">
            O DinHub organiza.
          </h2>
          <p className="mt-3 text-sm text-text-secondary font-sans">
            Pronto.
          </p>
        </ScrollOverlay>
      </div>
    </div>
  )
}
