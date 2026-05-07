import { ArrowUpRight, CalendarDays } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { findGuide, guideHref, type Guide } from "@/content/guides"
import { homeGuideSlugs } from "@/content/home"
import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

const teaserGuides = homeGuideSlugs
  .map((slug) => findGuide(slug))
  .filter((guide): guide is Guide => Boolean(guide))

export function GuidesTeaserSection() {
  return (
    <section id="vodici" className="section-shell section-muted">
      <SectionHeader
        title="Želite prvo čitati?"
        copy="Vodiči objašnjavaju okvir. Razgovor ga primjenjuje na vašu situaciju."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {teaserGuides.map((guide) => (
          <a
            key={guide.slug}
            href={guideHref(guide.slug)}
            className="program-card block hover:border-primary/50 hover:text-foreground"
            data-link="home-guide-teaser"
          >
            <h3>{guide.title}</h3>
            <p>{guide.excerpt}</p>
          </a>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="/vodici/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          data-link="home-guides-index"
        >
          Pogledajte sve vodiče
          <ArrowUpRight className="size-4" />
        </a>
        <Button asChild variant="outline" className="rounded-full sm:ml-auto">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="guides-intro-call"
          >
            <CalendarDays className="size-4" />
            {PRIMARY_CTA}
          </a>
        </Button>
      </div>
    </section>
  )
}
