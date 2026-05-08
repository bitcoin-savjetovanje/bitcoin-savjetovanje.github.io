import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CONVERSATION_PATH, PRIMARY_CTA } from "@/content/site"

export function FinalCta() {
  return (
    <section className="section-shell">
      <div className="final-cta">
        <div>
          <h2>Imate pitanje koje vas koči?</h2>
          <p>
            Uvodni razgovor traje 15 minuta, bez naknade i bez obveze. Cilj je
            vidjeti gdje ste, što nije jasno i ima li smisla nastaviti.
          </p>
          <p className="mt-3 text-sm leading-6 text-background/72">
            Bez upravljanja sredstvima. Bez prognoza cijene. Bez traženja
            početnih riječi.
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="cta-primary h-12 w-full max-w-full min-w-0 rounded-full px-4 text-sm sm:w-auto sm:px-6 sm:text-base"
          >
            <a
              href={CONVERSATION_PATH}
              className="justify-center text-center"
              data-cta="final-intro-call"
            >
              <CalendarDays className="size-4" />
              <span>{PRIMARY_CTA}</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
