import { ArrowUpRight, CalendarDays, Check, X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { homeNeverAskItems, homeSecurityReviewItems } from "@/content/home"
import { CONVERSATION_PATH } from "@/content/site"

export function SecurityTrustSection() {
  return (
    <section id="sigurnost-povjerenje" className="section-shell">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="Vaš Bitcoin ostaje vaš."
          copy="Ne kupujem, ne prodajem i ne čuvam Bitcoin za vas. Ne tražim seed phrase, privatne ključeve, lozinke ni pristup računima. Radimo na razumijevanju, pravilima i sigurnosnom okviru. Kontrola ostaje kod vas."
        />
        <p className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm leading-6 font-semibold text-foreground">
          Seed phrase se nikada ne dijeli. Ako ga netko traži, razgovor treba
          odmah prekinuti.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-border/80 bg-background/70 p-5 shadow-sm">
            <h3 className="text-xl font-semibold">Nikada ne tražim</h3>
            <div className="mt-5 grid gap-2">
              {homeNeverAskItems.map((item) => (
                <div key={item} className="not-for-row bg-card">
                  <X className="negative-icon size-3.5" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-primary/25 bg-background/70 p-5 shadow-sm">
            <h3 className="text-xl font-semibold">Možemo proći</h3>
            <div className="mt-5 grid gap-2">
              {homeSecurityReviewItems.map((item) => (
                <div key={item} className="not-for-row bg-card">
                  <Check className="positive-icon size-3.5" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <ul className="mt-8 flex list-none flex-col gap-3 sm:flex-row sm:items-center">
          <li>
            <a
              href="/sigurnost/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
              data-link="security-rules"
              data-cta="home-security-page"
            >
              Pročitajte sigurnosna pravila
              <ArrowUpRight className="size-4" />
              <span aria-hidden="true" className="sr-only">
                {" "}
              </span>
            </a>
          </li>
          <li className="sm:ml-auto">
            <Button asChild variant="outline" className="rounded-full">
              <a
                href={CONVERSATION_PATH}
                className="justify-center text-center"
                data-cta="security-intro-call"
              >
                <CalendarDays className="size-4" />
                Dogovorite razgovor
              </a>
            </Button>
          </li>
        </ul>
      </div>
    </section>
  )
}
