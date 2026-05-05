import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BOOKING_URL, EMAIL, PRIMARY_CTA } from "@/content/site"

export function FinalCta() {
  return (
    <section id="razgovor" className="section-shell">
      <div className="final-cta">
        <div>
          <h2>
            Provjerite što bi vaš sustav napravio kada Bitcoin napravi bilo što.
          </h2>
          <p>
            Provjera traje 15 minuta, bez naknade i bez obveze. Vidjet ćemo gdje
            ste u odnosu na osobni Bitcoin standard i koji je sljedeći razuman
            korak.
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
              data-cta="final-standard-check"
            >
              <CalendarDays className="size-4" />
              <span>{PRIMARY_CTA}</span>
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
