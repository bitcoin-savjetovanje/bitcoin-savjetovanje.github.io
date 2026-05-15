import { ArrowUpRight, CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import { businessDecisionItems } from "@/content/home"
import {
  CONVERSATION_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"

export function BusinessDecisionSection() {
  return (
    <section className="section-shell">
      <div className="business-decision-panel">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Poslovni sloj
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-[-0.02em] sm:text-4xl">
            Ako vodite posao, Bitcoin odluka ima još jedan sloj
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            Kod poduzetnika Bitcoin odluka ne smije pomiješati privatni život,
            obiteljsku sigurnost i poslovnu riznicu. Prije ozbiljnije Bitcoin
            odluke treba vidjeti što pripada porezima, plaćama, dobavljačima,
            zalihama, opremi, pričuvi, vlasničkoj isplati i višku riznice.
          </p>
        </div>

        <div className="business-decision-grid">
          {businessDecisionItems.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <ul className="business-decision-actions">
          <li>
            <Button asChild className="cta-primary rounded-full">
              <a
                href={CONVERSATION_PATH}
                className="justify-center text-center"
                data-cta="home-business-intro-call"
              >
                <CalendarDays className="size-4" />
                Dogovorite uvodni razgovor
              </a>
            </Button>
            <span className="sr-only"> ili </span>
          </li>
          <li>
            <a
              href={PERSONAL_BITCOIN_STANDARD_PATH}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
              data-link="home-business-personal-standard"
            >
              Pogledajte osobni Bitcoin standard
              <ArrowUpRight className="size-4" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
