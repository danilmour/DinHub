import type { LandingPageContent } from '@/features/landing/domain/landing-content'
import type { LandingContentRepository } from '@/features/landing/domain/landing-content-repository'

const landingPageContent: LandingPageContent = {
  navbar: {
    brandLabel: 'DinHub',
    loginAction: {
      label: 'Entrar',
      href: '/login',
      hint: 'Aceder às reservas',
    },
  },
  francesinha: {
    videoSrc: '/francesinha-scroll.mp4',
    hero: {
      eyebrow: 'DinHub',
      title: 'Jantar',
      accentText: 'marcado.',
      body: 'Convite → confirmação → calendário.',
      actions: [
        {
          label: 'Marcar jantar',
          href: '/app',
          variant: 'primary',
        },
        {
          label: 'Já tens conta? Entrar',
          href: '/login',
          variant: 'secondary',
        },
      ],
    },
    secondaryHero: {
      body: 'Cria o jantar,',
      primaryText: 'a equipa confirma no WhatsApp',
      secondaryText: 'e o resto é automático.',
    },
    createStep: {
      eyebrow: '01 — Criar',
      title: 'Tu marcas.',
    },
    confirmStep: {
      eyebrow: '02 — Confirmar',
      title: 'A equipa responde.',
      body: 'Sem troca de mensagens intermináveis.',
    },
    scheduleStep: {
      eyebrow: '03 — Agendar',
      title: 'O DinHub organiza.',
      body: 'Pronto.',
    },
  },
  benefits: {
    eyebrow: 'Confirmacoes',
    title: 'Chega de',
    struckText: "'quem vai?'",
    accentText: 'Confirmados sempre a vista.',
    body: 'A lista aparece diretamente na pagina, sem depender do scroll, para que a equipa veja logo quem confirmou.',
    listTitle: 'Confirmados para o jantar',
    confirmedLabel: 'Confirmado',
    users: ['Ana Costa', 'Rafael Silva', 'Mariana Lopes', 'João Faria', 'Sofia Mendes', 'Pedro Rocha'],
  },
  features: {
    eyebrow: 'Funcionalidades',
    title: 'Tudo o que precisas,',
    accentText: 'nada que não precises.',
    items: [
      {
        icon: 'rsvp',
        title: 'RSVP rastreável',
        body: 'Sim, Não ou Talvez — e toda a equipa já sabe quem vai.',
      },
      {
        icon: 'notifications',
        title: 'Notificações multicanal',
        body: 'WhatsApp para ação rápida, e-mail para registo.',
      },
      {
        icon: 'calendar',
        title: 'Sincronização automática',
        body: 'Evento no Google Calendar de todos, com local e horário.',
      },
      {
        icon: 'configuration',
        title: 'Configura ao detalhe',
        body: 'Local, hora, dress code e notas — tudo no mesmo convite.',
      },
      {
        icon: 'privacy',
        title: 'Privacidade por padrão',
        body: 'Acesso controlado. Só a equipa recebe o convite.',
      },
      {
        icon: 'teams',
        title: 'Feito para equipas',
        body: 'Do jantar casual ao evento planejado. Serve sempre.',
      },
    ],
  },
  socialProof: {
    testimonials: [
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
    ],
  },
  cta: {
    eyebrow: 'Marca o próximo',
    title: 'jantar',
    accentText: 'hoje.',
    body: 'Testa com a tua equipa e vê como fica leve.',
    primaryAction: {
      label: 'Criar jantar agora',
      href: '/app',
    },
    secondaryAction: {
      label: 'Já tens conta? Entrar',
      href: '/login',
    },
  },
  footer: {
    brandLabel: 'DinHub',
    legalText: '© 2025 DinHub. Todos os direitos reservados.',
    links: [
      {
        label: 'Privacidade',
        href: '/privacy',
      },
      {
        label: 'Termos',
        href: '/terms',
      },
      {
        label: 'Contacto',
        href: '/contact',
      },
    ],
  },
}

export const staticLandingContentRepository: LandingContentRepository = {
  getLandingPageContent() {
    return landingPageContent
  },
}