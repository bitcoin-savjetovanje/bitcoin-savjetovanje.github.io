import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ShieldCheck,
} from "lucide-react"
import type { ReactNode } from "react"

import { renderSaifedeanAmmousReference } from "@/components/SaifedeanAmmousReference"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { pavaoPahljinaRoute } from "@/content/clientRoutes"
import {
  BITCOIN_AS_MONEY_REPOSITORY_URL,
  BITCOIN_CONSULTATION_PATH,
  BITCOIN_STANDARD_CHECK_PATH,
  CONVERSATION_PATH,
  DVADESET_JEDAN_URL,
  DVADESET_JEDAN_YOUTUBE_URL,
  PAVAO_PAHLJINA_GITHUB_URL,
  PAVAO_PAHLJINA_LINKEDIN_URL,
  PAVAO_PAHLJINA_X_URL,
  PERSONAL_BITCOIN_STANDARD_PATH,
  SAIFEDEAN_AMMOUS_URL,
  STEMI_URL,
} from "@/content/site"

const timelineItems = [
  {
    year: "2014.",
    title: "Prva kupnja Bitcoina",
    copy: "Mala eksperimentalna kupnja i početak dugog procesa razumijevanja.",
  },
  {
    year: "2018.",
    title: "Sustavno proučavanje",
    copy: "Bitcoin postaje glavna tema rada i učenja, a ne samo izdvojena imovina.",
  },
  {
    year: "2020.",
    title: "Rad u Bitcoin industriji",
    copy: "Rad na obrazovanju, podcastima, izdavaštvu, internetskoj trgovini i drugim operativnim dijelovima Bitcoin poslovanja.",
  },
  {
    year: "Listopad 2020.",
    title: "Puni Bitcoin standard",
    copy: "Bitcoin postaje primarni novac za prihod, proračun, štednju i potrošnju.",
  },
  {
    year: "2022.",
    title: "DvadesetJedan",
    copy: "Pokretanje redovitog javnog razgovora i regionalne Bitcoin zajednice.",
  },
  {
    year: "Danas",
    title: "Savjetovanje i knjiga",
    copy: "Pretvaranje dugogodišnjeg rada u strukturirani savjetodavni proces i knjigu Bitcoin kao novac.",
  },
] as const

const approachItems = [
  {
    title: "Kontekst prije odgovora",
    copy: "Ista Bitcoin odluka nije ista za osobu bez duga, obitelj sa stambenim kreditom i vlasnika tvrtke. Prije odgovora treba razumjeti bilancu, obveze, ljude i vremenski kontekst.",
  },
  {
    title: "Pisano pravilo prije improvizacije",
    copy: "Cilj nije imati još jedno mišljenje, nego odluke koje se mogu zapisati, provesti i ponovno provjeriti.",
  },
  {
    title: "Bitcoin kao novac, ne kao trgovačka pozicija",
    copy: "Ne pokušavamo pogoditi sljedeće kretanje cijene. Uređujemo kako su prihod, potrošnja, dug i imovina povezani s Bitcoinom kao primarnim novcem.",
  },
  {
    title: "Sigurnost koja uključuje druge ljude",
    copy: "Dobar sustav ne ovisi samo o vlasnikovu pamćenju. Partner, obitelj ili osoba od povjerenja moraju razumjeti svoj prvi korak, bez pristupa tajnim podacima.",
  },
  {
    title: "Odluka ostaje vaša",
    copy: "Ne upravljam vašim sredstvima, ne preuzimam skrbništvo i ne donosim odluke umjesto vas. Moj je posao pomoći vam razumjeti posljedice i izgraditi vlastita pravila.",
  },
] as const

