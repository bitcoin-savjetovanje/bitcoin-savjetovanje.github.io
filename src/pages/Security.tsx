import { CalendarDays, Check, X } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { securityRoute } from "@/content/routes"
import {
  neverAskItems,
  notDoingSecurityItems,
  securityReviewItems,
  skrbnistvoAssessmentItems,
} from "@/content/security"
import { CONVERSATION_PATH } from "@/content/site"

function SecurityList({
  items,
  icon,
}: {
  items: string[]
  icon: "check" | "x"
}) {
  const Icon = icon === "check" ? Check : X
  const iconClass = icon === "check" ? "positive-icon" : "negative-icon"

  return (
    <ul className="mt-6 grid list-none gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="not-for-row bg-background/70">
          <Icon className={`${iconClass} size-3.5`} />
          <p>{item}</p>
        </li>
      ))}
    </ul>
  )
}

export function Security() {
  return (
    <>
      <Seo
        title={securityRoute.title}
        description={securityRoute.description}
        canonical={securityRoute.canonical}
        ogType={securityRoute.ogType}
        schema={securityRoute.schema as object}
      />
      <article className="section-shell">
        <nav
          aria-label="Breadcrumb"
          className="text-sm font-medium text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <a href="/" className="hover:text-primary">
                Početna
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              Sigurnost i povjerljivost
            </li>
          </ol>
        </nav>

        <header className="mt-8 max-w-4xl">
          <h1 className="font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Sigurnost i povjerljivost
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
            Bitcoin mora ostati pod vašom kontrolom, ali pristup ne smije
            ovisiti samo o jednoj osobi, jednom uređaju ili jednom papiru. Cilj
            nije da netko drugi ima kontrolu, nego da postoji jasan plan koji
            obitelj može razumjeti bez otkrivanja osjetljivih podataka.
          </p>
        </header>

        <section className="mt-8 max-w-4xl rounded-2xl border border-primary/25 bg-primary/10 p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold">Sigurnosno pravilo</h2>
          <p className="mt-3 text-base leading-8 text-muted-foreground">
            Seed phrase se nikada ne dijeli. Dobar savjetnik vam pomaže urediti
            okvir bez preuzimanja kontrole.
          </p>
        </section>

        <section className="mt-10 max-w-4xl rounded-2xl border border-primary/25 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Dobar sigurnosni okvir ima dva cilja.
          </h2>
          <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground">
            <li className="flex gap-3">
              <Check className="positive-icon mt-1 size-4 shrink-0" />
              <span>
                Prvo, nitko ne smije dobiti kontrolu nad vašim Bitcoinom bez
                vašeg znanja.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="positive-icon mt-1 size-4 shrink-0" />
              <span>
                Drugo, vaša obitelj ne smije ostati potpuno izgubljena ako se
                vama nešto dogodi.
              </span>
            </li>
          </ul>
        </section>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Nikada ne tražim</h2>
            <SecurityList items={neverAskItems} icon="x" />
          </section>
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Možemo urediti</h2>
            <SecurityList items={securityReviewItems} icon="check" />
          </section>
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Procjenjujemo rizike</h2>
            <SecurityList items={skrbnistvoAssessmentItems} icon="check" />
          </section>
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Odluka ostaje vaša</h2>
            <SecurityList items={notDoingSecurityItems} icon="x" />
          </section>
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Povjerljivost</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Razgovori su povjerljivi. Ne objavljujem osobne podatke,
              financijsku situaciju ni pojedinosti razgovora. Za rad nije
              potrebno dijeliti seed phrase, privatne ključeve, lozinke ili
              pristup računima. Obitelj treba znati što smije napraviti i što
              nikada ne smije napraviti, ali savjetnik ne treba kontrolu nad
              vašim Bitcoinom.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-border/80 bg-foreground p-6 text-background shadow-sm sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <h2 className="max-w-3xl text-3xl leading-tight font-semibold">
              Želite urediti sigurnosni okvir bez predaje kontrole?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-background/72">
              Uvodni razgovor traje 15 minuta, bez naknade i bez obveze.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="cta-primary mt-6 w-full rounded-full px-5 text-center sm:w-auto sm:px-6 lg:mt-0"
          >
            <a
              href={CONVERSATION_PATH}
              className="justify-center"
              data-cta="security-intro-call"
            >
              <CalendarDays className="size-4" />
              Razgovarajmo o sigurnosti bez predaje kontrole
            </a>
          </Button>
        </div>
      </article>
    </>
  )
}
