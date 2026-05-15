import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import {
  BITCOIN_CONSULTATION_PATH,
  CONVERSATION_PATH,
  PRACTICAL_BITCOIN_STANDARD_URL,
} from "@/content/site"

const fitCards = [
  {
    title: "Uvodni Bitcoin razgovor",
    copy: "15 minuta, bez naknade i bez obveze. Vidimo gdje ste sada, što pokušavate odlučiti i koji bi sljedeći korak bio razuman.",
    cta: "Dogovorite uvodni razgovor",
    href: CONVERSATION_PATH,
  },
  {
    title: "Bitcoin konzultacija",
    copy: "Jedan dubinski razgovor za jedno ozbiljno Bitcoin pitanje koje utječe na stvarnu odluku.",
    cta: "Što je Bitcoin konzultacija?",
    href: BITCOIN_CONSULTATION_PATH,
  },
  {
    title: "Osobni Bitcoin standard",
    copy: "Rad kroz 4–6 tjedana na pisanom okviru: proračun, dug, Bitcoin kao novac, neto imovina, sigurnost i obitelj.",
    cta: "Krenite od uvodnog razgovora",
    href: CONVERSATION_PATH,
  },
  {
    title: "Vodiči za Bitcoin kao novac",
    copy: "Javni vodiči i metoda iza savjetovanja. Možete ih čitati prije razgovora ili koristiti kao mapu za vlastita pitanja.",
    cta: "Čitajte vodiče",
    href: PRACTICAL_BITCOIN_STANDARD_URL,
  },
]

export function HowItFitsSection() {
  return (
    <section className="section-shell">
      <SectionHeader
        title="Kako se ovo slaže?"
        copy="Ne morate odmah znati koji oblik rada vam treba. Krenite od jednog stvarnog Bitcoin pitanja. Uvodni razgovor pokazuje je li dovoljan kratak odgovor, treba li jedan dubinski razgovor ili ima smisla graditi cijeli osobni Bitcoin standard."
      />
      <ul className="mt-10 grid list-none gap-4 md:grid-cols-2 xl:grid-cols-4">
        {fitCards.map((card) => (
          <li key={card.title}>
            <article className="program-card h-full">
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <a
                href={card.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
                data-cta="how-it-fits-card"
              >
                {card.cta}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
