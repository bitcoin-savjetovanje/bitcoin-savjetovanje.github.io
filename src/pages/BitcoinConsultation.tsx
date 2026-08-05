import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  FileCheck2,
  FileText,
  ShieldCheck,
} from "lucide-react"

import { renderSaifedeanAmmousReference } from "@/components/SaifedeanAmmousReference"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import {
  consultationBoundaries,
  consultationContexts,
  consultationFaqs,
  consultationIncluded,
  consultationOutcomes,
  consultationProcess,
  consultationQuestions,
  consultationSummaryExample,
} from "@/content/bitcoinConsultation"
import { bitcoinConsultationRoute } from "@/content/clientRoutes"
import { offerFacts } from "@/content/offers"
import {
  CONVERSATION_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"

const consultationHero =
  "/images/consultation/bitcoin-konzultacija-hero-20260723.webp"

const comparisonRows = [
  {
    consultation: "Jedno pitanje ili odluka",
    standard: "Povezan sustav odluka",
  },
  {
    consultation: offerFacts.bitcoinConsultation.duration,
    standard: offerFacts.personalStandard.duration,
  },
  {
    consultation: "Kratak pisani sažetak",
    standard: "Cjelovit pisani standard",
  },
  {
    consultation: offerFacts.bitcoinConsultation.price,
    standard: offerFacts.personalStandard.price,
  },
  {
    consultation: "Za ograničeno usko grlo",
    standard: "Za proračun, dug, imovinu, korištenje i sigurnost kao cjelinu",
  },
] as const

const pricingIncludes = [
  "definiranje pitanja",
  "pregled pripreme",
  "razgovor od 60 minuta",
  "Sažetak Bitcoin konzultacije",
  "preporučeni materijali",
  "prvi sljedeći korak",
] as const

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string
  title: string
  copy?: string
}) {
  return (
    <div className="consultation-section-heading">
      {eyebrow ? <p className="consultation-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  )
}

export function BitcoinConsultation() {
  return (
    <>
      <Seo {...bitcoinConsultationRoute} />
      <article className="consultation-page">
        <header className="consultation-hero">
          <div className="consultation-shell consultation-hero__grid">
            <div className="consultation-hero__copy">
              <p className="consultation-eyebrow">
                Bitcoin konzultacija · {offerFacts.bitcoinConsultation.duration}{" "}
                · {offerFacts.bitcoinConsultation.price}
              </p>
              <h1>
                Razjasnite jedno ozbiljno Bitcoin pitanje u jednom dubinskom
                razgovoru
              </h1>
              <p className="consultation-hero__lead">
                Za odluku koja uključuje Bitcoin, dug, imovinu, obitelj,
                sigurnost ili poslovni novac — kada vam općeniti vodiči više
                nisu dovoljni, ali još ne trebate graditi cijeli osobni Bitcoin
                standard.
              </p>

              <ul
                className="consultation-fact-strip"
                aria-label="Ključne činjenice o konzultaciji"
              >
                <li>60 minuta</li>
                <li>200 €</li>
                <li>jedno pripremljeno pitanje</li>
                <li>pisani sažetak</li>
              </ul>

              <div className="consultation-hero__actions">
                <Button asChild size="lg" className="cta-primary">
                  <a
                    href={CONVERSATION_PATH}
                    data-cta="bitcoin-consultation-hero-conversation"
                  >
                    <CalendarDays aria-hidden="true" />
                    Provjerite je li konzultacija pravi korak
                  </a>
                </Button>
                <a
                  href="#dobra-pitanja"
                  className="consultation-text-link"
                  data-link="bitcoin-consultation-questions"
                >
                  Pogledajte primjere dobrih pitanja
                  <ArrowRight aria-hidden="true" />
                </a>
              </div>

              <p className="consultation-security-note">
                <ShieldCheck aria-hidden="true" />
                <span>
                  Prvi korak je besplatni 15-minutni razgovor. Ne šaljete
                  privatne ključeve, Bitcoin Core wallet backup datoteke, wallet
                  passphraseove, početne riječi drugih walleta, lozinke ni
                  pristup novčaniku.
                </span>
              </p>
            </div>

            <figure className="consultation-hero__figure">
              <img
                src={consultationHero}
                alt="Otvorena bilježnica na mediteranskom kamenom stolu povezuje jedno središnje pitanje s Bitcoinom, dugom, imovinom, obitelji, sigurnošću i vremenom."
                width="1672"
                height="941"
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>
                <span>Jedno pitanje u središtu</span>
                <strong>Okolnosti postaju dio iste odluke.</strong>
              </figcaption>
            </figure>
          </div>
        </header>

        <div className="consultation-shell consultation-main">
          <section className="consultation-section consultation-fit">
            <SectionHeading
              eyebrow="Odabir pravog oblika rada"
              title="Jedno pitanje ili cijeli sustav?"
              copy="Konzultacija ima smisla kada postoji jedna dovoljno jasno ograničena odluka. Kada su proračun, dug, imovina, korištenje Bitcoina, sigurnost i obitelj međusobno povezani, vjerojatno je potreban cijeli osobni Bitcoin standard."
            />

            <div className="consultation-question-contrast">
              <article>
                <p>Dovoljno usko pitanje</p>
                <blockquote>
                  Kako odrediti redoslijed razduživanja i ulogu Bitcoina tijekom
                  tog prijelaza?
                </blockquote>
              </article>
              <article>
                <p>Preširoko pitanje</p>
                <blockquote>
                  Kako urediti cijeli proračun, dug, nekretnine, Bitcoin,
                  obitelj i sigurnost?
                </blockquote>
              </article>
            </div>
            <p className="consultation-fit__note">
              Drugo pitanje nije loše pitanje. Samo nije realno kvalitetno ga
              riješiti u 60 minuta.
            </p>

            <div className="consultation-comparison">
              <article className="consultation-comparison__plan">
                <h3>Bitcoin konzultacija</h3>
                <ul>
                  {comparisonRows.map((row) => (
                    <li key={row.consultation}>{row.consultation}</li>
                  ))}
                </ul>
              </article>
              <article className="consultation-comparison__plan">
                <h3>Osobni Bitcoin standard</h3>
                <ul>
                  {comparisonRows.map((row) => (
                    <li key={row.standard}>{row.standard}</li>
                  ))}
                </ul>
              </article>
            </div>
            <p className="consultation-fit__bitcoin-note">
              Na punom Bitcoin standardu Bitcoin je primarni novac koji se
              redovito koristi za stvarne troškove. Cilj nije izbjegavati svaku
              prodaju ili trošenje Bitcoina, nego unaprijed znati zašto, kada i
              koliko ga koristite.
            </p>

            <div className="consultation-fit__footer">
              <a
                href={PERSONAL_BITCOIN_STANDARD_PATH}
                className="consultation-text-link"
                data-link="bitcoin-consultation-early-standard"
              >
                Pogledajte Osobni Bitcoin standard
                <ArrowUpRight aria-hidden="true" />
              </a>
              <p>Ne morate sami odabrati. Uvodni razgovor služi upravo tome.</p>
            </div>
          </section>

          <section className="consultation-section">
            <SectionHeading
              eyebrow="Pripremljen proces"
              title="Što je uključeno u Bitcoin konzultaciju?"
            />
            <div className="consultation-included">
              {consultationIncluded.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>
            <blockquote className="consultation-principle">
              Bitcoin konzultacija nije pristup tajnoj informaciji. To je
              pripremljen razgovor u kojem se javno dostupno znanje o Bitcoinu
              povezuje s jednom stvarnom odlukom u vašem životu.
            </blockquote>

            <div className="consultation-outcomes">
              <h3>Nakon konzultacije trebate imati</h3>
              <div>
                {consultationOutcomes.map((outcome) => (
                  <article key={outcome.title}>
                    <Check aria-hidden="true" />
                    <h4>{outcome.title}</h4>
                    <p>{outcome.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className="consultation-section consultation-questions"
            id="dobra-pitanja"
          >
            <SectionHeading
              eyebrow="Dovoljno konkretno"
              title="Primjeri pitanja koja su dovoljno konkretna za konzultaciju"
              copy="Dobra pitanja mijenjaju stvarnu odluku. Općenito pitanje poput „što mislite o Bitcoinu?” nije najbolja uporaba dubinske konzultacije."
            />
            <ol className="consultation-question-list">
              {consultationQuestions.map((item, index) => (
                <li key={item.area}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.area}</h3>
                  <p>{item.question}</p>
                </li>
              ))}
            </ol>

            <div className="consultation-contexts">
              <h3>Pitanje može dolaziti iz tri konteksta</h3>
              <div>
                {consultationContexts.map((context) => (
                  <article key={context.title}>
                    <h4>{context.title}</h4>
                    <p>{context.copy}</p>
                    <a href={context.href}>
                      Više o kontekstu
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="consultation-section consultation-process">
            <SectionHeading
              eyebrow="Četiri koraka"
              title="Od uvodnog razgovora do pisanog sažetka"
            />
            <ol className="consultation-timeline">
              {consultationProcess.map((step, index) => (
                <li key={step.title}>
                  <span>{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="consultation-section consultation-summary"
            id="sazetak-konzultacije"
          >
            <div className="consultation-summary__intro">
              <p className="consultation-eyebrow">Konkretan rezultat</p>
              <h2>Kako izgleda Sažetak Bitcoin konzultacije?</h2>
              <p>
                Sažetak je približno jedna stranica. Bilježi pitanje koje se
                obrađivalo, relevantne okolnosti, zaključke, otvorena pitanja,
                rizike ili ovisnosti, prvi sljedeći korak i preporučene
                materijale.
              </p>
              <p>
                To nije individualni financijski plan, nalog za kupnju ili
                prodaju niti pravni, porezni ili računovodstveni dokument.
              </p>
              <a
                href="#ogledni-sazetak"
                className="consultation-text-link"
                data-link="bitcoin-consultation-summary-example"
              >
                Pogledajte ogledni sažetak
                <ArrowRight aria-hidden="true" />
              </a>
            </div>

            <figure className="consultation-summary-sheet" id="ogledni-sazetak">
              <header>
                <div>
                  <span>Bitcoin Savjetovanje</span>
                  <strong>Sažetak Bitcoin konzultacije</strong>
                </div>
                <p>Izmišljeni primjer</p>
              </header>

              <section>
                <p className="consultation-summary-sheet__label">Pitanje</p>
                <h3>{consultationSummaryExample.question}</h3>
              </section>

              <div className="consultation-summary-sheet__grid">
                <section>
                  <h4>Ključne okolnosti</h4>
                  <ul>
                    {consultationSummaryExample.circumstances.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h4>Otvorena pitanja</h4>
                  <ul>
                    {consultationSummaryExample.openQuestions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <section>
                <h4>Glavni zaključci</h4>
                <p>{consultationSummaryExample.conclusions}</p>
              </section>

              <section className="consultation-summary-sheet__next">
                <h4>Prvi sljedeći korak</h4>
                <p>{consultationSummaryExample.nextStep}</p>
              </section>

              <footer>
                <p>Preporučeni materijali</p>
                <ul>
                  {consultationSummaryExample.materials.map((material) => (
                    <li key={material.href}>
                      <a href={material.href}>{material.label}</a>
                    </li>
                  ))}
                </ul>
              </footer>
            </figure>
          </section>

          <section className="consultation-section consultation-founder">
            <img
              src="/pavao-pahljina.jpg"
              alt="Pavao Pahljina, Bitcoin savjetnik"
              width="640"
              height="640"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="consultation-eyebrow">Tko vodi razgovor</p>
              <h2>Pavao Pahljina</h2>
              <p>
                Bitcoin sam prvi put kupio 2014., a na puni Bitcoin standard
                prešao sam u listopadu 2020. Više od 10.000 sati proveo sam
                proučavajući Bitcoin, novac i njihovu primjenu u stvarnim
                osobnim, obiteljskim i poslovnim odlukama.
              </p>
              <ul>
                <li>
                  {renderSaifedeanAmmousReference(
                    "iskustvo rada sa Saifedeanom Ammousom"
                  )}
                </li>
                <li>rad u Bitcoin industriji od 2020.</li>
                <li>višegodišnji javni edukativni rad</li>
                <li>primjena Bitcoin standarda u vlastitom životu</li>
              </ul>
              <a
                href="/pavao-pahljina/"
                className="consultation-text-link"
                data-link="bitcoin-consultation-founder-profile"
              >
                Više o iskustvu i radu
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </section>

          <section className="consultation-section consultation-boundaries">
            <div>
              <p className="consultation-eyebrow">Jasno od početka</p>
              <h2>Granice konzultacije</h2>
              <p>
                Konzultacija nije nalog za kupnju ili prodaju, prognoza cijene,
                upravljanje sredstvima, porezni, pravni ili računovodstveni
                savjet niti preuzimanje skrbništva.
              </p>
            </div>
            <ul>
              {consultationBoundaries.map((boundary) => (
                <li key={boundary}>
                  <ShieldCheck aria-hidden="true" />
                  <span>{boundary}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="consultation-section consultation-pricing">
            <div className="consultation-pricing__heading">
              <p className="consultation-eyebrow">Bitcoin konzultacija</p>
              <h2>200 € za jedan pripremljeni razgovor od 60 minuta</h2>
              <p>
                Konzultacija se ne kupuje neposredno. Prvi korak je besplatni
                15-minutni razgovor u kojem provjeravamo je li pitanje dovoljno
                jasno i je li konzultacija pravi oblik rada.
              </p>
            </div>

            <div className="consultation-pricing__details">
              <div className="consultation-pricing__facts">
                <div>
                  <Clock3 aria-hidden="true" />
                  <span>Trajanje</span>
                  <strong>60 minuta</strong>
                </div>
                <div>
                  <FileCheck2 aria-hidden="true" />
                  <span>Cijena</span>
                  <strong>200 €</strong>
                </div>
              </div>
              <ul>
                {pricingIncludes.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="consultation-pricing__actions">
              <Button asChild size="lg" className="cta-primary">
                <a
                  href={CONVERSATION_PATH}
                  data-cta="bitcoin-consultation-pricing-conversation"
                >
                  <CalendarDays aria-hidden="true" />
                  Dogovorite uvodni razgovor
                </a>
              </Button>
              <a
                href={PERSONAL_BITCOIN_STANDARD_PATH}
                className="consultation-text-link"
                data-link="bitcoin-consultation-pricing-standard"
              >
                Ili pogledajte Osobni Bitcoin standard
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <p className="consultation-pricing__note">
              Uvodni razgovor je bez naknade i bez obveze. Ako je za vaše
              pitanje dovoljan kraći odgovor, vodič ili drugi stručnjak, to ću
              otvoreno reći.
            </p>
          </section>

          <section className="consultation-section consultation-faq">
            <SectionHeading eyebrow="Česta pitanja" title="Prije razgovora" />
            <div className="consultation-faq__list">
              {consultationFaqs.map((faq) => (
                <details
                  key={faq.id}
                  onToggle={(event) => {
                    if (event.currentTarget.open) {
                      trackFirstPartyInteraction(
                        "bitcoin-consultation-faq-open",
                        { faq: faq.id }
                      )
                    }
                  }}
                >
                  <summary
                    onKeyDown={(event) => {
                      if (event.key !== "Enter" && event.key !== " ") {
                        return
                      }

                      event.preventDefault()
                      event.currentTarget.parentElement?.toggleAttribute("open")
                    }}
                  >
                    <span>{faq.question}</span>
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="consultation-final">
            <FileText aria-hidden="true" />
            <div>
              <h2>
                Jedno dobro definirano pitanje može promijeniti cijeli sljedeći
                korak.
              </h2>
              <p>
                Uvodni razgovor služi tome da provjerimo je li vaše pitanje
                dovoljno jasno za dubinsku Bitcoin konzultaciju ili je potreban
                drukčiji oblik rada.
              </p>
              <Button asChild size="lg" className="cta-primary">
                <a
                  href={CONVERSATION_PATH}
                  data-cta="bitcoin-consultation-final-conversation"
                >
                  <CalendarDays aria-hidden="true" />
                  Dogovorite 15-minutni razgovor
                </a>
              </Button>
              <p className="consultation-final__note">
                Bez naknade i bez obveze. Ne upravljam vašim sredstvima i ne
                tražim pristup vašem Bitcoinu.
              </p>
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
