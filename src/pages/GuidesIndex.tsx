import { ArrowUpRight, CalendarDays } from "lucide-react"

import { Seo } from "@/components/Seo"
import { GuideMetaBadges } from "@/components/guides/GuideMetaBadges"
import { Button } from "@/components/ui/button"
import { findGuide, guideHref } from "@/content/guides"
import { guidesIndexRoute } from "@/content/routes"
import {
  CONVERSATION_PATH,
  OPEN_MANUSCRIPT_URL,
  PRIMARY_CTA,
} from "@/content/site"

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
      "niste-zakasnili-u-bitcoin",
      "bitcoin-kao-novac",
      "bitcoin-nije-kripto-portfelj",
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
      "bitcoin-etfovi-i-riznicke-kompanije",
    ],
  },
  {
    id: "sigurnost",
    title: "Korak 6 — Sigurnost i obitelj",
    slugs: [
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
      "obiteljski-bitcoin-trezor",
      "samostalna-pohrana-ili-skrbnik",
      "bitkey-bitcoin-sigurnost",
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
          excerpt: guide.excerpt,
          href: guideHref(guide.slug),
          difficulty: guide.difficulty,
          freshness: guide.freshness,
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
              Razgovor je bez naknade i obveze, a kontrola nad sredstvima ostaje
              kod vas.
            </p>
          </div>
        </header>

        <section
          className="case-panel mx-auto mt-12 max-w-5xl border-primary/20 bg-card"
          aria-labelledby="open-manuscript-title"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(220px,280px)] lg:items-center">
            <div>
              <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Knjiga u nastajanju
              </p>
              <h2
                id="open-manuscript-title"
                className="mt-3 text-2xl font-semibold tracking-[-0.015em] text-foreground sm:text-3xl"
              >
                Otvoreni rukopis knjige
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  Praktični Bitcoin standard razvijam i kao javno dostupan radni
                  rukopis knjige. Trenutna javna verzija dostupna je na
                  engleskom jeziku, dok hrvatsku verziju još pišem i uređujem.
                </p>
                <p>
                  Knjiga, vodiči i savjetovanje nastaju iz istog okvira:
                  proračun, dug, davanje, Bitcoin kao novac, neto imovina,
                  volatilnost, sigurnost i obitelj. Razgovori sa stvarnim
                  ljudima pomažu mi vidjeti koja pitanja treba objasniti
                  jasnije, praktičnije i boljim redoslijedom.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border/80 bg-background/70 p-5 shadow-sm">
              <a
                href={OPEN_MANUSCRIPT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
                data-link="guides-open-manuscript"
              >
                Pogledajte otvoreni rukopis
                <ArrowUpRight className="size-4" />
              </a>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Hrvatska verzija knjige još je u procesu pisanja.
              </p>
            </div>
          </div>
        </section>

        <section className="guides-roadmap" aria-labelledby="guides-method-map">
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
              Ne morate čitati sve odjednom. Ako ne znate gdje krenuti, krenite
              od proračuna. Ako vas konkretno muči dug, sigurnost, obitelj ili
              odluka o ulozi Bitcoina, možete krenuti od vodiča koji se odnosi
              na to pitanje.
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

          <div className="guides-roadmap__groups">
            {roadmap.map((group) => (
              <section
                key={group.id}
                id={group.id}
                className="guides-roadmap__group"
              >
                <h3 className="text-2xl font-semibold tracking-[-0.015em]">
                  {group.title}
                </h3>
                <ol className="guides-roadmap__list">
                  {group.guides.map((guide) => (
                    <li key={guide.slug}>
                      <article className="guide-roadmap-card">
                        <h4>
                          <a
                            href={guide.href}
                            className="text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                            data-link="guide-card"
                          >
                            {guide.title}
                          </a>
                        </h4>
                        <p>{guide.excerpt}</p>
                        <GuideMetaBadges guide={guide} />
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
