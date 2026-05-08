import { CalendarDays } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { findGuide, guideHref } from "@/content/guides"
import { guidesIndexRoute } from "@/content/routes"
import { CONVERSATION_PATH, PRIMARY_CTA } from "@/content/site"

const roadmapGroups = [
  {
    id: "proracun",
    title: "Korak 1 — Red u novcu",
    slugs: [
      "svaki-euro-ima-namjenu",
      "stvarni-visak",
      "starost-novca",
      "dca-nije-dovoljan",
    ],
  },
  {
    id: "dug",
    title: "Korak 2 — Dug i sloboda odluke",
    slugs: [
      "dug-je-buduci-novac",
      "dug-ili-bitcoin",
      "ne-zaduzujte-se-za-bitcoin",
    ],
  },
  {
    id: "davanje",
    title: "Korak 3 — Davanje",
    slugs: [
      "davanje-u-proracunu-nulte-osnove",
      "davanje-bez-duga",
      "novac-dolazi-od-ljudi",
    ],
  },
  {
    id: "bitcoin",
    title: "Korak 4 — Bitcoin kao novac",
    slugs: [
      "bitcoin-kao-novac",
      "pozitivni-neto-priljev",
      "uskladivanje-kupovne-moci-bitcoina",
      "cijena-kao-mjera-vremena",
    ],
  },
  {
    id: "neto-imovina",
    title: "Korak 5 — Neto imovina",
    slugs: [
      "novac-kapital-potrosnja",
      "bitcoin-u-neto-imovini",
      "pravilo-trecina",
    ],
  },
  {
    id: "sigurnost",
    title: "Korak 6 — Sigurnost i obitelj",
    slugs: [
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
      "obiteljski-pristup-bitcoinu",
    ],
  },
] as const

const guideChips = [
  { label: "Proračun", href: "#proracun" },
  { label: "Dug", href: "#dug" },
  { label: "Davanje", href: "#davanje" },
  { label: "Bitcoin", href: "#bitcoin" },
  { label: "Neto imovina", href: "#neto-imovina" },
  { label: "Sigurnost", href: "#sigurnost" },
] as const

const roadmap = roadmapGroups
  .map((group) => ({
    ...group,
    guides: group.slugs.flatMap((slug) => {
      const guide = findGuide(slug)

      if (!guide) {
        return []
      }

      return [
        {
          slug: guide.slug,
          title: guide.title,
          category: guide.category,
          excerpt: guide.excerpt,
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
              Roadmap kroz okvir
            </h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              Ako niste sigurni gdje krenuti, krenite od proračuna. Ako vas
              konkretno muči odluka, dug, sigurnost ili obitelj, možete
              preskočiti na vodič koji se odnosi na vaše pitanje.
            </p>
          </div>

          <nav aria-label="Kategorije vodiča" className="mt-8">
            <ul className="guide-chip-list">
              {guideChips.map((chip) => (
                <li key={chip.href}>
                  <a href={chip.href} className="guide-chip">
                    {chip.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 grid gap-8">
            {roadmap.map((group) => (
              <section
                key={group.id}
                id={group.id}
                className="scroll-mt-24 rounded-2xl border border-border/80 bg-card/78 p-5 shadow-sm sm:p-7"
              >
                <h3 className="text-2xl font-semibold tracking-[-0.015em]">
                  {group.title}
                </h3>
                <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {group.guides.map((guide) => (
                    <li key={guide.slug}>
                      <article className="flex h-full flex-col rounded-xl border border-border/80 bg-background/72 p-5 text-foreground shadow-sm transition-colors hover:border-primary/50">
                        <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                          {guide.category}
                        </p>
                        <h4 className="mt-4 text-lg leading-tight font-semibold tracking-[-0.01em]">
                          <a
                            href={guide.href}
                            className="text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                            data-link="guide-card"
                          >
                            {guide.title}
                          </a>
                        </h4>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {guide.excerpt}
                        </p>
                      </article>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border/80 bg-card p-6 text-center shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Želite primijeniti okvir na vlastitu situaciju?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Vodiči objašnjavaju okvir. Uvodni razgovor pomaže vidjeti koji dio
            okvira je za vas trenutno najvažniji.
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
