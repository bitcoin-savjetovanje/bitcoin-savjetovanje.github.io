import { ArrowUpRight, CalendarDays, Check, X } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { bitcoinClarityRoute } from "@/content/routes"
import { CONVERSATION_PATH } from "@/content/site"

const forWhomItems = [
  "imate ozbiljno Bitcoin pitanje koje se stalno vraća",
  "razmišljate o većoj ulozi Bitcoina u svojoj imovini",
  "želite objasniti Bitcoin partneru ili obitelji",
  "brine vas sigurnost",
  "ne znate kako dug, proračun ili buduća plaćanja utječu na odluku",
  "želite znati treba li vam cijeli osobni Bitcoin standard ili je dovoljan jedan razgovor",
]

const reviewItems = [
  "Bitcoin tezu na jeziku koji možete ponoviti drugima",
  "glavne nedoumice o cijeni, volatilnosti i riziku",
  "odnos duga, proračuna i stvarnog viška",
  "ulogu Bitcoina u neto imovini",
  "sigurnost, seed phrase i obiteljski pristup",
  "sljedeći razuman korak",
]

const notDoingItems = [
  "ne prognoziram cijenu",
  "ne govorim vam koliko Bitcoina morate kupiti",
  "ne upravljam vašim sredstvima",
  "ne tražim seed phrase, privatne ključeve, lozinke ili pristup novčaniku",
  "ne dajem porezni ni pravni savjet",
]

const outcomes = [
  "jasniju Bitcoin tezu koju možete objasniti sebi i drugima",
  "jasniju sliku kako dug, troškovi, sigurnost i obitelj utječu na odluku",
  "odgovor treba li stati na jednom razgovoru ili graditi osobni Bitcoin standard",
  "popis pitanja koja više ne trebaju ostati u glavi",
]

const preparationItems = [
  "koju odluku pokušavate donijeti",
  "koja tri pitanja se stalno vraćaju",
  "postoji li dug, sigurnosna ili obiteljska tema",
  "što bi vam značilo da nakon razgovora bude jasnije",
]

const notForItems = [
  "tražite kratku uputu kada kupiti ili prodati",
  "želite prognozu cijene",
  "tražite upravljanje sredstvima",
  "tražite porezni ili pravni savjet",
  "želite da netko odluči umjesto vas",
  "želite nekome predati seed phrase ili privatne ključeve",
]

function Checklist({
  items,
  kind = "positive",
}: {
  items: string[]
  kind?: "positive" | "negative"
}) {
  const Icon = kind === "positive" ? Check : X
  const iconClass = kind === "positive" ? "positive-icon" : "negative-icon"

  return (
    <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon className={`${iconClass} mt-1 size-4 shrink-0`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function BitcoinClarity() {
  return (
    <>
      <Seo
        title={bitcoinClarityRoute.title}
        description={bitcoinClarityRoute.description}
        canonical={bitcoinClarityRoute.canonical}
        ogType={bitcoinClarityRoute.ogType}
        schema={bitcoinClarityRoute.schema as object}
      />
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
            <li aria-current="page" className="text-foreground">
              Bitcoin jasnoća
            </li>
          </ol>
        </nav>

        <header className="mt-8 max-w-4xl">
          <h1 className="font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Bitcoin jasnoća
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
            Jedan dubinski razgovor za osobu koja želi ozbiljno razjasniti
            Bitcoin tezu, vlastitu situaciju i odluku koju ne želi donositi
            napamet.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            200 € · jedan dubinski razgovor
          </p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Za koga je</h2>
            <Checklist items={forWhomItems} />
          </section>

          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Što možemo proći</h2>
            <Checklist items={reviewItems} />
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">Što ne radimo</h2>
          <Checklist items={notDoingItems} kind="negative" />
        </section>

        <section className="mt-8 rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Nakon Bitcoin jasnoće najčešće imate
          </h2>
          <Checklist items={outcomes} />
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Što pripremiti</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Ne morate slati dokumente. Dovoljno je prije razgovora zapisati:
            </p>
            <Checklist items={preparationItems} />
          </section>

          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Kada nije za vas</h2>
            <Checklist items={notForItems} kind="negative" />
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Kada je dovoljan jedan razgovor
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Jedan razgovor može biti dovoljan ako vam treba razjasniti konkretno
            pitanje, jedan dio Bitcoin teze ili sigurnosnu odluku. Ako se pokaže
            da nedostaje cijeli sustav pravila, sljedeći korak može biti osobni
            Bitcoin standard.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-primary/25 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Krenite od uvodnog razgovora
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Uvodni razgovor služi tome da vidimo je li Bitcoin jasnoća pravi
            sljedeći korak ili je za sada dovoljno stati na kratkoj procjeni.
          </p>
          <ul className="mt-6 flex list-none flex-col gap-3 sm:flex-row sm:items-center">
            <li>
              <Button
                asChild
                size="lg"
                className="cta-primary h-12 rounded-full px-5 text-base"
              >
                <a
                  href={CONVERSATION_PATH}
                  className="justify-center text-center"
                  data-cta="bitcoin-clarity-intro-call"
                >
                  <CalendarDays className="size-4" />
                  Krenite od uvodnog razgovora
                </a>
              </Button>
            </li>
            <li>
              <a
                href="/sigurnost/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted hover:text-foreground"
                data-cta="bitcoin-clarity-security"
              >
                Pogledajte sigurnosna pravila
                <ArrowUpRight className="size-4" />
              </a>
            </li>
          </ul>
        </section>
      </article>
    </>
  )
}
