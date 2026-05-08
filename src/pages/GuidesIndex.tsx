import { CalendarDays } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import {
  findGuide,
  guideHref,
  guidesIndexAdditionalGroups,
  guidesIndexPrimaryItems,
} from "@/content/guides"
import { guidesIndexRoute } from "@/content/routes"
import { CONVERSATION_PATH, PRIMARY_CTA } from "@/content/site"

const primaryGuides = guidesIndexPrimaryItems.flatMap((item) => {
  const guide = findGuide(item.slug)

  if (!guide) {
    return []
  }

  return [
    {
      ...item,
      href: guideHref(guide.slug),
    },
  ]
})

const additionalGuideGroups = guidesIndexAdditionalGroups
  .map((group) => ({
    title: group.title,
    guides: group.slugs.flatMap((slug) => {
      const guide = findGuide(slug)

      if (!guide) {
        return []
      }

      return [
        {
          slug: guide.slug,
          title: guide.title,
          href: guideHref(guide.slug),
        },
      ]
    }),
  }))
  .filter((group) => group.guides.length > 0)

export function GuidesIndex() {
  return (
    <>
      <Seo
        title={guidesIndexRoute.title}
        description={guidesIndexRoute.description}
        canonical={guidesIndexRoute.canonical}
        ogType={guidesIndexRoute.ogType}
        schema={guidesIndexRoute.schema as object}
      />
      <section className="section-shell">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Praktični Bitcoin standard
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Vodiči za osobni Bitcoin standard
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
            Ne morate pročitati sve. Vodiči su mapa metode: prvo proračun, zatim
            dug, davanje, Bitcoin kao novac, kupovna moć, neto imovina i
            sigurnost.
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
            Ako želite primjenu na vlastitu situaciju, dogovorite 15-minutni
            uvodni razgovor.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button
              asChild
              size="lg"
              className="cta-primary w-full rounded-full sm:w-auto"
            >
              <a
                href={CONVERSATION_PATH}
                className="justify-center text-center"
                data-cta="guides-index-top-intro-call"
              >
                <CalendarDays className="size-4" />
                {PRIMARY_CTA}
              </a>
            </Button>
            <p className="text-sm leading-6 text-muted-foreground">
              Bez naknade. Bez obveze. Bez upravljanja vašim sredstvima.
            </p>
          </div>
        </header>

        <section
          className="mx-auto mt-14 max-w-6xl"
          aria-labelledby="guides-method-map"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Mapa metode
            </p>
            <h2
              id="guides-method-map"
              className="mt-3 text-2xl font-semibold tracking-[-0.015em] sm:text-3xl"
            >
              Krenite redom
            </h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              Ovih sedam vodiča daje najkraći put kroz metodu. Ostali tekstovi
              su dodatne bilješke za dublje čitanje.
            </p>
          </div>

          <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {primaryGuides.map((guide, index) => (
              <li key={guide.slug}>
                <article className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-5 text-foreground shadow-sm transition-colors hover:border-primary/50">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                      {guide.category}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl leading-tight font-semibold tracking-[-0.01em]">
                    <a
                      href={guide.href}
                      className="text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                      data-link="guide-card"
                    >
                      {guide.title}
                    </a>
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {guide.excerpt}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="mx-auto mt-14 max-w-6xl border-t border-border/70 pt-10"
          aria-labelledby="guides-additional-notes"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Sekundarno čitanje
            </p>
            <h2
              id="guides-additional-notes"
              className="mt-3 text-2xl font-semibold tracking-[-0.015em]"
            >
              Dodatne bilješke
            </h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              Ovi tekstovi razrađuju pojedine dijelove metode. Ne morate ih
              pročitati prije uvodnog razgovora.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {additionalGuideGroups.map((group) => (
              <section
                key={group.title}
                className="rounded-xl border border-border/70 bg-card/70 p-4"
              >
                <h3 className="text-sm font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                  {group.title}
                </h3>
                <ul className="mt-4 grid gap-3 text-sm leading-6">
                  {group.guides.map((guide) => (
                    <li key={guide.slug}>
                      <a
                        href={guide.href}
                        className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                      >
                        {guide.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border/80 bg-card p-6 text-center shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Želite primijeniti okvir na vlastitu situaciju?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Vodiči objašnjavaju okvir. Uvodni razgovor pokazuje gdje ga prvo
            treba primijeniti kod vas.
          </p>
          <Button
            asChild
            className="cta-primary mt-6 w-full rounded-full sm:w-auto"
          >
            <a
              href={CONVERSATION_PATH}
              className="justify-center text-center"
              data-cta="guides-index-intro-call"
            >
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
            </a>
          </Button>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Uvodni razgovor je bez naknade i traje 15 minuta.
          </p>
        </div>
      </section>
    </>
  )
}
