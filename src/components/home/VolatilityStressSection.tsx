import { CalendarDays, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { volatilityStressCards } from "@/content/method"
import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

export function VolatilityStressSection() {
  return (
    <section className="section-shell section-muted">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="Volatilnost otkriva imate li standard."
          copy="Bitcoinova kupovna moć može rasti i padati brzo. To nije samo tržišni podatak. To je test vašeg proračuna, duga, stvarnog viška, darivanja, sigurnosti i obiteljskog dogovora."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div className="space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Kada Bitcoin pada, osoba bez standarda paničari ili prodaje pod
              pritiskom. Osoba sa standardom zna koji novac ima namjenu,
              smanjuje otpad, štiti obveze i povećava sposobnost stvaranja
              prihoda.
            </p>
            <p>
              Kada Bitcoin raste, osoba bez standarda improvizira. Osoba sa
              standardom može unaprijed platiti buduće troškove, ostvariti
              ciljeve, povećati darivanje i održati ravnotežu neto imovine.
            </p>
            <Button asChild className="cta-primary rounded-full">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="volatility-standard-check"
              >
                <CalendarDays className="size-4" />
                {PRIMARY_CTA}
              </a>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {volatilityStressCards.map((card) => (
              <article
                key={card.title}
                className="program-card bg-background/70"
              >
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <ul className="mt-5 grid gap-2 text-sm leading-6 text-muted-foreground">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="positive-icon mt-1 size-3.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
