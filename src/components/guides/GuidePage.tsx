import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import { findGuide, guideHref, type Guide } from "@/content/guides"
import { BOOKING_URL } from "@/content/site"
import {
  estimateGuideReadingMinutes,
  slugifyHeading,
} from "@/utils/readingTime"

export function GuidePage({ guide }: { guide: Guide }) {
  const relatedGuides = guide.relatedSlugs
    .map((slug) => findGuide(slug))
    .filter((item): item is Guide => Boolean(item))
  const sectionLinks = guide.sections.map((section) => ({
    heading: section.heading,
    id: slugifyHeading(section.heading),
  }))

  return (
    <article className="section-shell">
      <nav
        aria-label="Breadcrumb"
        className="text-sm font-medium text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <a href="/" className="hover:text-primary">
              Početna
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href="/vodici/" className="hover:text-primary">
              Vodiči
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {guide.title}
          </li>
        </ol>
      </nav>
      <a
        href="/vodici/"
        className="mt-6 inline-block text-sm font-semibold text-muted-foreground hover:text-primary"
      >
        Natrag na vodiče
      </a>
      <header className="mt-8 max-w-4xl">
        <h1 className="font-display text-4xl leading-tight font-semibold tracking-[-0.025em] text-foreground sm:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-5 text-sm font-semibold text-muted-foreground">
          Vrijeme čitanja: {estimateGuideReadingMinutes(guide)} min
        </p>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {guide.excerpt}
        </p>
      </header>
      {sectionLinks.length > 0 ? (
        <nav
          aria-labelledby="guide-toc-heading"
          className="mt-10 max-w-3xl rounded-xl border border-border/80 bg-card p-5 shadow-sm"
        >
          <h2 id="guide-toc-heading" className="text-lg font-semibold">
            U ovom vodiču
          </h2>
          <ol className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
            {sectionLinks.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="hover:text-primary">
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <div className="mt-12 max-w-3xl space-y-12">
        {guide.sections.map((section) => (
          <section
            key={section.heading}
            id={slugifyHeading(section.heading)}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-semibold tracking-[-0.015em]">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-5 text-base leading-8 text-muted-foreground">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
      {guide.practicalQuestion ? (
        <section className="mt-14 max-w-3xl rounded-2xl border border-primary/25 bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Praktično pitanje</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            {guide.practicalQuestion}
          </p>
        </section>
      ) : null}
      {relatedGuides.length > 0 ? (
        <section className="mt-14 max-w-5xl">
          <h2 className="text-2xl font-semibold">Povezani vodiči</h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">
            Ako želite nastaviti istim smjerom, krenite od ovih tekstova.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedGuides.map((relatedGuide) => (
              <a
                key={relatedGuide.slug}
                href={guideHref(relatedGuide.slug)}
                className="program-card block hover:border-primary/50 hover:text-foreground"
              >
                <h3>{relatedGuide.title}</h3>
                <p>{relatedGuide.excerpt}</p>
              </a>
            ))}
          </div>
        </section>
      ) : null}
      <div className="mt-14 max-w-3xl rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">
          Želite primijeniti okvir na svoju situaciju?
        </h2>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          Uvodni razgovor traje 15 minuta, bez naknade i bez obveze. Cilj je
          vidjeti gdje ste, što pokušavate odlučiti i ima li smisla nastaviti.
        </p>
        <Button asChild className="cta-primary mt-6 rounded-full">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="guide-booking"
          >
            <CalendarDays className="size-4" />
            {guide.finalCta}
          </a>
        </Button>
      </div>
    </article>
  )
}
