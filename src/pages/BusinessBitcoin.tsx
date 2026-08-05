import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Download,
  ExternalLink,
  FileText,
  Mail,
} from "lucide-react"
import type { SyntheticEvent } from "react"

import { renderSaifedeanAmmousReference } from "@/components/SaifedeanAmmousReference"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import {
  bitcoinAdvisoryResponsibilities,
  briefingAgenda,
  briefingParticipants,
  briefingProcess,
  businessBitcoinFaqs,
  businessNextSteps,
  businessTriggers,
  executiveSummarySections,
  externalResponsibilities,
} from "@/content/business"
import { businessBitcoinRoute } from "@/content/clientRoutes"
import {
  BUSINESS_BITCOIN_ONE_PAGER_PATH,
  CUSTODY_SECURITY_PATH,
  EMAIL,
  PAVAO_PAHLJINA_PATH,
} from "@/content/site"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"

const BUSINESS_CONVERSATION_PATH = "/razgovor/?tema=tvrtka"
const SAMPLE_SUMMARY_PDF =
  "/downloads/ogledni-sazetak-bitcoin-briefinga-za-upravu.pdf"

const officialSources = [
  {
    label: "Uredba (EU) 2023/1114 o tržištima kriptoimovine",
    source: "EUR-Lex",
    href: "https://eur-lex.europa.eu/eli/reg/2023/1114/oj?locale=hr",
  },
  {
    label: "MiCA i središnji registar pružatelja",
    source: "ESMA",
    href: "https://www.esma.europa.eu/publications-and-data/databases-and-registers",
  },
  {
    label: "Registar ovlaštenih pružatelja usluga",
    source: "Hanfa",
    href: "https://www.hanfa.hr/registri/trziste-kriptoimovine/registar-drustava-ovlastenih-pruzati-usluge-povezane-s-kriptoimovinom-mica/",
  },
  {
    label: "Uredba o tržištima kriptoimovine (MiCA)",
    source: "HNB",
    href: "https://www.hnb.hr/-/uredba-o-trzistima-kriptoimovine-mica",
  },
] as const

