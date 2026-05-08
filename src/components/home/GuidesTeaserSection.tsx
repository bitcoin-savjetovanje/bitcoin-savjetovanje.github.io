import { ArrowUpRight, CalendarDays } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { findGuide, guideHref, type Guide } from "@/content/guides"
import { homeGuideSlugs } from "@/content/home"
import { CONVERSATION_PATH } from "@/content/site"

const teaserGuides = homeGuideSlugs
  .map((slug) => findGuide(slug))
  .filter((guide): guide is Guide => Boolean(guide))

export function GuidesTeaserSection() {
  return (
    <section id="vodici" className="section-shell section-muted">
      <SectionHeader
        title="Želite prvo čitati?"
        copy="Vodiči objašnjavaju moj okvir. Razgovor ga primjenjuje na vašu situaciju."
      />
      <ul className="mt-8 grid list-none gap-4 md:grid-cols-2 xl:grid-cols-5">
        {teaserGuides.map((guide) => (
          <li key={guide.slug}>
            <a
              href={guideHref(guide.slug)}
              className="program-card block h-full hover:border-primary/50 hover:text-foreground"
              data-link="home-guide-teaser"
            >
              <h3>{guide.title}</h3> <p>{guide.excerpt}</p>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="/vodici/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          data-link="home-guides-index"
          data-cta="home-guides-index"
        >
          Pogledajte vodiče
          <ArrowUpRight className="size-4" />
        </a>{" "}
        <Button asChild variant="outline" className="rounded-full sm:ml-auto">
          <a
            href={CONVERSATION_PATH}
            className="justify-center text-center"
            data-cta="home-guides-call"
          >
            <CalendarDays className="size-4" />
            Primijenite okvir na svoju situaciju
          </a>
        </Button>
      </div>
    </section>
  )
}
