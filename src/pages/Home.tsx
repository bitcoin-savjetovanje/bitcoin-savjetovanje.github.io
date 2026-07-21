import { Seo } from "@/components/Seo"
import { AboutBookSection } from "@/components/home/AboutBookSection"
import { FrameworkSection } from "@/components/home/FrameworkSection"
import { GuidesTeaserSection } from "@/components/home/GuidesTeaserSection"
import { Hero } from "@/components/home/Hero"
import { InformationCostSection } from "@/components/home/InformationCostSection"
import { RecognitionSection } from "@/components/home/RecognitionSection"
import { SampleStandardSection } from "@/components/home/SampleStandardSection"
import { ServicesSection } from "@/components/home/ServicesSection"
import { StandardCheckSection } from "@/components/home/StandardCheckSection"
import { ThreeLevelsSection } from "@/components/home/ThreeLevelsSection"
import { homeRoute } from "@/content/clientRoutes"

export function Home() {
  return (
    <>
      <Seo {...homeRoute} />
      <Hero />
      <div className="home-editorial-page home-editorial-page--content">
        <RecognitionSection />
        <InformationCostSection />
        <StandardCheckSection />
        <SampleStandardSection />
        <FrameworkSection />
        <ThreeLevelsSection />
        <GuidesTeaserSection />
        <ServicesSection />
        <AboutBookSection />
      </div>
    </>
  )
}
