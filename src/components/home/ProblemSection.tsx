import { X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"

const problemSignals = [
  {
    title: "Cijena i sentiment",
    copy: "Kupujete više kada raste pohlepa. Stajete kada raste strah.",
  },
  {
    title: "Dug i budući odljevi",
    copy: "Dug odlučuje prije vas, osobito kada kupovna moć padne.",
  },
  {
    title: "Nejasna neto imovina",
    copy: "Ne znate što je novac, što su potrošna dobra, a što je proizvodna imovina.",
  },
]

export function ProblemSection() {
  return (
    <section className="section-shell">
      <div className="case-panel">
        <SectionHeader
          title="Imate Bitcoin, ali odluke možda još vodi nešto drugo."
          copy="Problem nije manjak informacija. Problem je redoslijed: cijena, dug i strah često dođu prije osobnog proračuna."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {problemSignals.map((item) => (
            <article key={item.title} className="program-card bg-background/70">
              <div className="flex items-start gap-3">
                <X className="negative-icon mt-1 size-4 shrink-0" />
                <div>
                  <h3 className="text-lg">{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-xl leading-8 font-semibold text-foreground">
          Bez pravila, vaše odluke oko Bitcoina lako će povesti tržišni
          sentiment. Ne trebate još šuma, nego osobni Bitcoin standard.
        </p>
      </div>
    </section>
  )
}
