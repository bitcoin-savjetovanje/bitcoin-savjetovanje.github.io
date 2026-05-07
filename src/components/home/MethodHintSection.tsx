import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { methodPathSteps } from "@/content/home"
import { BOOKING_URL } from "@/content/site"

export function MethodHintSection() {
  return (
    <section id="metoda" className="section-shell section-muted">
      <div className="case-panel border-primary/20 bg-card">
        <SectionHeader
          title="Metoda je šira od kupnje Bitcoina."
          copy="Praktični Bitcoin standard počinje redom u novcu. Svaki euro ima namjenu, dug ima plan izlaska, a davanje ima stalno mjesto. Tek tada Bitcoin postaje dio šireg sustava: novac, kupovna moć, neto imovina, sigurnost i obitelj."
        />
        <div
          className="mt-8 flex flex-wrap items-center gap-2"
          aria-label="Redoslijed metode: proračun, dug, davanje, Bitcoin, neto imovina, sigurnost i obitelj"
        >
          {methodPathSteps.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-border/80 bg-background/80 px-3 py-2 text-sm font-semibold text-foreground shadow-sm">
                {step}
              </span>
              {index < methodPathSteps.length - 1 ? (
                <span className="text-sm text-muted-foreground" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          data-cta="method-intro-call"
        >
          Razgovorom primijenite redoslijed na vlastitu situaciju
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </section>
  )
}
