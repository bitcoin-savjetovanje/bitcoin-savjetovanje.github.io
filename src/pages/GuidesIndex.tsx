import { CalendarDays } from "lucide-react"
import { preload } from "react-dom"

import { Seo } from "@/components/Seo"
import { GuideMetaBadges } from "@/components/guides/GuideMetaBadges"
import { Button } from "@/components/ui/button"
import { resolveGuideCover, resolveGuideTheme } from "@/content/guideVisuals"
import {
  findGuide,
  guideHref,
  researchGuideSlugs,
  type Guide,
} from "@/content/guides"
import { guidesIndexRoute } from "@/content/clientRoutes"
import { CONVERSATION_PATH, PRIMARY_CTA } from "@/content/site"

const guidesIndexCover = {
  src: "/images/bitcoin-kao-novac-cover.jpg",
  webpSrc: "/images/bitcoin-kao-novac-cover.webp",
} as const

const roadmapGroups = [
  {
    id: "proracun",
    area: "budget",
    title: "Proračun",
    slugs: [
      "svaki-euro-ima-namjenu",
      "stvarni-visak",
      "prihod-nije-slobodan-novac",
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
      "od-duga-prema-vlasnistvu",
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
      "kada-bitcoin-postane-distrakcija",
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
      "bitcoin-kao-stopa-prepreke",
      "pravilo-trecina",
    ],
  },
  {
    id: "vrijeme-volatilnost",
    area: "time",
    title: "Vrijeme i volatilnost",
    slugs: ["uskladivanje-kupovne-moci-bitcoina"],
  },
  {
    id: "sigurnost",
    area: "security",
    title: "Sigurnost i obitelj",
    slugs: [
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
      "poslovni-bitcoin-nije-privatni-bitcoin",
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

const guideSectionNav = [
  { label: "Počnite ovdje", href: "#pocetak" },
  { label: "Temeljni vodiči", href: "#temeljni" },
  { label: "Istraživačke bilješke", href: "#istrazivacke-biljeske" },
] as const

const starterSlugs = [
  "svaki-euro-ima-namjenu",
  "dug-je-buduci-novac",
  "bitcoin-kao-novac",
] as const

const starterSlugSet = new Set<string>(starterSlugs)

const starterGuides = starterSlugs
  .map((slug) => findGuide(slug))
  .filter((guide): guide is Guide => Boolean(guide))

const researchGuides = researchGuideSlugs
  .map((slug) => findGuide(slug))
  .filter((guide): guide is Guide => Boolean(guide))

const roadmap = roadmapGroups
  .map((group) => ({
    ...group,
    guides: group.slugs.flatMap((slug) => {
      if (starterSlugSet.has(slug)) {
        return []
      }

      const guide = findGuide(slug)

      if (!guide) {
        return []
      }

      return [guide]
    }),
  }))
  .filter((group) => group.guides.length > 0)

export function GuidesIndex() {
  preload(guidesIndexCover.webpSrc, {
    as: "image",
    type: "image/webp",
    fetchPriority: "high",
  })

  return (
    <>
      <Seo {...guidesIndexRoute} />
      <section className="guides-index-page">
        <header className="guides-index-hero hero-section editorial-section">
          <div className="hero-shell guides-index-hero__shell">
            <div className="hero-copy">
              <p className="hero-eyebrow">Bitcoin kao novac</p>
              <h1 className="hero-title">Vodiči za knjigu Bitcoin kao novac</h1>
              <p className="hero-subtitle">
                Vodiči su put prema razumijevanju, ne popis koji morate
                završiti.
              </p>
              <p className="guides-index-hero__body">
                Ako želite razumjeti okvir, čitajte. Ako ga želite primijeniti
                na svoju situaciju, rezervirajte razgovor.
              </p>
              <div className="hero-actions guides-index-hero__cta">
                <Button
                  asChild
                  size="lg"
                  className="cta-primary home-primary-button"
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
                <p>
                  Razgovor je bez naknade i obveze, a kontrola nad sredstvima
                  ostaje kod vas.
                </p>
              </div>
            </div>
            <div
              className="hero-image-frame guides-index-hero__book"
              aria-hidden="true"
            >
              <picture>
                <source srcSet={guidesIndexCover.webpSrc} type="image/webp" />
                <img
                  src={guidesIndexCover.src}
                  alt=""
                  width="1024"
                  height="1535"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
            </div>
          </div>
        </header>

        <div className="guides-index-content section-shell">
          <nav aria-label="Glavne sekcije vodiča" className="guide-section-nav">
            {guideSectionNav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <section
            id="pocetak"
            className="starter-guides-panel mx-auto mt-16 max-w-5xl"
          >
            <h2 className="text-2xl font-semibold">Počnite ovdje</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
              Ako prvi put prolazite ovaj okvir, nemojte odmah čitati sve.
              Krenite od tri vodiča koji stvaraju temelj za razgovor. Krenite
              ovdje prije nego otvorite cijelu biblioteku.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {starterGuides.map((guide, index) => (
                <article
                  key={guide.slug}
                  className="starter-guide-card"
                  data-guide-theme={resolveGuideTheme(guide)}
                >
                  <GuideCardImage
                    guide={guide}
                    className="starter-guide-card__image"
                  />
                  <span className="starter-guide-card__number">
                    {index + 1}
                  </span>
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
              Nakon ova tri teksta nastavite kroz temeljne vodiče prema pitanju
              koje vam je trenutačno najvažnije.
            </p>
          </section>

          <section
            id="temeljni"
            className="guides-roadmap"
            aria-labelledby="foundational-guides-heading"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Temeljni sloj
              </p>
              <h2
                id="foundational-guides-heading"
                className="mt-3 text-2xl font-semibold tracking-[-0.015em] sm:text-3xl"
              >
                Temeljni vodiči
              </h2>
              <p className="mt-3 text-base leading-8 text-muted-foreground">
                Ovi tekstovi objašnjavaju glavni okvir, pomažu dijagnosticirati
                problem i razdvajaju osnovna pravila od tržišne buke. Ne morate
                ih pročitati sve prije razgovora.
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
                        <article
                          className="guide-roadmap-card"
                          data-guide-theme={resolveGuideTheme(guide)}
                        >
                          <GuideCardImage
                            guide={guide}
                            className="guide-roadmap-card__image"
                          />
                          <h4>
                            <a
                              href={guideHref(guide.slug)}
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

          <section
            id="istrazivacke-biljeske"
            className="advanced-guides-section"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Dublje i promjenjive teme
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.015em] sm:text-3xl">
                Istraživačke bilješke
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Istraživačke bilješke obrađuju napredne ili promjenjive teme. Ne
                čine obvezan put prije razgovora.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {researchGuides.map((guide) => (
                <article
                  key={guide.slug}
                  className="advanced-guide-card"
                  data-guide-theme={resolveGuideTheme(guide)}
                >
                  <GuideCardImage
                    guide={guide}
                    className="advanced-guide-card__image"
                  />
                  <h3>
                    <a
                      href={guideHref(guide.slug)}
                      className="text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                      data-link="guide-research-card"
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

          <div className="mx-auto mt-16 max-w-4xl rounded-3xl border border-border/80 bg-card p-6 text-center shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold">
              Vodiči pokazuju okvir. Privatni rad pretvara okvir u odluke.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Ako ne želite sami povezivati proračun, obveze, imovinu, obitelj i
              sigurnosne rizike, razgovor je sljedeći korak.
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
        </div>
      </section>
    </>
  )
}

function GuideCardImage({
  guide,
  className,
}: {
  guide: Guide
  className: string
}) {
  const cover = resolveGuideCover(guide)

  return (
    <picture className={className} aria-hidden="true">
      {cover.webpSrc ? (
        <source srcSet={cover.webpSrc} type="image/webp" />
      ) : null}
      <img
        src={cover.src}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ objectPosition: cover.position }}
      />
    </picture>
  )
}
