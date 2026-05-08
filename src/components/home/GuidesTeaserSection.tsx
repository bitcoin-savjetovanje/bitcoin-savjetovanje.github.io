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
        copy="Vodiči objašnjavaju okvir. Razgovor ga primjenjuje na vašu situaciju."
      />
      <ul className="mt-8 grid list-none gap-4 md:grid-cols-2 xl:grid-cols-5">
        {teaserGuides.map((guide) => (
          <li key={guide.slug}>
            <article className="program-card h-full hover:border-primary/50">
              <h3>
                <a
                  href={guideHref(guide.slug)}
                  className="text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                  data-link="home-guide-teaser"
                >
                  {guide.title}
                </a>
              </h3>{" "}
              <p>{guide.excerpt}</p>
            </article>
          </li>
        ))}
      </ul>
      <ul className="mt-8 flex list-none flex-col gap-3 sm:flex-row sm:items-center">
        <li>
          <a
            href="/vodici/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
            data-link="home-guides-index"
            data-cta="home-guides-index"
          >
            Pogledajte vodiče
            <ArrowUpRight className="size-4" />
            <span aria-hidden="true" className="sr-only">
              {" "}
            </span>
          </a>
        </li>
        <li className="sm:ml-auto">
          <Button asChild variant="outline" className="rounded-full">
            <a
              href={CONVERSATION_PATH}
              className="justify-center text-center"
              data-cta="home-guides-call"
            >
              <CalendarDays className="size-4" />
              Primijenite okvir na svoju situaciju
            </a>
          </Button>
        </li>
      </ul>
    </section>
  )
}
