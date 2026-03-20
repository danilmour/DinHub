import type { LandingPageContent } from '@/features/landing/domain/landing-content'
import type { LandingContentRepository } from '@/features/landing/domain/landing-content-repository'
import { staticLandingContentRepository } from '@/features/landing/infrastructure/static-landing-content-repository'

export function getLandingPageContent(
  repository: LandingContentRepository = staticLandingContentRepository
): LandingPageContent {
  return repository.getLandingPageContent()
}