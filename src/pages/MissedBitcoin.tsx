import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { missedBitcoinRoute } from "@/content/clientRoutes"
import { missedBitcoinFaqs } from "@/content/missedBitcoin"
import {
  BITCOIN_MONEY_PATH,
  BITCOIN_STANDARD_CHECK_PATH,
  BUDGET_PATH,
  CONVERSATION_PATH,
  CUSTODY_SECURITY_PATH,
  DEBT_PATH,
  NET_WORTH_PATH,
} from "@/content/site"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"

const BEGINNER_GUIDE_PATH = "/vodici/niste-zakasnili-u-bitcoin/"

const recognitionStatements = [
  "Za Bitcoin znam godinama, ali nikada nisam ozbiljno krenuo.",
  "Kupio sam nešto, ali nikada nisam izgradio jasan sustav.",
  "Čekam da se cijena vrati na razinu koju sam propustio.",
  "Bojim se da ću kupiti neposredno prije velikog pada.",
  "Ne znam koju bi ulogu Bitcoin trebao imati u mojoj imovini.",
  "Znam kako kupiti Bitcoin, ali ne znam kako s njim živjeti kroz vrijeme.",
] as const

const founderTimeline = [
  {
    label: "Srpanj 2014.",
    copy: "Bitcoin je vrijedio približno 600 američkih dolara.",
  },
  {
    label: "Prva mala kupnja",
    copy: "Kupio sam Bitcoin za približno 20 dolara.",
  },
  {
    label: "Godine učenja",
    copy: "Razumijevanje je raslo kroz rad i stvarne odluke.",
  },
  {
    label: "Od listopada 2020.",
    copy: "Puni Bitcoin standard postao je osnova mojih financija.",
  },
] as const

const hiddenDecisions = [
  "biste li ga uopće kupili",
  "biste li kupili iznos koji bi vam bio značajan",
  "biste li prodali nakon prvog velikog rasta",
  "biste li prošli kroz pad od 70 ili 80 posto",
  "biste li sigurno sačuvali pristup",
  "biste li razumjeli zašto Bitcoin i dalje držite",
  "biste li ga znali koristiti kada vam stvarno treba",
  "biste li odluku mogli objasniti obitelji",
] as const

const systemAreas = [
  {
    title: "Osobne financije",
    href: BUDGET_PATH,
    copy: (
      <>
        Proračun, redoviti troškovi i <a href={DEBT_PATH}>dugovi</a> koji
        određuju koliko slobode imate u donošenju odluka.
      </>
    ),
  },
  {
    title: "Uloga Bitcoina",
    href: NET_WORTH_PATH,
    copy: "Odnos Bitcoina prema novcu, nekretninama i ostatku neto imovine.",
  },
  {
    title: "Pravila korištenja",
    href: BITCOIN_MONEY_PATH,
    copy: "Kako prihod pretvarate u Bitcoin, koliko eura držite za kratkoročna plaćanja te kada i zašto Bitcoin trošite.",
  },
  {
    title: "Sigurnost i obitelj",
    href: CUSTODY_SECURITY_PATH,
    copy: "Skrbništvo, sigurnosne kopije, nasljeđivanje i način na koji obitelj može razumjeti i nastaviti sustav.",
  },
] as const

const approachFits = [
  "želite više od povremene kupnje",
  "imate Bitcoin, štednju, dugove ili značajnu drugu imovinu",
  "želite donijeti odluku koju možete objasniti obitelji",
  "tražite pravila za dugoročan život s Bitcoinom",
] as const

