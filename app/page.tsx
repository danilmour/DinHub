// app/page.tsx
import { Navbar } from '@/components/Navbar'
import { Benefits } from '@/components/Benefits'
import { FeaturesGrid } from '@/components/FeaturesGrid'
import { SocialProof } from '@/components/SocialProof'
import { CtaFinal } from '@/components/CtaFinal'
import { Footer } from '@/components/Footer'
import { FrancesinhaSection } from '@/components/FrancesinhaSection'

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero + HowItWorks — unified Three.js scroll block */}
      <FrancesinhaSection />
      
      {/* Benefits — 2D canvas scroll section */}
      <Benefits />
      
      {/* Features Grid — static with Framer Motion entrance */}
      <FeaturesGrid />
      
      {/* Social Proof — testimonials */}
      <SocialProof />
      
      {/* Final CTA */}
      <CtaFinal />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
