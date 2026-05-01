import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"

const givingCards = [
  {
    title: "Bez očekivanja povrata",
    copy: "Praksa sustavnog darivanja jedan je od najjačih alata upravljanja novcem.",
  },
  {
    title: "Iz uređenog proračuna",
    copy: "Darivanje dolazi nakon reda i izlaska iz duga.",
  },
  {
    title: "Prema ljudima",
    copy: "Darivanje vas uči gledati izvan sebe. Čini vas profesionalno jačim.",
  },
]

export function GivingSection() {
  return (
    <section className="section-shell">
      <div className="case-panel">
        <SectionHeader
          title="Darivanje mijenja vaš odnos prema novcu."
          copy="Prvo dolazi red. Zatim izlazak iz duga. Na posljetku, sustavno darivanje."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div className="space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Sustavno darivanje je jedan od alata mudrog upravljanja imovinom.
            </p>
            <p>
              Kada dio osobnog proračuna dobije namjenu za darivanje, novac
              prestaje biti samo zaštita od straha. Postaje način stvaranja
              vrijednosti za druge ljude.
            </p>
            <p className="text-xl leading-8 font-semibold text-foreground">
              Praktični Bitcoin standard ne pita samo koliko imate. Pita kakva
              osoba postajete s novcem.
            </p>
          </div>
          <div className="grid gap-3">
            {givingCards.map((card) => (
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
