import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Euro,
  FileCheck2,
  ShieldCheck,
} from "lucide-react"
import type { SyntheticEvent } from "react"

import { renderSaifedeanAmmousReference } from "@/components/SaifedeanAmmousReference"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { audiencePagesBySlug } from "@/content/audiences"
import {
  bitcoinMoneyTransition,
  fictionalPersonalExample,
  monthlyMoneyFlow,
  personalAreaGroups,
  personalBoundaries,
  personalFounderFacts,
  personalHeroFacts,
  personalHeroFlow,
  personalLinks,
  personalServicePaths,
  personalStates,
  personalStressScenarios,
  writtenStandardPages,
} from "@/content/personal"
import { SITE_URL } from "@/content/site"
import { socialImages } from "@/content/socialImages"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"

function trackDisclosure(
  event: SyntheticEvent<HTMLDetailsElement>,
  id: string,
  key: string,
  value: string
) {
  if (!event.currentTarget.open) {
    return
  }

  trackFirstPartyInteraction(id, { [key]: value })
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  id,
}: {
  eyebrow: string
  title: string
  copy?: string
  id: string
}) {
  return (
    <div className="personal-v2-heading">
      <p className="personal-v2-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  )
}

function PersonalHero() {
  return (
    <header className="personal-v2-hero">
      <div className="personal-v2-shell personal-v2-hero__layout">
        <div className="personal-v2-hero__copy">
          <p className="personal-v2-eyebrow">
            ZA POJEDINCE KOJI VEĆ IMAJU BITCOIN
          </p>
          <h1>Bitcoin imate. Sada uredite kako iz njega živite.</h1>
          <p className="personal-v2-hero__lead">
            Za osobu koja želi prijeći s povremenog kupovanja i držanja Bitcoina
            na sustav u kojem su prihod, proračun, dug, davanje, trošenje,
            imovina i sigurnost uređeni iz Bitcoin pozicije.
          </p>

          <ul
            className="personal-v2-hero__facts"
            aria-label="Područja osobnog Bitcoin standarda"
          >
            {personalHeroFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>

          <div className="personal-v2-hero__actions">
            <Button asChild size="lg" className="personal-v2-primary-button">
              <a
                href={personalLinks.assessment}
                data-cta="personal-hero-assessment"
              >
                Provjerite svoj osobni Bitcoin standard
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <a
              href={personalLinks.program}
              className="personal-v2-text-link"
              data-link="personal-hero-program"
            >
              Pogledajte privatni program
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <p className="personal-v2-trust-note">
            <ShieldCheck aria-hidden="true" />
            Bez upravljanja sredstvima, preuzimanja skrbništva i pristupa vašem
            novčaniku.
          </p>
        </div>

        <figure className="personal-v2-hero-flow">
          <figcaption>
            <span>Mjesečni sustav</span>
            <strong>Od prihoda do stvarnog života</strong>
          </figcaption>
          <ol>
            {personalHeroFlow.map((step, index) => (
              <li key={step.id}>
                <span className="personal-v2-hero-flow__number">
                  {step.eyebrow}
                </span>
                <div>
                  <strong>{step.title}</strong>
                  <small>{step.copy}</small>
                </div>
                {index < personalHeroFlow.length - 1 ? (
                  <ArrowRight
                    className="personal-v2-hero-flow__arrow"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ol>
          <div className="personal-v2-hero-flow__roles">
            <span>novac</span>
            <span>potrošnja</span>
            <span>kapital</span>
          </div>
        </figure>
      </div>

      <div className="personal-v2-shell">
        <blockquote className="personal-v2-positioning">
          Osobni Bitcoin standard ne počinje pitanjem koliko eura vam ostaje za
          Bitcoin. Počinje odlukom da je Bitcoin vaš primarni novac, a zatim
          uređuje kako iz te pozicije financirate stvarni život.
        </blockquote>
      </div>
    </header>
  )
}

function PersonalStates() {
  return (
    <section
      className="personal-v2-section personal-v2-states"
      aria-labelledby="personal-states-title"
    >
      <div className="personal-v2-shell">
        <SectionHeading
          eyebrow="PREPOZNAVANJE"
          title="Sva tri stanja mogu izgledati kao „imam Bitcoin”"
          id="personal-states-title"
        />

        <div className="personal-v2-states__list">
          {personalStates.map((state) => (
            <details
              key={state.id}
              className="personal-v2-disclosure personal-v2-state"
              onToggle={(event) =>
                trackDisclosure(event, "personal-state-open", "state", state.id)
              }
            >
              <summary>
                <span>{state.number}</span>
                <div>
                  <h3>{state.title}</h3>
                  <p>{state.intro}</p>
                </div>
                <ChevronDown aria-hidden="true" />
              </summary>
              <ul>
                {state.items.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <blockquote className="personal-v2-pullquote">
          Razlika nije samo u količini Bitcoina. Razlika je u tome postoji li
          sustav odluka.
        </blockquote>
      </div>
    </section>
  )
}

function BitcoinMoneyTransition() {
  return (
    <section
      className="personal-v2-section personal-v2-transition"
      aria-labelledby="personal-transition-title"
    >
      <div className="personal-v2-shell">
        <SectionHeading
          eyebrow="PRIJELAZ"
          title="Držati Bitcoin i živjeti iz Bitcoin pozicije nisu ista stvar"
          id="personal-transition-title"
        />

        <div className="personal-v2-transition__comparison">
          <article>
            <p className="personal-v2-comparison-label">Izdvojena pozicija</p>
            <h3>{bitcoinMoneyTransition.asset.title}</h3>
            <ul>
              {bitcoinMoneyTransition.asset.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <ArrowRight
            className="personal-v2-transition__arrow"
            aria-hidden="true"
          />
          <article className="personal-v2-transition__money">
            <p className="personal-v2-comparison-label">Povezan sustav</p>
            <h3>{bitcoinMoneyTransition.money.title}</h3>
            <ul>
              {bitcoinMoneyTransition.money.items.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <blockquote className="personal-v2-pullquote personal-v2-pullquote--accent">
          Trošenje Bitcoina nije izlazak iz Bitcoin standarda. To je normalna
          uporaba primarnog novca.
        </blockquote>
      </div>
    </section>
  )
}

function PersonalStandardAreas() {
  return (
    <section
      className="personal-v2-section personal-v2-areas"
      aria-labelledby="personal-areas-title"
    >
      <div className="personal-v2-shell">
        <SectionHeading
          eyebrow="CIJELI SUSTAV"
          title="Sedam područja koja moraju raditi zajedno"
          copy="Besplatna provjera sažima ih u 10 pitanja i četiri skupine: razumijevanje, osobne financije, život s Bitcoinom te sigurnost i kontinuitet."
          id="personal-areas-title"
        />

        <div className="personal-v2-area-groups">
          {personalAreaGroups.map((group) => (
            <div key={group.id} className="personal-v2-area-group">
              <div className="personal-v2-area-group__heading">
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
              </div>
              <div className="personal-v2-area-group__list">
                {group.areas.map((area) => (
                  <details
                    key={area.id}
                    className="personal-v2-disclosure personal-v2-area"
                    onToggle={(event) =>
                      trackDisclosure(
                        event,
                        "personal-area-open",
                        "area",
                        area.id
                      )
                    }
                  >
                    <summary>
                      <span>{area.number}</span>
                      <div>
                        <h4>{area.title}</h4>
                        <p>{area.summary}</p>
                      </div>
                      <ChevronDown aria-hidden="true" />
                    </summary>
                    <div className="personal-v2-area__details">
                      <p>
                        U provjeri: <strong>{area.assessmentGroup}</strong>
                      </p>
                      <ul>
                        {area.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <a
                        href={area.href}
                        data-link="personal-area-guide"
                        className="personal-v2-text-link"
                      >
                        {area.linkLabel}
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MonthlyMoneyFlow() {
  return (
    <section
      className="personal-v2-section personal-v2-monthly-flow"
      aria-labelledby="personal-monthly-flow-title"
    >
      <div className="personal-v2-shell">
        <SectionHeading
          eyebrow="U PRAKSI"
          title="Kako novac prolazi kroz osobni Bitcoin standard?"
          copy="Otvorite svaki korak za kratku provjeru njegova značenja. Redoslijed ostaje isti na računalu, mobitelu i čitaču zaslona."
          id="personal-monthly-flow-title"
        />

        <ol className="personal-v2-monthly-flow__list">
          {monthlyMoneyFlow.map((step) => (
            <li key={step.id}>
              <details
                className="personal-v2-disclosure personal-v2-flow-step"
                onToggle={(event) =>
                  trackDisclosure(
                    event,
                    "personal-money-flow-open",
                    "step",
                    step.id
                  )
                }
              >
                <summary>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.summary}</p>
                  </div>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <ul>
                  {step.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ol>

        <blockquote className="personal-v2-pullquote">
          Bitcoin standard nije jednokratna kupnja. To je ponavljajući tok
          prihoda, namjene, potrošnje i provjere.
        </blockquote>
      </div>
    </section>
  )
}

function PersonalExample() {
  return (
    <section
      className="personal-v2-section personal-v2-example"
      aria-labelledby="personal-example-title"
    >
      <div className="personal-v2-shell">
        <SectionHeading
          eyebrow="KONKRETAN PRIMJER"
          title="Ima Bitcoin, ali njezine odluke još vodi euro"
          copy="Ovaj primjer nije stvarni klijent i ne koristi stvarne osjetljive podatke."
          id="personal-example-title"
        />

        <details
          className="personal-v2-example__disclosure"
          onToggle={(event) =>
            trackDisclosure(event, "personal-example-open", "example", "ana")
          }
        >
          <summary>
            <span>{fictionalPersonalExample.label}</span>
            <div>
              <h3>{fictionalPersonalExample.name}</h3>
              <p>{fictionalPersonalExample.situation}</p>
            </div>
            <strong>
              Otvorite usporedbu
              <ChevronDown aria-hidden="true" />
            </strong>
          </summary>

          <div className="personal-v2-example__comparison">
            <article>
              <p className="personal-v2-comparison-label">Početna situacija</p>
              <h3>Nepovezane odluke</h3>
              <ul>
                {fictionalPersonalExample.before.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <p className="personal-v2-comparison-label">
                Nakon uređivanja sustava
              </p>
              <h3>Povezana pravila</h3>
              <ul>
                {fictionalPersonalExample.after.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </details>

        <blockquote className="personal-v2-pullquote personal-v2-pullquote--accent">
          Problem nije bio nedostatak Bitcoina. Problem je bio nedostatak
          sustava koji povezuje novac sa stvarnim životom.
        </blockquote>
      </div>
    </section>
  )
}

function WrittenStandardPreview() {
  return (
    <section
      className="personal-v2-section personal-v2-written"
      aria-labelledby="personal-written-title"
    >
      <div className="personal-v2-shell">
        <SectionHeading
          eyebrow="PISANI STANDARD"
          title="Odluke postaju pravila koja se mogu otvoriti i ponovno provjeriti"
          copy="Tri prikaza dolaze iz stvarnog, ispravljenog oglednog PDF-a. Svaki se može otvoriti na odgovarajućoj stranici dokumenta."
          id="personal-written-title"
        />

        <div className="personal-v2-written__grid">
          {writtenStandardPages.map((page) => (
            <article key={page.id}>
              <a
                href={`${personalLinks.samplePdf}#page=${page.pdfPage}`}
                target="_blank"
                rel="noreferrer"
                className="personal-v2-written__image-link"
                data-link={`personal-document-${page.id}`}
                aria-label={`Otvorite ogledni PDF na stranici ${page.documentPage}: ${page.title}`}
              >
                <img
                  src={page.image}
                  width="1191"
                  height="1684"
                  alt={page.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  Stranica {page.documentPage}
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </a>
              <h3>{page.title}</h3>
              <p>{page.copy}</p>
            </article>
          ))}
        </div>

        <div className="personal-v2-written__footer">
          <a
            href={personalLinks.sample}
            className="personal-v2-text-link"
            data-link="personal-sample-document"
          >
            Pogledajte izmišljeni ogledni osobni Bitcoin standard
            <ArrowUpRight aria-hidden="true" />
          </a>
          <p>
            Ogledni dokument pokazuje oblik rezultata. Privatna verzija nastaje
            iz stvarne situacije i ne kopira zaključke iz primjera.
          </p>
        </div>
      </div>
    </section>
  )
}

function PersonalStressTest() {
  return (
    <section
      className="personal-v2-section personal-v2-stress"
      aria-labelledby="personal-stress-title"
    >
      <div className="personal-v2-shell">
        <SectionHeading
          eyebrow="PROVJERA PRAVILA"
          title="Vrijede li pravila samo dok je sve mirno?"
          id="personal-stress-title"
        />

        <div className="personal-v2-stress__grid">
          {personalStressScenarios.map((scenario, index) => (
            <details
              key={scenario.id}
              className="personal-v2-disclosure personal-v2-stress-card"
              onToggle={(event) =>
                trackDisclosure(
                  event,
                  "personal-stress-open",
                  "scenario",
                  scenario.id
                )
              }
            >
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{scenario.title}</h3>
                <ChevronDown aria-hidden="true" />
              </summary>
              <ul>
                {scenario.items.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <blockquote className="personal-v2-pullquote">
          Stres-test ne predviđa cijenu. On provjerava ponašanje sustava kada se
          promijene okolnosti.
        </blockquote>
      </div>
    </section>
  )
}

function PersonalServicePaths() {
  return (
    <section
      className="personal-v2-section personal-v2-services"
      aria-labelledby="personal-services-title"
    >
      <div className="personal-v2-shell">
        <SectionHeading
          eyebrow="SLJEDEĆI KORAK"
          title="Ne treba svakome isti oblik rada"
          id="personal-services-title"
        />

        <div className="personal-v2-services__list">
          {personalServicePaths.map((service, index) => (
            <article
              key={service.id}
              className={
                service.kind === "primary"
                  ? "personal-v2-service personal-v2-service--primary"
                  : "personal-v2-service"
              }
            >
              <span className="personal-v2-service__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="personal-v2-comparison-label">
                  {service.eyebrow}
                </p>
                <h3>{service.title}</h3>
                <ul aria-label={`Sažetak: ${service.title}`}>
                  {service.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
                <p>{service.copy}</p>
              </div>
              {service.kind === "primary" ? (
                <Button asChild className="personal-v2-primary-button">
                  <a href={service.href} data-cta="personal-service-assessment">
                    {service.label}
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              ) : (
                <a
                  href={service.href}
                  className="personal-v2-text-link"
                  data-link={
                    service.id === "consultation"
                      ? "personal-service-consultation"
                      : "personal-service-program"
                  }
                >
                  {service.label}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>

        <p className="personal-v2-services__note">
          Ne morate unaprijed znati koji vam oblik rada treba. Besplatna
          provjera ili uvodni razgovor služe upravo tome.
        </p>
      </div>
    </section>
  )
}

function PersonalFounder() {
  return (
    <section
      className="personal-v2-section personal-v2-founder"
      aria-labelledby="personal-founder-title"
    >
      <div className="personal-v2-shell personal-v2-founder__layout">
        <figure>
          <picture>
            <source
              type="image/webp"
              srcSet="/pavao-pahljina-480.webp 480w, /pavao-pahljina.webp 800w"
              sizes="(max-width: 767px) calc(100vw - 2rem), 420px"
            />
            <img
              src="/pavao-pahljina.jpg"
              alt="Pavao Pahljina u mediteranskom okruženju, Bitcoin savjetnik i autor."
              width="800"
              height="800"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <figcaption>Bitcoin od srpnja 2014.</figcaption>
        </figure>

        <div>
          <p className="personal-v2-eyebrow">TKO VODI PROCES</p>
          <h2 id="personal-founder-title">Pavao Pahljina</h2>
          <p className="personal-v2-founder__lead">
            Pavao je Bitcoin prvi put kupio u srpnju 2014., a na puni Bitcoin
            standard prešao je u listopadu 2020. Više od 10.000 sati proveo je
            proučavajući Bitcoin, novac i njihovu primjenu u osobnom,
            obiteljskom i poslovnom životu.
          </p>
          <ul>
            {personalFounderFacts.map((fact) => (
              <li key={fact}>
                <Check aria-hidden="true" />
                <span>{renderSaifedeanAmmousReference(fact)}</span>
              </li>
            ))}
          </ul>
          <blockquote>
            Okvir koji objašnjava nije zamišljen samo kao teorija. Pavao ga
            primjenjuje na vlastiti prihod, proračun, potrošnju, sigurnost i
            imovinu.
          </blockquote>
          <a
            href={personalLinks.founder}
            className="personal-v2-text-link"
            data-link="personal-founder"
          >
            Više o Pavlu
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

function PersonalBoundaries() {
  return (
    <section
      className="personal-v2-section personal-v2-boundaries"
      aria-labelledby="personal-boundaries-title"
    >
      <div className="personal-v2-shell personal-v2-boundaries__panel">
        <div>
          <ShieldCheck aria-hidden="true" />
          <p className="personal-v2-eyebrow">SIGURNOSNI OKVIR</p>
          <h2 id="personal-boundaries-title">Granice rada</h2>
          <p>
            Bitcoin Savjetovanje pomaže urediti razumijevanje, pitanja, pravila,
            odgovornosti i postupak. Ne preuzima upravljanje vašim novcem.
          </p>
        </div>
        <ul>
          {personalBoundaries.map((boundary) => (
            <li key={boundary}>
              <Check aria-hidden="true" />
              <span>{boundary}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function PersonalFinalCta() {
  return (
    <section
      className="personal-v2-section personal-v2-final"
      aria-labelledby="personal-final-title"
    >
      <div className="personal-v2-shell personal-v2-final__panel">
        <p className="personal-v2-eyebrow">PRVI KORAK</p>
        <h2 id="personal-final-title">
          Ne morate odmah graditi cijeli standard. Najprije provjerite gdje nema
          jasnog pravila.
        </h2>
        <p>
          Besplatna provjera pokazuje prvo područje koje traži pažnju. Kada već
          znate koje pitanje trebate razjasniti, možete krenuti uvodnim
          razgovorom.
        </p>
        <div className="personal-v2-final__actions">
          <Button asChild size="lg" className="personal-v2-final__button">
            <a
              href={personalLinks.assessment}
              data-cta="personal-final-assessment"
            >
              <FileCheck2 aria-hidden="true" />
              Napravite besplatnu provjeru
            </a>
          </Button>
          <a
            href={personalLinks.conversation}
            className="personal-v2-final__link"
            data-link="personal-final-conversation"
          >
            <Euro aria-hidden="true" />
            Dogovorite 15-minutni uvodni razgovor
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <p className="personal-v2-final__privacy">
          <ShieldCheck aria-hidden="true" />
          Bez e-adrese za provjeru, bez obveze za razgovor i bez slanja
          osjetljivih podataka.
        </p>
      </div>
    </section>
  )
}

export function PersonalPage() {
  const page = audiencePagesBySlug.osobno
  const socialImage = socialImages.audiences.osobno

  return (
    <>
      <Seo
        title={page.seo.title}
        description={page.seo.description}
        canonical={`${SITE_URL}${page.path}`}
        ogImage={socialImage.ogImage}
        ogImageWidth={socialImage.ogImageWidth}
        ogImageHeight={socialImage.ogImageHeight}
      />
      <article className="personal-v2-page">
        <PersonalHero />
        <PersonalStates />
        <BitcoinMoneyTransition />
        <PersonalStandardAreas />
        <MonthlyMoneyFlow />
        <PersonalExample />
        <WrittenStandardPreview />
        <PersonalStressTest />
        <PersonalServicePaths />
        <PersonalFounder />
        <PersonalBoundaries />
        <PersonalFinalCta />
      </article>
    </>
  )
}
