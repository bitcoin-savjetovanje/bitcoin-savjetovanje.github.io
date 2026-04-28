import { type FormEvent, useEffect, useState } from "react"
import {
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  Car,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Compass,
  Euro,
  House,
  Mail,
  Menu,
  MoonStar,
  Motorbike,
  Plane,
  Ship,
  ShieldCheck,
  SunMedium,
  X,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

const CALENDLY_URL = "https://cal.com/btcpavao/meeting"
const EMAIL = "pavao@hey.com"
const PRACTICAL_BITCOIN_STANDARD_URL =
  "https://btcpavao.gitbook.io/practical-bitcoin-standard/"
const DVADESCET_JEDAN_URL = "https://dvadesetjedan.com"

const navLinks = [
  { label: "Za koga", href: "#za-koga" },
  { label: "Proces", href: "#proces" },
  { label: "O meni", href: "#o-pavlu" },
  { label: "Pitanja", href: "#pitanja" },
]

const audienceItems = [
  "već imaš Bitcoin, ali nisi siguran imaš li jasan plan",
  "kupuješ kad ima viška, ali nemaš okvir koliko i kada",
  "imaš kapital i razmišljaš o ulasku u Bitcoin",
  "stalno istražuješ, ali odgađaš konkretnu odluku",
  "želiš razumjeti kako Bitcoin uklopiti u ostatak svoje imovine",
  "ne želiš donositi odluke po osjećaju",
]

const problemQuestions = [
  "koliko uopće ima smisla imati?",
  "kada kupovati?",
  "što ako cijena padne?",
  "što ako cijena poraste?",
  "treba li još kupovati ili stati?",
  "kako to uklopiti u ostatak financija?",
]

const outcomes = [
  {
    title: "Jasan okvir",
    icon: Compass,
    copy: "Više ne donosiš odluke po osjećaju. Znaš kako razmišljati o Bitcoinu u kontekstu svoje imovine, prihoda i ciljeva.",
  },
  {
    title: "Plan djelovanja",
    icon: CheckCircle2,
    copy: "Dobivaš konkretan pristup: što raditi sada, što kasnije i kako reagirati u različitim tržišnim okolnostima.",
  },
  {
    title: "Mir u odlukama",
    icon: ShieldCheck,
    copy: "Cilj nije pogoditi svaki pokret cijene. Cilj je imati sustav zbog kojeg ne moraš stalno preispitivati svaku odluku.",
  },
  {
    title: "Integracija s osobnim financijama",
    icon: CircleDollarSign,
    copy: "Bitcoin ne promatramo izolirano, nego kao dio ukupne financijske slike: novac, kapital, dug, potrošnja i dugoročna neto imovina.",
  },
]

const processSteps = [
  {
    step: "01",
    title: "Kratki uvodni poziv",
    price: "Besplatno",
    copy: "15 minuta. Prolazimo gdje si trenutno, što te najviše muči i ima li smisla dalje razgovarati.",
  },
  {
    step: "02",
    title: "Plaćeni 1:1 razgovor",
    price: "200 €",
    copy: "Detaljno prolazimo tvoju situaciju i postavljamo prvi jasan okvir.",
  },
  {
    step: "03",
    title: "Strukturirani program",
    price: "od 1.500 €",
    copy: "Ako ima smisla nastaviti, radimo nekoliko tjedana 1:1 na konkretnom planu i primjeni. Program uključuje više razgovora, jasne korake i praćenje.",
  },
]

const approachItems = [
  "budžet i kontrolu novčanog toka",
  "razduživanje i financijsku stabilnost",
  "dugoročno razmišljanje o neto imovini",
  "Bitcoin kao primarni oblik novca",
  "odnos između novca, kapitala i potrošnje",
]

const notForItems = [
  "nije savjetovanje za kratkoročno trgovanje",
  "nije pogađanje kratkoročne cijene",
  "nije savjetovanje o drugim digitalnim imovinama",
  "nije obećanje prinosa",
  "nije financijski proizvod",
  "nije zamjena za porezni ili pravni savjet",
]

const faqs = [
  {
    question: "Moram li već imati Bitcoin?",
    answer:
      "Ne. Možeš biti u fazi razmišljanja ili već imati Bitcoin. Bitno je da želiš ozbiljno posložiti pristup.",
  },
  {
    question: "Je li ovo za početnike?",
    answer:
      "Može biti, ali nije osnovna edukacija. Najviše koristi imaju ljudi koji već znaju da je Bitcoin važan, ali nemaju jasan plan.",
  },
  {
    question: "Hoćeš li mi reći točno koliko Bitcoina trebam kupiti?",
    answer:
      "Ne dajem univerzalne recepte. Radimo kroz tvoju situaciju i postavljamo okvir donošenja odluka.",
  },
  {
    question: "Radiš li kratkoročno trgovanje ili prognoze cijene?",
    answer:
      "Ne. Fokus je na dugoročnom pristupu, osobnim financijama i donošenju boljih odluka.",
  },
  {
    question: "Koliko košta?",
    answer:
      "Kratki uvodni poziv je besplatan. Detaljni 1:1 razgovor je 200 €. Strukturirani program kreće od 1.500 €.",
  },
  {
    question: "Kako se dogovara poziv?",
    answer:
      "Putem obrasca ili poveznice za rezervaciju termina. Prvi korak je kratak uvodni razgovor.",
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
          <span className="money-system__euro-mark">
            <Euro className="size-5" />
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
      </article>

      <article className="money-system__segment money-system__segment--spending">
        <div className="money-system__icons">
          <span>
            <House className="size-4" />
          </span>
          <span>
            <Car className="size-4" />
          </span>
          <span>
            <Motorbike className="size-4" />
          </span>
          <span>
            <Plane className="size-4" />
          </span>
          <span>
            <Ship className="size-4" />
          </span>
        </div>
      </article>
    </div>
  )
}

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const subject = "Upit za Bitcoin savjetovanje"
    const body = [
      `Ime i prezime: ${formData.get("ime_i_prezime") ?? ""}`,
      `Email: ${formData.get("email") ?? ""}`,
      "",
      "Gdje sam trenutno s Bitcoinom:",
      `${formData.get("trenutno_s_bitcoinom") ?? ""}`,
      "",
      "Najveća nejasnoća:",
      `${formData.get("najveca_nejasnoca") ?? ""}`,
      "",
      `Želim uvodni poziv: ${formData.get("uvodni_poziv") ?? ""}`,
    ].join("\n")

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
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
          <a className="font-display text-base font-semibold" href="#top">
            Pavao Pahljina
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="lg"
              className="hidden rounded-full px-5 md:inline-flex"
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Uvodni poziv
              </a>
            </Button>
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full border-border/80 bg-background/80 md:hidden"
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
            className="mx-auto grid max-w-7xl gap-2 px-4 pb-4 md:hidden"
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
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.75fr)] lg:items-center lg:px-8 lg:py-24">
            <div className="max-w-4xl">
              <h1 className="font-display text-5xl leading-none font-semibold text-foreground sm:text-6xl lg:text-7xl">
                Bitcoin bez kaosa i neodlučnosti
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-9 text-muted-foreground">
                Ako imaš kapital i razmišljaš o Bitcoinu, ali nemaš jasan plan,
                pomažem ti posložiti konkretan pristup kroz tvoju financijsku
                situaciju.
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
                    Dogovori kratki uvodni poziv
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-border/80 bg-background/70 px-6 text-base"
                >
                  <a href="#kontakt">
                    Pošalji pitanje
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                15 minuta. Bez obveze. Cilj je vidjeti ima li smisla dalje
                razgovarati.
              </p>

              <div className="mt-12 grid gap-4 border-t border-border/70 pt-8 sm:grid-cols-3">
                <div>
                  <p className="text-2xl font-semibold">2014.</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    u Bitcoinu od rane faze tržišta
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">10.000+</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    sati proučavanja i rada u Bitcoin prostoru
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">2020.</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    osobni život na Bitcoin standardu
                  </p>
                </div>
              </div>
            </div>

            <MoneySystemVisual />
          </div>
        </section>

        <section id="za-koga" className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1fr] lg:items-start">
            <SectionHeader
              title="Ovo je za tebe ako..."
              copy="Bitcoin savjetovanje ima najviše smisla kada već osjećaš da je tema važna, ali ti nedostaje okvir za mirne i konkretne odluke."
            />
            <div>
              <div className="grid gap-3">
                {audienceItems.map((item) => (
                  <div key={item} className="check-row">
                    <Check className="mt-1 size-4 text-primary" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 border-l-2 border-primary pl-5 text-base leading-8 text-muted-foreground">
                Ovo nije za ljude koji traže brze rezultate, signale za
                kratkoročne pozicije ili špekulacije drugim digitalnim
                imovinama. Fokus je na dugoročnom, mirnom i strukturiranom
                pristupu Bitcoinu.
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell section-muted">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.88fr] lg:items-start">
            <div>
              <SectionHeader title="Većina ljudi ne zapne na Bitcoinu. Zapne na odlukama." />
              <div className="mt-7 space-y-5 text-lg leading-8 text-muted-foreground">
                <p>
                  Problem danas nije nedostatak informacija. Informacija ima
                  previše.
                </p>
                <p>
                  Većina ljudi zna da je Bitcoin važan. Čitali su, slušali,
                  pratili rasprave i možda već nešto kupili. Ali kad dođe
                  trenutak za konkretnu odluku, nastane nejasnoća.
                </p>
                <p>
                  Bez jasnog okvira, svaka odluka postaje stres. Zato je
                  potreban Bitcoin plan koji povezuje kapital, osobne financije
                  i dugoročni pristup Bitcoinu.
                </p>
              </div>
            </div>

            <div className="question-panel">
              {problemQuestions.map((question) => (
                <p key={question}>{question}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <SectionHeader
            title="Što dobivaš kroz savjetovanje"
            copy="Radimo na okviru koji možeš stvarno koristiti, u stvarnom životu, s kapitalom koji već imaš i odlukama koje te čekaju."
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
            title="Kako izgleda proces"
            copy="Cijene su prikazane jasno jer ozbiljan razgovor ne treba skrivati iza agresivne prodaje."
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

        <section className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1fr] lg:items-start">
            <SectionHeader
              title="Pristup nije teorijski. Pristup je praktičan."
              copy="Moj rad se temelji na praktičnom iskustvu života na Bitcoin standardu."
            />
            <div className="space-y-7">
              <p className="text-lg leading-8 text-muted-foreground">
                Od 2020. godine primam, držim i trošim Bitcoin kroz različite
                faze tržišta. Kroz to sam razvio okvir koji spaja:
              </p>
              <div className="grid gap-3">
                {approachItems.map((item) => (
                  <div key={item} className="check-row">
                    <Check className="mt-1 size-4 text-primary" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-lg leading-8 text-muted-foreground">
                Cilj nije da dobiješ još jednu teoriju. Cilj je da znaš što
                konkretno napraviti u svojoj situaciji.
              </p>
            </div>
          </div>
        </section>

        <section id="o-pavlu" className="section-shell section-muted">
          <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:items-start">
            <aside className="profile-panel">
              <img
                src="https://avatars.githubusercontent.com/u/109140795?v=4"
                alt="Pavao Pahljina"
              />
              <h3>Pavao Pahljina</h3>
              <p>Bitcoin savjetovanje, Hrvatska</p>
              <div className="mt-6 grid gap-2 text-sm">
                <a
                  href={PRACTICAL_BITCOIN_STANDARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Practical Bitcoin Standard
                </a>
                <a
                  href={DVADESCET_JEDAN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube / DvadesetJedan
                </a>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </aside>

            <div>
              <SectionHeader title="O meni" />
              <div className="mt-7 space-y-5 text-lg leading-8 text-muted-foreground">
                <p>U Bitcoin sam ušao 2014. godine.</p>
                <p>
                  Zadnjih više od 6 godina profesionalno radim u Bitcoin
                  prostoru, uključujući operativni rad sa Saifedeanom Ammousom,
                  autorom knjige Bitcoin Standard.
                </p>
                <p>
                  Proveo sam više od 10.000 sati proučavajući Bitcoin, ali ono
                  što najviše razlikuje moj pristup nije samo teorijsko znanje,
                  nego praktično iskustvo.
                </p>
                <p>
                  Od 2020. godine živim na Bitcoin standardu: primam prihod u
                  Bitcoinu, trošim Bitcoin i koristim ga kao primarni novac kroz
                  različite tržišne uvjete.
                </p>
                <p>
                  Danas radim s ljudima koji žele prestati nagađati i posložiti
                  svoj Bitcoin pristup na miran, konkretan i dugoročan način.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-start">
            <SectionHeader
              title="Ovo nije za svakoga"
              copy="Ovo je savjetovanje za ljude koji žele donijeti bolje odluke oko Bitcoina u kontekstu vlastitog života i financija."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {notForItems.map((item) => (
                <div key={item} className="not-for-row">
                  <X className="size-4" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pitanja" className="section-shell section-muted">
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
                Ako već neko vrijeme razmišljaš o Bitcoinu, ali nemaš jasan
                plan, krenimo od razgovora.
              </h2>
              <p>
                Kratki uvodni poziv služi da vidimo gdje si trenutno, što
                pokušavaš riješiti i ima li smisla nastaviti.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-6 text-base"
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <CalendarDays className="size-4" />
                Dogovori uvodni poziv
              </a>
            </Button>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.75fr_1fr] lg:items-start">
            <div>
              <SectionHeader
                title="Kontakt forma"
                copy="Ovo može ostati jednostavan početni obrazac ili se kasnije spojiti na pravi sustav za slanje upita."
              />
              <div className="mt-8 space-y-3 text-sm text-muted-foreground">
                <p>
                  Mjesto za Calendly link:{" "}
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    cal.com/btcpavao/meeting
                  </a>
                </p>
                <p>
                  Mjesto za email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </div>
            </div>

            <form
              className="contact-form"
              onSubmit={handleContactSubmit}
            >
              <label>
                <span>Ime i prezime</span>
                <input
                  name="ime_i_prezime"
                  type="text"
                  autoComplete="name"
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                <span>Kratko: gdje si trenutno s Bitcoinom?</span>
                <textarea name="trenutno_s_bitcoinom" rows={4} required />
              </label>
              <label>
                <span>Što ti je najveća nejasnoća?</span>
                <textarea name="najveca_nejasnoca" rows={4} required />
              </label>
              <label>
                <span>Želiš li uvodni poziv?</span>
                <select name="uvodni_poziv" defaultValue="Da">
                  <option>Da</option>
                  <option>Još nisam siguran</option>
                  <option>Samo šaljem pitanje</option>
                </select>
              </label>
              <Button
                type="submit"
                size="lg"
                className="h-12 rounded-full text-base"
              >
                <Mail className="size-4" />
                Pošalji upit
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>Bitcoin savjetovanje | Pavao Pahljina</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={PRACTICAL_BITCOIN_STANDARD_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Practical Bitcoin Standard
            </a>
            <a
              href={DVADESCET_JEDAN_URL}
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
          className="fixed right-4 bottom-4 z-50 size-10 rounded-full border border-border/70 bg-background/94 shadow-lg md:right-6 md:bottom-6"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Povratak na vrh"
        >
          <ArrowUp className="size-4" />
        </Button>
      ) : null}
    </div>
  )
}

export default App
