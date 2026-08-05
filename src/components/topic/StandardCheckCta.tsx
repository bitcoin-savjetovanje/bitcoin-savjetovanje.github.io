import { ArrowUpRight, CalendarDays, FileCheck2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BITCOIN_STANDARD_CHECK_PATH, CONVERSATION_PATH } from "@/content/site"

export function StandardCheckCta({ dataCta }: { dataCta: string }) {
  return (
    <section className="topic-section topic-standard-check-cta">
      <div className="topic-standard-check-cta__icon" aria-hidden="true">
        <FileCheck2 />
      </div>
      <div>
        <h2>Želite provjeriti svoj Bitcoin standard?</h2>
        <p>
          Odgovorite na 10 kratkih pitanja i odmah saznajte koje područje prvo
          treba urediti. Bez registracije i bez slanja odgovora.
        </p>
      </div>
      <div className="flex flex-col items-start gap-3">
        <Button asChild className="cta-primary home-primary-button">
          <a href={BITCOIN_STANDARD_CHECK_PATH} data-cta={dataCta}>
            Napravite besplatnu provjeru
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </Button>
        <a
          href={CONVERSATION_PATH}
          className="service-link-button w-full justify-center sm:w-auto"
          data-cta="topic-standard-check-conversation"
        >
          <CalendarDays className="size-4" aria-hidden="true" />
          Rezervirajte razgovor
        </a>
      </div>
    </section>
  )
}
