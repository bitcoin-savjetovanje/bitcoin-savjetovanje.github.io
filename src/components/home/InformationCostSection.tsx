import { ArrowUpRight, CalendarDays, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { BITCOIN_CONSULTATION_PATH, CONVERSATION_PATH } from "@/content/site"

const selfDirectedItems = [
  "vrijeme",
  "šum",
  "odgoda",
  "pogrešni tragovi",
  "oportunitetni trošak",
]

const conversationItems = [
  "pitanje",
  "kontekst",
  "redoslijed",
  "jasniji okvir",
  "sljedeći korak",
]

function ComparisonCard({
  title,
  copy,
  items,
  emphasized = false,
}: {
  title: string
  copy: string
  items: string[]
  emphasized?: boolean
}) {
  return (
    <article
      className={`program-card h-full ${
        emphasized ? "border-primary/30 bg-primary/5" : "bg-background/70"
      }`}
    >
      <h3>{title}</h3>
      <p>{copy}</p>
      <ul className="mt-5 grid gap-2.5 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check className="positive-icon mt-1 size-3.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export function InformationCostSection() {
  return (
    <section id="cijena-informacije" className="section-shell section-muted">
      <SectionHeader
        title="Besplatna informacija nije uvijek najjeftiniji put."
        copy={
          <>
            O Bitcoinu se može učiti samostalno. Knjige, podcasti, članci,
            forumi i razgovori mogu biti izvrstan put. I sam sam dugo vjerovao
            da je to jedini ispravan način: pronaći dobar materijal, poslati
            poveznicu i pustiti čovjeka da sve sam prođe.
            <br />
            <br />
            Danas mislim drukčije. Informacija može biti besplatna, ali vrijeme
            nije. Ako ozbiljna osoba mora proći stotine sati materijala,
            rasprava, šuma, pogrešnih tragova i nepotrebnih stranputica prije
            nego što razumije što Bitcoin znači za njezin novac, dug, obitelj,
            sigurnost i imovinu, taj put ima stvaran trošak.
            <br />
            <br />
            Dobar razgovor ne zamjenjuje učenje. On ga skraćuje, usmjerava i
            povezuje s odlukom koju stvarno trebate donijeti.
          </>
        }
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <ComparisonCard
          title="Samostalni put"
          copy="Javni materijali mogu biti izvrsni, ali ne znaju vašu situaciju."
          items={selfDirectedItems}
        />
        <ComparisonCard
          title="Dobar razgovor"
          copy="Razgovor povezuje Bitcoin tezu s odlukom koju stvarno trebate donijeti."
          items={conversationItems}
          emphasized
        />
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button asChild className="cta-primary rounded-full">
          <a
            href={CONVERSATION_PATH}
            className="justify-center text-center"
            data-cta="information-cost-intro-call"
          >
            <CalendarDays className="size-4" />
            Dođite s jednim stvarnim pitanjem
          </a>
        </Button>
        <a
          href={BITCOIN_CONSULTATION_PATH}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted hover:text-foreground"
          data-link="information-cost-consultation"
        >
          Što je Bitcoin konzultacija?
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </section>
  )
}
