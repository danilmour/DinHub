// components/Benefits.tsx
'use client'

import { motion } from 'framer-motion'
import type { BenefitsContent } from '@/features/landing/domain/landing-content'

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

interface BenefitsProps {
  content: BenefitsContent
}

export function Benefits({ content }: BenefitsProps) {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-sans uppercase tracking-[0.15em] text-amber-500">
            {content.eyebrow}
          </p>
          <h2 className="font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] text-text-primary">
            {content.title} <span className="text-text-tertiary line-through decoration-amber-500/50 decoration-2">{content.struckText}</span>
            <br />
            <em className="text-amber-500 italic">{content.accentText}</em>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
            {content.body}
          </p>
        </div>

        <div className="rounded-[28px] border border-border bg-[radial-gradient(circle_at_top,rgba(252,173,63,0.10),transparent_42%),linear-gradient(180deg,rgba(17,17,17,0.98),rgba(8,8,8,0.94))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-8">
          <div className="mb-5 border-b border-border pb-4">
            <h3 className="text-xl font-medium text-text-primary md:text-2xl">
              {content.listTitle}
            </h3>
          </div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-3"
          >
            {content.users.map((name) => (
              <motion.div
                key={name}
                variants={itemVariants}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green text-[13px] font-bold text-background">
                    ✓
                  </span>
                  <span className="truncate text-base text-text-primary md:text-lg">
                    {name}
                  </span>
                </div>

                <span className="shrink-0 rounded-md bg-green-dim px-2.5 py-1 text-xs font-medium text-green">
                  {content.confirmedLabel}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <p className="mt-5 text-sm text-text-secondary">
            {content.users.length} de {content.users.length} confirmados
          </p>
        </div>
      </div>
    </section>
  )
}
