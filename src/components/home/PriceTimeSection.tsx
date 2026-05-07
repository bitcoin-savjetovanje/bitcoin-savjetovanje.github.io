import { ArrowUpRight, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { findGuide, guideHref } from "@/content/guides"
import { priceTimeCards } from "@/content/home"

const priceTimeGuide = findGuide("cijena-kao-mjera-vremena")

export function PriceTimeSection() {
  return (
    <section className="section-shell">
      <div className="case-panel border-primary/20 bg-card">
        <SectionHeader
          title="Cijena kao mjera vremena"
          copy="Ne pokušavamo pogoditi kratkoročnu cijenu Bitcoina. Gledamo odnos cijene, vremena i osobnog proračuna."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div>
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              Dugoročni trend može pomoći vidjeti je li kupovna moć ispred,
              blizu ili ispod očekivanog ritma. Ali odluku i dalje ne donosi
              model. Odluku donose vaša pravila: proračun, dug, stvarni višak,
              davanje, neto imovina i sigurnost.
            </p>
            <p className="mt-5 text-base leading-8 font-semibold text-foreground">
              Dugoročni trend je pomoćni signal, ne prognoza cijene.
            </p>
            {priceTimeGuide ? (
              <a
                href={guideHref(priceTimeGuide.slug)}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
                data-link="price-time-guide"
              >
                {`Pročitajte vodič “${priceTimeGuide.title}”`}
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {priceTimeCards.map((card) => (
              <article
                key={card.title}
                className="program-card bg-background/70"
              >
                <div className="flex items-start gap-3">
                  <Check className="positive-icon mt-1 size-4 shrink-0" />
                  <div>
                    <h3>{card.title}</h3>
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
