import { CalendarDays, Check, TrendingDown, TrendingUp } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { volatilityStressCards } from "@/content/method"
import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

const lifeScenarios = [
  {
    title: "Cijena se promijeni",
    copy: "Bitcoin padne ili naraste, a pravila određuju što radite prije panike ili euforije.",
  },
  {
    title: "Novac zatreba",
    copy: "Dolazi veliki trošak, prihod kasni ili dug traži novac, a proračun pokazuje što je stvarni višak.",
  },
  {
    title: "Obitelj treba plan",
    copy: "Netko pita što napraviti ako se vama nešto dogodi, a odgovor već postoji u sigurnosnom protokolu.",
  },
]

function VolatilityIcon({ title }: { title: string }) {
  if (title.toLowerCase().includes("pada")) {
    return <TrendingDown className="negative-icon size-5 shrink-0" />
  }

  return <TrendingUp className="positive-icon size-5 shrink-0" />
}

export function VolatilityStressSection() {
  return (
    <section className="section-shell section-muted">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="Volatilnost otkriva imate li standard."
          copy="Nakon što prijeđete iz “imam Bitcoin” u osobni Bitcoin standard, volatilnost više nije poziv na improvizaciju nego provjera pravila za novac, dug, imovinu i obitelj."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div className="space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Kad Bitcoin pada ili raste, bez standarda se reagira iz panike ili
              euforije. Sa standardom unaprijed znate koji novac ima namjenu,
              koje obveze ne dirate, što plaćate, koliko dajete i kako čuvate
              ravnotežu neto imovine.
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
                <div className="flex items-center gap-3">
                  <VolatilityIcon title={card.title} />
                  <h3>{card.title}</h3>
                </div>
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
        <div className="mt-10 rounded-2xl border border-border/80 bg-background/70 p-5 shadow-sm sm:p-6">
          <h3 className="text-2xl font-semibold tracking-[-0.015em]">
            Volatilnost se ne događa u vakuumu.
          </h3>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {lifeScenarios.map((scenario) => (
              <article key={scenario.title} className="check-row bg-card/80">
                <Check className="positive-icon mt-1 size-4 shrink-0" />
                <div>
                  <h4 className="text-sm leading-6 font-semibold text-foreground">
                    {scenario.title}
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {scenario.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-base leading-8 font-semibold text-foreground">
            Osobni Bitcoin standard ne uklanja stresne događaje. Daje vam
            pravila prije nego što se pojave.
          </p>
        </div>
      </div>
    </section>
  )
}
