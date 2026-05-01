import { Seo } from "@/components/Seo"
import { GuidesIndexSection } from "@/components/guides/GuidesIndexSection"
import { AboutSection } from "@/components/home/AboutSection"
import { BookingStepsSection } from "@/components/home/BookingStepsSection"
import { DebtSection } from "@/components/home/DebtSection"
import { FaqSection } from "@/components/home/FaqSection"
import { FinalCta } from "@/components/home/FinalCta"
import { GivingSection } from "@/components/home/GivingSection"
import { Hero } from "@/components/home/Hero"
import { MethodSection } from "@/components/home/MethodSection"
import { OffersSection } from "@/components/home/OffersSection"
import { PriceTimeSection } from "@/components/home/PriceTimeSection"
import { ProblemSection } from "@/components/home/ProblemSection"
import { ProgramOutputPreviewSection } from "@/components/home/ProgramOutputPreviewSection"
import { ResultsSection } from "@/components/home/ResultsSection"
import { SecurityTrustSection } from "@/components/home/SecurityTrustSection"
import { TrustStrip } from "@/components/home/TrustStrip"
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
      <ProblemSection />
      <DebtSection />
      <GivingSection />
      <ResultsSection />
      <MethodSection />
      <PriceTimeSection />
      <ProgramOutputPreviewSection />
      <OffersSection />
      <BookingStepsSection />
      <SecurityTrustSection />
      <AboutSection />
      <FaqSection />
      <GuidesIndexSection />
      <FinalCta />
    </>
  )
}
