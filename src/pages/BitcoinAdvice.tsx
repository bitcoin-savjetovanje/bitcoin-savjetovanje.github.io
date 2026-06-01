import { ArrowUpRight, CalendarDays, Check, ShieldCheck } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { bitcoinAdviceRoute } from "@/content/routes"
import {
  BITCOIN_CONSULTATION_PATH,
  CONVERSATION_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
  PRACTICAL_BITCOIN_STANDARD_URL,
} from "@/content/site"

const situations = [
  "imate Bitcoin, ali nemate jasan sustav odluka",
  "razmišljate treba li Bitcoin imati veću ulogu u vašoj imovini",
  "želite razgovarati s partnerom ili obitelji bez pritiska",
  "vodite posao i trebate odvojiti privatni Bitcoin, poslovnu riznicu i kratkoročne obveze",
  "brine vas sigurnost ili pristup u izvanrednoj situaciji",
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
    title: "Uvodni razgovor",
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
    copy: "Program od 4–6 tjedana za pisani okvir: proračun, dug, davanje, Bitcoin kao novac, neto imovina, volatilnost, sigurnost i obitelj.",
    href: PERSONAL_BITCOIN_STANDARD_PATH,
    label: "Pogledajte program",
    dataCta: "bitcoin-advice-personal-standard",
  },
]

const decisionTypes = [
  {
    title: "Osobne odluke",
    copy: "proračun, dug, davanje, Bitcoin saldo, neto imovina i veće kupnje",
  },
  {
    title: "Obiteljske odluke",
    copy: "partner, djeca, sigurnost, oporavak pristupa i pravila koja drugi mogu razumjeti",
  },
  {
    title: "Poslovne odluke",
    copy: "novčani tok, porezi, plaće, dobavljači, poslovni dug, višak riznice, oprema, zalihe, ovlaštene osobe i sigurnosni postupak",
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
      <article className="bitcoin-advice-page">
        <header className="bitcoin-advice-hero hero-section editorial-section">
          <div className="hero-shell">
            <div className="hero-copy bitcoin-advice-hero__copy">
              <p className="hero-eyebrow">Bitcoin savjetovanje Hrvatska</p>
              <h1 className="hero-title">
                Bitcoin savjetovanje jedan-na-jedan za put od držanja Bitcoina
                do sustava odluka.
              </h1>
              <p className="hero-subtitle">
                Bitcoin savjetovanje je jedan-na-jedan razgovor za pojedince,
                obitelji i poduzetnike koji ne žele samo još jedno mišljenje o
                cijeni, nego žele razumjeti kako Bitcoin ulazi u stvarne odluke:
                proračun, dug, poslovnu riznicu, neto imovinu, sigurnost,
                obitelj i odgovornost prema ljudima koji ovise o njima.
              </p>
              <div className="hero-actions bitcoin-advice-hero__actions">
                <Button
                  asChild
                  size="lg"
                  className="cta-primary home-primary-button"
                >
                  <a
                    href={CONVERSATION_PATH}
                    className="justify-center text-center"
                    data-cta="bitcoin-advice-hero-intro-call"
                  >
                    <CalendarDays className="size-4" />
                    <span className="sm:hidden">
                      Dogovorite uvodni razgovor
                    </span>
                    <span className="hidden sm:inline">
                      Dogovorite 15-minutni uvodni razgovor
                    </span>
                  </a>
                </Button>
                <a
                  href={PRACTICAL_BITCOIN_STANDARD_URL}
                  className="bitcoin-advice-hero__guide-link"
                  data-link="bitcoin-advice-guides-index"
                >
                  Čitajte vodiče
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
            <picture className="hero-image-frame bitcoin-advice-hero__media">
              <source
                srcSet="/images/bitcoin-savjetovanje-hero-20260601.webp"
                type="image/webp"
              />
              <img
                src="/images/bitcoin-savjetovanje-hero-20260601.jpg"
                alt="Mediteranska scena s Bitcoin simbolom i oznakama za proračun, neto imovinu, obitelj, posao i sigurnost."
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
        </header>

        <div className="section-shell page-flow bitcoin-advice-content">
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

          <section className="mt-10 rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:mt-12 sm:p-8">
            <h2 className="text-2xl font-semibold">Tri vrste odluka</h2>
            <div className="business-decision-type-grid">
              {decisionTypes.map((type) => (
                <article key={type.title}>
                  <h3>{type.title}</h3>
                  <p>{type.copy}</p>
                </article>
              ))}
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
                  Možemo razgovarati o strukturi, rizicima i obiteljskom
                  pristupu bez toga da itko osim vas dobije kontrolu.
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
            <h2 className="text-2xl font-semibold">
              Zašto savjetovanje počinje uvodnim razgovorom
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
              Uvodni razgovor je filter. U 15 minuta vidimo je li dovoljan
              kratak odgovor, treba li jedno ozbiljno pitanje proći kroz Bitcoin
              konzultaciju ili je potrebno graditi osobni Bitcoin standard.
            </p>
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
              Bitcoin savjetovanje ovdje nije upravljanje imovinom, kratka
              tržišna uputa, porezni savjet ni preuzimanje odgovornosti za vašu
              odluku. Cilj je jasniji okvir u kojem odluka ostaje vaša.
            </p>
            <CheckList items={notDoingItems} />
          </section>

          <section className="mt-12 rounded-2xl border border-primary/25 bg-card p-6 shadow-sm sm:mt-14 sm:p-8">
            <h2 className="text-2xl font-semibold">
              Vodiči objašnjavaju okvir, razgovor ga primjenjuje
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
              Ako želite prvo čitati, krenite kroz vodiče. Ako želite provjeriti
              gdje ste u vlastitoj situaciji, krenite od uvodnog razgovora.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={PRACTICAL_BITCOIN_STANDARD_URL}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted hover:text-foreground"
                data-link="bitcoin-advice-guides"
              >
                Vodiči
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href="/sigurnost/"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted hover:text-foreground"
                data-link="bitcoin-advice-security-bottom"
              >
                Sigurnost
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-foreground/10 bg-foreground p-6 text-background shadow-sm sm:mt-14 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div>
              <h2 className="max-w-3xl text-3xl leading-tight font-semibold">
                Imate Bitcoin pitanje koje utječe na stvarnu odluku?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-background/72">
                Uvodni razgovor traje 15 minuta, bez naknade i bez obveze.
                Vidimo što prvo treba razjasniti i ima li smisla ići dublje.
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
        </div>
      </article>
    </>
  )
}
