import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { findGuide, guideHref, type Guide } from "@/content/guides"
import { homeGuideSlugs } from "@/content/home"

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
      <a
        href="/vodici/"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
        data-link="home-guides-index"
        data-cta="home-guides-index"
      >
        Svi vodiči
        <ArrowUpRight className="size-4" />
      </a>
    </section>
  )
}
