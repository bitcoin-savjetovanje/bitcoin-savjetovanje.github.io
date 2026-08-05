import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Download,
  ExternalLink,
  FileCheck2,
  ShieldCheck,
} from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { samplePersonalBitcoinStandardRoute } from "@/content/clientRoutes"
import {
  CONVERSATION_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"

const SAMPLE_PDF_PATH = "/downloads/sample-osobni-bitcoin-standard.pdf"

const samplePages = [
  {
    number: "03",
    pdfPage: 4,
    image: "/images/sample-standard/ogledni-standard-kontekst.webp",
    alt: "Treća stranica izmišljenog oglednog primjera s početnom situacijom obitelji Marko i Ivana, prihodima, dugom, Bitcoinom, imovinom i prvim uskim grlom.",
    title: "Od nepovezanih pitanja do prvog uskog grla",
    copy: "Dokument najprije ne daje rješenja, nego pokazuje kako su proračun, dug, Bitcoin, imovina i obiteljska sigurnost povezani. Bez te slike pojedinačne odluke lako rješavaju jedan problem, a stvaraju drugi.",
    eventId: "sample-standard-preview-context",
  },
  {
    number: "05",
    pdfPage: 6,
    image: "/images/sample-standard/ogledni-standard-odluke.webp",
    alt: "Peta stranica izmišljenog oglednog primjera s izvršnim sažetkom četiriju ključnih odluka, pravilima i prvim dokazima provedbe.",
    title: "Odluke se pretvaraju u jasna pravila",
    copy: "Svako pravilo treba odgovoriti što se radi, zašto se radi, kojim redoslijedom i kako ćemo znati da je provedeno.",
    eventId: "sample-standard-preview-decisions",
  },
  {
    number: "15",
    pdfPage: 16,
    image: "/images/sample-standard/ogledni-standard-v1.webp",
    alt: "Petnaesta stranica izmišljenog oglednog primjera sa sažetim osobnim Bitcoin standardom v1.0 i pravilima za novac, proračun, dug, davanje, prihod, trošenje, imovinu, vrijeme, sigurnost i pregled.",
    title: "Cijeli standard mora stati i na jednu operativnu stranicu",
    copy: "Duži dokument objašnjava razloge i kontekst, ali svakodnevna primjena mora ostati jednostavna: nekoliko jasnih pravila, prvi sljedeći korak i datum ponovne provjere.",
    eventId: "sample-standard-preview-one-page",
  },
] as const

const documentFunctions = [
  {
    number: "01",
    title: "Opisuje početnu situaciju",
    copy: "Prihodi, troškovi, dugovi, Bitcoin, nekretnine, druga imovina, obitelj i trenutačni sigurnosni model promatraju se kao jedna cjelina.",
  },
  {
    number: "02",
    title: "Pretvara odluke u pravila",
    copy: "Umjesto neformalnih namjera zapisuje se što se radi s prihodom, operativnim eurima, dugom, troškovima, davanjem, imovinom i sigurnošću.",
  },
  {
    number: "03",
    title: "Određuje redoslijed provedbe",
    copy: "Nije dovoljno znati konačni cilj. Potrebno je znati koji korak dolazi prvi, što može čekati i koje odluke ovise jedna o drugoj.",
  },
  {
    number: "04",
    title: "Postavlja ritam revizije",
    copy: "Standard nije nepromjenjiv dokument. Pravila imaju datum ponovne provjere i mijenjaju se kada se promijene prihod, obitelj, imovina, dug ili sigurnosne okolnosti.",
  },
] as const

const personalizedItems = [
  "stvarne kategorije proračuna",
  "iznos i namjena operativnog salda u eurima",
  "redoslijed razduživanja",
  "uloga Bitcoina kao primarnog novca",
  "pravila za pretvaranje prihoda u Bitcoin",
  "način financiranja redovitih i većih troškova",
  "odnos Bitcoina prema nekretninama i drugoj imovini",
  "davanje i njegova uloga u novčanom sustavu",
  "sigurnosni i skrbnički model",
  "uloge partnera, obitelji i osobe od povjerenja",
  "prvi korak oporavka",
  "plan provedbe za prvih 30 ili 90 dana",
  "datum sljedeće revizije",
] as const

const systemPrinciples = [
  {
    title: "Bitcoin kao primarni novac",
    copy: "Bitcoin je glavni novčani saldo. Euri su kratkotrajni operativni oblik za najbliža plaćanja, prihod se pretvara u Bitcoin prema pravilima, a Bitcoin se troši ili razmjenjuje u eure za stvarni život. Cilj nije izbjeći svaku prodaju Bitcoina.",
  },
  {
    title: "Dug ima jasan izlaz",
    copy: "Svaki dug je negativni dio bilance i zahtjev na budući prihod. Redoslijed razduživanja može se razlikovati, ali cilj punog Bitcoin standarda jest bilanca bez duga.",
  },
  {
    title: "Davanje je dio sustava",
    copy: "Davanje se ne odgađa dok sve drugo ne bude savršeno. U konačnom okviru cilja prema 10–20% ukupnog novca, uz stvarni prijelaz prilagođen situaciji.",
  },
] as const

const excludedSecrets = [
  "privatne ključeve",
  "Bitcoin Core wallet backup datoteke",
  "wallet passphraseove",
  "početne riječi drugih walleta",
  "PIN-ove",
  "potpune adrese novčanika kada nisu potrebne",
  "precizne lokacije sigurnosnih kopija",
  "podatke koji sami omogućuju pristup sredstvima",
  "fotografije ili kopije tajnog skrbničkog materijala",
] as const

const processSteps = [
  "Stvarna situacija",
  "Ključne odluke",
  "Pisana pravila",
  "Stres-test",
  "Provedba",
  "Revizija",
] as const

const processDetails = [
  {
    title: "Stvarna situacija",
    copy: "Što danas posjedujete, dugujete, trošite, čuvate i za koga ste odgovorni.",
  },
  {
    title: "Ključne odluke",
    copy: "Koju ulogu Bitcoin ima, kako se uklanja dug, koliko eura ostaje za bliska plaćanja i kako se financira stvarni život.",
  },
  {
    title: "Pisana pravila",
    copy: "Odluke dobivaju razumljiv oblik koji se može ponovno otvoriti, objasniti i provjeriti.",
  },
  {
    title: "Stres-test",
    copy: "Provjerava se kako sustav djeluje pri velikom padu cijene, promjeni prihoda, većem trošku ili vašoj nedostupnosti.",
  },
  {
    title: "Provedba i revizija",
    copy: "Pravila se testiraju u stvarnom životu i zatim prilagođavaju.",
  },
] as const

function SampleStandardHero() {
  return (
    <header className="sample-proof-hero">
      <div className="sample-proof-shell sample-proof-hero__layout">
        <div className="sample-proof-hero__copy">
          <p className="sample-proof-eyebrow">
            Ogledni rezultat privatnog programa
          </p>
          <h1>Pogledajte kako izgleda pisani osobni Bitcoin standard</h1>
          <p className="sample-proof-hero__lead">
            Izmišljeni primjer obitelji koja povezuje proračun, dug, davanje,
            Bitcoin kao primarni novac, neto imovinu, sigurnost i obiteljski
            kontinuitet u jedan sustav zapisanih odluka.
          </p>

          <ul
            className="sample-proof-facts"
            aria-label="Informacije o dokumentu"
          >
            <li>19 PDF stranica</li>
            <li>Izmišljeni primjer</li>
            <li>Bez e-adrese</li>
            <li>Bez osjetljivih podataka</li>
          </ul>

          <div className="sample-proof-hero__actions">
            <Button asChild className="cta-primary home-primary-button">
              <a
                href={SAMPLE_PDF_PATH}
                target="_blank"
                rel="noreferrer"
                data-cta="sample-standard-hero-pdf"
              >
                Otvorite ogledni dokument
                <ExternalLink aria-hidden="true" />
              </a>
            </Button>
            <a
              href={PERSONAL_BITCOIN_STANDARD_PATH}
              className="sample-proof-text-link"
              data-link="sample-standard-hero-program"
            >
              Pogledajte program iz kojeg takav dokument nastaje
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure className="sample-proof-cover">
          <div className="sample-proof-cover__mat">
            <img
              src="/images/sample-standard/ogledni-standard-cover.webp"
              width="1191"
              height="1684"
              alt="Naslovnica izmišljenog oglednog primjera pisanog osobnog Bitcoin standarda."
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <figcaption>
            Stvarna naslovnica · verzija 2.0 · srpanj 2026.
          </figcaption>
        </figure>
      </div>
    </header>
  )
}

function SamplePagesShowcase() {
  return (
    <section
      className="sample-proof-section sample-proof-pages"
      aria-labelledby="sample-pages-title"
    >
      <div className="sample-proof-section-heading">
        <p className="sample-proof-eyebrow">Tri stvarne stranice dokumenta</p>
        <h2 id="sample-pages-title">
          Od početne situacije do standarda koji se može primijeniti
        </h2>
        <p>
          Ovo nisu zamjenske kartice ni simulacija dokumenta. Svaki prikaz
          dolazi iz ispravljenog PDF-a i otvara odgovarajuću stranicu u cijelom
          oglednom primjeru.
        </p>
      </div>

      <div className="sample-proof-pages__list">
        {samplePages.map((page, index) => (
          <article
            key={page.number}
            className={
              index % 2
                ? "sample-proof-page-preview sample-proof-page-preview--reverse"
                : "sample-proof-page-preview"
            }
          >
            <a
              href={`${SAMPLE_PDF_PATH}#page=${page.pdfPage}`}
              target="_blank"
              rel="noreferrer"
              className="sample-proof-page-preview__image-link"
              data-link={page.eventId}
              aria-label={`Otvorite PDF na stranici ${page.number}: ${page.title}`}
            >
              <img
                src={page.image}
                width="1191"
                height="1684"
                alt={page.alt}
                loading="lazy"
                decoding="async"
              />
              <span aria-hidden="true">
                Otvorite stranicu
                <ArrowUpRight />
              </span>
            </a>
            <div className="sample-proof-page-preview__copy">
              <p className="sample-proof-page-preview__number">
                Stranica {page.number}
              </p>
              <h3>{page.title}</h3>
              <p>{page.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function DocumentPurposeSection() {
  return (
    <section
      className="sample-proof-section sample-proof-purpose"
      aria-labelledby="document-purpose-title"
    >
      <div className="sample-proof-section-heading">
        <p className="sample-proof-eyebrow">Funkcija dokumenta</p>
        <h2 id="document-purpose-title">
          Što pisani osobni Bitcoin standard zapravo radi?
        </h2>
      </div>
      <ol className="sample-proof-purpose__list">
        {documentFunctions.map((item) => (
          <li key={item.number}>
            <span>{item.number}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function PersonalizedVersionSection() {
  return (
    <section
      className="sample-proof-section sample-proof-personalized"
      aria-labelledby="personalized-title"
    >
      <div className="sample-proof-personalized__intro">
        <div>
          <p className="sample-proof-eyebrow">Privatna verzija</p>
          <h2 id="personalized-title">
            Što bi se u vašoj verziji personaliziralo?
          </h2>
        </div>
        <p>
          Ogledni dokument pokazuje strukturu i vrstu odluka. Privatni dokument
          nastaje iz vaše stvarne situacije i ne koristi univerzalni predložak
          odluka.
        </p>
      </div>

      <ul className="sample-proof-personalized__list">
        {personalizedItems.map((item) => (
          <li key={item}>
            <Check aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="sample-proof-principles">
        {systemPrinciples.map((principle) => (
          <article key={principle.title}>
            <h3>{principle.title}</h3>
            <p>{principle.copy}</p>
          </article>
        ))}
      </div>

      <p className="sample-proof-personalized__note">
        Privatna verzija ne kopira zaključke iz ovog primjera. Ona koristi istu
        metodu kako bi došla do vaših odluka.
      </p>
    </section>
  )
}

function DocumentSecuritySection() {
  return (
    <section
      className="sample-proof-section sample-proof-security"
      aria-labelledby="document-security-title"
    >
      <div className="sample-proof-security__intro">
        <ShieldCheck aria-hidden="true" />
        <div>
          <p className="sample-proof-eyebrow">Sigurnosna granica</p>
          <h2 id="document-security-title">
            Što pisani standard nikada ne sadrži?
          </h2>
          <p>
            Dokument opisuje sigurnosnu strukturu, odgovornosti i prvi korak
            oporavka. Ne pretvara se u mjesto na kojem su spremljene tajne za
            pristup Bitcoinu.
          </p>
        </div>
      </div>

      <ul className="sample-proof-security__list">
        {excludedSecrets.map((secret) => (
          <li key={secret}>
            <span aria-hidden="true">—</span>
            {secret}
          </li>
        ))}
      </ul>
    </section>
  )
}

function DocumentProcessSection() {
  return (
    <section
      className="sample-proof-section sample-proof-process"
      aria-labelledby="document-process-title"
    >
      <div className="sample-proof-section-heading">
        <p className="sample-proof-eyebrow">Od razgovora do provedbe</p>
        <h2 id="document-process-title">
          Dokument je rezultat procesa, a ne zamjena za proces
        </h2>
        <p>
          Ogledni primjer pokazuje završni oblik rada. Stvarni osobni Bitcoin
          standard nastaje kroz pripremu, razgovore, donošenje odluka,
          zapisivanje pravila, stres-test i provjeru prve primjene.
        </p>
      </div>

      <ol className="sample-proof-process__line" aria-label="Faze procesa">
        {processSteps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
            {index < processSteps.length - 1 ? (
              <ArrowRight aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>

      <div className="sample-proof-process__details">
        {processDetails.map((detail) => (
          <article key={detail.title}>
            <h3>{detail.title}</h3>
            <p>{detail.copy}</p>
          </article>
        ))}
      </div>

      <a
        href={PERSONAL_BITCOIN_STANDARD_PATH}
        className="sample-proof-text-link"
        data-link="sample-standard-process-program"
      >
        Pogledajte cijeli program Osobni Bitcoin standard
        <ArrowUpRight aria-hidden="true" />
      </a>
    </section>
  )
}

function SampleDownloadSection() {
  return (
    <section
      className="sample-proof-section sample-proof-download"
      aria-labelledby="sample-download-title"
    >
      <div className="sample-proof-download__icon" aria-hidden="true">
        <FileCheck2 />
      </div>
      <div>
        <p className="sample-proof-eyebrow">
          Cijeli izmišljeni ogledni primjer
        </p>
        <h2 id="sample-download-title">Pročitajte cijeli ogledni primjer</h2>
        <p>
          Dokument možete otvoriti ili preuzeti bez e-adrese. Svi ljudi, iznosi
          i situacije u njemu su izmišljeni.
        </p>
        <p className="sample-proof-download__disclaimer">
          Ogledni primjer prikazuje metodu. Nije individualni financijski,
          porezni ni pravni savjet.
        </p>
      </div>
      <div className="sample-proof-download__actions">
        <Button asChild className="cta-primary home-primary-button">
          <a
            href={SAMPLE_PDF_PATH}
            download="primjer-osobnog-bitcoin-standarda.pdf"
            data-cta="sample-standard-download-pdf"
          >
            <Download aria-hidden="true" />
            Preuzmite PDF za kasnije čitanje
          </a>
        </Button>
        <a
          href={PERSONAL_BITCOIN_STANDARD_PATH}
          className="sample-proof-text-link"
          data-link="sample-standard-download-program"
        >
          Pogledajte program iz kojeg dokument nastaje
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

function SampleProgramCta() {
  return (
    <section
      className="sample-proof-section sample-proof-final"
      aria-labelledby="sample-final-title"
    >
      <div>
        <p className="sample-proof-eyebrow">Vaša stvarna situacija</p>
        <h2 id="sample-final-title">
          Ogledni dokument pokazuje oblik. Program uređuje vašu stvarnu
          situaciju.
        </h2>
        <p>
          Privatni osobni Bitcoin standard nastaje kroz program od 4–6 tjedana u
          kojem se proračun, dug, imovina, korištenje Bitcoina, sigurnost i
          obiteljski kontinuitet povezuju u jedan pisani sustav odluka.
        </p>
      </div>
      <div className="sample-proof-final__actions">
        <Button asChild className="cta-primary home-primary-button">
          <a
            href={PERSONAL_BITCOIN_STANDARD_PATH}
            data-cta="sample-standard-final-program"
          >
            Pogledajte program Osobni Bitcoin standard
            <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
        <a
          href={CONVERSATION_PATH}
          className="sample-proof-text-link"
          data-link="sample-standard-final-conversation"
        >
          <CalendarDays aria-hidden="true" />
          Već znate da vam treba osobni rad? Dogovorite uvodni razgovor.
        </a>
        <p className="sample-proof-final__safety">
          Uvodni razgovor je bez naknade i bez obveze. Ne šaljete privatne
          ključeve, wallet backup datoteke, passphraseove, početne riječi drugih
          walleta ni pristup novčaniku.
        </p>
      </div>
    </section>
  )
}

export function SamplePersonalBitcoinStandard() {
  return (
    <>
      <Seo {...samplePersonalBitcoinStandardRoute} />
      <article className="sample-proof-page">
        <SampleStandardHero />
        <div className="sample-proof-shell sample-proof-main">
          <SamplePagesShowcase />
          <DocumentPurposeSection />
          <PersonalizedVersionSection />
          <DocumentSecuritySection />
          <DocumentProcessSection />
          <SampleDownloadSection />
          <SampleProgramCta />
        </div>
      </article>
    </>
  )
}
