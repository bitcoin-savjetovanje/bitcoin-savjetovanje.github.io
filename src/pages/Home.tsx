import { Seo } from "@/components/Seo"
import { GuidesIndexSection } from "@/components/guides/GuidesIndexSection"
import { AboutSection } from "@/components/home/AboutSection"
import { FaqSection } from "@/components/home/FaqSection"
import { FinalCta } from "@/components/home/FinalCta"
import { FoundationsSection } from "@/components/home/FoundationsSection"
import { GivingDifferentiatorSection } from "@/components/home/GivingDifferentiatorSection"
import { Hero } from "@/components/home/Hero"
import { NotDoingSection } from "@/components/home/NotDoingSection"
import { OffersSection } from "@/components/home/OffersSection"
import { SecurityTrustSection } from "@/components/home/SecurityTrustSection"
import { StandardCheckSection } from "@/components/home/StandardCheckSection"
import { StandardComparisonSection } from "@/components/home/StandardComparisonSection"
import { TrustStrip } from "@/components/home/TrustStrip"
import { VolatilityStressSection } from "@/components/home/VolatilityStressSection"
import { homeRoute } from "@/content/routes"

export function Home() {
  return (
    <>
      <Seo
        title={homeRoute.title}
        description={homeRoute.description}
        canonical={homeRoute.canonical}
        ogType={homeRoute.ogType}
        schema={homeRoute.schema as object}
      />
      <Hero />
      <TrustStrip />
      <VolatilityStressSection />
      <StandardComparisonSection />
      <FoundationsSection />
      <GivingDifferentiatorSection />
      <StandardCheckSection />
      <OffersSection />
      <NotDoingSection />
      <GuidesIndexSection />
      <SecurityTrustSection />
      <AboutSection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
