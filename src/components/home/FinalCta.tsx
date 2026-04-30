import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CALENDLY_URL, EMAIL, PRIMARY_CTA } from "@/content/site"

export function FinalCta() {
  return (
    <section id="kontakt" className="section-shell">
      <div className="final-cta">
        <div>
          <h2>Imate Bitcoin ili kapital, ali nemate jasna pravila?</h2>
          <p>
            Uvodni razgovor traje 15 minuta, bez naknade i bez obveze. Cilj je
            vidjeti gdje ste, što pokušavate odlučiti i ima li smisla nastaviti.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="cta-primary h-12 rounded-full px-6 text-base"
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
            </a>
          </Button>
          <a className="final-cta__email" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  )
}
