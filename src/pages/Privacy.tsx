import { CalendarDays, Check, X } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { privacyRoute } from "@/content/routes"
import { CONVERSATION_PATH, EMAIL } from "@/content/site"

const doNotSendItems = [
  "seed phrase",
  "privatne ključeve",
  "lozinke",
  "screenshotove novčanika",
  "iznose",
  "dokumente",
  "pristup burzi, novčaniku ili uređaju",
]

function DoNotSendList() {
  return (
    <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground sm:grid-cols-2">
      {doNotSendItems.map((item) => (
        <li key={item} className="flex gap-3">
          <X className="negative-icon mt-1 size-4 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function Privacy() {
  return (
    <>
      <Seo
        title={privacyRoute.title}
        description={privacyRoute.description}
        canonical={privacyRoute.canonical}
        ogType={privacyRoute.ogType}
        schema={privacyRoute.schema as object}
      />
      <article className="privacy-page">
        <header className="privacy-hero hero-section editorial-section">
          <div className="hero-shell">
            <div className="hero-copy privacy-hero__copy">
              <p className="hero-eyebrow">Privatnost</p>
              <h1 className="hero-title">Privatnost i podaci</h1>
              <p className="hero-subtitle">
                Za uvodni razgovor treba podijeliti samo ono što je potrebno za
                dogovor termina i osnovni kontekst pitanja. Seed phrase i
                privatni ključevi se nikada ne dijele.
              </p>
            </div>
            <picture className="hero-image-frame privacy-hero__media">
              <source
                srcSet="/images/povjerljivost-hero-20260601.webp"
                type="image/webp"
              />
              <img
                src="/images/povjerljivost-hero-20260601.jpg"
                alt="Mediteranska scena s omotnicom, bilježnicom i pregradom kao simbol privatnosti i povjerljivog razgovora."
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
        </header>

        <div className="section-shell page-flow">
          <div className="privacy-card-stack">
            <section className="case-panel">
              <h2 className="text-2xl font-semibold">
                Što trebate podijeliti za uvodni razgovor
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Za rezervaciju termina obično su dovoljni ime, email, termin i
                kratka bilješka o pitanju koje želite razjasniti.
              </p>
              <p className="mt-5 text-base leading-7 font-medium text-foreground">
                Ne trebate slati:
              </p>
              <DoNotSendList />
            </section>

            <section className="case-panel">
              <h2 className="text-2xl font-semibold">
                Povjerljivost razgovora
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Razgovori su povjerljivi. Ne objavljujem osobne podatke,
                financijsku situaciju, iznose, sigurnosne detalje ni sadržaj
                razgovora.
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Opći, anonimizirani uvidi iz savjetodavnog rada mogu utjecati na
                buduće javne materijale, vodiče ili knjigu. Nikada ne
                objavljujem ime, iznose, osobne okolnosti, sigurnosne detalje ni
                prepoznatljive elemente bez izričite dozvole.
              </p>
            </section>

            <section className="case-panel">
              <h2 className="text-2xl font-semibold">Alati koje koristimo</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Za dogovor termina koristi se Cal.com. Za komunikaciju se može
                koristiti email. Ti alati mogu obrađivati osnovne podatke
                potrebne za zakazivanje i komunikaciju.
              </p>
            </section>

            <section className="case-panel">
              <h2 className="text-2xl font-semibold">
                Brisanje ili izmjena podataka
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Ako želite da obrišem bilješke iz komunikacije ili da prestanemo
                komunicirati, možete mi se javiti na email naveden na stranici:{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {EMAIL}
                </a>
                .
              </p>
            </section>

            <section className="safety-note-card">
              <h2 className="text-2xl font-semibold">Sigurnosno pravilo</h2>
              <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
                Seed phrase i privatni ključevi se nikada ne šalju, nikada ne
                kopiraju u kalendar, nikada ne šalju emailom i nikada ne dijele
                sa savjetnikom.
              </p>
              <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground">
                <li className="flex gap-3">
                  <Check className="positive-icon mt-1 size-4 shrink-0" />
                  <span>
                    O sigurnosnoj strukturi možemo razgovarati bez predaje
                    kontrole.
                  </span>
                </li>
              </ul>
            </section>

            <section className="conversation-final-card">
              <h2 className="text-2xl font-semibold">
                Spremni za uvodni razgovor?
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                Dođite s jednim stvarnim pitanjem. Ne šaljite osjetljive podatke
                prije razgovora.
              </p>
              <Button
                asChild
                size="lg"
                className="cta-primary mt-6 w-full rounded-full sm:w-auto"
              >
                <a
                  href={CONVERSATION_PATH}
                  className="justify-center text-center"
                  data-cta="privacy-intro-call"
                >
                  <CalendarDays className="size-4" />
                  Dogovorite uvodni razgovor
                </a>
              </Button>
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
