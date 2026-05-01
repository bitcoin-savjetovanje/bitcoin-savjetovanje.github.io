import { X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"

const debtItems = [
  "Dug povećava buduće odljeve.",
  "Dug smanjuje slobodu.",
  "Dug otežava mirno držanje Bitcoina.",
  "Dug je fiat ponašanje koje Bitcoin standard mora ukloniti.",
]

export function DebtSection() {
  return (
    <section className="section-shell section-muted">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="Dug je budući novac koji ste već potrošili."
          copy="Dug nije samo kamata. Dug je obveza prema budućnosti. Svaka rata uzima dio vašeg budućeg vremena prije nego što ga uopće živite."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div className="space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Dok dug postoji, on ulazi u svaku Bitcoin odluku. Može vas
              natjerati da prodate kada ne želite. Može vas spriječiti da
              čekate. Može pretvoriti promjenu kupovne moći u pritisak.
            </p>
            <p className="text-xl leading-8 font-semibold text-foreground">
              Bitcoin standard ne počinje većom kupnjom. Počinje izlaskom iz
              duga.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {debtItems.map((item) => (
              <div key={item} className="not-for-row bg-background/70">
                <X className="negative-icon size-3.5" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
