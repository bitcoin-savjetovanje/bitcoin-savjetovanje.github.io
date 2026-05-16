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

const businessBitcoinItems = [
  "poslovni Bitcoin ne miješati s privatnim Bitcoinom",
  "definirati ovlaštene osobe",
  "definirati pravila odobravanja transakcija",
  "razdvojiti dnevni, operativni i dugoročni sloj",
  "ne oslanjati se na pamćenje jedne osobe",
  "pravni, porezni i računovodstveni dio provjeriti sa stručnjacima",
  "seed phrase ili privatne ključeve nikada ne stavljati u dokumente koji prolaze kroz institucije ili osobe koje ne smiju imati pristup",
]

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
      <article className="section-shell page-flow security-page">
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

        <header className="page-hero mt-8">
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

        <section className="security-principle-card">
          <h2 className="text-xl font-semibold">Sigurnosno pravilo</h2>
          <p className="mt-3 text-base leading-8 text-muted-foreground">
            Seed phrase se nikada ne dijeli. Dobar savjetnik vam pomaže urediti
            okvir bez preuzimanja kontrole.
          </p>
        </section>

        <section className="security-goals-card">
          <h2 className="text-2xl font-semibold">
            Dobra sigurnost ima dvije strane
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Mora otežati krađu, ali ne smije toliko otežati pristup da vi, vaša
            obitelj ili ovlaštene osobe izgubite mogućnost oporavka.
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Sigurnost nije natjecanje u tome tko ima najkompliciraniji sustav.
            Sigurnost je sposobnost da se vrijednost sačuva kroz stvarne životne
            okolnosti: zaborav, paniku, bolest, smrt, gubitak uređaja i
            dobronamjernu pogrešku.
          </p>
          <div
            className="security-balance-visual"
            aria-label="Dvije strane dobre sigurnosti"
          >
            <div className="security-balance-node">
              <span>01</span>
              <strong>Otežati krađu</strong>
              <p>Manje prilika da netko dobije neovlašten pristup.</p>
            </div>
            <div className="security-balance-core">
              <span>dobra sigurnost</span>
            </div>
            <div className="security-balance-node">
              <span>02</span>
              <strong>Sačuvati oporavak</strong>
              <p>Jasan put ako nastanu panika, bolest, smrt ili gubitak.</p>
            </div>
          </div>
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

        <section className="security-business-panel">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.14em] uppercase">
              Poslovni Bitcoin
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Ako Bitcoin pripada poslu
            </h2>
            <p className="mt-4 text-base leading-8">
              Poslovni Bitcoin ne smije ovisiti samo o vlasniku, direktoru ili
              jednoj tehničkoj osobi. Tvrtka treba jasnu evidenciju, pravila
              odobravanja, razdvajanje privatnog i poslovnog Bitcoina i plan ako
              ključna osoba nije dostupna.
            </p>
          </div>
          <ul>
            {businessBitcoinItems.map((item) => (
              <li key={item}>
                <Check className="positive-icon mt-1 size-4 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="security-card-grid">
          <section className="case-panel never-request-panel">
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

        <section className="security-technical-note">
          <h2 className="text-2xl font-semibold">
            U uvodnom razgovoru ne radimo tehničke promjene.
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Ne mijenjamo wallet, ne diramo uređaje, ne unosimo seed phrase i ne
            šaljemo transakcije. Prvo razgovaramo o strukturi, rizicima i
            sljedećem sigurnom koraku.
          </p>
        </section>

        <div className="mt-12 rounded-3xl border border-border/80 bg-foreground p-6 text-background shadow-sm sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
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
