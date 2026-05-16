import { CalendarDays, Check } from "lucide-react"
import { useState } from "react"

import { CalBookingLink } from "@/components/CalBookingLink"
import { CalInlineEmbed } from "@/components/CalInlineEmbed"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { conversationRoute } from "@/content/routes"
import {
  BITCOIN_CONSULTATION_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"

const topExamples = [
  "Ne znam koji je novac stvarno slobodan za Bitcoin.",
  "Ne znam kako partneru ili obitelji objasniti odluku.",
  "Vodim posao i ne znam što je stvarni višak riznice.",
]

const questionGroups = [
  {
    title: "Osobna pitanja",
    items: [
      "Želim učvrstiti Bitcoin tezu prije veće osobne, obiteljske ili poslovne odluke.",
      "Imam dug i nisam siguran treba li prvo čistiti bilancu.",
      "Bitcoin mi je jasan kao ideja, ali ne kao dio neto imovine.",
      "Ne znam što bih radio nakon velikog pada ili rasta cijene.",
    ],
  },
  {
    title: "Obiteljska pitanja",
    items: [
      "Partner ili obitelj ne razumiju moju Bitcoin odluku.",
      "Ako se meni nešto dogodi, nije jasno tko zna prvi sigurnosni korak.",
      "Ne znam kako objasniti što se nikada ne smije dirati.",
    ],
  },
  {
    title: "Poslovna pitanja",
    items: [
      "Ne znam kako odvojiti privatni Bitcoin od poslovnog Bitcoina.",
      "Imam višak u poslovnoj riznici i ne znam koja pravila trebaju postojati.",
      "Posao ima dug, zalihe, opremu ili nestalan novčani tok.",
    ],
  },
] as const

function selectedQuestionFromUrl() {
  if (typeof window === "undefined") {
    return ""
  }

  const params = new URLSearchParams(window.location.search)

  return params.get("pitanje")?.trim() ?? ""
}

function SelectedQuestionCard({ question }: { question: string }) {
  const [copyLabel, setCopyLabel] = useState("Kopiraj pitanje")

  async function copyQuestion() {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }

    try {
      await navigator.clipboard.writeText(question)
      setCopyLabel("Kopirano")
      window.setTimeout(() => setCopyLabel("Kopiraj pitanje"), 2200)
    } catch {
      setCopyLabel("Kopiranje nije dostupno")
      window.setTimeout(() => setCopyLabel("Kopiraj pitanje"), 2200)
    }
  }

  return (
    <section className="selected-question-card" aria-label="Odabrano pitanje">
      <div>
        <h2 className="text-xl font-semibold">Odabrano pitanje</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Odabrali ste pitanje:{" "}
          <span className="text-foreground">{question}</span>
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          To pitanje možete kopirati u bilješku pri odabiru termina.
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full rounded-full sm:w-auto"
        onClick={copyQuestion}
      >
        {copyLabel}
      </Button>
    </section>
  )
}

