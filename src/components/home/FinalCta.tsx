import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BOOKING_URL, EMAIL, PRIMARY_CTA } from "@/content/site"

export function FinalCta() {
  return (
    <section id="kontakt" className="section-shell">
      <div className="final-cta">
        <div>
          <h2>Ako želite jasna pravila, krenimo s 15 minuta.</h2>
          <p>
            Rezervirajte uvodni razgovor. Vidjet ćemo gdje ste, što želite
            postići i mogu li vam pomoći.
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="cta-primary h-12 w-full max-w-full min-w-0 rounded-full px-4 text-sm sm:w-auto sm:px-6 sm:text-base"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="final-booking"
            >
              <CalendarDays className="size-4" />
              <span className="sm:hidden">Dogovorite uvodni razgovor</span>
              <span className="hidden sm:inline">{PRIMARY_CTA}</span>
            </a>
          </Button>
          <a
            className="final-cta__email"
            href={`mailto:${EMAIL}`}
            data-link="final-email"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  )
}
