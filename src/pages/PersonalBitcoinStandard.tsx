import { CalendarDays, Check, X } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { personalBitcoinStandardRoute } from "@/content/routes"
import { CONVERSATION_PATH } from "@/content/site"

const audienceItems = [
  "Imate Bitcoin, ali nemate jasna pravila kada kupovati, držati, trošiti ili rebalansirati.",
  "Želite Bitcoin promatrati kao novac, a ne samo kao imovinu sa strane.",
  "Imate dug ili veće buduće obveze koje utječu na Bitcoin odluke.",
  "Partner ili obitelj nisu na istoj razini razumijevanja.",
  "Brine vas sigurnost, pristup, nasljeđivanje ili ovisnost o jednoj osobi.",
  "Ne želite prepustiti odluku nekome drugome, nego želite vlastiti okvir.",
]

const programSteps = [
  {
    title: "Proračun, priljevi, odljevi i stvarni višak",
    copy: "Prvo vidimo što novac već radi. Stvarni višak nije stanje na računu, nego novac koji ostaje nakon obveza, budućih troškova, duga, davanja i sigurnosne pričuve.",
  },
  {
    title: "Dug i sloboda odlučivanja",
    copy: "Dug je budući novac koji ste već potrošili. Dok dug postoji, dio budućnosti već je obećan. U programu se zato jasno vidi kako dug mijenja Bitcoin odluke.",
  },
  {
    title: "Davanje kao stalna praksa",
    copy: "Davanje nije moralni ukras. Ono oblikuje odnos prema novcu, ljudima, riziku i sposobnosti stvaranja vrijednosti.",
  },
  {
    title: "Bitcoin kao novac",
    copy: "Bitcoin ne promatramo samo kao ulaganje. Gledamo u kojem obliku držite novčani saldo nakon što ste ga zaradili i kako Bitcoin ulazi u stvarne odluke.",
  },
  {
    title: "Neto imovina i pravilo trećina",
    copy: "Novac, potrošna dobra i proizvodna imovina imaju različite uloge. Cilj nije ignorirati ostatak bilance, nego vidjeti neto imovinu kao jednu cjelinu.",
  },
  {
    title: "Vrijeme, rast i volatilnost",
    copy: "Ne pokušavamo pogoditi kratkoročnu cijenu. Cilj je pretvoriti rast, cikluse i volatilnost u pravila za odluke dok vrijeme prolazi.",
  },
  {
    title: "Sigurnost, obitelj i nasljeđivanje",
    copy: "Sigurnost nije uređaj, nego sustav. Dobar sustav otežava krađu, ali ne smije toliko otežati pristup da vi, obitelj ili ovlaštene osobe izgubite mogućnost oporavka.",
  },
]

const outcomeItems = [
  "pravila za državni novac i Bitcoin",
  "pravila za proračun i stvarni višak",
  "plan odnosa prema dugu",
  "pravila davanja",
  "okvir za Bitcoin kao primarni novac",
  "pravila za neto imovinu i veće kupnje",
  "okvir za rast, padove i volatilnost",
  "sigurnosna i obiteljska pravila",
  "popis onoga što se nikada ne dijeli",
]

const notItems = [
  "nije investicijski savjet",
  "nije porezni ili pravni savjet",
  "nije prognoza cijene",
  "nije trading program",
  "nije upravljanje sredstvima",
  "nije preuzimanje skrbništva",
  "nije traženje seed phrase, privatnih ključeva ili pristupa novčaniku",
]

