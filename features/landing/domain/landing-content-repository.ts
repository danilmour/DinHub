import type { LandingPageContent } from './landing-content'

export interface LandingContentRepository {
  getLandingPageContent(): LandingPageContent
}