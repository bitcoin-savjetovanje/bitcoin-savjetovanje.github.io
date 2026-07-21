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
        title="Čitajte koliko vam koristi — ne morate pročitati sve prije razgovora."
        copy="Vodiči postoje za ljude koji žele razumjeti okvir. Razgovor postoji za ljude koji žele skratiti put i primijeniti ga na vlastitu situaciju."
      />
      <ul className="mt-8 grid list-none gap-4 md:grid-cols-3">
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
            </article>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="/vodici/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          data-link="home-guides-index"
        >
          Pogledajte cijelu biblioteku
          <ArrowUpRight className="size-4" />
        </a>
        <Button asChild className="cta-primary rounded-full sm:ml-auto">
          <a href={CONVERSATION_PATH} data-cta="home-guides-conversation">
            <CalendarDays className="size-4" />
            Rezervirajte razgovor
          </a>
        </Button>
      </div>
    </section>
  )
}
