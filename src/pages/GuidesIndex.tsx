import { CalendarDays } from "lucide-react"

import { GuideCardsGrid } from "@/components/guides/GuideCardsGrid"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import {
  findGuide,
  guideCategories,
  guideCategoryDescriptions,
  guideHref,
  guidesByCategory,
  recommendedGuideSlugs,
} from "@/content/guides"
import { guidesIndexRoute } from "@/content/routes"
import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

function guideList(slugs: string[]) {
  return slugs.map((slug) => findGuide(slug)).filter(Boolean)
}

const recommendedGuides = recommendedGuideSlugs
  .map((slug) => findGuide(slug))
  .filter(Boolean)

const guideLevels = [
  {
    title: "Razina 1: Imate Bitcoin, ali još živite po fiat pravilima",
    copy: "Prvo uredite novac koji već imate: namjenu, stvarni višak, dug i naviku redovite kupnje.",
    guides: guideList([
      "svaki-euro-ima-namjenu",
      "stvarni-visak",
      "kredit-je-buduci-novac",
      "dca-nije-dovoljan",
    ]),
  },
  {
    title: "Razina 2: Gradite osobni Bitcoin standard",
    copy: "Zatim se Bitcoin povezuje s darivanjem, kupovnom moći, priljevima i ulogom novca.",
    guides: guideList([
      "sustavno-davanje-u-proracunu-nulte-razine",
      "bitcoin-kao-novac",
      "uskladivanje-kupovne-moci-bitcoina",
      "pozitivni-neto-priljev",
      "novac-dolazi-od-ljudi",
    ]),
  },
  {
    title: "Razina 3: Živite i usavršavate standard",
    copy: "Na kraju provjeravate neto imovinu, pravilo trećina, reakcije na promjene kupovne moći, sigurnost i obitelj.",
    guides: guideList([
      "pravilo-trecina",
      "bitcoin-u-neto-imovini",
      "cijena-kao-mjera-vremena",
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
      "obiteljski-pristup-bitcoinu",
    ]),
  },
]

const standardPathSteps = [
  "proračun nulte osnove",
  "život bez duga",
  "darivanje",
  "Bitcoin kao novac",
  "kupovna moć",
  "neto imovina",
  "sigurnost",
]

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
            Ako želite razumjeti okvir, čitajte vodiče. Ako ga želite
            primijeniti na vlastiti proračun, dug, darivanje, Bitcoin, neto
            imovinu i obitelj, dogovorite provjeru.
          </p>
        </header>

        <section className="mx-auto mt-12 max-w-5xl rounded-2xl border border-border/80 bg-card p-5 shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Preporučeni redoslijed čitanja
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.015em]">
              Ne čitajte sve odjednom. Krenite redom.
            </h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              Vodiči su za razumijevanje. Razgovor je za primjenu. Krenite od
              novca koji imate, zatim od duga i darivanja, a tek onda od
              Bitcoina kao novca, neto imovine i sigurnosti.
            </p>
            <p className="mt-3 text-sm leading-7 font-semibold text-foreground">
              Redoslijed je važan: osobni Bitcoin standard nije popis tekstova,
              nego sustav pravila koji treba primijeniti.
            </p>
          </div>
          <div
            className="mt-8 rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm sm:p-5"
            aria-label="Put prema osobnom Bitcoin standardu"
          >
            <h3 className="text-lg font-semibold">
              Put prema osobnom Bitcoin standardu
            </h3>
            <ol className="mt-4 grid gap-2 md:grid-cols-7">
              {standardPathSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-center gap-3 rounded-xl border border-border/75 bg-card p-3 text-sm font-semibold text-foreground shadow-sm md:flex-col md:items-start"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <ol className="mt-6 grid gap-2 md:grid-cols-2">
            {recommendedGuides.map((guide, index) =>
              guide ? (
                <li key={guide.slug}>
                  <a
                    href={guideHref(guide.slug)}
                    className="flex h-full gap-3 rounded-xl border border-border/75 bg-background/70 p-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs text-primary">
                      {index + 1}
                    </span>
                    <span>{guide.title}</span>
                  </a>
                </li>
              ) : null
            )}
          </ol>
          <div className="mt-8 grid gap-4 border-t border-border/70 pt-6 lg:grid-cols-3">
            {guideLevels.map((path) => (
              <section
                key={path.title}
                className="rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{path.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {path.copy}
                </p>
                <ol className="mt-4 grid gap-2">
                  {path.guides.map((guide, index) =>
                    guide ? (
                      <li key={guide.slug}>
                        <a
                          href={guideHref(guide.slug)}
                          className="flex h-full gap-3 rounded-xl border border-border/75 bg-card p-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-primary focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                        >
                          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs text-primary">
                            {index + 1}
                          </span>
                          <span>{guide.title}</span>
                        </a>
                      </li>
                    ) : null
                  )}
                </ol>
              </section>
            ))}
          </div>
        </section>

        <div className="mt-14 space-y-12">
          {guideCategories.map((category, categoryIndex) => {
            const categoryGuides = guidesByCategory(category)
            const categoryId = `guide-category-${categoryIndex + 1}`

            if (categoryGuides.length === 0) {
              return null
            }

            return (
              <section key={category} aria-labelledby={categoryId}>
                <div className="max-w-3xl">
                  <h2
                    id={categoryId}
                    className="font-display text-2xl leading-tight font-semibold text-foreground sm:text-3xl"
                  >
                    {category}
                  </h2>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">
                    {guideCategoryDescriptions[category]}
                  </p>
                </div>
                <GuideCardsGrid items={categoryGuides} showReadingTime />
              </section>
            )
          })}
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border/80 bg-card p-6 text-center shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Želite primijeniti okvir na svoju situaciju?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Bitcoin standard nije samo posjedovanje Bitcoina. Nastaje kada vaš
            novac, dug, darivanje, neto imovina, sigurnost i obitelj imaju
            pravila.
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
              data-cta="guides-index-standard-check"
            >
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
            </a>
          </Button>
        </div>
      </section>
    </>
  )
}
