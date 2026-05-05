import { Check, X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { notDoingItems } from "@/content/method"

export function NotDoingSection() {
  return (
    <section className="section-shell">
      <div className="case-panel">
        <SectionHeader
          title="Ovo nije prognoza cijene ni upravljanje vašim Bitcoinom."
          copy="Granice su dio sigurnosti. Radimo na pravilima po kojima vi donosite bolje odluke."
        />
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {notDoingItems.map((item) => (
            <div key={item} className="not-for-row bg-background/70">
              <X className="negative-icon size-3.5" />
              <p>{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-primary/25 bg-primary/10 p-5">
          <div className="flex gap-3">
            <Check className="positive-icon mt-1 size-5 shrink-0" />
            <p className="text-lg leading-8 font-semibold text-foreground">
              Radimo na pravilima po kojima vi donosite bolje odluke.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