const experienceItems: ReadonlyArray<{
  eyebrow: string
  title: string
  href: string
  copy: ReactNode
  dataLink?: string
}> = [
  {
    eyebrow: "Poduzetništvo",
    title: "STEMI",
    href: STEMI_URL,
    copy: "Kao suosnivač i direktor STEMI-ja stekao sam iskustvo izgradnje tvrtke, upravljanja ljudima, proizvodima, novčanim tokom i stvarnim operativnim ograničenjima. To je danas posebno važno u radu s poduzetnicima.",
  },
  {
    eyebrow: "Bitcoin industrija",
    title: "Rad sa Saifedeanom Ammousom",
    href: SAIFEDEAN_AMMOUS_URL,
    copy: renderSaifedeanAmmousReference(
      "Od 2020. blisko sam radio sa Saifedeanom Ammousom na obrazovnim sadržajima, tečajevima, podcastima, izdavaštvu, internetskoj trgovini i drugim operativnim dijelovima njegova rada. To mi je omogućilo dugotrajan rad s monetarnom teorijom, ekonomijom i prevođenjem složenih ideja u razumljive obrazovne materijale."
    ),
  },
  {
    eyebrow: "Javni razgovor",
    title: "DvadesetJedan",
    href: DVADESET_JEDAN_URL,
    copy: "Od 2022. vodim redovite višesatne razgovore o Bitcoinu i sudjelujem u izgradnji regionalne Bitcoin zajednice kroz DvadesetJedan.",
    dataLink: "pavao-public-dvadesetjedan",
  },
  {
    eyebrow: "Knjiga i vodiči",
    title: "Bitcoin kao novac",
    href: BITCOIN_AS_MONEY_REPOSITORY_URL,
    copy: "Knjiga i vodiči Bitcoin Savjetovanja pokušavaju povezati monetarnu teoriju s proračunom nulte osnove, dugom, davanjem, neto imovinom, vremenom i skrbništvom.",
    dataLink: "pavao-public-book",
  },
]

const milestones = [
  ["2014.", "Bitcoin od 2014."],
  ["10/2020.", "puni Bitcoin standard"],
  ["10.000+", "sati rada i učenja"],
  ["2020.", "Bitcoin industrija"],
  ["2022.", "DvadesetJedan"],
] as const

const clientSituations = [
  "imaju Bitcoin, ali nemaju pravila za prihod, trošenje i operativni saldo u eurima",
  "ne znaju kako dug i nekretnine mijenjaju njihov Bitcoin standard",
  "Bitcoin je značajan dio imovine, ali sigurnost ovisi o jednoj osobi",
  "partner ili obitelj ne razumiju sustav",
  "trebaju odlučiti je li dovoljan jedan razgovor ili treba urediti cijeli osobni standard",
  "privatni i poslovni Bitcoin više nisu jasno odvojeni",
] as const

const publicWorkItems = [
  {
    eyebrow: "Odabrani vodič",
    title: "Bitcoin je novac",
    copy: "Vodič koji objašnjava zašto Bitcoin nije samo izdvojena investicija, nego primarni novac povezan s proračunom, trošenjem i ostatkom bilance.",
    href: "/vodici/bitcoin-kao-novac/",
    image: "/images/bitcoin-kao-novac-cover-20260625.webp",
    alt: "Bilježnica za osobni financijski sustav u mediteranskom radnom prostoru.",
    linkLabel: "Pročitajte vodič",
    dataLink: "pavao-public-guide",
    kind: "guide",
    external: false,
  },
  {
    eyebrow: "Razgovori i zajednica",
    title: "DvadesetJedan",
    copy: "Bitcoin-only zajednica za regionalni kontekst i redovite javne razgovore. Projekt postoji od 2022. i omogućuje da prije privatnog razgovora vidite kako razmišljam.",
    href: DVADESET_JEDAN_URL,
    image: "/dvadesetjedan-logo.svg",
    alt: "DvadesetJedan",
    linkLabel: "Otvorite DvadesetJedan",
    dataLink: "pavao-public-dvadesetjedan",
    kind: "community",
    external: true,
  },
  {
    eyebrow: "Knjiga u nastajanju",
    title: "Bitcoin kao novac",
    copy: "Praktični vodič za povezivanje monetarne teorije sa stvarnim životom. Dio razvoja i sadržaja knjige javno je dostupan.",
    href: BITCOIN_AS_MONEY_REPOSITORY_URL,
    image: "/images/bitcoin-kao-novac-cover.webp",
    alt: "Naslovnica knjige Bitcoin kao novac autora Pavaa Pahljine.",
    linkLabel: "Pogledajte otvoreni razvoj knjige",
    dataLink: "pavao-public-book",
    kind: "book",
    external: true,
  },
] as const

