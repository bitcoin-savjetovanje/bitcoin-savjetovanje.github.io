import { Seo } from "@/components/Seo"
import { AboutSection } from "@/components/home/AboutSection"
import { FaqSection } from "@/components/home/FaqSection"
import { FinalCta } from "@/components/home/FinalCta"
import { GuidesTeaserSection } from "@/components/home/GuidesTeaserSection"
import { Hero } from "@/components/home/Hero"
import { IntroCallSection } from "@/components/home/IntroCallSection"
import { MethodHintSection } from "@/components/home/MethodHintSection"
import { OffersSection } from "@/components/home/OffersSection"
import { PersonalStandardSection } from "@/components/home/PersonalStandardSection"
import { PriceTimeSection } from "@/components/home/PriceTimeSection"
import { SecurityTrustSection } from "@/components/home/SecurityTrustSection"
import { StressTestSection } from "@/components/home/StressTestSection"
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
      <StressTestSection />
      <MethodHintSection />
      <IntroCallSection />
      <PersonalStandardSection />
      <PriceTimeSection />
      <OffersSection />
      <SecurityTrustSection />
      <AboutSection />
      <GuidesTeaserSection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
