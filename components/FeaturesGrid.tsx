// components/FeaturesGrid.tsx
'use client'
import { motion } from 'framer-motion'

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 9.5C17.5 14 10 18.5 10 18.5C10 18.5 2.5 14 2.5 9.5C2.5 5.91 5.41 3 9 3H11C14.59 3 17.5 5.91 17.5 9.5Z" />
        <path d="M7 9L9 11L13 7" />
      </svg>
    ),
    title: 'RSVP rastreável',
    body: 'Sim, Não ou Talvez — e toda a equipa já sabe quem vai.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 4.5H17.5V15.5C17.5 16.05 17.05 16.5 16.5 16.5H3.5C2.95 16.5 2.5 16.05 2.5 15.5V4.5Z" />
        <path d="M2.5 4.5L10 10.5L17.5 4.5" />
        <circle cx="15" cy="13" r="3" fill="var(--green)" stroke="none" />
      </svg>
    ),
    title: 'Notificações multicanal',
    body: 'WhatsApp para ação rápida, e-mail para registo.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="3.5" width="15" height="14" rx="1" />
        <path d="M2.5 7.5H17.5" />
        <path d="M6.5 3.5V1.5" />
        <path d="M13.5 3.5V1.5" />
        <path d="M6 11H7" />
        <path d="M9.5 11H10.5" />
        <path d="M13 11H14" />
        <path d="M6 14H7" />
        <path d="M9.5 14H10.5" />
      </svg>
    ),
    title: 'Sincronização automática',
    body: 'Evento no Google Calendar de todos, com local e horário.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="6" r="1.5" />
        <circle cx="5" cy="10" r="1.5" />
        <circle cx="5" cy="14" r="1.5" />
        <path d="M8.5 6H17" />
        <path d="M8.5 10H14" />
        <path d="M8.5 14H15.5" />
      </svg>
    ),
    title: 'Configura ao detalhe',
    body: 'Local, hora, dress code e notas — tudo no mesmo convite.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2L3.5 6V10C3.5 14.13 6.26 17.98 10 19C13.74 17.98 16.5 14.13 16.5 10V6L10 2Z" />
        <path d="M7 10L9 12L13 8" />
      </svg>
    ),
    title: 'Privacidade por padrão',
    body: 'Acesso controlado. Só a equipa recebe o convite.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="7" r="3.5" />
        <circle cx="13" cy="7" r="3.5" />
        <path d="M4 17C4 14.24 6.24 12 9 12H11C13.76 12 16 14.24 16 17" />
      </svg>
    ),
    title: 'Feito para equipas',
    body: 'Do jantar casual ao evento planejado. Serve sempre.',
  },
]

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

export function FeaturesGrid() {
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
            Funcionalidades
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-text-primary">
            Tudo o que precisas,<br />
            <em className="text-amber-500 italic">nada que não precises.</em>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group p-7 bg-surface border border-border rounded-lg hover:border-accent-border hover:bg-accent-glow transition-all duration-300"
            >
              <div className="text-amber-500 mb-8">
                {feature.icon}
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
