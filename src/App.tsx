import { useEffect, useState } from "react"
import {
  ArrowUp,
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  Car,
  Check,
  CircleDollarSign,
  Compass,
  Calculator,
  DollarSign,
  Euro,
  Factory,
  Gamepad2,
  Guitar,
  House,
  Menu,
  MoonStar,
  Motorbike,
  Plane,
  Ship,
  ShieldCheck,
  SunMedium,
  Wrench,
  X,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

const CALENDLY_URL = "https://cal.com/btcpavao/meeting"
const EMAIL = "pavao@hey.com"
const PRACTICAL_BITCOIN_STANDARD_URL =
  "https://btcpavao.gitbook.io/practical-bitcoin-standard/"
const DVADESET_JEDAN_URL = "https://dvadesetjedan.com"

const navLinks = [
  { label: "Za koga je ovo?", href: "#za-koga" },
  { label: "Što ovo nije?", href: "#sto-nije" },
  { label: "Proces i cijene", href: "#proces" },
  { label: "O meni", href: "#o-meni" },
  { label: "Česta pitanja", href: "#pitanja" },
]

const trustItems = [
  "U Bitcoinu od 2014.",
  "10.000+ sati rada i proučavanja",
  "6+ godina profesionalnog rada u Bitcoin industriji",
  "Život na Bitcoin standardu od 2020.",
]

const audienceItems = [
  "već imate Bitcoin, ali niste sigurni imate li jasan dugoročni plan",
  "imate kapital i razmišljate o ulasku, ali ne želite djelovati impulzivno",
  "već dugo čitate i istražujete, ali odluka se stalno odgađa",
  "niste sigurni koliki udio vaše imovine ima smisla izložiti Bitcoinu",
  "želite urediti sigurnost, skrbništvo i pravila ponašanja kroz vrijeme",
  "želite Bitcoin uklopiti u širu financijsku sliku, a ne promatrati ga izolirano",
]

const notForItems = [
  "Neću vas nagovarati da kupite Bitcoin.",
  "Neću predviđati kratkoročnu cijenu.",
  "Neću vam dati univerzalni postotak koji vrijedi za sve.",
  "Neću glumiti poreznog ili pravnog savjetnika.",
  "Neću od vašeg života napraviti ideološki projekt.",
  "Moj posao je pomoći vam da mirnije i jasnije odlučujete.",
]

const outcomes = [
  {
    title: "Osobni okvir odlučivanja",
    icon: Compass,
    copy: "Razumijete kako razmišljati o Bitcoinu u odnosu na vlastitu imovinu, prihode, obveze, vremenski okvir i razinu rizika koju možete mirno nositi.",
  },
  {
    title: "Jasna pravila za djelovanje",
    icon: Check,
    copy: "Umjesto donošenja odluka prema raspoloženju tržišta, postavljate pravila za kupnju, čekanje, sigurnost i ponašanje kroz različite okolnosti.",
  },
  {
    title: "Uređen odnos prema riziku",
    icon: ShieldCheck,
    copy: "Razdvajamo stvarne rizike od buke: cijenu, skrbništvo, likvidnost, sigurnost, dugove, novčani tok i emocionalnu podnošljivost odluke.",
  },
  {
    title: "Bitcoin u kontekstu cijele imovine",
    icon: CircleDollarSign,
    copy: "Bitcoin ne promatramo izolirano, nego u odnosu na novac, kapital, potrošnju, obveze, sigurnosnu rezervu i dugoročnu neto imovinu.",
  },
]

const processSteps = [
  {
    step: "01",
    title: "Uvodni razgovor",
    price: "Bez naknade",
    copy: "Uvodni razgovor traje oko 15 minuta. Cilj nije da u njemu riješimo cijelu situaciju, nego da razumijem gdje se nalazite, što pokušavate odlučiti i ima li smisla nastaviti u detaljniji savjetodavni razgovor. Ako vidim da vam ne mogu pomoći ili da ovo nije pravi trenutak, reći ću vam to izravno.",
  },
  {
    step: "02",
    title: "Plaćeni savjetodavni razgovor",
    price: "200 €",
    copy: "Plaćeni savjetodavni razgovor traje 60–90 minuta. U njemu prolazimo vašu stvarnu situaciju: sadašnje razumijevanje Bitcoina, postojeću izloženost, odnos prema riziku, novčani tok, ostatak imovine, vremenski okvir i glavne točke neodlučnosti. Cilj je da nakon razgovora imate jasniji okvir za donošenje odluka i da znate koji bi sljedeći koraci imali smisla.",
  },
  {
    step: "03",
    title: "Strukturirani program",
    price: "Od 1.500 €",
    copy: "Program nije produženi razgovor, nego vođeni proces kroz više odluka: udio, ritam, sigurnost, pravila ponašanja i integracija s ostatkom imovine.",
  },
]

const faqs = [
  {
    question: "Je li ovo financijsko savjetovanje?",
    answer:
      "Ne. Ovo nije licencirano investicijsko, porezno ili pravno savjetovanje. Rad je usmjeren na osobni okvir odlučivanja, razumijevanje Bitcoina, uređenje sigurnosti i jasniji pristup vlastitoj situaciji. Za porezna i pravna pitanja treba se obratiti odgovarajućim stručnjacima.",
  },
  {
    question: "Moram li već imati Bitcoin?",
    answer:
      "Ne morate. Usluga je korisna i za ljude koji tek razmišljaju o ulasku i za ljude koji već imaju Bitcoin, ali nemaju jasan plan.",
  },
  {
    question: "Hoćete li mi reći koliko Bitcoina trebam kupiti?",
    answer:
      "Ne dajem univerzalne recepte ni naredbe. Cilj je pomoći vam izgraditi okvir kroz koji možete donijeti vlastitu odluku u skladu s vašom situacijom, vremenskim okvirom i odnosom prema riziku.",
  },
  {
    question: "Radite li s drugim kriptovalutama?",
    answer: "Ne. Fokus je isključivo na Bitcoinu.",
  },
  {
    question: "Je li razgovor povjerljiv?",
    answer:
      "Da. Razgovori su povjerljivi. Ne objavljujem osobne podatke, financijsku situaciju ni pojedinosti razgovora. Ako kasnije koristim opće uvide iz rada s klijentima, oni se uvijek iznose bez identiteta i bez pojedinosti po kojima bi se osoba mogla prepoznati.",
  },
  {
    question: "Što ako nakon uvodnog razgovora nema smisla nastaviti?",
    answer:
      "Reći ću vam to izravno. Uvodni razgovor služi upravo tome da vidimo postoji li stvarna potreba i odgovara li ovaj oblik rada vašoj situaciji.",
  },
  {
    question: "Koliko košta?",
    answer:
      "Uvodni razgovor je bez naknade. Plaćeni savjetodavni razgovor je 200 €. Strukturirani program kreće od 1.500 €.",
  },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-10 rounded-full border-border/80 bg-background/80 backdrop-blur"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <SunMedium className="size-4" />
      ) : (
        <MoonStar className="size-4" />
      )}
      <span className="sr-only">Promijeni temu</span>
    </Button>
  )
}

