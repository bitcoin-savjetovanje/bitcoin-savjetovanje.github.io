import { Seo } from "@/components/Seo"
import { AboutSection } from "@/components/home/AboutSection"
import { BookInProgressSection } from "@/components/home/BookInProgressSection"
import { FaqSection } from "@/components/home/FaqSection"
import { FinalCta } from "@/components/home/FinalCta"
import { FrameworkSection } from "@/components/home/FrameworkSection"
import { GuidesTeaserSection } from "@/components/home/GuidesTeaserSection"
import { Hero } from "@/components/home/Hero"
import { OffersSection } from "@/components/home/OffersSection"
import { SecurityTrustSection } from "@/components/home/SecurityTrustSection"
import { ThreeLevelsSection } from "@/components/home/ThreeLevelsSection"
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
      <div className="editorial-home-shell">
        <Hero />
        <FrameworkSection />
        <ThreeLevelsSection />
        <OffersSection />
        <AboutSection />
        <BookInProgressSection />
        <GuidesTeaserSection />
        <SecurityTrustSection />
        <FaqSection />
        <FinalCta />
      </div>
    </>
  )
}
