import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  ShieldCheck,
} from "lucide-react"

import { renderSaifedeanAmmousReference } from "@/components/SaifedeanAmmousReference"
import { Button } from "@/components/ui/button"
import { homepageFaqs } from "@/content/faq"
import {
  BITCOIN_CONSULTATION_PATH,
  BITCOIN_STANDARD_CHECK_PATH,
  CONVERSATION_PATH,
  CUSTODY_SECURITY_PATH,
  MISSED_BITCOIN_PATH,
  OPEN_MANUSCRIPT_URL,
  PAVAO_PAHLJINA_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_COVER_WEBP_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"

const problems = [
  {
    number: "01",
    title: "Odluke još počinju u eurima",
    copy: "Prihod, troškove i imovinu i dalje promatrate prvenstveno kroz euro, dok Bitcoin ostaje izdvojena pozicija koju idealno ne dirate.",
  },
  {
    number: "02",
    title: "Cijena previše utječe na ponašanje",
    copy: "Rast stvara želju da kupite više, pad izaziva sumnju, a stara cijena koju ste propustili i dalje utječe na današnje odluke.",
  },
  {
    number: "03",
    title: "Pravila postoje samo u vašoj glavi",
    copy: "Partner, obitelj ili osoba od povjerenja ne znaju kako je sustav zamišljen, kako se Bitcoinu pristupa i što treba napraviti bez vas.",
  },
] as const

const audiencePaths = [
  {
    marker: "A",
    title: "Još nemam Bitcoin i mislim da sam zakasnio",
    copy: "Za Bitcoin znate godinama, ali još nemate jasan način kako procijeniti današnju odluku bez žaljenja zbog prošle cijene.",
    label: "Počnite ovdje",
    href: MISSED_BITCOIN_PATH,
    dataCta: "home-path-missed-bitcoin",
  },
  {
    marker: "B",
    title: "Imam Bitcoin, ali nemam jasna pravila",
    copy: "Povremeno kupujete ili držite Bitcoin, ali nemate uređene odluke o proračunu, dugovima, trošenju, ostatku imovine i sigurnosti.",
    label: "Napravite besplatnu provjeru",
    href: BITCOIN_STANDARD_CHECK_PATH,
    dataCta: "home-path-assessment",
  },
  {
    marker: "C",
    title: "Bitcoin je već važan dio moje imovine",
    copy: "Imate značajnu Bitcoin poziciju, složeniju bilancu ili obiteljski i poslovni kontekst koji treba povezati u cjelovit sustav.",
    label: "Dogovorite uvodni razgovor",
    href: CONVERSATION_PATH,
    dataCta: "home-path-conversation",
  },
] as const

const pillars = [
  {
    number: "01",
    title: "Uređene osobne financije",
    copy: "Znate kamo odlazi novac, koje vas obveze ograničavaju i iz kojeg položaja donosite Bitcoin odluke.",
    items: ["proračun", "dug", "davanje", "namjena svakog dijela novca"],
  },
  {
    number: "02",
    title: "Bitcoin kao primarni novac",
    copy: "Bitcoin nije izdvojena investicija koju ne dirate, nego novac iz kojeg financirate stvarni život.",
    items: [
      "pretvaranje prihoda u Bitcoin",
      "minimalan operativni saldo u eurima",
      "redoviti i veći troškovi",
      "pravila kupnje i trošenja",
    ],
  },
  {
    number: "03",
    title: "Cjelovita bilanca",
    copy: "Ne promatramo Bitcoin izolirano, nego u odnosu na sve što posjedujete i dugujete.",
    items: [
      "Bitcoin",
      "nekretnine",
      "poslovna i ostala kapitalna imovina",
      "uloga svakog dijela neto imovine",
    ],
  },
  {
    number: "04",
    title: "Sigurnost kroz vrijeme",
    copy: "Sustav mora ostati razumljiv i provediv i tijekom velikog pada cijene i kada mu vi ne možete pristupiti.",
    items: [
      "volatilnost i skrbništvo",
      "sigurnosne kopije i oporavak",
      "osoba od povjerenja",
      "obiteljski plan i nasljeđivanje",
    ],
  },
] as const

const sampleConclusions = [
  "Pravilo pretvaranja prihoda u Bitcoin",
  "Operativni saldo u eurima",
  "Plan razduživanja",
  "Uloga nekretnine i druge imovine",
  "Pravilo za veće troškove",
  "Skrbnički model i prvi korak oporavka",
  "Obiteljski plan",
  "Datum sljedeće revizije",
] as const

const processSteps = [
  {
    title: "Mapiramo stvarnu situaciju",
    copy: "Prihodi, troškovi, dugovi, imovina, Bitcoin, obiteljske obveze i sadašnji način čuvanja.",
  },
  {
    title: "Donosimo i zapisujemo odluke",
    copy: "Određujemo ulogu Bitcoina, operativne eure, ritam provedbe, prioritete i pravila za iznimne situacije.",
  },
  {
    title: "Provodimo stres-test sustava",
    copy: "Provjeravamo kako okvir djeluje tijekom velikog pada cijene, promjene prihoda, većeg troška ili nemogućnosti vašeg pristupa.",
  },
] as const

type HomeService = {
  title: string
  price: string
  meta: string
  copy: string
  primary: string
  primaryData: string
  href: string
  details?: string
  detailsHref?: string
  detailsData?: string
}

const services: readonly HomeService[] = [
  {
    title: "Uvodni razgovor",
    price: "0 €",
    meta: "15 minuta",
    copy: "Petnaest minuta da razumijemo kontekst, odredimo prvo usko grlo i vidimo postoji li smislen nastavak.",
    primary: "Dogovorite razgovor",
    primaryData: "home-service-intro-call",
    href: CONVERSATION_PATH,
  },
  {
    title: "Bitcoin konzultacija",
    price: "200 €",
    meta: "60 minuta",
    copy: "Šezdeset minuta dubinskog rada na jednom konkretnom pitanju ili odluci, uz jasan sažetak i sljedeće korake.",
    primary: "Krenite od uvodnog razgovora",
    primaryData: "home-service-consultation-call",
    href: CONVERSATION_PATH,
    details: "Pogledajte detalje konzultacije",
    detailsHref: BITCOIN_CONSULTATION_PATH,
    detailsData: "home-service-consultation-details",
  },
  {
    title: "Osobni Bitcoin standard",
    price: "1.500 €",
    meta: "Cjelovit rad · 4–6 tjedana",
    copy: "Povezivanje proračuna, duga, imovine, pravila korištenja, sigurnosti i obiteljskog kontinuiteta u pisani osobni sustav.",
    primary: "Krenite od uvodnog razgovora",
    primaryData: "home-service-standard-call",
    href: CONVERSATION_PATH,
    details: "Pogledajte detalje programa",
    detailsHref: PERSONAL_BITCOIN_STANDARD_PATH,
    detailsData: "home-service-standard-details",
  },
]

const guides = [
  {
    kicker: "ZA POČETAK",
    title: "Mogao sam kupiti Bitcoin ranije. Što sada?",
    copy: "Za osobu koja još nema Bitcoin ili odluku i dalje promatra kroz propuštenu cijenu.",
    href: MISSED_BITCOIN_PATH,
    dataLink: "home-guide-missed-bitcoin",
  },
  {
    kicker: "ZA UREĐENJE SUSTAVA",
    title: "Kako urediti osobni Bitcoin standard",
    copy: "Za osobu koja već ima Bitcoin, ali nema povezana i zapisana pravila.",
    href: PERSONAL_BITCOIN_STANDARD_PATH,
    dataLink: "home-guide-personal-standard",
  },
  {
    kicker: "ZA SIGURNOST",
    title: "Skrbništvo, sigurnost i obitelj",
    copy: "Za osobu kojoj je najveće pitanje siguran pristup i kontinuitet bez nje.",
    href: CUSTODY_SECURITY_PATH,
    dataLink: "home-guide-security",
  },
] as const

export function RecognitionSection() {
  return (
    <section id="prepoznavanje" className="home-v2-section home-v2-recognition">
      <div className="home-v2-shell">
        <div className="home-v2-section-heading home-v2-section-heading--split">
          <div>
            <p className="home-v2-eyebrow">PREPOZNAJETE LI SE?</p>
            <h2>Imam Bitcoin, ali nemam jasna pravila.</h2>
          </div>
          <p>
            Bitcoin je već dio vaše imovine, ali odluke o prihodu, kupnji,
            trošenju, dugovima, nekretninama i sigurnosti još nisu povezane u
            jedan sustav.
          </p>
        </div>

        <ol className="home-v2-problem-list">
          {problems.map((problem) => (
            <li key={problem.number}>
              <span>{problem.number}</span>
              <h3>{problem.title}</h3>
              <p>{problem.copy}</p>
            </li>
          ))}
        </ol>

        <div className="home-v2-transition-copy">
          <p>
            Prvi korak je utvrditi koji dio sustava trenutačno najviše
            nedostaje.
          </p>
          <a
            href={BITCOIN_STANDARD_CHECK_PATH}
            className="home-v2-text-link"
            data-cta="home-recognition-assessment"
          >
            Napravite besplatnu provjeru
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

export function AudiencePathsSection() {
  return (
    <section className="home-v2-section home-v2-paths">
      <div className="home-v2-shell">
        <div className="home-v2-section-heading">
          <p className="home-v2-eyebrow">TRI ULAZA</p>
          <h2>Gdje se danas nalazite?</h2>
        </div>
        <ol className="home-v2-path-list">
          {audiencePaths.map((path) => (
            <li key={path.marker}>
              <a href={path.href} data-cta={path.dataCta}>
                <span className="home-v2-path-list__marker">{path.marker}</span>
                <div>
                  <h3>{path.title}</h3>
                  <p>{path.copy}</p>
                  <strong>
                    {path.label}
                    <ArrowUpRight aria-hidden="true" />
                  </strong>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function AssessmentTeaserSection() {
  return (
    <section id="provjera" className="home-v2-section home-v2-assessment">
      <div className="home-v2-shell home-v2-assessment__panel">
        <div>
          <p className="home-v2-eyebrow">BESPLATNA SAMOPROVJERA</p>
          <h2>Imate li Bitcoin ili imate sustav za život s Bitcoinom?</h2>
          <p>
            Deset pitanja pomoći će vam prepoznati nedostaje li vam
            razumijevanje, uređena financijska osnova, jasna pravila korištenja
            ili sigurnosni i obiteljski plan.
          </p>
          <strong className="home-v2-assessment__facts">
            10 pitanja <span>·</span> oko 3 minute <span>·</span> bez e-adrese
          </strong>
          <Button asChild size="lg" className="home-v2-primary-button">
            <a
              href={BITCOIN_STANDARD_CHECK_PATH}
              data-cta="home-assessment-teaser"
            >
              <ClipboardCheck aria-hidden="true" />
              Napravite besplatnu provjeru
            </a>
          </Button>
          <p className="home-v2-assessment__privacy">
            <ShieldCheck aria-hidden="true" />
            Ne unosite iznose, adrese novčanika, privatne ključeve, Bitcoin Core
            wallet backup datoteke, wallet passphraseove, početne riječi drugih
            walleta ni druge osjetljive podatke.
          </p>
        </div>
        <picture className="home-v2-assessment__visual">
          <source
            media="(max-width: 767px)"
            srcSet="/images/bitcoin-savjetovanje-system-hero-mobile-20260723.webp"
            type="image/webp"
          />
          <source
            srcSet="/images/bitcoin-savjetovanje-system-hero-20260723.webp"
            type="image/webp"
          />
          <img
            src="/images/bitcoin-savjetovanje-system-hero-20260723.webp"
            alt="Povezana karta prihoda, proračuna, duga, imovine, trošenja, sigurnosti i Bitcoina na mediteranskom kamenom stolu"
            width="1536"
            height="1024"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  )
}

export function StandardPillarsSection() {
  return (
    <section id="okvir" className="home-v2-section home-v2-pillars">
      <div className="home-v2-shell">
        <div className="home-v2-section-heading home-v2-section-heading--split">
          <div>
            <p className="home-v2-eyebrow">OSOBNI BITCOIN STANDARD</p>
            <h2>Što zapravo uređujemo?</h2>
          </div>
          <p>
            Bitcoin standard ne sastoji se od jedne odluke o kupnji. To je način
            na koji su novac, obveze, imovina, trošenje i sigurnost povezani
            kroz vrijeme.
          </p>
        </div>

        <div className="home-v2-pillar-grid">
          {pillars.map((pillar) => (
            <article key={pillar.number}>
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
              <ul>
                {pillar.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <a
          href="/vodici/"
          className="home-v2-text-link"
          data-link="home-all-seven-areas"
        >
          Pogledajte svih sedam područja
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export function SampleStandardSection() {
  return (
    <section id="primjer" className="home-v2-section home-v2-sample">
      <div className="home-v2-shell home-v2-sample__layout">
        <div className="home-v2-sample__copy">
          <p className="home-v2-eyebrow">KONKRETAN REZULTAT</p>
          <h2>Kako izgleda uređen osobni Bitcoin standard?</h2>
          <p>
            Ne dobivate općeniti popis savjeta. Dobivate zapisane odluke,
            redoslijed provedbe i pitanja koja još treba riješiti.
          </p>
          <ul>
            {sampleConclusions.map((conclusion) => (
              <li key={conclusion}>
                <Check aria-hidden="true" />
                <span>{conclusion}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="home-v2-primary-button">
            <a
              href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH}
              data-cta="home-sample-standard"
            >
              <FileCheck2 aria-hidden="true" />
              Pogledajte ogledni osobni Bitcoin standard
            </a>
          </Button>
          <p className="home-v2-small-note">
            Primjer je ilustrativan. Stvarni dokument prilagođava se vašim
            prihodima, obvezama, imovini, obitelji i načinu čuvanja Bitcoina.
          </p>
        </div>

        <figure className="home-v2-document-preview">
          <div className="home-v2-document-preview__back" aria-hidden="true">
            <p>Pravila korištenja</p>
            <span />
            <span />
            <span />
            <p>Sigurnost i kontinuitet</p>
            <span />
            <span />
          </div>
          <div className="home-v2-document-preview__front">
            <img
              src={SAMPLE_PERSONAL_BITCOIN_STANDARD_COVER_WEBP_PATH}
              alt="Naslovnica oglednog osobnog Bitcoin standarda"
              width="1055"
              height="1491"
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>Ogledni prikaz strukture pisanog standarda</figcaption>
        </figure>
      </div>
    </section>
  )
}

export function ProcessSection() {
  return (
    <section className="home-v2-section home-v2-process">
      <div className="home-v2-shell">
        <div className="home-v2-section-heading">
          <p className="home-v2-eyebrow">NAČIN RADA</p>
          <h2>Od nejasne situacije do zapisanih pravila</h2>
        </div>
        <ol className="home-v2-process-list">
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>
        <a
          href={PERSONAL_BITCOIN_STANDARD_PATH}
          className="home-v2-text-link"
          data-link="home-process-program"
        >
          Pogledajte kako izgleda program
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export function ServicesSection() {
  return (
    <section id="suradnja" className="home-v2-section home-v2-services">
      <div className="home-v2-shell">
        <div className="home-v2-section-heading home-v2-section-heading--split">
          <div>
            <p className="home-v2-eyebrow">NAČIN SURADNJE</p>
            <h2>Koliko dubine treba vašoj odluci?</h2>
          </div>
          <p>
            Ne morate unaprijed znati koju uslugu trebate. Uvodni razgovor služi
            tome da utvrdimo postoji li jedno konkretno pitanje ili potreba za
            uređenjem cijelog sustava.
          </p>
        </div>

        <div className="home-v2-service-grid">
          {services.map((service, index) => (
            <article key={service.title}>
              <div className="home-v2-service-grid__topline">
                <span>0{index + 1}</span>
                <strong>{service.meta}</strong>
              </div>
              <h3>{service.title}</h3>
              <p className="home-v2-service-grid__price">{service.price}</p>
              <p>{service.copy}</p>
              <div className="home-v2-service-grid__actions">
                <Button asChild className="home-v2-service-button">
                  <a href={service.href} data-cta={service.primaryData}>
                    {service.primary}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </Button>
                {service.details && service.detailsHref ? (
                  <a
                    href={service.detailsHref}
                    className="home-v2-text-link"
                    data-link={service.detailsData}
                  >
                    {service.details}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FounderSection() {
  return (
    <section id="o-meni" className="home-v2-section home-v2-founder">
      <div className="home-v2-shell home-v2-founder__layout">
        <figure className="home-v2-founder__portrait">
          <img
            src="/pavao-pahljina.jpg"
            alt="Pavao Pahljina u svom radnom prostoru"
            width="800"
            height="800"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Pavao Pahljina · Bitcoin savjetnik</figcaption>
        </figure>

        <div className="home-v2-founder__copy">
          <p className="home-v2-eyebrow">ZAŠTO OVAJ RAD POSTOJI</p>
          <h2>Bitcoin sam kupio 2014. Razumijevanje je došlo kasnije.</h2>
          <p>
            Prvi put sam kupio Bitcoin u srpnju 2014., kada je vrijedio
            približno 600 američkih dolara. Kupio sam ga samo za približno 20
            dolara, jer pristup nižoj cijeni nije bio isto što i razumijevanje
            Bitcoina.
          </p>
          <p>
            Nakon godina učenja i uređivanja vlastitih financija, u listopadu
            2020. prešao sam na puni Bitcoin standard. Od tada prihod, proračun,
            potrošnju i imovinu promatram iz Bitcoina kao primarnog novca.
          </p>
          <p>
            Danas to iskustvo koristim kako bih drugima pomogao skratiti put od
            držanja Bitcoina do sustava koji mogu razumjeti, primijeniti i
            objasniti obitelji.
          </p>

          <dl className="home-v2-founder__facts">
            <div>
              <dt>2014.</dt>
              <dd>prva kupnja Bitcoina</dd>
            </div>
            <div>
              <dt>10/2020.</dt>
              <dd>puni Bitcoin standard</dd>
            </div>
            <div>
              <dt>10.000+</dt>
              <dd>sati rada i učenja</dd>
            </div>
          </dl>
          <p className="home-v2-founder__proof">
            {renderSaifedeanAmmousReference(
              "Iskustvo uključuje rad u Bitcoin industriji i rad sa Saifedeanom Ammousom na edukaciji, podcastima i izdavaštvu."
            )}
          </p>
          <a
            href={PAVAO_PAHLJINA_PATH}
            className="home-v2-text-link"
            data-link="home-founder-profile"
          >
            Upoznajte moj pristup i iskustvo
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

export function SelectedGuidesSection() {
  return (
    <section id="vodici" className="home-v2-section home-v2-guides">
      <div className="home-v2-shell">
        <div className="home-v2-section-heading">
          <p className="home-v2-eyebrow">ODABRANI VODIČI</p>
          <h2>Za početak odaberite pitanje koje vam je najbliže</h2>
        </div>
        <div className="home-v2-guide-grid">
          {guides.map((guide) => (
            <article key={guide.title}>
              <p>{guide.kicker}</p>
              <h3>
                <a href={guide.href} data-link={guide.dataLink}>
                  {guide.title}
                </a>
              </h3>
              <span>{guide.copy}</span>
              <a
                href={guide.href}
                className="home-v2-guide-grid__arrow"
                aria-label={"Pročitajte: " + guide.title}
                data-link={guide.dataLink}
              >
                <ArrowUpRight aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
        <div className="home-v2-guides__links">
          <a
            href="/vodici/"
            className="home-v2-text-link"
            data-link="home-guides-index"
          >
            Pogledajte sve vodiče
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a
            href={OPEN_MANUSCRIPT_URL}
            className="home-v2-text-link home-v2-text-link--muted"
            target="_blank"
            rel="noopener noreferrer"
            data-link="home-book"
          >
            Saznajte više o knjizi Bitcoin kao novac
          </a>
          <a
            href="/za-tvrtke/"
            className="home-v2-text-link home-v2-text-link--muted"
            data-link="home-business"
          >
            Bitcoin okvir za tvrtke
          </a>
        </div>
      </div>
    </section>
  )
}

export function HomeFaqSection() {
  return (
    <section id="faq" className="home-v2-section home-v2-faq">
      <div className="home-v2-shell home-v2-faq__layout">
        <div className="home-v2-section-heading">
          <p className="home-v2-eyebrow">ČESTA PITANJA</p>
          <h2>Prije sljedećeg koraka</h2>
        </div>
        <div className="home-v2-faq__list">
          {homepageFaqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                <span>{faq.question}</span>
                <ChevronDown aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeFinalCta() {
  return (
    <section id="zavrsni-poziv" className="home-v2-section home-v2-final">
      <div className="home-v2-shell home-v2-final__panel">
        <div>
          <p className="home-v2-eyebrow">SLJEDEĆI KORAK</p>
          <h2>Ne morate prvo znati koju uslugu trebate.</h2>
          <p>
            Uvodni razgovor služi tome da utvrdimo postoji li jedno konkretno
            pitanje, potreba za dubinskom konzultacijom ili smislen razlog za
            izgradnju cijelog osobnog Bitcoin standarda.
          </p>
        </div>
        <div className="home-v2-final__action">
          <Button asChild size="lg" className="home-v2-final-button">
            <a href={CONVERSATION_PATH} data-cta="home-final-conversation">
              Dogovorite 15-minutni razgovor
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
          <p>
            Bez naknade i bez obveze. Ne upravljam sredstvima i ne tražim
            pristup vašem Bitcoinu.
          </p>
        </div>
      </div>
    </section>
  )
}
