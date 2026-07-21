import { CalendarDays, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { CONVERSATION_PATH } from "@/content/site"

const advisoryValues = [
  {
    title: "Pravo usko grlo",
    copy: "Prepoznajemo problem koji je prvi, a ne samo problem koji je najvidljiviji.",
  },
  {
    title: "Prioritet između suprotstavljenih ciljeva",
    copy: "Dug, pričuva, Bitcoin, posao, obitelj i veće kupnje često traže isti novac.",
  },
  {
    title: "Dogovor među ljudima",
    copy: "Pravilo koje partner ili obitelj ne razumiju nije dovršen sustav.",
  },
  {
    title: "Stres-test",
    copy: "Provjeravamo što se događa pri padu kupovne moći, gubitku prihoda, velikom trošku ili naglom rastu.",
  },
  {
    title: "Provedba i revizija",
    copy: "Pravila se ne završavaju na papiru. Primjenjuju se, provjeravaju i po potrebi mijenjaju.",
  },
]

function ValueCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="program-card h-full bg-background/70">
      <h3>{title}</h3>
      <p>{copy}</p>
      <Check className="positive-icon mt-5 size-4" aria-hidden="true" />
    </article>
  )
}

export function InformationCostSection() {
  return (
    <section id="privatni-rad" className="section-shell section-muted">
      <SectionHeader
        title="Vodič vam može dati okvir. Ne može donijeti odluku umjesto vas."
        copy={
          <>
            Dvije osobe mogu pročitati isti vodič i trebati potpuno drukčiji
            redoslijed. Jedna prvo mora riješiti dug. Druga mora urediti
            likvidnost. Treća mora uskladiti pravila s partnerom. Četvrta ima
            dovoljno novca, ali sigurnosni sustav koji ovisi samo o jednoj
            osobi.
          </>
        }
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {advisoryValues.map((value) => (
          <ValueCard key={value.title} {...value} />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button asChild className="cta-primary rounded-full">
          <a
            href={CONVERSATION_PATH}
            className="justify-center text-center"
            data-cta="information-cost-intro-call"
          >
            <CalendarDays className="size-4" />
            Rezervirajte razgovor
          </a>
        </Button>
      </div>
    </section>
  )
}
