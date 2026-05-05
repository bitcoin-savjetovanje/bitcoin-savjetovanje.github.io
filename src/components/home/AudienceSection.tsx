import { Check, X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { audienceItems, notForItems } from "@/content/method"

export function AudienceSection() {
  return (
    <section id="za-koga" className="section-shell section-muted">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1fr] lg:items-start">
        <SectionHeader
          title="Za koga je ovo"
          copy="Za ljude koji imaju Bitcoin ili imovinu i žele znati što dalje."
        />
        <div className="grid gap-8">
          <div className="grid gap-3">
            {audienceItems.map((item) => (
              <div key={item} className="check-row">
                <Check className="positive-icon mt-1 size-4" />
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold">Nije za nas ako...</h3>
            <div className="mt-4 grid gap-2">
              {notForItems.map((item) => (
                <div key={item} className="not-for-row">
                  <X className="negative-icon size-3.5" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
