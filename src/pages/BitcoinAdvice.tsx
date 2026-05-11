import { ArrowUpRight, CalendarDays, Check, ShieldCheck } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { bitcoinAdviceRoute } from "@/content/routes"
import {
  BITCOIN_CONSULTATION_PATH,
  CONVERSATION_PATH,
  PRACTICAL_BITCOIN_STANDARD_URL,
} from "@/content/site"

const situations = [
  "imate Bitcoin, ali nemate jasan osobni okvir",
  "razmišljate treba li Bitcoin imati veću ulogu u vašoj imovini",
  "želite razgovarati s partnerom ili obitelji bez pritiska",
  "brine vas sigurnost, seed phrase ili pristup u izvanrednoj situaciji",
  "ne znate kako dug, proračun ili buduća plaćanja mijenjaju odluku",
]

const outcomes = [
  "jasnije pitanje koje stvarno treba riješiti",
  "razumljiviji odnos Bitcoina, duga, proračuna i sigurnosti",
  "realniji sljedeći korak: kratak odgovor, Bitcoin konzultacija ili osobni Bitcoin standard",
  "manje oslanjanja na prognoze cijene i tuđe mišljenje",
]

const notDoingItems = [
  "ne upravljam vašim sredstvima",
  "ne govorim vam kada kupiti ili prodati",
  "ne prognoziram cijenu Bitcoina",
  "ne tražim seed phrase, privatne ključeve, lozinke ili pristup novčaniku",
  "ne dajem porezni ni pravni savjet",
]

const paths = [
  {
    title: "Uvodni Bitcoin razgovor",
    copy: "Prvi korak je 15 minuta bez naknade i bez obveze. Cilj je vidjeti gdje ste, što prvo treba razjasniti i koji bi sljedeći korak bio razuman.",
    href: CONVERSATION_PATH,
    label: "Dogovorite uvodni razgovor",
    dataCta: "bitcoin-advice-intro-call",
  },
  {
    title: "Bitcoin konzultacija",
    copy: "Jedan dubinski razgovor za jedno ozbiljno Bitcoin pitanje. Korisno kada imate konkretnu odluku, tezu ili sigurnosnu temu.",
    href: BITCOIN_CONSULTATION_PATH,
    label: "Što je Bitcoin konzultacija?",
    dataCta: "bitcoin-advice-consultation",
  },
  {
    title: "Osobni Bitcoin standard",
    copy: "Širi okvir za pravila: proračun, dug, Bitcoin kao novac, neto imovina, sigurnost i obitelj.",
    href: PRACTICAL_BITCOIN_STANDARD_URL,
    label: "Čitajte vodiče",
    dataCta: "bitcoin-advice-guides",
  },
]

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className="positive-icon mt-1 size-4 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function BitcoinAdvice() {
  return (
    <>
      <Seo
        title={bitcoinAdviceRoute.title}
        description={bitcoinAdviceRoute.description}
        canonical={bitcoinAdviceRoute.canonical}
        ogType={bitcoinAdviceRoute.ogType}
        schema={bitcoinAdviceRoute.schema as object}
      />
      <article className="section-shell page-flow">
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
              Bitcoin savjetovanje
            </li>
          </ol>
        </nav>

        <header className="page-hero mt-8">
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Bitcoin savjetovanje Hrvatska
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Bitcoin savjetovanje za jasnije odluke, sigurnost i osobni okvir.
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
            Jedan-na-jedan savjetovanje za ljude koji vide da je Bitcoin važan,
            ali ne žele odluku temeljiti na dojmu, prognozi cijene ili tuđem
            pritisku. Razgovaramo o Bitcoinu, osobnoj situaciji, dugu,
            sigurnosti, obitelji i pravilima koja možete objasniti.
          </p>
          <ul className="mt-8 flex list-none flex-col gap-3 sm:flex-row sm:items-center">
            <li>
              <Button
                asChild
                size="lg"
                className="cta-primary h-12 w-full max-w-full rounded-full px-4 text-sm sm:w-auto sm:px-5 sm:text-base"
              >
                <a
                  href={CONVERSATION_PATH}
                  className="min-w-0 justify-center text-center"
                  data-cta="bitcoin-advice-hero-intro-call"
                >
                  <CalendarDays className="size-4" />
                  <span className="sm:hidden">Dogovorite uvodni razgovor</span>
                  <span className="hidden sm:inline">
                    Dogovorite 15-minutni uvodni razgovor
                  </span>
                </a>
              </Button>
            </li>
            <li>
              <a
                href={PRACTICAL_BITCOIN_STANDARD_URL}
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
                data-link="bitcoin-advice-guides-index"
              >
                Čitajte vodiče
                <ArrowUpRight className="size-4" />
              </a>
            </li>
          </ul>
        </header>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="case-panel">
            <h2 className="text-2xl font-semibold">
              Kada Bitcoin savjetovanje ima smisla
            </h2>
            <CheckList items={situations} />
          </div>
          <div className="case-panel">
            <h2 className="text-2xl font-semibold">
              Što bi nakon razgovora trebalo biti jasnije
            </h2>
            <CheckList items={outcomes} />
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-primary/25 bg-card p-6 shadow-sm sm:mt-12 sm:p-8">
          <div className="flex max-w-4xl gap-4">
            <ShieldCheck className="mt-1 size-6 shrink-0 text-primary" />
            <div>
              <h2 className="text-2xl font-semibold">
                Sigurnost bez predaje kontrole
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Seed phrase se nikada ne dijeli. Bitcoin savjetovanje ne traži
                pristup novčaniku, burzi, uređajima ili privatnim ključevima.
                Možemo razgovarati o strukturi, rizicima i obiteljskom pristupu
                bez toga da itko osim vas dobije kontrolu.
              </p>
              <a
                href="/sigurnost/"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
                data-link="bitcoin-advice-security"
              >
                Sigurnosna pravila
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mt-12 sm:mt-14">
          <h2 className="text-2xl font-semibold">Tri moguća oblika rada</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {paths.map((path) => (
              <article
                key={path.title}
                className="program-card h-full hover:border-primary/50"
              >
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                <a
                  href={path.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
                  data-cta={path.dataCta}
                >
                  {path.label}
                  <ArrowUpRight className="size-4" />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:mt-14 sm:p-8">
          <h2 className="text-2xl font-semibold">Što ne radimo</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Bitcoin savjetovanje ovdje nije upravljanje imovinom, kratka tržišna
            uputa, porezni savjet ni preuzimanje odgovornosti za vašu odluku.
            Cilj je jasniji okvir u kojem odluka ostaje vaša.
          </p>
          <CheckList items={notDoingItems} />
        </section>

        <section className="mt-12 rounded-2xl border border-foreground/10 bg-foreground p-6 text-background shadow-sm sm:mt-14 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <h2 className="max-w-3xl text-3xl leading-tight font-semibold">
              Imate Bitcoin pitanje koje utječe na stvarnu odluku?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-background/72">
              Uvodni razgovor traje 15 minuta, bez naknade i bez obveze. Vidimo
              što prvo treba razjasniti i ima li smisla ići dublje.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="cta-primary mt-6 w-full rounded-full px-5 text-center sm:w-auto sm:px-6 lg:mt-0"
          >
            <a
              href={CONVERSATION_PATH}
              className="justify-center"
              data-cta="bitcoin-advice-final-intro-call"
            >
              <CalendarDays className="size-4" />
              Dogovorite razgovor
            </a>
          </Button>
        </section>
      </article>
    </>
  )
}
