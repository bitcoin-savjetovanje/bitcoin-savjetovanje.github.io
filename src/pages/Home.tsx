import { Seo } from "@/components/Seo"
import { AboutBookSection } from "@/components/home/AboutBookSection"
import { FrameworkSection } from "@/components/home/FrameworkSection"
import { Hero } from "@/components/home/Hero"
import { RecognitionSection } from "@/components/home/RecognitionSection"
import { SampleStandardSection } from "@/components/home/SampleStandardSection"
import { ServicesSection } from "@/components/home/ServicesSection"
import { StandardCheckSection } from "@/components/home/StandardCheckSection"
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
      <Hero />
      <div className="home-editorial-page home-editorial-page--content">
        <RecognitionSection />
        <StandardCheckSection />
        <SampleStandardSection />
        <FrameworkSection />
        <ThreeLevelsSection />
        <ServicesSection />
        <AboutBookSection />
      </div>
    </>
  )
}
