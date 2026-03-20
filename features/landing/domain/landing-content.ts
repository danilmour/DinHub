export type FeatureIconKey =
  | 'rsvp'
  | 'notifications'
  | 'calendar'
  | 'configuration'
  | 'privacy'
  | 'teams'

export interface NavAction {
  label: string
  href: string
  hint?: string
}

export interface NavbarContent {
  brandLabel: string
  loginAction: NavAction
}

export interface HeroAction {
  label: string
  href: string
  variant: 'primary' | 'secondary'
}

export interface HeroOverlayContent {
  eyebrow?: string
  title?: string
  accentText?: string
  body?: string
  supportingText?: string
  primaryText?: string
  secondaryText?: string
  actions?: HeroAction[]
}

export interface HeroStepContent {
  eyebrow: string
  title: string
  body?: string
}

export interface FrancesinhaSectionContent {
  videoSrc: string
  hero: HeroOverlayContent
  secondaryHero: HeroOverlayContent
  createStep: HeroStepContent
  confirmStep: HeroStepContent
  scheduleStep: HeroStepContent
}

export interface BenefitsContent {
  eyebrow: string
  title: string
  struckText: string
  accentText: string
  body: string
  listTitle: string
  confirmedLabel: string
  users: string[]
}

export interface FeatureItem {
  icon: FeatureIconKey
  title: string
  body: string
}

export interface FeaturesContent {
  eyebrow: string
  title: string
  accentText: string
  items: FeatureItem[]
}

export interface Testimonial {
  quote: string
  author: string
  role: string
}

export interface SocialProofContent {
  testimonials: Testimonial[]
}

export interface CtaContent {
  eyebrow: string
  title: string
  accentText: string
  body: string
  primaryAction: NavAction
  secondaryAction: NavAction
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterContent {
  brandLabel: string
  legalText: string
  links: FooterLink[]
}

export interface LandingPageContent {
  navbar: NavbarContent
  francesinha: FrancesinhaSectionContent
  benefits: BenefitsContent
  features: FeaturesContent
  socialProof: SocialProofContent
  cta: CtaContent
  footer: FooterContent
}