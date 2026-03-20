// components/FeaturesGrid.tsx
'use client'
import { motion } from 'framer-motion'
import type { FeaturesContent } from '@/features/landing/domain/landing-content'
import { getFeatureIcon } from '@/features/landing/presentation/feature-icons'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

interface FeaturesGridProps {
  content: FeaturesContent
}

export function FeaturesGrid({ content }: FeaturesGridProps) {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.15em] text-amber-500 mb-4 font-sans">
            {content.eyebrow}
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-text-primary">
            {content.title}<br />
            <em className="text-amber-500 italic">{content.accentText}</em>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {content.items.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group p-7 bg-surface border border-border rounded-lg hover:border-accent-border hover:bg-accent-glow transition-all duration-300"
            >
              <div className="text-amber-500 mb-8">
                {getFeatureIcon(feature.icon)}
              </div>
              <h3 className="text-sm uppercase tracking-[0.08em] text-text-primary font-medium mb-2 font-sans">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-sans">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