function SectionHeader({
  title,
  copy,
  align = "left",
}: {
  title: string
  copy?: string
  align?: "left" | "center"
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      <h2 className="font-display text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          {copy}
        </p>
      ) : null}
    </div>
  )
}

function MoneySystemVisual() {
  return (
    <div className="money-system" aria-hidden="true">
      <svg
        className="money-system__pie"
        viewBox="0 0 100 100"
        role="img"
        aria-label="Pie chart: Novac 60%, Kapital 25%, Potrošnja 15%"
      >
        <path
          className="money-system__slice money-system__slice--money"
          d="M 50 50 L 50 5 A 45 45 0 1 1 23.55 86.41 Z"
        />
        <path
          className="money-system__slice money-system__slice--capital"
          d="M 50 50 L 23.55 86.41 A 45 45 0 0 1 13.59 23.55 Z"
        />
        <path
          className="money-system__slice money-system__slice--spending"
          d="M 50 50 L 13.59 23.55 A 45 45 0 0 1 50 5 Z"
        />
      </svg>

      <p className="money-system__label money-system__label--money">Novac</p>
      <p className="money-system__label money-system__label--capital">
        Kapital
      </p>
      <p className="money-system__label money-system__label--spending">
        Potrošnja
      </p>

      <article className="money-system__segment money-system__segment--money">
        <div className="money-system__icons">
          <span className="money-system__bitcoin-logo">
            <img src="/bitcoin-logo.png" alt="" />
          </span>
          <span className="money-system__currency-mark money-system__currency-mark--euro">
            <Euro className="size-5" />
          </span>
          <span className="money-system__currency-mark money-system__currency-mark--dollar">
            <DollarSign className="size-5" />
          </span>
        </div>
      </article>

      <article className="money-system__segment money-system__segment--capital">
        <div className="money-system__capital-chart">
          <span className="money-system__capital-bitcoin">
            <img src="/bitcoin-logo.png" alt="" />
          </span>
          <div className="money-system__bars">
            <span />
            <span />
            <span />
          </div>
        </div>
        <span className="money-system__capital-symbol money-system__capital-symbol--factory">
          <Factory className="size-4" />
        </span>
        <span className="money-system__capital-symbol money-system__capital-symbol--wrench">
          <Wrench className="size-4" />
        </span>
        <span className="money-system__capital-symbol money-system__capital-symbol--calculator">
          <Calculator className="size-4" />
        </span>
        <span className="money-system__capital-symbol money-system__capital-symbol--briefcase">
          <Briefcase className="size-4" />
        </span>
      </article>

      <article className="money-system__segment money-system__segment--spending">
        <div className="money-system__icons">
          <span className="money-system__spending-icon money-system__spending-icon--home">
            <House className="size-4" />
          </span>
          <span className="money-system__spending-icon money-system__spending-icon--car">
            <Car className="size-4" />
          </span>
          <span className="money-system__spending-icon money-system__spending-icon--bike">
            <Motorbike className="size-4" />
          </span>
          <span className="money-system__spending-icon money-system__spending-icon--plane">
            <Plane className="size-4" />
          </span>
          <span className="money-system__spending-icon money-system__spending-icon--ship">
            <Ship className="size-4" />
          </span>
          <span className="money-system__spending-icon money-system__spending-icon--guitar">
            <Guitar className="size-4" />
          </span>
          <span className="money-system__spending-icon money-system__spending-icon--gamepad">
            <Gamepad2 className="size-4" />
          </span>
        </div>
      </article>
    </div>
  )
}

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
      }
    }

    function handleResize() {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false)
      }
    }

    function handleScroll() {
      setShowBackToTop(window.scrollY > 480)
    }

    window.addEventListener("keydown", handleKeydown)
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("keydown", handleKeydown)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/86 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="font-display text-base font-semibold whitespace-nowrap"
            href="#top"
          >
            Bitcoin Savjetovanje
          </a>

          <nav className="hidden items-center gap-6 xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm whitespace-nowrap text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="lg"
              className="hidden rounded-full px-5 xl:inline-flex"
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Dogovorite uvodni razgovor
              </a>
            </Button>
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full border-border/80 bg-background/80 xl:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
              <span className="sr-only">Otvori navigaciju</span>
            </Button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <nav
            id="mobile-nav"
            className="mx-auto grid max-w-7xl gap-2 px-4 pb-4 xl:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg border border-border/70 bg-card px-4 py-3 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      <main id="top">
        <section className="hero-section border-b border-border/70">
          <div className="hero-shell">
            <div className="hero-copy">
              <h1 className="hero-title">
                Uklonite neodlučnost i donesite jasne odluke oko Bitcoina.
              </h1>
              <p className="hero-subtitle">
                Pomažem ljudima s kapitalom koji već osjećaju da je Bitcoin
                važan, ali nemaju miran i provediv okvir za odluku: koliko
                imati, kako pristupiti kupnji, kako urediti sigurnost i kako
                Bitcoin uklopiti u širu financijsku sliku.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/80">
                Bez trgovanja. Bez predviđanja cijene. Bez buke. Samo miran,
                strukturiran razgovor o vašoj stvarnoj situaciji.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full px-6 text-base"
                >
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CalendarDays className="size-4" />
                    Dogovorite uvodni razgovor
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-border/80 bg-background/70 px-6 text-base"
                >
                  <a href={`mailto:${EMAIL}`}>
                    Pošaljite pitanje
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>
            </div>

            <MoneySystemVisual />
          </div>
        </section>

        <section className="trust-strip" aria-label="Sažetak iskustva">
          <div className="mx-auto grid max-w-7xl gap-3 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {trustItems.map((item) => (
              <div key={item} className="trust-strip__item">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="za-koga" className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1fr] lg:items-start">
            <SectionHeader
              title="Ovo je za vas ako..."
              copy="Savjetovanje ima najviše smisla kada već osjećate da je tema važna, ali vam nedostaje osobni okvir za mirne i konkretne odluke."
            />
            <div className="grid gap-3">
              <p className="mb-2 text-base leading-7 text-muted-foreground">
                Ovo nije zamišljeno za potpune početnike koji samo žele opći
                uvod u Bitcoin, nego za ljude koji osjećaju da je tema već
                dovoljno važna da zaslužuje ozbiljniji osobni okvir.
              </p>
              {audienceItems.map((item) => (
                <div key={item} className="check-row">
                  <Check className="mt-1 size-4 text-primary" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-muted">
          <div className="pattern-panel">
            <SectionHeader title="Prepoznajete li ovaj obrazac?" />
            <div className="mt-7 space-y-5 text-lg leading-8 text-muted-foreground">
              <p className="text-foreground">
                Ovo je najčešći razlog zbog kojeg ljudi godinama ostaju između
                interesa i odluke.
              </p>
              <p>
                Već neko vrijeme znate da je Bitcoin važan. Možda ste nešto već
                kupili, možda godinama pratite temu, ali i dalje nemate jasan
                osobni okvir. Ne znate koliki udio imovine ima smisla izložiti
                Bitcoinu. Niste sigurni treba li kupovati odmah, postupno ili
                uopće ne još. Ne želite se oslanjati na tuđa mišljenja, objave i
                tržišno raspoloženje.
              </p>
              <p>
                Ne želite donijeti impulzivnu odluku, ali ne želite ni još
                godinama ostati u istom krugu razmišljanja.
              </p>
              <p className="rounded-2xl border border-primary/20 bg-primary/10 p-5 font-semibold text-foreground">
                U tom trenutku problem više nije informacija. Problem je okvir.
              </p>
            </div>
          </div>
        </section>

        <section id="sto-nije" className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1fr] lg:items-start">
            <SectionHeader
              title="Ovo nije još jedna stranica o brzom bogaćenju."
              copy="Ne bavim se kratkoročnim trgovanjem, drugim digitalnim imovinama ni obećanjima prinosa. Rad je usmjeren na dugoročni okvir odlučivanja, osobnu/poslovnu financijsku sliku, sigurnost i provedbu."
            />
            <div className="grid gap-3">
              <p className="mb-2 text-base leading-7 text-muted-foreground">
                Jasne granice usluge važne su jer ozbiljan razgovor o Bitcoinu
                mora biti odvojen od buke, nagovaranja i nerealnih obećanja.
              </p>
              {notForItems.map((item) => (
                <div key={item} className="not-for-row">
                  <X className="size-4" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-muted">
          <SectionHeader
            title="Što dobivate kroz savjetovanje"
            copy="Ne odlazite s još jednim mišljenjem, nego s okvirom kroz koji možete donositi odluke i kada cijena raste, i kada pada, i kada okolina šalje proturječne signale."
            align="center"
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {outcomes.map((item) => {
              const Icon = item.icon

              return (
                <article key={item.title} className="value-card">
                  <div className="icon-mark">
                    <Icon className="size-5" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section
          id="proces"
          className="section-shell border-y border-border/70"
        >
          <SectionHeader
            title="Proces i cijene"
            copy="Rad je strukturiran u jasne korake. Cijene su prikazane otvoreno jer ozbiljno savjetovanje ne treba skrivati iza agresivne prodaje."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {processSteps.map((item) => (
              <article key={item.step} className="process-card">
                <div className="flex items-start justify-between gap-4">
                  <span>{item.step}</span>
                  <strong>{item.price}</strong>
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="o-meni" className="section-shell section-muted">
          <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:items-start">
            <aside className="profile-panel">
              <img
                src="https://avatars.githubusercontent.com/u/109140795?v=4"
                alt="Pavao Pahljina"
              />
              <h3>Pavao Pahljina</h3>
              <p>Bitcoin savjetnik · u Bitcoinu od 2014.</p>
              <div className="mt-6 grid gap-2 text-sm">
                <a
                  href={PRACTICAL_BITCOIN_STANDARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Practical Bitcoin Standard
                </a>
                <a
                  href={DVADESET_JEDAN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DvadesetJedan
                </a>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </aside>

            <div>
              <SectionHeader title="Zašto mogu pomoći?" />
              <div className="mt-7 space-y-5 text-lg leading-8 text-muted-foreground">
                <p>
                  U Bitcoinu sam od 2014. godine. Iza mene je više od 10.000
                  sati rada i proučavanja, više od šest godina profesionalnog
                  rada u Bitcoin industriji, rad sa Saifedeanom Ammousom te
                  dugogodišnji rad kroz DvadesetJedan.
                </p>
                <p>
                  Od 2020. živim na Bitcoin standardu: primam, držim i trošim
                  Bitcoin kroz različite tržišne uvjete. Zbog toga moj pristup
                  nije teorijsko uvjeravanje, nego praktično poslagivanje odluka
                  koje osoba stvarno mora donijeti.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pitanja" className="section-shell">
          <SectionHeader title="Česta pitanja" align="center" />
          <div className="mx-auto mt-12 max-w-4xl divide-y divide-border/70 border-y border-border/70">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="kontakt" className="section-shell">
          <div className="final-cta">
            <div>
              <h2>
                Ako već neko vrijeme razmišljate o Bitcoinu, ali i dalje nemate
                miran osobni okvir, krenimo od uvodnog razgovora.
              </h2>
              <p>
                Cilj nije da sve riješimo u 15 minuta, nego da vidimo gdje se
                nalazite, što pokušavate odlučiti i ima li smisla nastaviti.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full px-6 text-base"
              >
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CalendarDays className="size-4" />
                  Dogovorite uvodni razgovor
                </a>
              </Button>
              <a className="final-cta__email" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>Bitcoin Savjetovanje | Pavao Pahljina</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={PRACTICAL_BITCOIN_STANDARD_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Practical Bitcoin Standard
            </a>
            <a
              href={DVADESET_JEDAN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              DvadesetJedan
            </a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
      </footer>

      {showBackToTop ? (
        <Button
          type="button"
          size="icon"
          className="fixed right-4 bottom-4 z-50 size-10 rounded-full border border-border/70 bg-background/94 text-foreground shadow-lg hover:bg-muted hover:text-foreground md:right-6 md:bottom-6"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Povratak na vrh"
        >
          <ArrowUp className="size-4 stroke-[2.5]" />
        </Button>
      ) : null}
    </div>
  )
}

export default App
