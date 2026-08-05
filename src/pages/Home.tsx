import { Seo } from "@/components/Seo"
import { Hero } from "@/components/home/Hero"
import {
  AssessmentTeaserSection,
  AudiencePathsSection,
  FounderSection,
  HomeFaqSection,
  HomeFinalCta,
  ProcessSection,
  RecognitionSection,
  SampleStandardSection,
  SelectedGuidesSection,
  ServicesSection,
  StandardPillarsSection,
} from "@/components/home/HomeRedesignSections"
import { homeRoute } from "@/content/clientRoutes"

export function Home() {
  return (
    <>
      <Seo {...homeRoute} />
      <div className="home-redesign">
        <Hero />
        <RecognitionSection />
        <AudiencePathsSection />
        <AssessmentTeaserSection />
        <StandardPillarsSection />
        <SampleStandardSection />
        <ProcessSection />
        <ServicesSection />
        <FounderSection />
        <SelectedGuidesSection />
        <HomeFaqSection />
        <HomeFinalCta />
      </div>
    </>
  )
}
