import { ArrowUpRight, CalendarDays, Check, X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

const neverAsk = [
  "početne riječi",
  "privatne ključeve",
  "lozinke",
  "pristup računima",
  "pristup uređajima",
  "kontrolu nad vašim Bitcoinom",
]

const workRules = [
  "pravila za sigurnost",
  "obiteljski plan",
  "što se nikada ne dijeli",
  "što obitelj smije napraviti",
]

export function SecurityTrustSection() {
  return (
    <section id="sigurnost" className="section-shell">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="Vaš Bitcoin ostaje pod vašom kontrolom."
          copy="Ne tražim početne riječi, privatne ključeve, lozinke, pristup računima, pristup uređajima ni kontrolu nad vašim Bitcoinom. Radimo na pravilima, ne na predaji kontrole."
        />
        <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
          Ovo nije investicijsko, porezno ni pravno savjetovanje. Ne predviđam
          cijenu. Ne upravljam sredstvima. Ne donosim odluke umjesto vas.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-border/80 bg-background/70 p-5 shadow-sm">
            <h3 className="text-xl font-semibold">Nikada ne tražim:</h3>
            <div className="mt-5 grid gap-2">
              {neverAsk.map((item) => (
                <div key={item} className="not-for-row bg-card">
                  <X className="negative-icon size-3.5" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-primary/25 bg-background/70 p-5 shadow-sm">
            <h3 className="text-xl font-semibold">Radimo na:</h3>
            <div className="mt-5 grid gap-2">
              {workRules.map((item) => (
                <div key={item} className="not-for-row bg-card">
                  <Check className="positive-icon size-3.5" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="/sigurnost/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
            data-link="security-rules"
          >
            Pročitajte sigurnosna pravila
            <ArrowUpRight className="size-4" />
          </a>
          <Button asChild variant="outline" className="rounded-full sm:ml-auto">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="security-intro-call"
            >
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
