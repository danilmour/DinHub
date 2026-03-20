// components/CtaFinal.tsx
'use client'
import { motion } from 'framer-motion'

export function CtaFinal() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden">
      {/* Subtle radial gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(252,173,63,0.04) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        <p className="text-sm text-text-secondary mb-2 font-sans">
          Marca o próximo
        </p>
        <h2 className="font-serif text-[clamp(3rem,8vw,5rem)] text-text-primary leading-[0.95] mb-8">
          jantar <em className="text-amber-500 italic">hoje.</em>
        </h2>
        <p className="text-text-secondary text-lg mb-10 font-sans max-w-md mx-auto leading-relaxed">
          Testa com a tua equipa e vê como fica leve.
        </p>

        <div className="flex flex-col items-center gap-4">
          <a 
            href="/app" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-amber-900 font-medium text-base rounded-md hover:bg-amber-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Criar jantar agora
          </a>
          <a 
            href="/login" 
            className="text-xs text-text-tertiary hover:text-text-secondary underline underline-offset-4 transition-colors"
          >
            Já tens conta? Entrar
          </a>
        </div>
      </motion.div>
    </section>
  )
}
