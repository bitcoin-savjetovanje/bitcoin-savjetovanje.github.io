import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"

const darivanjeCards = [
  {
    title: "Bez očekivanja povrata",
    copy: "Darivanje nije kredit ni skriveni dogovor.",
  },
  {
    title: "Veći kapacitet za priljeve",
    copy: "Velikodušna osoba bolje služi ljudima. A priljevi dolaze od ljudi.",
  },
  {
    title: "Veći kapacitet za rizik",
    copy: "Tko vježba davanje bez povrata, lakše podnosi neizvjesnost stvaranja vrijednosti.",
  },
]

export function GivingSection() {
  return (
    <section className="section-shell">
      <div className="case-panel">
        <SectionHeader
          title="Darivanje povećava vaš kapacitet za stvaranje vrijednosti."
          copy="Prvo red. Zatim izlazak iz duga. Tek tada darivanje."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div className="space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Darivanje nije zato da kupite povrat. Darivanje je praksa kojom se
              učite odvojiti od novca bez straha.
            </p>
            <p>
              Kad darujete, ulazite među ljude drukčije. Manje očajno. Više
              otvoreno. Lakše slušate. Lakše pregovarate. Lakše stvarate
              vrijednost.
            </p>
            <p className="text-xl leading-8 font-semibold text-foreground">
              Novac dolazi od ljudi. Darivanje vas vraća ljudima.
            </p>
          </div>
          <div className="grid gap-3">
            {darivanjeCards.map((card) => (
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
