import { Seo } from "@/components/Seo"
import { AboutSection } from "@/components/home/AboutSection"
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection"
import { FaqSection } from "@/components/home/FaqSection"
import { FinalCta } from "@/components/home/FinalCta"
import { GuidesTeaserSection } from "@/components/home/GuidesTeaserSection"
import { Hero } from "@/components/home/Hero"
import { IntroCallSection } from "@/components/home/IntroCallSection"
import { MethodHintSection } from "@/components/home/MethodHintSection"
import { OffersSection } from "@/components/home/OffersSection"
import { QuestionsSection } from "@/components/home/QuestionsSection"
import { ReadinessTestSection } from "@/components/home/ReadinessTestSection"
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
      <QuestionsSection />
      <ReadinessTestSection />
      <IntroCallSection />
      <OffersSection />
      <SecurityTrustSection />
      <AboutSection />
      <MethodHintSection />
      <BeforeAfterSection />
      <GuidesTeaserSection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
