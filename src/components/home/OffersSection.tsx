import { CalendarDays, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { programOutcomes } from "@/content/home"
import { offers } from "@/content/offers"
import { BOOKING_URL } from "@/content/site"

const offerCtaAttributes: Record<string, string> = {
  "15-minutni uvodni razgovor": "intro-call-primary",
  "Izgradnja osobnog Bitcoin standarda": "program-intro-call",
}

export function OffersSection() {
  const mainProgram = offers.find(
    (offer) => offer.title === "Izgradnja osobnog Bitcoin standarda"
  )
  const introOffer = offers.find(
    (offer) => offer.title === "15-minutni uvodni razgovor"
  )
  const deepCheckOffer = offers.find(
    (offer) => offer.title === "Dubinska provjera osobnog Bitcoin standarda"
  )

  if (!introOffer || !deepCheckOffer || !mainProgram) {
    return null
  }

  const offerPath = [
    {
      eyebrow: "Prvi korak",
      offer: introOffer,
      detail: introOffer.detail,
      price: introOffer.price,
    },
    {
      eyebrow: "Ako treba dublje",
      offer: deepCheckOffer,
      detail:
        "Jedan dublji razgovor s jasnim zaključcima. Može biti dovoljna ako ne trebate cijeli pisani program.",
      price: deepCheckOffer.price,
    },
    {
      eyebrow: "Cijeli sustav",
      offer: mainProgram,
      detail:
        "Za ljude koji ne žele samo još jedan razgovor o Bitcoinu, nego pisana pravila za vlastiti život.",
      price: `${mainProgram.duration} · ${mainProgram.price}`,
    },
  ]

  return (
    <section id="program" className="section-shell section-muted">
      <div className="case-panel border-primary/25 bg-card">
        <SectionHeader
          title="Od uvodnog razgovora do pisanog standarda"
          copy="Ne morate odmah znati treba li vam cijeli program. Prvo napravimo 15-minutni uvodni razgovor, zatim po potrebi dubinsku provjeru, a tek onda izgradnju pisanog osobnog Bitcoin standarda."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {offerPath.map(({ eyebrow, offer, detail, price }) => (
            <article
              key={offer.title}
              className="program-card bg-background/70"
            >
              <span className="text-sm font-semibold text-muted-foreground">
                {eyebrow}
              </span>
              <div className="mt-4 flex items-start justify-between gap-4">
                <h3>{offer.title}</h3>
                <strong className="price-badge price-badge--soft">
                  {price}
                </strong>
              </div>
              <p>{detail}</p>
              {offer.title === introOffer.title ? (
                <Button asChild className="cta-primary mt-6 rounded-full">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta={offerCtaAttributes[offer.title]}
                  >
                    <CalendarDays className="size-4" />
                    Dogovorite 15-minutni uvodni razgovor
                  </a>
                </Button>
              ) : null}
              {offer.title === mainProgram.title ? (
                <>
                  <div className="program-summary">
                    <p>Na kraju imate:</p>
                    <ul className="mt-4 grid gap-2 text-base leading-7 font-medium text-foreground">
                      {programOutcomes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <Check className="positive-icon mt-1 size-3.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild className="cta-primary mt-6 rounded-full">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta={offerCtaAttributes[offer.title]}
                    >
                      <CalendarDays className="size-4" />
                      Prvo dogovorite 15-minutni uvodni razgovor
                    </a>
                  </Button>
                </>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