const profileLinks = [
  {
    label: "LinkedIn",
    href: PAVAO_PAHLJINA_LINKEDIN_URL,
    dataLink: "pavao-profile-linkedin",
  },
  {
    label: "X",
    href: PAVAO_PAHLJINA_X_URL,
    dataLink: "pavao-profile-x",
  },
  {
    label: "YouTube · DvadesetJedan",
    href: DVADESET_JEDAN_YOUTUBE_URL,
    dataLink: "pavao-profile-youtube",
  },
  {
    label: "GitHub",
    href: PAVAO_PAHLJINA_GITHUB_URL,
    dataLink: "pavao-profile-github",
  },
] as const

const boundaryItems = [
  "ne govorim vam kada morate kupiti ili prodati",
  "ne dajem univerzalni postotak imovine za Bitcoin",
  "ne preuzimam pristup uređajima ili novčanicima",
  "ne izrađujem portfelje drugih kriptovaluta",
  "kada je potreban licencirani stručnjak, to jasno odvajamo od Bitcoin savjetovanja",
  "konačna odluka ostaje vaša",
] as const

function FounderPortrait() {
  return (
    <figure className="founder-portrait">
      <picture>
        <source
          type="image/webp"
          srcSet="/pavao-pahljina-480.webp 480w, /pavao-pahljina.webp 800w"
          sizes="(max-width: 767px) 240px, (max-width: 1100px) 340px, 410px"
        />
        <img
          src="/pavao-pahljina.jpg"
          alt="Pavao Pahljina u mediteranskom okruženju, osnivač Bitcoin Savjetovanja."
          width="800"
          height="800"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <figcaption>Pavao Pahljina · Bitcoin Savjetovanje</figcaption>
    </figure>
  )
}

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
    <div className="founder-section-heading">
      {eyebrow ? <p className="founder-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  )
}

