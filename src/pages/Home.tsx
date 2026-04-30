import { Seo } from "@/components/Seo"
import { GuidesIndexSection } from "@/components/guides/GuidesIndexSection"
import { AboutSection } from "@/components/home/AboutSection"
import { AudienceSection } from "@/components/home/AudienceSection"
import { FaqSection } from "@/components/home/FaqSection"
import { FinalCta } from "@/components/home/FinalCta"
import { Hero } from "@/components/home/Hero"
import { MethodSection } from "@/components/home/MethodSection"
import { OffersSection } from "@/components/home/OffersSection"
import { ProblemSection } from "@/components/home/ProblemSection"
import { QualificationSection } from "@/components/home/QualificationSection"
import { ResultsSection } from "@/components/home/ResultsSection"
import { SecurityTrustSection } from "@/components/home/SecurityTrustSection"
import { TrustStrip } from "@/components/home/TrustStrip"
import { homeSchema } from "@/content/schema"
import { homeSeo } from "@/content/site"

export function Home() {
  return (
    <>
      <Seo {...homeSeo} schema={homeSchema()} />
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <AudienceSection />
      <MethodSection />
      <ResultsSection />
      <OffersSection />
      <SecurityTrustSection />
      <GuidesIndexSection />
      <AboutSection />
      <QualificationSection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