const nextSteps = [
  {
    title: "Još nemam Bitcoin",
    copy: "Želite prvo razumjeti zašto Bitcoin ima vrijednost i kako pristupiti odluci bez straha da morate sve riješiti odjednom.",
    href: BEGINNER_GUIDE_PATH,
    cta: "Počnite s vodičem",
    eventAttribute: "data-link",
    eventId: "missed-bitcoin-beginner-guide",
    icon: BookOpenText,
  },
  {
    title: "Imam Bitcoin, ali nemam jasna pravila",
    copy: "Povremeno kupujete ili držite Bitcoin, ali nemate uređen odnos prema proračunu, dugovima, ostatku imovine, trošenju i sigurnosti.",
    href: BITCOIN_STANDARD_CHECK_PATH,
    cta: "Napravite besplatnu provjeru",
    eventAttribute: "data-cta",
    eventId: "missed-bitcoin-standard-check",
    icon: ClipboardCheck,
  },
  {
    title: "Bitcoin je već važan dio moje imovine",
    copy: "Imate značajnu količinu Bitcoina ili složeniju financijsku situaciju i želite urediti cjelovit osobni i obiteljski sustav.",
    href: CONVERSATION_PATH,
    cta: "Dogovorite uvodni razgovor",
    eventAttribute: "data-cta",
    eventId: "missed-bitcoin-conversation",
    icon: CalendarDays,
  },
] as const

