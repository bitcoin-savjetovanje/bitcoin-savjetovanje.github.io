import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  FileCheck2,
  ShieldCheck,
} from "lucide-react"

import { renderSaifedeanAmmousReference } from "@/components/SaifedeanAmmousReference"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { personalBitcoinStandardRoute } from "@/content/clientRoutes"
import { offerFacts } from "@/content/offers"
import { personalBitcoinStandardFaqs } from "@/content/personalBitcoinStandard"
import {
  BITCOIN_CONSULTATION_PATH,
  BUSINESS_AUDIENCE_PATH,
  CONVERSATION_PATH,
  FAMILY_AUDIENCE_PATH,
  PAVAO_PAHLJINA_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"

const recognitionItems = [
  {
    title: "Odluke nisu zapisane",
    copy: "Znate što otprilike želite, ali pravila o prihodu, kupnji, trošenju, dugovima i imovini postoje samo u vašoj glavi.",
  },
  {
    title: "Bitcoin je odvojen od ostatka financija",
    copy: "Bitcoin držite kao zasebnu poziciju, dok proračun, nekretnine, dug i veći životni troškovi slijede drugačiju logiku.",
  },
  {
    title: "Obitelj ili osoba od povjerenja ne poznaju sustav",
    copy: "Relevantna osoba ne zna gdje započinje oporavak, kako su odluke zamišljene i što treba napraviti bez vas.",
  },
  {
    title: "Velike odluke još ovise o cijeni i osjećaju",
    copy: "Rast, pad ili cijena koju ste propustili previše utječu na odluke koje bi trebale polaziti iz unaprijed uređenih pravila.",
  },
] as const

const documentConclusions = [
  "pravilo pretvaranja prihoda u Bitcoin",
  "operativni saldo u eurima",
  "plan razduživanja",
  "uloga nekretnina i druge imovine",
  "pravila za redovite i veće troškove",
  "način korištenja Bitcoina kao primarnog novca",
  "skrbnički model",
  "prvi korak oporavka",
  "osoba od povjerenja",
  "datum sljedeće revizije",
] as const

const documentPages = [
  {
    number: "01",
    eyebrow: "Temeljna pravila",
    title: "Novac, obveze i redoslijed",
    items: [
      "Prihod se raspoređuje prema unaprijed dogovorenom pravilu.",
      "Operativni saldo u eurima pokriva najbliža plaćanja i obveze.",
      "Dug se uklanja prema jasnom redoslijedu i roku.",
    ],
    note: "Prva provjera: 30 dana nakon početka primjene.",
  },
  {
    number: "02",
    eyebrow: "Bilanca i korištenje",
    title: "Uloge imovine i stvarni život",
    items: [
      "Bitcoin ima monetarnu ulogu, a ostatak imovine vlastitu svrhu.",
      "Redoviti i veći troškovi imaju različita pravila.",
      "Odluke se provjeravaju prema bilanci, ne samo prema cijeni.",
    ],
    note: "Otvorena pitanja imaju vlasnika, rok i sljedeći korak.",
  },
  {
    number: "03",
    eyebrow: "Sigurnost i kontinuitet",
    title: "Sustav koji ne ovisi samo o vama",
    items: [
      "Skrbnički model odgovara stvarnim rizicima i odgovornostima.",
      "Osoba od povjerenja zna prvi korak oporavka.",
      "Datum sljedeće revizije ostaje dio standarda.",
    ],
    note: "Privatni ključevi, wallet backup datoteke, passphraseovi i početne riječi drugih walleta nisu dio dokumenta.",
  },
] as const

const transformations = [
  {
    from: "Odluke prema osjećaju",
    to: "Zapisana pravila",
    copy: "Znate kada i zašto prihod pretvarate u Bitcoin, koliko eura držite za najbliža plaćanja i kako iz Bitcoina financirate stvarni život.",
  },
  {
    from: "Nepovezana imovina",
    to: "Cjelovita bilanca",
    copy: "Bitcoin, nekretnine, poslovna imovina, dug i ostali dijelovi neto imovine dobivaju jasne i različite uloge.",
  },
  {
    from: "Osobno znanje",
    to: "Kontinuitet bez vas",
    copy: "Partner, obitelj ili osoba od povjerenja znaju kako je sustav zamišljen, gdje započinje oporavak i što trebaju napraviti.",
  },
  {
    from: "Jednokratni plan",
    to: "Sustav koji se provjerava",
    copy: "Pravila dobivaju stres-test, redoslijed provedbe, rok i datum sljedeće revizije.",
  },
] as const

const processStages = [
  {
    title: "Mapiramo stvarnu situaciju",
    copy: "Prihodi, troškovi, dugovi, Bitcoin, nekretnine, druga imovina, obiteljske obveze i trenutačni način čuvanja.",
  },
  {
    title: "Donosimo ključne odluke",
    copy: "Uloga Bitcoina, plan razduživanja, operativni euri, način financiranja troškova, odnos prema ostatku imovine i sigurnosni model.",
  },
  {
    title: "Zapisujemo i testiramo sustav",
    copy: "Odluke pretvaramo u pisani osobni Bitcoin standard i provjeravamo kako djeluju pri velikom padu cijene, promjeni prihoda, većem trošku ili vašoj nedostupnosti.",
  },
  {
    title: "Provjeravamo stvarnu primjenu",
    copy: "Nakon približno 30 dana gledamo što je provedeno, što nije funkcioniralo i koja pravila treba prilagoditi.",
  },
] as const

const includedItems = [
  "početni upitnik i pripremu",
  "pitanja i teme dostavljene unaprijed",
  "privatne razgovore tijekom 4–6 tjedana",
  "zadatke i odluke između razgovora",
  "pisani osobni Bitcoin standard",
  "redoslijed provedbe",
  "stres-test cijene, prihoda, većih troškova i pristupa",
  "obiteljski ili kontinuitetni sloj kada je relevantan",
  "reviziju nakon približno 30 dana",
  "poslovni sloj samo kada je relevantan",
] as const

const fitItems = [
  "Bitcoin već ima ili bi trebao imati važnu monetarnu ulogu u vašem životu",
  "odluke utječu na značajnu imovinu, dug, obitelj ili poslovni kontekst",
  "sadržaj i općeniti vodiči više nisu dovoljni za vašu konkretnu situaciju",
  "spremni ste otvoreno sagledati proračun, dug, imovinu, trošenje i sigurnost",
] as const

function ProgramDocumentPreview() {
  return (
    <figure className="program-document-preview">
      <div
        className="program-document-preview__pages"
        aria-label="Tri skraćene stranice oglednog osobnog Bitcoin standarda"
      >
        {documentPages.map((page) => (
          <article
            key={page.number}
            className="program-document-sheet"
            aria-label={`Stranica ${page.number}: ${page.title}`}
          >
            <div className="program-document-sheet__topline">
              <span>{page.eyebrow}</span>
              <strong>{page.number}</strong>
            </div>
            <h3>{page.title}</h3>
            <ul>
              {page.items.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>{page.note}</p>
          </article>
        ))}
      </div>
      <figcaption>
        Stvarni prikaz strukture odluka s ogledne stranice; osjetljivi iznosi,
        lokacije i pristupni podaci ne pripadaju ovom dokumentu.
      </figcaption>
    </figure>
  )
}

function ProgramFaq() {
  return (
    <div className="program-faq-list">
      {personalBitcoinStandardFaqs.map((faq) => (
        <details
          key={faq.id}
          className="faq-item"
          onToggle={(event) => {
            if (event.currentTarget.open) {
              trackFirstPartyInteraction("personal-standard-faq-open", {
                question: faq.id,
              })
            }
          }}
        >
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}

export function PersonalBitcoinStandard() {
  return (
    <>
      <Seo {...personalBitcoinStandardRoute} />
      <article className="service-page service-page--personal-program">
        <header className="program-hero">
          <div className="program-shell program-hero__layout">
            <div className="program-hero__copy">
              <p className="program-eyebrow">Privatni program · 4–6 tjedana</p>
              <h1>
                Uredite vlastiti Bitcoin standard u jasnom pisanom sustavu
                odluka
              </h1>
              <p className="program-hero__lead">
                Privatni program u kojem povezujemo proračun, dug, imovinu,
                korištenje Bitcoina, skrbništvo i obiteljski kontinuitet.
                Završavate sa zapisanim pravilima, redoslijedom provedbe i
                revizijom nakon prvih 30 dana primjene.
              </p>
              <ul className="program-fact-strip" aria-label="Sažetak programa">
                <li>4–6 tjedana</li>
                <li>1.500 €</li>
                <li>pripremljeni razgovori</li>
                <li>pisani standard</li>
                <li>30-dnevna revizija</li>
              </ul>
              <div className="program-hero__actions">
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={CONVERSATION_PATH}
                    data-cta="personal-standard-hero-conversation"
                  >
                    <CalendarDays aria-hidden="true" />
                    Provjerite ima li program smisla za vas
                  </a>
                </Button>
                <a
                  href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH}
                  className="program-text-link"
                  data-link="personal-standard-hero-sample"
                >
                  Pogledajte ogledni rezultat rada
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
              <p className="program-hero__safety">
                <ShieldCheck aria-hidden="true" />
                Ne upravljam vašim sredstvima, ne preuzimam skrbništvo i nikada
                ne tražim privatne ključeve, wallet backup datoteke,
                passphraseove, početne riječi drugih walleta ni pristup
                novčaniku.
              </p>
              <p className="program-hero__purchase-note">
                Program započinje uvodnim razgovorom, a ne izravnom kupnjom.
              </p>
            </div>

            <picture className="program-hero__visual">
              <source
                media="(max-width: 767px)"
                srcSet="/images/program/personal-standard-hero-mobile-20260723.webp"
              />
              <img
                src="/images/program/personal-standard-hero-20260723.webp"
                alt="Otvoren radni osobni Bitcoin standard na svijetlom kamenom stolu uz diskretne oznake proračuna, Bitcoina, imovine, sigurnosti i obitelji."
                width="1600"
                height="901"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
        </header>

        <div className="program-page">
          <section className="program-section program-recognition">
            <div className="program-section-heading">
              <p className="program-eyebrow">Prepoznajete li se?</p>
              <h2>
                Bitcoin je važan dio vaše imovine, ali sustav još nije dovršen.
              </h2>
            </div>
            <div className="program-recognition__grid">
              {recognitionItems.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
            <p className="program-transition">
              Program služi tome da takva nepovezana pitanja postanu jedan
              razumljiv i provediv sustav.
            </p>
          </section>

          <section className="program-section program-deliverable">
            <div className="program-deliverable__intro">
              <div className="program-section-heading">
                <p className="program-eyebrow">Konkretan rezultat</p>
                <h2>Ne dobivate još jedan popis savjeta.</h2>
                <p>
                  Dobivate dokument u kojem su zapisane odluke koje ste
                  donijeli, razlozi iza njih, redoslijed provedbe i datum
                  sljedeće provjere.
                </p>
              </div>
              <blockquote>
                Program nije samo dokument niti samo niz razgovora. Vrijednost
                je u procesu donošenja odluka, a pisani osobni Bitcoin standard
                njihov je konkretan završni oblik.
              </blockquote>
            </div>

            <ProgramDocumentPreview />

            <div className="program-deliverable__conclusions">
              <h3>U dokumentu ostaju konkretni zaključci</h3>
              <ul>
                {documentConclusions.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="program-inline-action">
              <Button asChild variant="outline">
                <a
                  href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH}
                  data-link="personal-standard-deliverable-sample"
                >
                  Otvorite ogledni osobni Bitcoin standard
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <p>
                Ogledni dokument prikazuje strukturu i vrstu odluka. Stvarni
                standard prilagođava se vašim prihodima, obvezama, imovini,
                obitelji i načinu čuvanja Bitcoina.
                <br />
                <a
                  href="/sigurnost/"
                  className="program-text-link"
                  data-link="personal-standard-security-approach"
                >
                  Kako uređujemo sigurnost bez zapisivanja tajni
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </p>
            </div>
          </section>

          <section className="program-section program-transformations">
            <div className="program-section-heading">
              <h2>Što se mijenja kroz program?</h2>
            </div>
            <ol>
              {transformations.map((item, index) => (
                <li key={item.to}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p>
                      {item.from}
                      <ArrowRight aria-hidden="true" />
                      <strong>{item.to}</strong>
                    </p>
                    <div>{item.copy}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="program-section program-process">
            <div className="program-section-heading">
              <p className="program-eyebrow">Jasan proces</p>
              <h2>Kako radimo kroz 4–6 tjedana?</h2>
            </div>
            <ol className="program-process__path">
              {processStages.map((stage, index) => (
                <li key={stage.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.copy}</p>
                </li>
              ))}
            </ol>
            <p className="program-process__note">
              Pitanja i pripremne materijale dobivate unaprijed. Broj i raspored
              razgovora prilagođavaju se opsegu stvarnih odluka, unutar programa
              od 4–6 tjedana.
            </p>
          </section>

          <section className="program-section program-included">
            <div className="program-included__layout">
              <div className="program-section-heading">
                <p className="program-eyebrow">Precizan opseg</p>
                <h2>Što program uključuje?</h2>
                <p>
                  Vrijednost programa nije u količini materijala, nego u tome da
                  se povezane odluke donesu ispravnim redoslijedom i pretvore u
                  sustav koji stvarno možete primjenjivati.
                </p>
              </div>
              <ul>
                {includedItems.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="program-debt-note">
              <strong>Jasan izlaz iz duga prethodi punom standardu.</strong>
              <p>
                Puni Bitcoin standard traži jasan izlaz iz duga. Zato u programu
                najprije utvrđujemo što dug čini vašem budućem novcu i kojim ga
                redoslijedom uklanjate, prije nego što Bitcoin dobije punu ulogu
                primarnog novca.
              </p>
            </aside>
          </section>

          <section className="program-section program-fit">
            <div className="program-fit__layout">
              <div>
                <div className="program-section-heading">
                  <h2>Program ima smisla kada odluke više nisu izolirane.</h2>
                </div>
                <ul className="program-fit__list">
                  {fitItems.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="program-consultation-note">
                <p className="program-eyebrow">
                  Kada je dovoljna jedna konzultacija?
                </p>
                <h3>Jedno jasno pitanje ne mora postati cijeli program.</h3>
                <p>
                  Ako imate jedno jasno, ograničeno pitanje koje ne zahtijeva
                  povezivanje cijelog sustava, Bitcoin konzultacija može biti
                  bolji prvi plaćeni korak.
                </p>
                <a
                  href={BITCOIN_CONSULTATION_PATH}
                  className="program-text-link"
                  data-link="personal-standard-consultation"
                >
                  Pogledajte Bitcoin konzultaciju
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </aside>
            </div>

            <aside className="program-business-note">
              <div>
                <p className="program-eyebrow">Partner i obitelj</p>
                <h3>Obiteljske uloge ne moraju biti jednake.</h3>
              </div>
              <p>
                Partner ne mora imati isto tehničko znanje, ali treba razumjeti
                ulogu Bitcoina, zajednička novčana pravila, sigurnosne granice i
                prvi korak ako glavna osoba nije dostupna.
              </p>
              <a
                href={FAMILY_AUDIENCE_PATH}
                className="program-text-link"
                data-link="personal-standard-family"
              >
                Kako ovaj proces uključuje partnera i obitelj?
                <ArrowUpRight aria-hidden="true" />
              </a>
            </aside>

            <aside className="program-business-note">
              <div>
                <p className="program-eyebrow">Vodite li posao?</p>
                <h3>Poslovni je sloj dodatak osobnom sustavu.</h3>
              </div>
              <p>
                Kod poduzetnika se prema potrebi dodaje poslovni sloj: odvajanje
                privatnog i poslovnog Bitcoina, operativne obveze, poslovna
                pričuva, višak riznice i kontinuitet ovlaštenih osoba. Osobni i
                poslovni Bitcoin ne smiju se pomiješati u jedan nejasan sustav.
              </p>
              <a
                href={BUSINESS_AUDIENCE_PATH}
                className="program-text-link"
                data-link="personal-standard-business"
              >
                Pogledajte pristup za poduzetnike
                <ArrowUpRight aria-hidden="true" />
              </a>
            </aside>
          </section>

          <section className="program-section program-founder">
            <div className="program-founder__portrait">
              <img
                src="/pavao-pahljina.jpg"
                alt="Pavao Pahljina na otvorenom u mediteranskom okruženju."
                width="800"
                height="800"
                loading="lazy"
                decoding="async"
              />
              <span>Pavao Pahljina</span>
            </div>
            <div className="program-founder__copy">
              <p className="program-eyebrow">Zašto ovaj proces vodi Pavao</p>
              <h2>Bitcoin sam kupio 2014. Sustav je došao kasnije.</h2>
              <p>
                Bitcoin sam prvi put kupio u srpnju 2014., kada je vrijedio
                približno 600 američkih dolara. Kupio sam ga samo za približno
                20 dolara, jer pristup nižoj cijeni nije bio isto što i
                razumijevanje Bitcoina.
              </p>
              <p>
                Nakon godina učenja i uređivanja vlastitih financija, u
                listopadu 2020. prešao sam na puni Bitcoin standard. Od tada
                prihod, proračun, trošenje, imovinu i sigurnost promatram iz
                Bitcoina kao primarnog novca.
              </p>
              <p>
                Program je nastao iz potrebe da se to razumijevanje pretvori u
                proces koji druga osoba može proći bez godina nepovezanih
                pokušaja.
              </p>
              <dl>
                <div>
                  <dt>2014.</dt>
                  <dd>prva kupnja Bitcoina</dd>
                </div>
                <div>
                  <dt>listopad 2020.</dt>
                  <dd>puni Bitcoin standard</dd>
                </div>
                <div>
                  <dt>10.000+</dt>
                  <dd>sati rada i učenja</dd>
                </div>
              </dl>
              <p className="program-founder__proof">
                {renderSaifedeanAmmousReference(
                  "Iskustvo uključuje rad u Bitcoin industriji i rad sa Saifedeanom Ammousom na edukaciji, podcastima i izdavaštvu."
                )}
              </p>
              <a
                href={PAVAO_PAHLJINA_PATH}
                className="program-text-link"
                data-link="personal-standard-founder-profile"
              >
                Tko vodi ovaj proces?
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </section>

          <section className="program-section program-pricing">
            <div className="program-pricing__main">
              <p className="program-eyebrow">Program</p>
              <h2>Osobni Bitcoin standard</h2>
              <div className="program-pricing__facts">
                <strong>{offerFacts.personalStandard.price}</strong>
                <span>{offerFacts.personalStandard.duration}</span>
              </div>
              <p>
                Privatni proces donošenja odluka, pisani osobni Bitcoin
                standard, provedbeni redoslijed, stres-test i revizija nakon
                prvih 30 dana.
              </p>
            </div>
            <div className="program-pricing__next">
              <h3>Sljedeći korak</h3>
              <p>
                Prvi korak je 15-minutni uvodni razgovor. Na njemu utvrđujemo
                postoji li jedno konkretno pitanje, potreba za Bitcoin
                konzultacijom ili opravdan razlog za cijeli program.
              </p>
              <Button asChild className="cta-primary home-primary-button">
                <a
                  href={CONVERSATION_PATH}
                  data-cta="personal-standard-pricing-conversation"
                >
                  <CalendarDays aria-hidden="true" />
                  Dogovorite uvodni razgovor
                </a>
              </Button>
              <a
                href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH}
                className="program-text-link"
                data-link="personal-standard-pricing-sample"
              >
                Još jednom pogledajte ogledni rezultat
                <ArrowUpRight aria-hidden="true" />
              </a>
              <p className="program-pricing__assurance">
                Uvodni razgovor je bez naknade i bez obveze. Ako program nema
                smisla za vašu situaciju, to ću otvoreno reći.
              </p>
            </div>
            <aside className="program-boundaries">
              <FileCheck2 aria-hidden="true" />
              <p>
                <strong>Granice rada:</strong> ne upravljam vašim sredstvima, ne
                preuzimam skrbništvo, ne tražim privatne ključeve, wallet backup
                datoteke, passphraseove ni početne riječi drugih walleta te ne
                pružam trgovačke, pravne, porezne ili računovodstvene savjete.
                Kada je za odluku potreban licencirani stručnjak, to treba jasno
                odvojiti od ovog procesa.
              </p>
            </aside>
          </section>

          <section className="program-section program-faq">
            <div className="program-section-heading">
              <p className="program-eyebrow">Česta pitanja</p>
              <h2>Prije uvodnog razgovora</h2>
            </div>
            <ProgramFaq />
          </section>

          <section className="program-section program-final-cta">
            <div>
              <h2>Prvi korak nije kupnja programa.</h2>
              <p>
                Prvi korak je provjeriti zahtijeva li vaša situacija jedno
                konkretno rješenje ili povezivanje cijelog osobnog Bitcoin
                standarda.
              </p>
            </div>
            <div>
              <Button asChild className="cta-primary home-primary-button">
                <a
                  href={CONVERSATION_PATH}
                  data-cta="personal-standard-final-conversation"
                >
                  <CalendarDays aria-hidden="true" />
                  Dogovorite 15-minutni razgovor
                </a>
              </Button>
              <p>
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
