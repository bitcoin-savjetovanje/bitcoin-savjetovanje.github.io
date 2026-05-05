import { X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"

const problemSignals = [
  {
    title: "Dug kao stanje",
    copy: "Dug nije samo rata, kamata i rok. Dug je stanje koje s vremenom oblikuje vaše odluke.",
  },
  {
    title: "Budući novac",
    copy: "Zaduživanjem kupujete sadašnje dobro budućim novcem, budućim okolnostima i budućom verzijom sebe.",
  },
  {
    title: "Bitcoin pod pritiskom",
    copy: "Kad dug postane težak, Bitcoin odluke mogu postati očajne: prodaja u krivom trenutku ili pokušaj da se istrguje izlaz.",
  },
]

export function ProblemSection() {
  return (
    <section className="section-shell">
      <div className="case-panel">
        <SectionHeader
          title="Imate Bitcoin, ali odluke možda još vodi nešto drugo."
          copy="Problem nije manjak informacija. Problem je stanje iz kojeg odlučujete: dug, sentiment i strah često dođu prije osobnog proračuna nulte osnove."
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
          Bez pravila, dug i tržišni sentiment vode vaš Bitcoin. Ne trebate još
          šuma, nego osobni Bitcoin standard.
        </p>
      </div>
    </section>
  )
}
