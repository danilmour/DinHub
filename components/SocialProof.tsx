// components/SocialProof.tsx
'use client'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'Agora a gente confirma de verdade.',
    author: 'Ana',
    role: 'Product Manager',
  },
  {
    quote: 'Acabou a confusão do grupo.',
    author: 'Rafael',
    role: 'Tech Lead',
  },
  {
    quote: 'Menos tempo organizando.',
    author: 'Mariana',
    role: 'Eng. Manager',
  },
]

export function SocialProof() {
  return (
    <section className="py-24 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6"
      >
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-0">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex-1 text-center px-6 md:px-8 py-6 ${
                index < testimonials.length - 1 ? 'md:border-r md:border-border' : ''
              }`}
            >
              <blockquote className="relative">
                {/* Large decorative quote mark */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-amber-700/20 font-serif leading-none">
                  {'"'}
                </span>
                <p className="font-serif italic text-lg text-text-primary mb-4 relative z-10">
                  {testimonial.quote}
                </p>
                <footer className="text-xs text-text-tertiary font-sans">
                  — {testimonial.author}, {testimonial.role}
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
