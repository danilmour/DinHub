// app/page.tsx
import { getLandingPageContent } from '@/features/landing/application/get-landing-page-content'
import { Navbar } from '@/components/Navbar'
import { Benefits } from '@/components/Benefits'
import { FeaturesGrid } from '@/components/FeaturesGrid'
import { SocialProof } from '@/components/SocialProof'
import { CtaFinal } from '@/components/CtaFinal'
import { Footer } from '@/components/Footer'
import { FrancesinhaSection } from '@/components/FrancesinhaSection'

export default function HomePage() {
  const landingPageContent = getLandingPageContent()

  return (
    <main className="bg-background min-h-screen">
      <Navbar content={landingPageContent.navbar} />
      <FrancesinhaSection content={landingPageContent.francesinha} />
      <Benefits content={landingPageContent.benefits} />
      <FeaturesGrid content={landingPageContent.features} />
      <SocialProof content={landingPageContent.socialProof} />
      <CtaFinal content={landingPageContent.cta} />
      <Footer content={landingPageContent.footer} />
    </main>
  )
}
