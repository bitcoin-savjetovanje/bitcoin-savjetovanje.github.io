import { ArrowUpRight, HeartHandshake } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"

const givingCards = [
  {
    title: "Darivanje mijenja odnos prema novcu",
    copy: "Novac više nije samo zaštita od svijeta, nego sredstvo za služenje, zahvalnost i stvaranje boljih odnosa.",
  },
  {
    title: "Darivanje povećava sposobnost stvaranja vrijednosti",
    copy: "Kada redovito dajete bez očekivanja povrata, lakše vidite potrebe drugih ljudi. A prihodi dolaze kroz služenje ljudima.",
  },
  {
    title: "Darivanje mora doći nakon kontrole i bez duga",
    copy: "Darivanje nije bijeg od odgovornosti. Prvo kontrola novca, zatim život bez duga, zatim darivanje kao trajna praksa.",
  },
]

export function GivingDifferentiatorSection() {
  return (
    <section className="section-shell">
      <div className="case-panel border-primary/25">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <div>
            <div className="mb-5 grid size-12 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary">
              <HeartHandshake className="size-5" />
            </div>
            <SectionHeader
              title="Darivanje nije ukras Bitcoin standarda."
              copy="Ako Bitcoin učini da se zatvorimo u sebe, nismo izgradili standard. Darivanje nas vraća ljudima. A novac dolazi kroz ljude."
            />
            <a
              href="/vodici/darivanje-u-proracunu-nulte-osnove/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
              data-link="darivanje-guide"
            >
              Pročitajte vodič o darivanju
              <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div className="grid gap-4">
            {givingCards.map((card, index) => (
              <article key={card.title} className="value-card bg-background/70">
                <div className="icon-mark">{index + 1}</div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
