import { ArrowUpRight, CalendarDays, FileCheck2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  CONVERSATION_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"

const programSteps = [
  "Mapiranje sadašnjeg stanja",
  "Određivanje prioriteta",
  "Donošenje pravila",
  "Stres-test scenarija",
  "Provedba prvih koraka",
  "Pregled nakon 30 dana",
] as const

export function SampleStandardSection() {
  return (
    <section className="editorial-section sample-standard-teaser">
      <div className="sample-standard-teaser__copy">
        <p className="section-eyebrow">PROGRAM · 1.500 € · 4–6 TJEDANA</p>
        <h2>Program nije PDF koji popunjavate</h2>
        <p>
          U programu ne dobivate generički predložak s vašim brojkama. Kroz 4–6
          tjedana donosimo, testiramo i provodimo odluke koje odgovaraju vašoj
          stvarnoj situaciji. Pisani osobni Bitcoin standard na kraju bilježi
          odluke do kojih smo došli i omogućuje njihovu kasniju reviziju.
        </p>
        <p>
          <strong>Dokument je zapis procesa, ne njegova zamjena.</strong>
        </p>
        <div className="sample-standard-teaser__actions">
          <Button asChild className="cta-primary home-primary-button">
            <a
              href={PERSONAL_BITCOIN_STANDARD_PATH}
              data-cta="home-personal-standard"
            >
              Pogledajte kako program radi
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
          <a
            href={CONVERSATION_PATH}
            className="service-link-button"
            data-cta="home-program-conversation"
          >
            <CalendarDays className="size-4" aria-hidden="true" />
            Rezervirajte razgovor
          </a>
        </div>
      </div>
      <aside className="sample-standard-teaser__panel">
        <FileCheck2 aria-hidden="true" />
        <span>Privatni proces</span>
        <strong>Od stvarnog stanja do provedivih pravila</strong>
        <ol className="mt-5 grid gap-2 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
          {programSteps.map((step, index) => (
            <li key={step} className="flex gap-2">
              <b className="text-foreground">{index + 1}.</b>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  )
}