export function Conversation() {
  const [selectedQuestion] = useState(selectedQuestionFromUrl)

  return (
    <>
      <Seo
        title={conversationRoute.title}
        description={conversationRoute.description}
        canonical={conversationRoute.canonical}
        ogType={conversationRoute.ogType}
        schema={conversationRoute.schema as object}
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
              Razgovor
            </li>
          </ol>
        </nav>

        <header className="page-hero page-hero--compact mt-8">
          <h1 className="font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Dogovorite 15-minutni uvodni razgovor
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
            Vidimo gdje ste na putu od držanja Bitcoina do sustava odluka —
            osobno, obiteljski ili poslovno.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            Ne trebate pripremiti cijeli slučaj. Dovoljna je jedna odluka koju
            pokušavate donijeti.
          </p>
        </header>

        <section className="conversation-calendar-card">
          <h2 className="text-2xl font-semibold">
            Najbolji razgovori počinju jednom konkretnom odlukom.
          </h2>
          <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground md:grid-cols-3">
            {topExamples.map((question) => (
              <li
                key={question}
                className="flex gap-3 rounded-2xl border border-border/70 bg-background/70 p-4"
              >
                <Check className="positive-icon mt-1 size-4 shrink-0" />
                <span>{question}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-muted-foreground">
            <p>
              U bilješku ne trebate pisati iznose ni detalje. Dovoljna je jedna
              rečenica:{" "}
              <span className="font-semibold text-foreground">
                “Pokušavam odlučiti ____ i nije mi jasno ____.”
              </span>
            </p>
            <p className="mt-3 font-semibold text-foreground">
              Ne šaljite seed phrase, privatne ključeve, lozinke, screenshotove
              novčanika, iznose, dokumente ni pristup računima.
            </p>
          </div>
          <ul className="conversation-cta-list mt-6">
            <li>
              <Button
                asChild
                size="lg"
                className="cta-primary h-11 w-full rounded-full px-4 text-sm sm:h-12 sm:w-auto sm:px-5 sm:text-base"
              >
                <CalBookingLink
                  className="justify-start text-left sm:justify-center sm:text-center"
                  data-cta="conversation-page-calendar"
                >
                  <CalendarDays className="size-4" />
                  Otvorite kalendar i odaberite termin
                </CalBookingLink>
              </Button>
            </li>
          </ul>
        </section>

        {selectedQuestion ? (
          <SelectedQuestionCard question={selectedQuestion} />
        ) : null}

        <CalInlineEmbed />

        <section className="case-panel conversation-examples-card">
          <h2 className="text-2xl font-semibold">
            Još primjera pitanja, ako trebate pomoć
          </h2>
          <div className="mt-6 divide-y divide-border/70 border-y border-border/70">
            {questionGroups.map((group) => (
              <details key={group.title} className="faq-item">
                <summary>{group.title}</summary>
                <ul className="mt-4 grid gap-3 text-base leading-7 text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="positive-icon mt-1 size-4 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>

        <section className="conversation-outcomes-card mt-10 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Što se može dogoditi nakon razgovora?
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Nakon razgovora moguća su tri ishoda: kratak odgovor je dovoljan,
            sljedeći korak je{" "}
            <a
              href={BITCOIN_CONSULTATION_PATH}
              className="font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
              data-link="conversation-bitcoin-consultation"
            >
              Bitcoin konzultacija
            </a>
            , ili vrijedi razgovarati o{" "}
            <a
              href={PERSONAL_BITCOIN_STANDARD_PATH}
              className="font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
              data-link="conversation-personal-standard"
            >
              osobnom Bitcoin standardu
            </a>
            . Ne mora svaki uvodni razgovor završiti plaćenim nastavkom.
          </p>
        </section>

        <section className="conversation-final-card">
          <h2 className="text-2xl font-semibold">
            Spremni za uvodni razgovor?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            Odaberite termin i dođite s jednim stvarnim pitanjem. Ne morate
            imati gotov plan — cilj je vidjeti što treba razjasniti prvo.
          </p>
          <ul className="conversation-cta-list mt-6">
            <li>
              <Button
                asChild
                size="lg"
                className="cta-primary h-11 w-full rounded-full px-4 text-sm sm:h-12 sm:w-auto sm:px-5 sm:text-base"
              >
                <CalBookingLink
                  className="justify-start text-left sm:justify-center sm:text-center"
                  data-cta="conversation-page-final-calendar"
                >
                  <CalendarDays className="size-4" />
                  Otvorite kalendar i odaberite termin
                </CalBookingLink>
              </Button>
            </li>
            <li>
              <a
                href="/sigurnost/"
                className="inline-flex h-11 items-center text-sm font-semibold text-foreground hover:text-primary"
                data-link="conversation-page-final-security"
              >
                Sigurnosna pravila
              </a>
            </li>
          </ul>
        </section>
      </article>
    </>
  )
}
