import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"

const priceTimeCards = [
  {
    title: "Iznad trenda",
    copy: "Dio budućih odljeva možda se može riješiti ranije.",
  },
  {
    title: "Blizu trenda",
    copy: "Držite pravila. Ne mijenjate sustav zbog tržišnog sentimenta.",
  },
  {
    title: "Ispod trenda",
    copy: "Smanjujete potrošnju, jačate priljeve i akumulirate iz stvarnog viška.",
  },
]

function PriceTimeVisual() {
  return (
    <div
      className="rounded-2xl border border-border/80 bg-background/70 p-5 text-foreground shadow-sm"
      aria-label="Jednostavan prikaz odnosa cijene i dugoročnog trenda"
      role="img"
    >
      <svg viewBox="0 0 420 180" className="h-auto w-full">
        <path
          d="M38 132 C120 116 184 88 252 67 C304 51 346 44 384 36"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-primary"
        />
        <circle
          cx="250"
          cy="68"
          r="5.5"
          className="fill-foreground stroke-background"
          strokeWidth="3"
        />
        <text x="236" y="52" fill="currentColor" fontSize="13" fontWeight="600">
          danas
        </text>
        <text x="318" y="42" fill="currentColor" fontSize="13">
          iznad
        </text>
        <text x="202" y="92" fill="currentColor" fontSize="13">
          blizu
        </text>
        <text x="74" y="140" fill="currentColor" fontSize="13">
          ispod
        </text>
      </svg>
    </div>
  )
}

export function PriceTimeSection() {
  return (
    <section className="section-shell">
      <div className="case-panel">
        <SectionHeader
          title="Cijena nije prognoza. Cijena je signal za proračun."
          copy="Ne pokušavamo pogoditi kratkoročno kretanje cijene. Ali možemo usporediti trenutnu cijenu s dugoročnim potencijskim trendom i vidjeti je li kupovna moć ispred, blizu ili iza očekivanog ritma."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <div className="space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Ovaj okvir ne daje ciljne cijene. Pomaže odlučiti što učiniti s
              proračunom.
            </p>
            <p>
              Taj dugoročni potencijski trend (Bitcoin power law) nije
              kratkoročna prognoza cijene. To je pomoćni način razmišljanja o
              vremenu, kupovnoj moći i proračunu.
            </p>
            <PriceTimeVisual />
          </div>
          <div className="grid gap-3">
            {priceTimeCards.map((card) => (
              <article key={card.title} className="program-card">
                <div className="flex items-start gap-3">
                  <Check className="positive-icon mt-1 size-4 shrink-0" />
                  <div>
                    <h3 className="text-base">{card.title}</h3>
                    <p>{card.copy}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
