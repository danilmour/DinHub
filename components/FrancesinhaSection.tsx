// components/FrancesinhaSection.tsx
// Wraps Hero + HowItWorks into a single 1100vh scroll block.
// The background video is sticky. Text overlays are GSAP-controlled.
'use client'
import { useRef } from 'react'
import { useScrollVideo } from '@/hooks/useScrollVideo'
import type { FrancesinhaSectionContent } from '@/features/landing/domain/landing-content'
import { ScrollOverlay } from './ScrollOverlay'

interface FrancesinhaSectionProps {
  content: FrancesinhaSectionContent
}

export function FrancesinhaSection({ content }: FrancesinhaSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useScrollVideo(videoRef, 'francesinha-scroll-driver', 'francesinha-video-scroll')

  const primaryAction = content.hero.actions?.find(action => action.variant === 'primary')
  const secondaryAction = content.hero.actions?.find(action => action.variant === 'secondary')

  return (
    <div id="francesinha-scroll-driver" className="h-[1100vh] md:h-[1100vh]" style={{ height: 'clamp(700vh, 100vw, 1100vh)' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={content.videoSrc}
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/45" />

        <ScrollOverlay 
          sectionId="francesinha-scroll-driver" 
          progressStart={0} 
          progressEnd={0.25} 
          align="left" 
          verticalPosition="center"
        >
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.12em] text-amber-300">
            {content.hero.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-amber-100">
            {content.hero.title}<br />
            <em className="text-amber-300 italic">{content.hero.accentText}</em>
          </h1>
          <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-amber-100/88">
            {content.hero.body}
          </p>
          <div className="mt-8 flex flex-col gap-3 pointer-events-auto">
            {primaryAction ? (
              <a 
                href={primaryAction.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 text-amber-900 font-medium text-sm rounded-md hover:bg-amber-600 transition-all hover:scale-[1.02] active:scale-[0.98] w-fit"
              >
                {primaryAction.label}
              </a>
            ) : null}
            {secondaryAction ? (
              <a 
                href={secondaryAction.href}
                className="w-fit text-xs text-amber-100/72 underline underline-offset-4 transition-colors hover:text-amber-100"
              >
                {secondaryAction.label}
              </a>
            ) : null}
          </div>
        </ScrollOverlay>

        <ScrollOverlay 
          sectionId="francesinha-scroll-driver" 
          progressStart={0.25} 
          progressEnd={0.45} 
          align="right" 
          verticalPosition="center"
        >
          <p className="max-w-sm font-sans text-xl leading-relaxed text-amber-100/88">
            {content.secondaryHero.body}<br />
            <span className="text-amber-100">{content.secondaryHero.primaryText}</span><br />
            <em className="font-serif text-amber-300 italic">{content.secondaryHero.secondaryText}</em>
          </p>
        </ScrollOverlay>

        <ScrollOverlay 
          sectionId="francesinha-scroll-driver" 
          progressStart={0.45} 
          progressEnd={0.58} 
          align="left" 
          verticalPosition="top"
        >
          <p className="mb-2 font-sans text-xs uppercase tracking-[0.15em] text-amber-300">
            {content.createStep.eyebrow}
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight text-amber-100">
            {content.createStep.title}
          </h2>
        </ScrollOverlay>

        <ScrollOverlay 
          sectionId="francesinha-scroll-driver" 
          progressStart={0.58} 
          progressEnd={0.72} 
          align="right" 
          verticalPosition="center"
        >
          <p className="mb-2 font-sans text-xs uppercase tracking-[0.15em] text-amber-300">
            {content.confirmStep.eyebrow}
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight text-amber-100">
            {content.confirmStep.title}
          </h2>
          <p className="mt-3 font-sans text-sm text-amber-100/78">
            {content.confirmStep.body}
          </p>
        </ScrollOverlay>

        <ScrollOverlay 
          sectionId="francesinha-scroll-driver" 
          progressStart={0.85} 
          progressEnd={1} 
          align="center" 
          verticalPosition="bottom"
        >
          <p className="mb-2 font-sans text-xs uppercase tracking-[0.15em] text-amber-300">
            {content.scheduleStep.eyebrow}
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight text-amber-100">
            {content.scheduleStep.title}
          </h2>
          <p className="mt-3 font-sans text-sm text-amber-100/82">
            {content.scheduleStep.body}
          </p>
        </ScrollOverlay>
      </div>
    </div>
  )
}