export function PavaoPahljina() {
  return (
    <>
      <Seo {...pavaoPahljinaRoute} />
      <article className="founder-page">
        <header className="founder-hero">
          <div className="founder-shell founder-hero__grid">
            <p className="founder-eyebrow founder-hero__eyebrow">
              Bitcoin savjetnik i poduzetnik
            </p>
            <h1>Pavao Pahljina</h1>
            <FounderPortrait />
            <div className="founder-hero__body">
              <p className="founder-hero__positioning">
                Pomažem ljudima koji već imaju Bitcoin povezati prihod,
                proračun, dug, imovinu, trošenje i sigurnost u sustav za život s
                Bitcoinom kao primarnim novcem.
              </p>
              <p>
                Bitcoin nije izdvojena investicija koju idealno nikada ne
                diramo. Ako je naš primarni novac, iz njega financiramo stvarni
                život i prema jasnim pravilima donosimo odluke.
              </p>
            </div>
            <div className="founder-hero__actions">
              <Button
                asChild
                size="lg"
                className="cta-primary founder-primary-button"
              >
                <a href="#pristup" data-cta="pavao-hero-approach">
                  Pogledajte kako radim
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <a
                href={CONVERSATION_PATH}
                className="founder-text-link founder-hero__conversation"
                data-cta="pavao-hero-conversation"
              >
                Dogovorite uvodni razgovor
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <p className="founder-hero__safety">
              <ShieldCheck aria-hidden="true" />
              <span>
                Ne upravljam sredstvima, ne preuzimam skrbništvo i nikada ne
                tražim privatne ključeve, Bitcoin Core wallet backup datoteke,
                wallet passphraseove, početne riječi drugih walleta ni pristup
                novčaniku.
              </span>
            </p>
          </div>
        </header>

        <section className="founder-section founder-story">
          <div className="founder-shell">
            <SectionHeading
              eyebrow="Zašto Bitcoin Savjetovanje"
              title="Bitcoin sam kupio 2014. Sustav je došao kasnije."
            />
            <div className="founder-story__layout">
              <div className="founder-prose">
                <p>
                  Bitcoin sam prvi put kupio u srpnju 2014., kada je vrijedio
                  približno 600 američkih dolara. Kupio sam ga samo za približno
                  20 dolara, jer pristup nižoj cijeni nije bio isto što i
                  razumijevanje Bitcoina.
                </p>
                <p>
                  Tijekom sljedećih godina shvatio sam da ni samo razumijevanje
                  Bitcoina nije dovoljno. Potrebno je urediti proračun, dug,
                  imovinu, trošenje, skrbništvo i obiteljski kontinuitet kako bi
                  Bitcoin stvarno postao primarni novac.
                </p>
                <p>
                  Na puni Bitcoin standard prešao sam u listopadu 2020. To ne
                  znači da Bitcoin nikada ne prodajem ili ne trošim. U eurima
                  držim operativni iznos potreban za bliska plaćanja, a Bitcoin
                  prema potrebi redovito trošim ili razmjenjujem u eure.
                </p>
                <p>
                  Bitcoin Savjetovanje nastalo je kako bih drugima pomogao
                  skratiti put od držanja Bitcoina do sustava koji mogu
                  razumjeti, provoditi i objasniti ljudima koji ovise o njima.
                </p>
              </div>
              <blockquote>
                Pristup nižoj cijeni nije bio isto što i razumijevanje Bitcoina.
              </blockquote>
            </div>
          </div>
        </section>

        <section className="founder-section founder-timeline-section">
          <div className="founder-shell">
            <SectionHeading title="Put do Bitcoin Savjetovanja" />
            <ol className="founder-timeline">
              {timelineItems.map((item) => (
                <li key={item.year}>
                  <span
                    className="founder-timeline__marker"
                    aria-hidden="true"
                  />
                  <p className="founder-timeline__year">{item.year}</p>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="pristup"
          className="founder-section founder-approach"
          aria-labelledby="founder-approach-title"
        >
          <div className="founder-shell">
            <div className="founder-section-heading">
              <p className="founder-eyebrow">Pristup radu</p>
              <h2 id="founder-approach-title">
                Kako pristupam Bitcoin savjetovanju
              </h2>
            </div>
            <div className="founder-approach__list">
              {approachItems.map((item, index) => (
                <article key={item.title}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
            <blockquote className="founder-approach__quote">
              Dobar savjetodavni proces ne završava tuđim nalogom, nego pravilom
              koje vi razumijete i možete sami provoditi.
            </blockquote>
          </div>
        </section>

        <section className="founder-section founder-experience">
          <div className="founder-shell">
            <SectionHeading
              eyebrow="Iskustvo"
              title="Tehnologija, poduzetništvo, monetarna teorija i stvarna primjena"
              copy="Više od 10.000 sati rada i učenja povezalo je teoriju s poduzetničkim, obrazovnim i svakodnevnim operativnim iskustvom."
            />
            <div className="founder-experience__grid">
              {experienceItems.map((item) => (
                <article key={item.title}>
                  <p className="founder-experience__eyebrow">{item.eyebrow}</p>
                  <h3>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-link={item.dataLink}
                    >
                      {item.title}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
            <dl className="founder-milestones" aria-label="Ključni orijentiri">
              {milestones.map(([value, label]) => (
                <div key={label}>
                  <dt>{value}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="founder-section founder-situations">
          <div className="founder-shell">
            <SectionHeading title="Ljudi mi se najčešće javljaju kada" />
            <ol className="founder-situations__list">
              {clientSituations.map((situation, index) => (
                <li key={situation}>
                  <span aria-hidden="true">{index + 1}</span>
                  <p>{situation}</p>
                </li>
              ))}
            </ol>
            <div className="founder-situations__next">
              <p>
                Za jedno jasno pitanje često je dovoljna Bitcoin konzultacija.
                Kada su proračun, dug, imovina, trošenje i sigurnost međusobno
                povezani, potreban je širi proces.
              </p>
              <div>
                <a
                  href={BITCOIN_CONSULTATION_PATH}
                  className="founder-text-link"
                  data-link="pavao-situations-consultation"
                >
                  Pogledajte Bitcoin konzultaciju
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <a
                  href={PERSONAL_BITCOIN_STANDARD_PATH}
                  className="founder-text-link"
                  data-link="pavao-situations-personal-standard"
                >
                  Pogledajte Osobni Bitcoin standard
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="founder-section founder-public-work">
          <div className="founder-shell">
            <SectionHeading
              eyebrow="Javni rad"
              title="Prije razgovora možete vidjeti kako razmišljam"
              copy="Tri različita traga rada pokazuju isti okvir: Bitcoin kao novac treba povezati sa stvarnim odlukama, a ne odvojiti od života."
            />
            <div className="founder-public-work__grid">
              {publicWorkItems.map((item) => (
                <article key={item.title}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    data-link={item.dataLink}
                  >
                    <div
                      className="founder-public-work__visual"
                      data-kind={item.kind}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        width={item.kind === "book" ? "1024" : "1280"}
                        height={item.kind === "book" ? "1536" : "640"}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="founder-public-work__copy">
                      <p>{item.eyebrow}</p>
                      <h3>{item.title}</h3>
                      <span>{item.copy}</span>
                      <strong>
                        {item.linkLabel}
                        <ArrowUpRight aria-hidden="true" />
                      </strong>
                    </div>
                  </a>
                </article>
              ))}
            </div>
            <nav
              className="founder-profile-links"
              aria-label="Ostali javni profili Pavaa Pahljine"
            >
              <span>Ostali javni profili</span>
              <div>
                {profileLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    data-link={link.dataLink}
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </section>

        <section className="founder-section founder-boundaries">
          <div className="founder-shell">
            <div className="founder-boundaries__panel">
              <div>
                <p className="founder-eyebrow">Jasno od početka</p>
                <h2>Granice mojeg rada</h2>
                <p>
                  Ne upravljam vašim sredstvima, ne preuzimam skrbništvo, ne
                  tražim privatne ključeve, Bitcoin Core wallet backup datoteke,
                  wallet passphraseove ni početne riječi drugih walleta te ne
                  pružam trgovačke, pravne, porezne ili računovodstvene savjete.
                </p>
              </div>
              <ul>
                {boundaryItems.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="founder-final">
          <div className="founder-shell founder-final__layout">
            <div>
              <p className="founder-eyebrow">Sljedeći korak</p>
              <h2>Ne morate unaprijed znati koju uslugu trebate.</h2>
              <p>
                Uvodni razgovor služi tome da utvrdimo postoji li jedno
                konkretno pitanje, potreba za Bitcoin konzultacijom ili smislen
                razlog za izgradnju cijelog osobnog Bitcoin standarda.
              </p>
            </div>
            <div className="founder-final__actions">
              <Button
                asChild
                size="lg"
                className="cta-primary founder-primary-button"
              >
                <a href={CONVERSATION_PATH} data-cta="pavao-final-conversation">
                  <CalendarDays aria-hidden="true" />
                  Dogovorite 15-minutni razgovor
                </a>
              </Button>
              <a
                href={BITCOIN_STANDARD_CHECK_PATH}
                className="founder-final__secondary"
                data-link="pavao-final-assessment"
              >
                Napravite besplatnu provjeru Bitcoin standarda
                <ArrowUpRight aria-hidden="true" />
              </a>
              <p>
                Razgovor je bez naknade i bez obveze. Ako je za vaše pitanje
                dovoljan vodič ili drugi stručnjak, to ću otvoreno reći.
              </p>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
