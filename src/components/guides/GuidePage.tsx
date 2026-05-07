import { ArrowRight, CalendarDays } from "lucide-react"

import { GuideVisual } from "@/components/guides/GuideVisual"
import { Button } from "@/components/ui/button"
import { findGuide, guideHref, guides, type Guide } from "@/content/guides"
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
  const nextGuide = guides.find((item) => item.order > guide.order)

  return (
    <article className="section-shell">
      <nav
        aria-label="Breadcrumb"
        className="text-sm leading-6 font-medium text-muted-foreground"
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
          <li
            aria-current="page"
            className="min-w-0 break-words text-foreground"
          >
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
        <h1 className="font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-5 text-sm font-semibold text-muted-foreground">
          Vrijeme čitanja: {estimateGuideReadingMinutes(guide)} min
        </p>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
          {guide.excerpt}
        </p>
      </header>
      {guide.visual ? <GuideVisual visual={guide.visual} /> : null}
      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,48rem)_18rem] lg:items-start">
        <div className="min-w-0">
          {sectionLinks.length > 0 ? (
            <nav
              aria-labelledby="guide-toc-heading"
              className="rounded-xl border border-border/80 bg-card p-5 shadow-sm lg:hidden"
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
          <div className="mt-12 space-y-12 lg:mt-0">
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
            <section
              id="prakticno-pitanje"
              className="mt-14 rounded-2xl border border-primary/25 bg-card p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold">Praktično pitanje</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {guide.practicalQuestion}
              </p>
            </section>
          ) : null}
          {nextGuide ? (
            <section className="mt-14 rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
              <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Sljedeći vodič u redoslijedu
              </p>
              <a
                href={guideHref(nextGuide.slug)}
                className="group mt-3 block"
                data-link="next-guide"
              >
                <h2 className="flex items-start justify-between gap-4 text-2xl font-semibold">
                  <span>{nextGuide.title}</span>
                  <ArrowRight className="mt-1 size-5 shrink-0 text-muted-foreground group-hover:text-primary" />
                </h2>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  {nextGuide.excerpt}
                </p>
              </a>
            </section>
          ) : null}
          {relatedGuides.length > 0 ? (
            <section className="mt-14">
              <h2 className="text-2xl font-semibold">Povezani vodiči</h2>
              <p className="mt-3 text-base leading-8 text-muted-foreground">
                Ako želite nastaviti istim smjerom, krenite od ovih tekstova.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {relatedGuides.map((relatedGuide) => (
                  <a
                    key={relatedGuide.slug}
                    href={guideHref(relatedGuide.slug)}
                    className="program-card block hover:border-primary/50 hover:text-foreground"
                    data-link="related-guide"
                  >
                    <h3>{relatedGuide.title}</h3>
                    <p>{relatedGuide.excerpt}</p>
                  </a>
                ))}
              </div>
            </section>
          ) : null}
          <div className="mt-14 rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">
              Želite primijeniti okvir na svoju situaciju?
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Uvodni razgovor traje 15 minuta, bez naknade i bez obveze. Cilj je
              vidjeti gdje ste, što pokušavate odlučiti i ima li smisla
              nastaviti.
            </p>
            <Button
              asChild
              className="cta-primary mt-6 w-full rounded-full sm:w-auto"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-center text-center"
                data-cta="guide-standard-check"
              >
                <CalendarDays className="size-4" />
                {guide.finalCta}
              </a>
            </Button>
          </div>
        </div>
        <aside className="sticky top-28 hidden rounded-2xl border border-border/80 bg-card p-5 shadow-sm lg:block">
          <h2 className="text-lg font-semibold">Sadržaj vodiča</h2>
          <ol className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">
            {sectionLinks.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="hover:text-primary">
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
          {guide.practicalQuestion ? (
            <a
              href="#prakticno-pitanje"
              className="mt-5 block text-sm font-semibold text-foreground hover:text-primary"
            >
              Praktično pitanje
            </a>
          ) : null}
          {nextGuide ? (
            <a
              href={guideHref(nextGuide.slug)}
              className="mt-5 block rounded-xl border border-border/75 bg-background/70 p-4 text-sm font-semibold hover:border-primary/50 hover:text-primary"
              data-link="next-guide-sidebar"
            >
              Sljedeći vodič
              <span className="mt-2 block text-muted-foreground">
                {nextGuide.title}
              </span>
            </a>
          ) : null}
          <Button asChild className="cta-primary mt-5 w-full rounded-full">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="justify-center text-center"
              data-cta="guide-sidebar-standard-check"
            >
              <CalendarDays className="size-4" />
              Razgovor
            </a>
          </Button>
        </aside>
      </div>
    </article>
  )
}
