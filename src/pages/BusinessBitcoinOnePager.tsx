import { ArrowUpRight, CalendarDays, Clock3, FileText } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import {
  briefingAgenda,
  briefingParticipants,
  businessTriggers,
} from "@/content/business"
import { businessBitcoinOnePagerRoute } from "@/content/clientRoutes"
import { BUSINESS_BITCOIN_PATH, PAVAO_PAHLJINA_PATH } from "@/content/site"

const BUSINESS_CONVERSATION_PATH = "/razgovor/?tema=tvrtka"

const summaryIncludes = [
  "pripremu prema stvarnom poslovnom povodu",
  "zajednički jezik za upravu i financije",
  "mapu otvorenih odluka i odgovornosti",
  "pitanja za pravnika, poreznog savjetnika i računovođu",
  "Sažetak Bitcoin briefinga za upravu",
  "preporučeni organizacijski sljedeći korak",
] as const

const boundaries = [
  "bez upravljanja imovinom i skrbništva",
  "bez kupnje, prodaje, razmjene i izvršenja transakcija",
  "bez naloga o alokaciji poslovne imovine",
  "bez pravnog, poreznog i računovodstvenog mišljenja",
  "bez reguliranog savjetovanja o kriptoimovini",
] as const

function CompactList({ items }: { items: readonly string[] }) {
  return (
    <ul className="business-one-pager-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function BusinessBitcoinOnePager() {
  return (
    <>
      <Seo {...businessBitcoinOnePagerRoute} />
      <article className="business-briefing-page business-one-pager-page">
        <header className="business-one-pager-hero">
          <div className="business-shell business-one-pager-hero__grid">
            <div>
              <p className="business-eyebrow">SAŽETAK ZA INTERNO DIJELJENJE</p>
              <h1>Bitcoin briefing za upravu</h1>
              <p className="business-one-pager-hero__lead">
                Zatvoreni, pripremljeni radni sastanak za vlasnika, direktora,
                upravu i financijski tim koji trebaju razdvojiti poslovna
                pitanja prije bilo kakvog operativnog koraka.
              </p>
              <div className="business-one-pager-hero__actions">
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={BUSINESS_CONVERSATION_PATH}
                    data-cta="business-one-pager-conversation"
                  >
                    <CalendarDays aria-hidden="true" />
                    Dogovorite poslovni uvodni razgovor
                  </a>
                </Button>
                <a
                  href={BUSINESS_BITCOIN_PATH}
                  className="business-text-link"
                  data-link="business-one-pager-main-page"
                >
                  Otvorite punu stranicu briefinga
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
            <aside aria-label="Ključne činjenice o briefingu">
              <div>
                <Clock3 aria-hidden="true" />
                <span>Trajanje</span>
                <strong>90–120 minuta</strong>
              </div>
              <div>
                <FileText aria-hidden="true" />
                <span>Rezultat</span>
                <strong>Pisani sažetak za upravu</strong>
              </div>
              <p>
                Standardno 90 minuta; do 120 minuta kada sudjeluje veći
                upravljački tim ili je potrebno razdvojiti više poslovnih
                tokova.
              </p>
            </aside>
          </div>
        </header>

        <main className="business-shell business-one-pager-main">
          <section>
            <p className="business-eyebrow">Svrha</p>
            <h2>Uvesti red prije odluke</h2>
            <blockquote>
              Ne počinjemo pitanjem treba li tvrtka kupiti Bitcoin. Počinjemo
              pitanjem koje odluke postoje, tko je za njih odgovoran i koja
              stručna mišljenja nedostaju.
            </blockquote>
          </section>

          <section>
            <p className="business-eyebrow">Poslovni povodi</p>
            <h2>Kada briefing ima smisla?</h2>
            <ol className="business-one-pager-numbered">
              {businessTriggers.map((trigger, index) => (
                <li key={trigger.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{trigger.title}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="business-one-pager-columns">
            <div>
              <p className="business-eyebrow">Dnevni red</p>
              <h2>Što prolazimo?</h2>
              <ol>
                {briefingAgenda.map((item) => (
                  <li key={item.title}>{item.title}</li>
                ))}
              </ol>
            </div>
            <div>
              <p className="business-eyebrow">Rezultat</p>
              <h2>Što tvrtka dobiva?</h2>
              <CompactList items={summaryIncludes} />
            </div>
          </section>

          <section>
            <p className="business-eyebrow">Sudionici</p>
            <h2>Tko treba biti za stolom?</h2>
            <div className="business-one-pager-participants">
              {briefingParticipants.map((participant) => (
                <article key={participant.title}>
                  <h3>{participant.title}</h3>
                  <p>{participant.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="business-one-pager-columns">
            <div>
              <p className="business-eyebrow">Opseg</p>
              <h2>Jasne granice</h2>
              <CompactList items={boundaries} />
            </div>
            <div>
              <p className="business-eyebrow">Ugovaranje</p>
              <h2>Pisana ponuda nakon kratkog razgovora</h2>
              <p>
                Na cijenu utječu broj sudionika, priprema, mrežni ili fizički
                format, putovanje i opseg završnog dokumenta. Standardno su
                uključeni priprema dnevnog reda, briefing i pisani sažetak.
              </p>
            </div>
          </section>

          <section className="business-one-pager-founder">
            <img
              src="/pavao-pahljina-480.webp"
              alt="Pavao Pahljina."
              width="480"
              height="480"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="business-eyebrow">Tko vodi briefing</p>
              <h2>Pavao Pahljina</h2>
              <p>
                Suosnivač i bivši direktor STEMI-ja, u Bitcoin industriji od
                2020. Povezuje iskustvo vođenja tvrtke, upravljanja ljudima,
                proizvodima i novčanim tokom s dugogodišnjim radom na Bitcoin
                obrazovanju i operativnim procesima.
              </p>
              <a
                href={PAVAO_PAHLJINA_PATH}
                className="business-text-link"
                data-link="business-one-pager-founder"
              >
                Više o Pavlu
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </section>

          <section className="business-one-pager-final">
            <div>
              <p className="business-eyebrow">Sljedeći korak</p>
              <h2>Počnite poslovnim povodom, bez osjetljivih podataka.</h2>
              <p>
                U kratkom razgovoru utvrđujemo tko treba sudjelovati i je li
                briefing pravi sljedeći korak.
              </p>
            </div>
            <Button asChild className="cta-primary home-primary-button">
              <a
                href={BUSINESS_CONVERSATION_PATH}
                data-cta="business-one-pager-final-conversation"
              >
                <CalendarDays aria-hidden="true" />
                Dogovorite poslovni uvodni razgovor
              </a>
            </Button>
          </section>
        </main>
      </article>
    </>
  )
}
