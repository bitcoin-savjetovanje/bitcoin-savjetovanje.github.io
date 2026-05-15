import { CalendarDays } from "lucide-react"

import { Seo } from "@/components/Seo"
import { GuideMetaBadges } from "@/components/guides/GuideMetaBadges"
import { Button } from "@/components/ui/button"
import { findGuide, guideHref, type Guide } from "@/content/guides"
import { guidesIndexRoute } from "@/content/routes"
import { CONVERSATION_PATH, PRIMARY_CTA } from "@/content/site"

const roadmapGroups = [
  {
    id: "proracun",
    area: "budget",
    title: "Proračun",
    slugs: [
      "svaki-euro-ima-namjenu",
      "stvarni-visak",
      "starost-novca",
      "dca-nije-dovoljan",
    ],
  },
  {
    id: "dug",
    area: "debt",
    title: "Dug",
    slugs: [
      "dug-je-buduci-novac",
      "dug-ili-bitcoin",
      "ne-zaduzujte-se-za-bitcoin",
    ],
  },
  {
    id: "davanje",
    area: "giving",
    title: "Davanje",
    slugs: [
      "davanje-u-proracunu-nulte-osnove",
      "davanje-bez-duga",
      "novac-dolazi-od-ljudi",
    ],
  },
  {
    id: "bitcoin",
    area: "bitcoin",
    title: "Bitcoin kao novac",
    slugs: [
      "niste-zakasnili-u-bitcoin",
      "bitcoin-kao-novac",
      "bitcoin-nije-kripto-portfelj",
      "pozitivni-neto-priljev",
    ],
  },
  {
    id: "neto-imovina",
    area: "worth",
    title: "Neto imovina",
    slugs: [
      "novac-kapital-potrosnja",
      "bitcoin-u-neto-imovini",
      "pravilo-trecina",
      "bitcoin-etfovi-i-riznicke-kompanije",
    ],
  },
  {
    id: "vrijeme-volatilnost",
    area: "time",
    title: "Vrijeme i volatilnost",
    slugs: ["uskladivanje-kupovne-moci-bitcoina", "cijena-kao-mjera-vremena"],
  },
  {
    id: "sigurnost",
    area: "security",
    title: "Sigurnost i obitelj",
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
  { label: "Bitcoin kao novac", href: "#bitcoin" },
  { label: "Neto imovina", href: "#neto-imovina" },
  { label: "Vrijeme i volatilnost", href: "#vrijeme-volatilnost" },
  { label: "Sigurnost", href: "#sigurnost" },
] as const

const starterSlugs = [
  "svaki-euro-ima-namjenu",
  "dug-ili-bitcoin",
  "bitcoin-kao-novac",
] as const

const starterGuides = starterSlugs
  .map((slug) => findGuide(slug))
  .filter((guide): guide is Guide => Boolean(guide))

const advancedSlugs = [
  "bitcoin-etfovi-i-riznicke-kompanije",
  "samostalna-pohrana-ili-skrbnik",
  "bitkey-bitcoin-sigurnost",
] as const

const advancedGuides = advancedSlugs
  .map((slug) => findGuide(slug))
  .filter((guide): guide is Guide => Boolean(guide))

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
            Bitcoin kao novac
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Vodiči za knjigu Bitcoin kao novac
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
            Vodiči objašnjavaju okvir za život s Bitcoinom kao novcem: proračun,
            dug, davanje, Bitcoin kao primarni novac, neto imovina, vrijeme,
            volatilnost, sigurnost i obitelj.
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

        <section className="starter-guides-panel mx-auto mt-12 max-w-5xl">
          <h2 className="text-2xl font-semibold">
            Ako želite samo početak, krenite ovdje
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Ako prvi put prolazite ovaj okvir, nemojte odmah čitati sve. Krenite
            od tri vodiča koji stvaraju temelj za razgovor. Krenite ovdje prije
            nego otvorite cijelu biblioteku.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {starterGuides.map((guide, index) => (
              <article key={guide.slug} className="starter-guide-card">
                <span className="starter-guide-card__number">{index + 1}</span>
                <h3 className="text-lg font-semibold">
                  <a
                    href={guideHref(guide.slug)}
                    className="text-foreground hover:text-primary"
                    data-link="guide-starter-card"
                  >
                    {guide.title}
                  </a>
                </h3>
                <p>{guide.excerpt}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-base leading-8 font-semibold text-foreground">
            Kad to prođete, nastavite kroz cijelu mapu.
          </p>
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
              Cijela mapa vodiča
            </h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              Krenite od proračuna i duga ako tek slažete temelj. Ako već imate
              konkretno pitanje, preskočite na područje koje najviše utječe na
              vašu odluku.
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
                data-area={group.area}
              >
                <div className="guides-roadmap__group-header">
                  <span aria-hidden="true" />
                  <h3 className="text-2xl font-semibold tracking-[-0.015em]">
                    {group.title}
                  </h3>
                </div>
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

        <section className="advanced-guides-section">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Kontekstualno
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.015em] sm:text-3xl">
              Napredno / često se mijenja
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Ove teme ovise o alatima, pravilima i tržišnim okolnostima.
              Temeljni okvir ostaje: proračun, dug, davanje, Bitcoin kao novac,
              neto imovina, vrijeme i sigurnost.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {advancedGuides.map((guide) => (
              <article key={guide.slug} className="advanced-guide-card">
                <h3>
                  <a
                    href={guideHref(guide.slug)}
                    className="text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                    data-link="guide-advanced-card"
                  >
                    {guide.title}
                  </a>
                </h3>
                <p>{guide.excerpt}</p>
                <GuideMetaBadges guide={guide} />
              </article>
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
