import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { personalStandardRules } from "@/content/home"

export function PersonalStandardSection() {
  return (
    <section className="section-shell section-muted">
      <SectionHeader
        title="Osobni Bitcoin standard je dokument s pravilima."
        copy="Ne zato da sve bude kruto, nego zato da ne odlučujete iz panike, euforije ili pritiska."
      />
      <div className="mt-8 max-w-4xl">
        <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          U njemu se uređuje
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {personalStandardRules.map((rule) => (
            <div key={rule} className="check-row bg-card">
              <Check className="positive-icon mt-1 size-4 shrink-0" />
              <p className="text-base leading-7 text-foreground">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