function BusinessDecisionMap() {
  return (
    <div className="business-decision-map">
      <ol aria-label="Proces Bitcoin briefinga za upravu">
        {briefingProcess.map((step, index) => (
          <li key={step.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function ExecutiveSummaryPreview() {
  return (
    <figure className="business-summary-preview">
      <div className="business-summary-preview__document">
        <div className="business-summary-preview__masthead">
          <span>BITCOIN SAVJETOVANJE</span>
          <span>01 / 04</span>
        </div>
        <div className="business-summary-preview__label">
          IZMIŠLJENI OGLEDNI PRIMJER
        </div>
        <p className="business-summary-preview__eyebrow">
          Sažetak Bitcoin briefinga za upravu
        </p>
        <h3>Primjer poslovnog povoda i mape odgovornosti</h3>
        <p className="business-summary-preview__intro">
          Uprava priprema odgovor na upit klijenta o Bitcoin plaćanju. Nema
          odluke o držanju Bitcoina niti o promjeni poslovne pričuve.
        </p>
        <div className="business-summary-preview__grid">
          <div>
            <span>ODLUKA UPRAVE</span>
            <strong>Definirati svrhu i dopušteni opseg pilota</strong>
          </div>
          <div>
            <span>FINANCIJE</span>
            <strong>Provjeriti tok naplate, evidenciju i konverziju</strong>
          </div>
          <div>
            <span>VANJSKI STRUČNJACI</span>
            <strong>Potvrditi pravni, porezni i računovodstveni tretman</strong>
          </div>
          <div>
            <span>SLJEDEĆI KORAK</span>
            <strong>Prikupiti mišljenja prije izbora pružatelja</strong>
          </div>
        </div>
        <p className="business-summary-preview__footer">
          Edukacijski i organizacijski dokument · nije pravno, porezno,
          računovodstveno ni regulirano savjetovanje o kriptoimovini
        </p>
      </div>
      <figcaption>
        Ogledni prikaz pokazuje strukturu dokumenta koji uprava može podijeliti
        s financijama, pravnikom, računovođom ili nadzornim odborom. Ne sadrži
        podatke stvarne tvrtke.
      </figcaption>
    </figure>
  )
}

function BusinessFaq() {
  function trackFaqOpen(
    event: SyntheticEvent<HTMLDetailsElement>,
    index: number
  ) {
    if (!event.currentTarget.open) {
      return
    }

    trackFirstPartyInteraction("business-faq-open", { index: index + 1 })
  }

  return (
    <section
      className="business-section business-faq-section"
      aria-labelledby="business-faq-title"
    >
      <div className="business-section-heading">
        <p className="business-eyebrow">Česta pitanja</p>
        <h2 id="business-faq-title">Kratki odgovori prije razgovora</h2>
      </div>
      <div className="business-faq-list">
        {businessBitcoinFaqs.map((faq, index) => (
          <details
            key={faq.question}
            onToggle={(event) => trackFaqOpen(event, index)}
          >
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function BusinessBitcoin() {
  return (
    <>
      <Seo {...businessBitcoinRoute} />
      <article className="business-briefing-page">
        <header className="business-hero">
          <div className="business-shell business-hero__grid">
            <div className="business-hero__copy">
              <p className="business-eyebrow">
                BITCOIN BRIEFING ZA UPRAVU · 90–120 MINUTA
              </p>
              <h1>
                Prije odluke o Bitcoinu, uprava mora znati koja pitanja
                pripadaju kome.
              </h1>
              <p className="business-hero__lead">
                Zatvoreni radni sastanak za vlasnika, upravu i financijski tim.
                Razdvajamo edukaciju, plaćanja, poslovni novac, sigurnost,
                računovodstvo i regulirane usluge te završavamo jasnim popisom
                otvorenih odluka, odgovornih osoba i sljedećih koraka.
              </p>
              <ul
                className="business-hero__facts"
                aria-label="Ključne činjenice o briefingu"
              >
                <li>90–120 minuta</li>
                <li>priprema unaprijed</li>
                <li>zatvoreni format</li>
                <li>pisani sažetak za upravu</li>
              </ul>
              <div className="business-hero__actions">
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={BUSINESS_CONVERSATION_PATH}
                    data-cta="business-hero-conversation"
                  >
                    <CalendarDays aria-hidden="true" />
                    Dogovorite poslovni uvodni razgovor
                  </a>
                </Button>
                <span
                  className="business-hero__action-separator"
                  aria-hidden="true"
                >
                  ·
                </span>
                <a
                  href="#sazetak-za-upravu"
                  className="business-text-link"
                  data-link="business-summary-preview"
                >
                  Pogledajte primjer sažetka za upravu
                  <ArrowDown aria-hidden="true" />
                </a>
              </div>
              <p className="business-hero__note">
                Edukacija i organizacijski okvir, bez upravljanja imovinom,
                skrbništva i izvršenja transakcija.
              </p>
              <a
                href="/poduzetnici/"
                className="business-text-link business-hero__entrepreneur-link"
                data-link="business-entrepreneurs"
              >
                Samostalno vodite posao? Pogledajte stranicu za poduzetnike.
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <figure className="business-hero__visual">
            <picture>
              <source
                srcSet="/images/business/bitcoin-briefing-hero-20260724.webp"
                type="image/webp"
              />
              <img
                src="/images/business/bitcoin-briefing-hero-20260724.png"
                alt="Mediteranska terasa s tri odvojena poslovna dokumenta, arhitektonskim modelom tvrtke, ključem i diskretnim Bitcoin znakom."
                width="1672"
                height="941"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </figure>
        </header>
        <p className="business-shell business-duration-note">
          Standardno 90 minuta; do 120 minuta kada sudjeluje veći upravljački
          tim ili je potrebno razdvojiti više poslovnih tokova.
        </p>

        <main className="business-shell">
          <section
            className="business-section business-triggers"
            aria-labelledby="business-triggers-title"
          >
            <div className="business-section-heading">
              <p className="business-eyebrow">Poslovni povodi</p>
              <h2 id="business-triggers-title">
                Tvrtke se najčešće javljaju prije nego što imaju spreman odgovor
              </h2>
            </div>
            <ol className="business-editorial-list">
              {businessTriggers.map((trigger, index) => (
                <li key={trigger.title}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{trigger.title}</h3>
                    <p>{trigger.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="business-section business-purpose"
            aria-labelledby="business-purpose-title"
          >
            <div className="business-section-heading">
              <p className="business-eyebrow">Radni proces</p>
              <h2 id="business-purpose-title">
                Cilj briefinga nije odluka o kupnji
              </h2>
              <p>
                Ne počinjemo pitanjem treba li tvrtka kupiti Bitcoin. Počinjemo
                pitanjem koje odluke postoje, tko je za njih odgovoran i koja
                stručna mišljenja nedostaju prije bilo kakvog operativnog
                koraka.
              </p>
            </div>
            <BusinessDecisionMap />
            <blockquote>
              Dobar briefing ne završava preporukom postotka bilance. Završava
              jasnim pitanjima, odgovornostima i redoslijedom rada.
            </blockquote>
          </section>

          <section
            className="business-section business-agenda"
            aria-labelledby="business-agenda-title"
          >
            <div className="business-section-heading">
              <p className="business-eyebrow">Dnevni red</p>
              <h2 id="business-agenda-title">
                Što prolazimo tijekom briefinga?
              </h2>
            </div>
            <ol className="business-agenda__list">
              {briefingAgenda.map((item, index) => (
                <li key={item.title}>
                  <span aria-hidden="true">{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href={CUSTODY_SECURITY_PATH}
              className="business-text-link"
              data-link="business-custody-context"
            >
              Pogledajte poslovni kontekst skrbništva i ovlasti
              <ArrowUpRight aria-hidden="true" />
            </a>
          </section>

          <section
            id="sazetak-za-upravu"
            className="business-section business-summary"
            aria-labelledby="business-summary-title"
          >
            <div className="business-summary__copy">
              <div className="business-section-heading">
                <p className="business-eyebrow">KONKRETAN REZULTAT</p>
                <h2 id="business-summary-title">
                  Nakon briefinga dobivate Sažetak Bitcoin briefinga za upravu
                </h2>
                <p>
                  Dokument od približno dvije do četiri stranice pretvara
                  razgovor u interni trag odluka koji se može proslijediti
                  ljudima odgovornima za sljedeću provjeru.
                </p>
              </div>
              <dl className="business-summary__contents">
                {executiveSummarySections.map((item) => (
                  <div key={item.title}>
                    <dt>{item.title}</dt>
                    <dd>{item.copy}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={SAMPLE_SUMMARY_PDF}
                className="business-download-link"
                data-cta="business-summary-pdf-download"
                download
              >
                <Download aria-hidden="true" />
                Preuzmite ogledni sažetak u PDF-u
                <span>PDF · 4 stranice</span>
              </a>
            </div>
            <ExecutiveSummaryPreview />
          </section>

          <section
            className="business-section business-participants"
            aria-labelledby="business-participants-title"
          >
            <div className="business-section-heading">
              <p className="business-eyebrow">Sudionici</p>
              <h2 id="business-participants-title">
                Tko treba biti za stolom?
              </h2>
            </div>
            <div className="business-participants__grid">
              {briefingParticipants.map((participant, index) => (
                <article key={participant.title}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{participant.title}</h3>
                  <p>{participant.copy}</p>
                </article>
              ))}
            </div>
            <p className="business-participants__note">
              Pravnik, računovođa, revizor, porezni savjetnik ili drugi
              stručnjak mogu se uključiti prema stvarnom pitanju. Briefing ne
              uključuje niti zamjenjuje njihovo stručno mišljenje.
            </p>
          </section>

          <section
            className="business-section business-next-steps"
            aria-labelledby="business-next-steps-title"
          >
            <div className="business-section-heading">
              <p className="business-eyebrow">Mogući ishodi</p>
              <h2 id="business-next-steps-title">
                Što se može dogoditi nakon briefinga?
              </h2>
              <p>
                Ovo nisu koraci obvezne prodajne ljestvice. Briefing može
                završiti zaključkom da sada ne treba raditi ništa.
              </p>
            </div>
            <div className="business-outcome-list">
              {businessNextSteps.map((step, index) => (
                <article key={step.title}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                    {step.title === "Procjena Bitcoin spremnosti tvrtke" ? (
                      <a
                        href={BUSINESS_CONVERSATION_PATH}
                        data-link="business-readiness-interest"
                      >
                        Razjasnite je li procjena potrebna
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    ) : null}
                    {step.title === "Edukacija uprave ili zaposlenika" ? (
                      <a
                        href="#edukacija-zaposlenika"
                        data-link="business-employee-education"
                      >
                        Više o edukaciji zaposlenika
                        <ArrowDown aria-hidden="true" />
                      </a>
                    ) : null}
                    {step.title === "Interni poslovni Bitcoin okvir" ? (
                      <a
                        href={BUSINESS_CONVERSATION_PATH}
                        data-link="business-internal-framework"
                      >
                        Razjasnite opseg internog okvira
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
            <aside
              id="edukacija-zaposlenika"
              className="business-employee-note"
            >
              <div>
                <p className="business-eyebrow">Sekundarni format</p>
                <h3>Tražite edukaciju za zaposlenike?</h3>
                <p>
                  Neutralna edukacija o novcu, proračunu, dugu, digitalnoj
                  sigurnosti i Bitcoinu, bez nagovaranja zaposlenika na kupnju
                  ili ulaganje.
                </p>
              </div>
              <a
                href={BUSINESS_CONVERSATION_PATH}
                className="business-text-link"
                data-link="business-employee-education-conversation"
              >
                Pogledajte edukaciju za zaposlenike
                <ArrowUpRight aria-hidden="true" />
              </a>
            </aside>
          </section>

          <section
            className="business-section business-responsibilities"
            aria-labelledby="business-responsibilities-title"
          >
            <div className="business-section-heading">
              <p className="business-eyebrow">Opseg i odgovornost</p>
              <h2 id="business-responsibilities-title">Tko radi što?</h2>
            </div>
            <div className="business-responsibilities__grid">
              <article>
                <h3>Bitcoin Savjetovanje</h3>
                <ul>
                  {bitcoinAdvisoryResponsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>Vanjski stručnjaci i pružatelji</h3>
                <ul>
                  {externalResponsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
            <p className="business-responsibilities__boundary">
              Briefing ne daje pravno tumačenje propisa za konkretnu tvrtku.
              Pomaže upravi prepoznati koja pitanja treba uputiti odgovarajućem
              stručnjaku i koje pružatelje treba provjeriti prije operativnog
              koraka.
            </p>
            <aside className="business-regulatory-sources">
              <div>
                <p className="business-eyebrow">
                  Službeni izvori za daljnju provjeru
                </p>
                <h3>Regulatorni okvir provjerava se prije svake odluke</h3>
                <p>
                  Status pružatelja i opseg dopuštenih usluga provjeravaju se u
                  aktualnim službenim registrima. Regulatorni izvori provjereni:
                  srpanj 2026.
                </p>
              </div>
              <ul>
                {officialSources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      data-link="business-regulatory-source"
                    >
                      <span>{source.source}</span>
                      {source.label}
                      <ExternalLink aria-hidden="true" />
                      <span className="sr-only">
                        {" "}
                        (otvara se u novoj kartici)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="business-regulatory-sources__review">
                Ovaj regulatorni tekst i stvarni opseg usluge trebaju ručni
                pregled hrvatskog pravnika koji poznaje MiCA-u.
              </p>
            </aside>
          </section>

          <section
            className="business-section business-founder"
            aria-labelledby="business-founder-title"
          >
            <div className="business-founder__portrait">
              <picture>
                <source
                  srcSet="/pavao-pahljina-480.webp 480w, /pavao-pahljina.webp 800w"
                  type="image/webp"
                />
                <img
                  src="/pavao-pahljina.jpg"
                  alt="Pavao Pahljina."
                  width="800"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <span>Bitcoin Savjetovanje</span>
            </div>
            <div>
              <p className="business-eyebrow">Tko vodi sastanak</p>
              <h2 id="business-founder-title">Pavao Pahljina</h2>
              <p className="business-founder__lead">
                Pavao povezuje dugogodišnji rad s Bitcoinom, iskustvo vođenja
                tvrtke, obrazovanje i praktičnu primjenu Bitcoin standarda.
              </p>
              <ul className="business-founder__facts">
                <li>
                  Suosnivač i bivši direktor STEMI-ja, s iskustvom izgradnje
                  tvrtke te upravljanja ljudima, proizvodima i novčanim tokom.
                </li>
                <li>
                  {renderSaifedeanAmmousReference(
                    "U Bitcoin industriji od 2020.; blisko je radio sa Saifedeanom Ammousom na obrazovanju, podcastima, izdavaštvu, internetskoj trgovini i operativnim procesima."
                  )}
                </li>
                <li>
                  Više od 10.000 sati rada i učenja, puni Bitcoin standard od
                  listopada 2020. i javni edukativni rad kroz DvadesetJedan od
                  2022.
                </li>
              </ul>
              <p>
                U poslovnom briefingu privatno uvjerenje vlasnika ostaje
                odvojeno od odgovornosti, novčanog toka i odluke pravne osobe.
              </p>
              <a
                href={PAVAO_PAHLJINA_PATH}
                className="business-text-link"
                data-link="business-founder"
              >
                Više o Pavlu
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </section>

          <section
            id="cijena-i-ugovaranje"
            className="business-section business-pricing"
            aria-labelledby="business-pricing-title"
          >
            <div className="business-pricing__copy">
              <p className="business-eyebrow">Cijena i ugovaranje</p>
              <h2 id="business-pricing-title">
                Pisanu ponudu dobivate nakon kratkog poslovnog razgovora
              </h2>
              <p>
                Na cijenu utječu broj sudionika, potrebna priprema, trajanje,
                mrežni ili fizički format, putovanje i opseg završnog dokumenta.
              </p>
              <div className="business-pricing__actions">
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={BUSINESS_CONVERSATION_PATH}
                    data-cta="business-pricing-conversation"
                  >
                    <CalendarDays aria-hidden="true" />
                    Dogovorite poslovni uvodni razgovor
                  </a>
                </Button>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                    "Poslovni upit — Bitcoin briefing za upravu"
                  )}`}
                  className="business-text-link"
                  data-link="business-email-inquiry"
                >
                  <Mail aria-hidden="true" />
                  Pošaljite poslovni upit
                </a>
              </div>
            </div>
            <aside className="business-pricing__included">
              <p>Standardno uključeno</p>
              <ul>
                <li>kratki poslovni uvodni razgovor</li>
                <li>priprema dnevnog reda</li>
                <li>
                  Standardno 90 minuta; do 120 minuta kada sudjeluje veći
                  upravljački tim ili je potrebno razdvojiti više poslovnih
                  tokova.
                </li>
                <li>Sažetak Bitcoin briefinga za upravu</li>
                <li>preporučeni organizacijski sljedeći korak</li>
              </ul>
            </aside>
          </section>

          <BusinessFaq />

          <section
            className="business-section business-final-cta"
            aria-labelledby="business-final-title"
          >
            <div>
              <p className="business-eyebrow">Prvi korak</p>
              <h2 id="business-final-title">
                Prvi korak nije kupnja Bitcoina. Prvi korak je jasno poslovno
                pitanje.
              </h2>
              <p>
                U kratkom poslovnom razgovoru utvrđujemo što je otvorilo temu,
                tko treba sudjelovati i je li briefing pravi sljedeći korak.
              </p>
              <div className="business-final-cta__actions">
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={BUSINESS_CONVERSATION_PATH}
                    data-cta="business-final-conversation"
                  >
                    <CalendarDays aria-hidden="true" />
                    Dogovorite poslovni uvodni razgovor
                  </a>
                </Button>
                <a
                  href={BUSINESS_BITCOIN_ONE_PAGER_PATH}
                  className="business-text-link"
                  data-link="business-one-pager-open"
                >
                  <FileText aria-hidden="true" />
                  Otvorite sažetak za upravu
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
              <p className="business-final-cta__note">
                Bez obveze i bez slanja osjetljivih poslovnih, financijskih ili
                sigurnosnih podataka.
              </p>
            </div>
          </section>
        </main>
      </article>
    </>
  )
}