const programFaqs = [
  {
    question: "Moram li već imati Bitcoin?",
    answer:
      "Ne morate, ali razgovor mora biti povezan sa stvarnom odlukom. Program je najkorisniji kada Bitcoin već ima ili bi mogao imati važnu ulogu u vašem novčanom životu.",
  },
  {
    question: "Može li partner ili član obitelji sudjelovati?",
    answer:
      "Da. To je često korisno, posebno ako se pravila tiču zajedničkog proračuna, sigurnosti, obiteljskog pristupa ili nasljeđivanja.",
  },
  {
    question: "Je li ovo financijski plan?",
    answer:
      "Ne. Ovo je pisani okvir pravila i odluka. Ne dajem porezni, pravni ili licencirani investicijski savjet i ne donosim odluke umjesto vas.",
  },
  {
    question: "Hoćete li mi reći koliko Bitcoina kupiti?",
    answer:
      "Ne. Pomažem vam razumjeti proračun, dug, neto imovinu, sigurnost i posljedice odluka. Odluka ostaje vaša.",
  },
  {
    question: "Radimo li tehničko postavljanje novčanika?",
    answer:
      "U programu možemo razgovarati o sigurnosnoj strukturi i pravilima, ali ne tražim seed phrase, privatne ključeve, lozinke ni pristup uređajima ili walletu.",
  },
  {
    question: "Što ako nakon uvodnog razgovora program nema smisla?",
    answer:
      "Tada to otvoreno kažem. Uvodni razgovor služi kao filter i ne mora završiti plaćenim nastavkom.",
  },
  {
    question: "Mogu li prvo uzeti samo Bitcoin konzultaciju?",
    answer:
      "Da. Ako imate jedno ozbiljno pitanje, Bitcoin konzultacija može biti bolji prvi plaćeni korak od punog programa.",
  },
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
    <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground md:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon className={`${iconClass} mt-1 size-4 shrink-0`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function PersonalBitcoinStandard() {
  return (
    <>
      <Seo
        title={personalBitcoinStandardRoute.title}
        description={personalBitcoinStandardRoute.description}
        canonical={personalBitcoinStandardRoute.canonical}
        ogType={personalBitcoinStandardRoute.ogType}
        schema={personalBitcoinStandardRoute.schema as object}
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
              Osobni Bitcoin standard
            </li>
          </ol>
        </nav>

        <header className="consultation-hero mt-8">
          <div>
            <h1 className="font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
              Osobni Bitcoin standard
            </h1>
            <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
              4–6 tjedana rada na pisanom sustavu odluka za život s Bitcoinom.
            </p>
            <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">
              Osobni Bitcoin standard nije samo posjedovanje Bitcoina. To je
              pisani okvir pravila za proračun, dug, davanje, Bitcoin kao novac,
              neto imovinu, volatilnost, sigurnost i obiteljski pristup.
            </p>
          </div>
          <aside
            className="consultation-price-card"
            aria-label="Cijena i ulaz u program"
          >
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Program
            </p>
            <p className="mt-3 text-3xl font-semibold text-foreground">
              1.500 €
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              4–6 tjedana
            </p>
            <Button
              asChild
              className="cta-primary mt-6 h-12 w-full rounded-full px-5 text-base"
            >
              <a
                href={CONVERSATION_PATH}
                className="justify-center text-center"
                data-cta="personal-standard-hero-call"
              >
                <CalendarDays className="size-4" />
                Dogovorite razgovor
              </a>
            </Button>
          </aside>
        </header>

        <section className="case-panel mt-12">
          <h2 className="text-2xl font-semibold">Za koga je program</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Za osobu, par, obitelj ili vlasnika posla koji ne želi samo odgovor
            na jedno Bitcoin pitanje, nego želi jasna pravila za novac, dug,
            Bitcoin, neto imovinu, sigurnost i obiteljski pristup.
          </p>
          <Checklist items={audienceItems} />
        </section>

        <section className="mt-12 rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Što radimo kroz 4–6 tjedana
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {programSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-xl border border-border/80 bg-background/70 p-5 shadow-sm"
              >
                <span className="grid size-8 place-items-center rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  {step.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="consultation-outcome-card">
          <h2 className="text-2xl font-semibold">
            Na kraju programa imate pisani osobni Bitcoin standard.
          </h2>
          <Checklist items={outcomeItems} />
        </section>

        <section className="mt-8 rounded-2xl border border-primary/25 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">Cijena i ulaz</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Program traje 4–6 tjedana i cijena je 1.500 €. Ne kreće se izravno
            preko checkouta. Prvi korak je 15-minutni uvodni razgovor u kojem
            vidimo ima li program smisla za vašu situaciju.
          </p>
          <Button asChild className="cta-primary mt-6 rounded-full">
            <a
              href={CONVERSATION_PATH}
              className="justify-center text-center"
              data-cta="personal-standard-pricing-call"
            >
              <CalendarDays className="size-4" />
              Dogovorite uvodni razgovor
            </a>
          </Button>
        </section>

        <section className="consultation-safety-card">
          <h2 className="text-2xl font-semibold">Ovo nije</h2>
          <Checklist items={notItems} kind="negative" />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Česta pitanja o programu</h2>
          <div className="mt-6 divide-y divide-border/70 border-y border-border/70">
            {programFaqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>
    </>
  )
}
