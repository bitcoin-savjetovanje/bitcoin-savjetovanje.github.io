import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Guide } from "@/content/guides"
import { CALENDLY_URL } from "@/content/site"

export function GuidePage({ guide }: { guide: Guide }) {
  return (
    <article className="section-shell">
      <a
        href="/#vodici"
        className="text-sm font-semibold text-muted-foreground hover:text-primary"
      >
        Natrag na vodiče
      </a>
      <header className="mt-8 max-w-4xl">
        <h1 className="font-display text-4xl leading-tight font-semibold tracking-[-0.025em] text-foreground sm:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {guide.excerpt}
        </p>
      </header>
      <div className="mt-12 max-w-3xl space-y-12">
        {guide.sections.map((section) => (
          <section key={section.heading}>
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
      <div className="mt-14 max-w-3xl rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">
          Želite primijeniti okvir na svoju situaciju?
        </h2>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          Uvodni razgovor traje 15 minuta, bez naknade i bez obveze. Cilj je
          vidjeti gdje ste, što pokušavate odlučiti i ima li smisla nastaviti.
        </p>
        <Button asChild className="cta-primary mt-6 rounded-full">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <CalendarDays className="size-4" />
            {guide.finalCta}
          </a>
        </Button>
      </div>
    </article>
  )
}
