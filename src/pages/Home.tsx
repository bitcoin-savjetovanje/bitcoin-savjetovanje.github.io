import { Seo } from "@/components/Seo"
import { AboutSection } from "@/components/home/AboutSection"
import { FaqSection } from "@/components/home/FaqSection"
import { FinalCta } from "@/components/home/FinalCta"
import { Hero } from "@/components/home/Hero"
import { OffersSection } from "@/components/home/OffersSection"
import { StandardAreasSection } from "@/components/home/StandardAreasSection"
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
      <StandardAreasSection />
      <StandardCheckSection />
      <OffersSection />
      <AboutSection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