export function MissedBitcoin() {
  return (
    <>
      <Seo {...missedBitcoinRoute} />
      <article className="missed-bitcoin-page">
        <header className="missed-hero">
          <div className="missed-hero__shell">
            <div className="missed-hero__copy">
              <p className="missed-eyebrow">Jesam li zakasnio u Bitcoin?</p>
              <h1>Mogao sam kupiti Bitcoin ranije. Što sada?</h1>
              <p className="missed-hero__lead">
                Kada gledate povijesni graf, lako je zaključiti da ste
                zakasnili. Ali cijena po kojoj niste kupili ne može vam reći što
                Bitcoin danas treba biti u vašem proračunu, imovini i životu. Za
                to vam treba sustav odlučivanja, a ne još jedan pokušaj
                pogađanja cijene.
              </p>
              <div className="missed-hero__actions">
                <Button asChild className="cta-primary missed-button">
                  <a
                    href="#sljedeci-korak"
                    data-cta="missed-bitcoin-hero-next-steps"
                  >
                    Provjerite što vas danas zaustavlja
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
                <a
                  className="missed-text-link"
                  href={CONVERSATION_PATH}
                  data-cta="missed-bitcoin-hero-conversation"
                >
                  Već znate koje pitanje trebate riješiti? Dogovorite uvodni
                  razgovor.
                </a>
              </div>
              <p className="missed-hero__note">
                <ShieldCheck aria-hidden="true" />
                Bez trgovanja, cjenovnih signala i nagovaranja na kupnju.
              </p>
            </div>

            <figure className="missed-hero__visual">
              <picture>
                <source
                  srcSet="/images/niste-zakasnili-u-bitcoin-cover-20260625.webp"
                  type="image/webp"
                />
                <img
                  src="/images/niste-zakasnili-u-bitcoin-cover-20260625.jpg"
                  width="1774"
                  height="887"
                  alt="Otvorena bilježnica na kamenom stolu uz mediteranski horizont i diskretan kameni znak Bitcoina."
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  sizes="(min-width: 980px) 44vw, 100vw"
                />
              </picture>
              <figcaption>
                Prošla cijena je poznata. Odluke koje biste između tada i danas
                morali donijeti nisu.
              </figcaption>
            </figure>
          </div>
        </header>

        <div className="missed-page-shell">
          <section
            className="missed-section missed-recognition"
            aria-labelledby="recognition-title"
          >
            <div className="missed-section-heading">
              <h2 id="recognition-title">
                Možda se prepoznajete u nekoj od ovih rečenica
              </h2>
            </div>
            <div className="missed-recognition__grid">
              {recognitionStatements.map((statement, index) => (
                <blockquote key={statement}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>„{statement}”</p>
                </blockquote>
              ))}
            </div>
          </section>

          <section
            className="missed-section missed-story"
            aria-labelledby="story-title"
          >
            <div className="missed-story__intro">
              <img
                src="/pavao-pahljina.jpg"
                width="800"
                height="800"
                loading="lazy"
                decoding="async"
                alt="Pavao Pahljina, osnivač Bitcoin Savjetovanja."
              />
              <div>
                <p className="missed-eyebrow">Osobno iskustvo</p>
                <h2 id="story-title">
                  Kupio sam Bitcoin 2014. I svejedno sam ga gotovo propustio.
                </h2>
                <p>
                  Prvi put kupio sam Bitcoin u srpnju 2014., kada je vrijedio
                  približno 600 američkih dolara. Kupio sam ga samo za približno
                  20 dolara. Niža cijena nije automatski proizvela razumijevanje
                  ni važnu odluku.
                </p>
                <p>
                  Trebale su godine učenja i odlučivanja da Bitcoin postane moj
                  primarni novac. Na puni Bitcoin standard prešao sam u
                  listopadu 2020.
                </p>
                <strong className="missed-story__thesis">
                  Pristup nižoj cijeni nije bio isto što i razumijevanje
                  Bitcoina.
                </strong>
              </div>
            </div>
            <ol className="missed-story__timeline" aria-label="Vremenska crta">
              {founderTimeline.map((item) => (
                <li key={item.label}>
                  <span aria-hidden="true" />
                  <strong>{item.label}</strong>
                  <p>{item.copy}</p>
                </li>
              ))}
            </ol>
          </section>

          <section
            id="povijesni-graf"
            className="missed-section missed-past"
            aria-labelledby="past-title"
          >
            <div className="missed-past__intro">
              <p className="missed-eyebrow">Graf ne prikazuje odluke</p>
              <h2 id="past-title">
                Povijesni graf skriva gotovo sve važne odluke
              </h2>
              <p>
                Graf pokazuje početnu i završnu cijenu. Ne pokazuje znanje,
                novac koji vam je tada trebao ni pritisak pod kojim biste
                odlučivali. Mnogi su znali za Bitcoin, ali ga nisu dovoljno
                razumjeli. Kupnja ili rudarenje djelovali su složeno, a obitelj
                ili okolina smatrali su ga besmislenim. Drugi su imali sasvim
                razumne kratkoročne potrebe.
              </p>
              <p>
                Čak i da su kupili, mnogi bi prodali nakon prvog velikog rasta.
                Zato ranija cijena sama po sebi ne govori biste li kroz sve što
                je slijedilo došli do današnje pozicije.
              </p>
            </div>
            <div className="missed-past__ledger">
              <p>Graf ne pokazuje</p>
              <ul>
                {hiddenDecisions.map((decision) => (
                  <li key={decision}>
                    <Check aria-hidden="true" />
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="missed-pullquote-wrap">
              <blockquote className="missed-pullquote">
                Nije dovoljno rano kupiti Bitcoin. Potrebno ga je dovoljno
                razumjeti da biste znali što s njim radite kroz vrijeme.
              </blockquote>
              <p>
                Kupnja je jedna odluka. Život s Bitcoinom sastoji se od stotina
                odluka koje dolaze poslije nje.
              </p>
            </div>
            <p className="missed-past__conclusion">
              Ne morate nadoknaditi deset propuštenih godina jednom kupnjom.
            </p>
          </section>

          <section
            className="missed-section missed-system"
            aria-labelledby="system-title"
          >
            <div className="missed-section-heading">
              <p className="missed-eyebrow">Što danas treba urediti</p>
              <h2 id="system-title">
                Današnja odluka počinje izvan grafikona cijene
              </h2>
              <p>
                Bitcoin Savjetovanje ne pokušava odgovoriti hoće li Bitcoin
                sljedeći mjesec biti skuplji ili jeftiniji. Pomaže vam utvrditi
                koju bi ulogu Bitcoin trebao imati u vašem novcu, kako se ta
                odluka uklapa u dugove i ostatak imovine, kako je sigurno
                provesti te prema kojim ćete pravilima dalje postupati.
              </p>
            </div>
            <dl className="missed-system__areas">
              {systemAreas.map((area) => (
                <div key={area.title}>
                  <dt>
                    <a href={area.href}>{area.title}</a>
                  </dt>
                  <dd>{area.copy}</dd>
                </div>
              ))}
            </dl>
            <div className="missed-system__note">
              <ShieldCheck aria-hidden="true" />
              <p>
                Bitcoin kao primarni novac nije Bitcoin koji se nikada ne
                prodaje. Prihod se prema pravilima pretvara u Bitcoin, a po
                potrebi se Bitcoin razmjenjuje u eure za stvarne troškove.
              </p>
            </div>
            <div className="missed-fit">
              <h3>Ovakav pristup ima smisla ako</h3>
              <ul>
                {approachFits.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Ovo nije trgovanje, kratkoročna prognoza cijene, upravljanje
                vašim novcem, preporuka drugih kriptovaluta ni obećanje prinosa.
              </p>
            </div>
          </section>

          <section
            id="sljedeci-korak"
            className="missed-section missed-next-steps"
            aria-labelledby="next-steps-title"
          >
            <div className="missed-section-heading">
              <p className="missed-eyebrow">Jedan sljedeći korak</p>
              <h2 id="next-steps-title">Gdje se danas nalazite?</h2>
              <p>
                Odaberite položaj koji vam je najbliži. Ne morate prolaziti kroz
                sva tri koraka.
              </p>
            </div>
            <ol className="missed-next-steps__grid">
              {nextSteps.map((step, index) => {
                const Icon = step.icon
                const eventProps =
                  step.eventAttribute === "data-cta"
                    ? { "data-cta": step.eventId }
                    : { "data-link": step.eventId }

                return (
                  <li key={step.title} data-featured={index === 1 || undefined}>
                    <div className="missed-next-steps__topline">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <Icon aria-hidden="true" />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                    <a href={step.href} {...eventProps}>
                      {step.cta}
                      <ArrowRight aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ol>
          </section>

          <section
            className="missed-section missed-faq"
            aria-labelledby="faq-title"
          >
            <div className="missed-section-heading">
              <p className="missed-eyebrow">Česta pitanja</p>
              <h2 id="faq-title">Kratki odgovori prije sljedeće odluke</h2>
            </div>
            <div className="missed-faq__list">
              {missedBitcoinFaqs.map((item) => (
                <details
                  key={item.id}
                  onToggle={(event) => {
                    if (event.currentTarget.open) {
                      trackFirstPartyInteraction("missed-bitcoin-faq-open", {
                        faq: item.id,
                      })
                    }
                  }}
                >
                  <summary>
                    <span>{item.question}</span>
                    <ChevronDown aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section
            className="missed-section missed-final-cta"
            aria-labelledby="final-cta-title"
          >
            <div>
              <p className="missed-eyebrow">Današnja odluka</p>
              <h2 id="final-cta-title">
                Ne možete promijeniti cijenu po kojoj niste kupili. Možete
                promijeniti način na koji odlučujete danas.
              </h2>
              <p>
                Prvi korak nije odluka koliko ćete kupiti. Prvi korak je
                utvrditi što vam danas nedostaje: razumijevanje Bitcoina,
                uređene osobne financije, jasna pravila korištenja ili siguran
                način držanja.
              </p>
              <div className="missed-final-cta__actions">
                <Button
                  asChild
                  className="missed-button missed-button--contrast"
                >
                  <a
                    href={BITCOIN_STANDARD_CHECK_PATH}
                    data-cta="missed-bitcoin-standard-check"
                  >
                    <ClipboardCheck aria-hidden="true" />
                    Napravite besplatnu provjeru
                  </a>
                </Button>
                <a
                  className="missed-text-link missed-text-link--light"
                  href={CONVERSATION_PATH}
                  data-cta="missed-bitcoin-conversation"
                >
                  Već imate jasno pitanje? Dogovorite 15-minutni razgovor.
                </a>
              </div>
              <small>
                Razgovor nije nagovaranje na kupnju Bitcoina. Cilj je utvrditi
                koje pitanje zapravo trebate riješiti.
              </small>
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
