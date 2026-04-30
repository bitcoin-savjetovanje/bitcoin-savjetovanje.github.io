import { useEffect, useState } from "react"
import {
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Compass,
  Linkedin,
  Mail,
  Menu,
  MoonStar,
  ShieldCheck,
  SunMedium,
  X,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

const CALENDLY_URL = "https://cal.com/btcpavao/uvodni-poziv"
const EMAIL = "pavao@hey.com"
const PRACTICAL_BITCOIN_STANDARD_URL =
  "https://btcpavao.gitbook.io/practical-bitcoin-standard/"
const DVADESET_JEDAN_URL = "https://dvadesetjedan.com"
const SAIFEDEAN_AMMOUS_URL = "https://saifedean.com"
const SAIF_HOUSE_URL = "https://thesaifhouse.com/"
const BITCOIN_STANDARD_PODCAST_URL = "https://saifedean.com/podcast"
const BITCOIN_STANDARD_BOOK_URL = "https://saifedean.com/tbs"
const TWENTYONE_URL = "https://twentyone.world"

const navLinks = [
  { label: "Za koga je ovo?", href: "#za-koga" },
  { label: "Što dobivate?", href: "#sto-dobivate" },
  { label: "Proces", href: "#proces" },
  { label: "Program", href: "#program" },
  { label: "O meni", href: "#o-meni" },
  { label: "Pitanja", href: "#pitanja" },
]

const heroBenefits = [
  "budžet i novčani tok",
  "Bitcoin u neto imovini",
  "pravila odluka kroz vrijeme",
]

const credibilityLogos = [
  {
    name: "Saifedean Ammous",
    src: "/saifedean-ammous-logo.webp",
    href: SAIFEDEAN_AMMOUS_URL,
    className: "credibility-logo-strip__logo--compact",
  },
  {
    name: "The Bitcoin Standard Podcast",
    src: "/tbs-podcast-logo.svg",
    href: BITCOIN_STANDARD_PODCAST_URL,
    className: "credibility-logo-strip__logo--wide",
  },
  {
    name: "The Saif House",
    src: "/tsh-logo.avif",
    href: SAIF_HOUSE_URL,
    className:
      "credibility-logo-strip__logo--wide credibility-logo-strip__logo--dark-white",
  },
  {
    name: "TwentyOne",
    src: "/dvadesetjedan-logo.svg",
    darkSrc: "/dvadesetjedan-logo-dark.svg",
    href: TWENTYONE_URL,
    className: "credibility-logo-strip__logo--compact",
  },
  {
    name: "DvadesetJedan",
    src: "/dvadesetjedan-wordmark.png",
    darkSrc: "/dvadesetjedan-wordmark-dark.png",
    href: DVADESET_JEDAN_URL,
    className: "credibility-logo-strip__logo--compact",
  },
]

const trustItems = [
  "U Bitcoinu od 2014.",
  "10.000+ sati rada i proučavanja",
  "6+ godina profesionalnog rada u Bitcoin prostoru",
  "Život na Bitcoin standardu od 2020.",
]

const audienceItems = [
  "već imate Bitcoin, ali ga kupujete uglavnom kad imate višak",
  "niste sigurni što je stvarni višak jer nemate jasan budžet",
  "imate kapital, ali ne znate kako Bitcoin uklopiti u ukupnu neto imovinu",
  "imate dugove ili obveze i niste sigurni kako ih uskladiti s Bitcoinom",
  "ne znate koliki dio imovine držati kao novac, kapital i potrošnju",
  "želite znati kada akumulirati više, kada trošiti, a kada ne dirati ništa",
  "želite prestati donositi odluke prema osjećaju, cijeni i tržišnoj buci",
]

const notForItems = [
  "Ne radim kratkoročno trgovanje.",
  "Ne predviđam cijenu.",
  "Ne bavim se drugim digitalnim imovinama.",
  "Ne gradim plan na obećanju budućeg prinosa.",
  "Ne dajem porezne ni pravne savjete.",
  "Ne donosim odluku umjesto vas.",
  "Ne prodajem vam potvrdu za odluku koju ste već donijeli.",
]

const outcomes = [
  {
    title: "Jasan novčani tok",
    icon: Compass,
    copy: "Razumijete što je stvarni višak nakon osnovnih troškova, obveza, sigurnosne rezerve i planirane potrošnje.",
  },
  {
    title: "Okvir za neto imovinu",
    icon: Check,
    copy: "Bitcoin promatrate u odnosu na novac, kapital, dugove, potrošačka dobra i dugoročnu neto imovinu.",
  },
  {
    title: "Pravila odluka kroz vrijeme",
    icon: ShieldCheck,
    copy: "Postavljate pravila za akumulaciju, trošenje, čekanje i preispitivanje odluka kroz različite cijene i životne okolnosti.",
  },
  {
    title: "Mirniji odnos prema riziku",
    icon: CircleDollarSign,
    copy: "Razdvajamo stvarne rizike od buke: dug, likvidnost, skrbništvo, novčani tok, izloženost i emocionalnu podnošljivost odluke.",
  },
]

const processSteps = [
  {
    step: "01",
    title: "Uvodni razgovor",
    price: "Bez naknade",
    priceTone: "soft",
    copy: "Uvodni razgovor traje oko 15 minuta. Cilj je razumjeti gdje se nalazite s budžetom, dugom, Bitcoinom, viškom, ciljanom izloženošću i okvirom za odluke. Ako vidim da vam ne mogu pomoći ili da ovo nije pravi trenutak, reći ću vam to izravno.",
  },
  {
    step: "02",
    title: "Plaćeni savjetodavni razgovor",
    price: "200 €",
    priceTone: "medium",
    copy: "Razgovor traje 60–90 minuta. Prolazimo vašu stvarnu situaciju: novčani tok, dugove, postojeći Bitcoin, ostatak imovine, potrošnju, kapital i glavne točke neodlučnosti.",
    bullets: [
      "jasniju sliku gdje ste trenutno",
      "glavne rizike koje treba riješiti",
      "okvirni smjer za Bitcoin u neto imovini",
      "preporuku ima li smisla nastaviti u strukturirani program",
      "popis sljedećih odluka koje ne treba odgađati",
    ],
  },
  {
    step: "03",
    title: "Strukturirani program",
    price: "1.500 €",
    priceTone: "strong",
    copy: "Program nije produženi razgovor, nego primjena Practical Bitcoin Standard okvira na vašu konkretnu situaciju: budžet, dug, višak, Bitcoin kao novac, neto imovina, sigurnost i pravila odluka kroz vrijeme.",
  },
]

const programItems = [
  {
    title: "Budžet i stvarni višak",
    copy: "Razlikujemo redovnu potrošnju, sigurnosnu rezervu, planirane troškove i višak koji stvarno možete usmjeravati.",
  },
  {
    title: "Dugovi i obveze",
    copy: "Gledamo kako dug, rokovi, kamate i obveze utječu na odluke oko Bitcoina i novčanog toka.",
  },
  {
    title: "Bitcoin kao novac",
    copy: "Razmatramo kada Bitcoin služi kao štednja, kada kao likvidnost i kada ga ima smisla koristiti ili ne dirati.",
  },
  {
    title: "Kompozicija neto imovine",
    copy: "Bitcoin stavljamo u odnos s novcem, kapitalom, dugovima, potrošačkim dobrima i dugoročnom neto imovinom.",
  },
  {
    title: "Pravila akumulacije i trošenja",
    copy: "Postavljamo pravila kada akumulirati više, kada trošiti, kada čekati i kada preispitati odluku.",
  },
  {
    title: "Sigurnost i skrbništvo",
    copy: "Uređujemo praktičan okvir za čuvanje Bitcoina, operativnu sigurnost i pristup u izvanrednim situacijama.",
  },
  {
    title: "Osobni dokument s pravilima",
    copy: "Dobivate sažetak odluka, kriterija i pravila koja možete koristiti kroz promjene cijene, prihoda i životnih okolnosti.",
  },
]

const typicalSituationQuestions = [
  "što je za mene stvarni višak?",
  "koliko Bitcoina ima smisla imati?",
  "trebam li prvo riješiti dug?",
  "kako Bitcoin uklopiti u ostatak imovine?",
  "kada akumulirati više, a kada trošiti?",
  "što raditi kad je cijena ispod ili iznad dugoročnog trenda?",
]

const practicalBitcoinStandardItems = [
  "budžet nulte razine",
  "život bez duga",
  "davanje kao financijsku i psihološku disciplinu",
  "Bitcoin kao novac u ukupnoj neto imovini",
  "odnos između novca, kapitala i potrošačkih dobara",
  "donošenje odluka kroz promjene cijene i vremena",
]

const bitcoinCircleItems = [
  "konkretnim situacijama članova",
  "budžetu, dugu i neto imovini",
  "odlukama oko Bitcoina kroz vrijeme",
  "razmjeni iskustava iz prakse",
]

const beforeWorkItems = [
  "imate informacije, ali nemate vlastita pravila",
  "znate da je Bitcoin važan, ali ne znate koliki udio ima smisla",
  "kupnju odgađate ili radite impulzivno",
  "sigurnost i skrbništvo nisu do kraja uređeni",
  "odluke ovise o tržištu, emocijama i tuđim mišljenjima",
]

const afterWorkItems = [
  "imate osobni okvir za odluke",
  "znate ciljani raspon izloženosti Bitcoinu",
  "imate pravila kupnje, čekanja i rebalansiranja",
  "znate kako urediti skrbništvo i sigurnost",
  "znate što ne dirati i kada preispitati odluku",
]

const programExclusions = [
  "ne upravljam vašim novcem",
  "ne kupujem Bitcoin za vas",
  "ne držim vaše ključeve",
  "ne dajem porezno ni pravno mišljenje",
  "ne izrađujem investicijsku preporuku u regulatornom smislu",
  "ne bavim se drugim digitalnim imovinama, trgovanjem ni kratkoročnim signalima",
]

const personalPlanItems = [
  {
    title: "Ciljani raspon izloženosti",
    copy: "Koliki udio neto imovine ima smisla držati u Bitcoinu s obzirom na vašu situaciju, vremenski okvir i podnošljivost rizika.",
  },
  {
    title: "Pravila kupnje i dodatne akumulacije",
    copy: "Kada kupujete odmah, kada postupno, kada čekate i pod kojim uvjetima se odluka mijenja.",
  },
  {
    title: "Pravila kada se ništa ne dira",
    copy: "Koji dio Bitcoina je dugoročna štednja i pod kojim okolnostima se ne dira bez obzira na tržišnu buku.",
  },
  {
    title: "Uvjeti za preispitivanje plana",
    copy: "Koje promjene u životu, prihodima, obvezama ili tržištu traže novu procjenu.",
  },
  {
    title: "Način čuvanja i pristupa Bitcoinu",
    copy: "Kako se Bitcoin čuva, tko ima pristup, gdje su sigurnosne kopije i koje su slabosti trenutnog sustava.",
  },
  {
    title: "Sigurnosne i nasljedne procedure",
    copy: "Kako smanjiti rizik gubitka pristupa i kako omogućiti obitelji pristup ako vam se nešto dogodi.",
  },
  {
    title: "Odnos prema novcu, kapitalu i potrošnji",
    copy: "Kako Bitcoin stoji u odnosu na sigurnosnu rezervu, ulaganja, dugove, troškove i dugoročnu neto imovinu.",
  },
]

const goodFitItems = [
  "Bitcoin vam je važna tema, ali odluke i dalje odgađate",
  "imate kapital, ali nemate jasna pravila izloženosti",
  "sigurnost i skrbništvo nisu uređeni do razine na kojoj ste mirni",
  "ne tražite signal, nego okvir",
  "želite odluku koju možete objasniti sebi i obitelji",
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
      "Ne na način univerzalne naredbe. Cilj nije da preuzmem odluku umjesto vas, nego da zajedno izgradimo okvir kroz koji možete donijeti vlastitu odluku u skladu s vašom situacijom, vremenskim okvirom i odnosom prema riziku.",
  },
  {
    question: "Radite li s drugim digitalnim imovinama?",
    answer: "Ne. Fokus je isključivo na Bitcoinu.",
  },
  {
    question: "Radite li s poduzetnicima i tvrtkama?",
    answer:
      "Da, ako je cilj razumjeti Bitcoin u kontekstu osobne ili poslovne financijske slike. Uvodni razgovor služi tome da utvrdimo je li riječ o temi koju mogu kvalitetno obraditi ili je potrebno uključiti poreznog, pravnog ili računovodstvenog stručnjaka.",
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
    question: "Što ako već imam Bitcoin?",
    answer:
      "Tada je savjetovanje često još korisnije. U tom slučaju ne krećemo od pitanja “trebam li kupiti Bitcoin?”, nego od pitanja imate li jasan plan: koliki udio držati, kako čuvati, kada kupovati dodatno, što ne dirati i kako Bitcoin uklopiti u ostatak imovine.",
  },
  {
    question: "Zašto ne samo kupiti i držati?",
    answer:
      "Kupiti i držati može biti dobra odluka, ali samo ako znate koliko držite, zašto baš toliko, gdje ga čuvate, što radite u velikom padu, što radite u velikom rastu i kako obitelj pristupa sredstvima ako vam se nešto dogodi. Problem najčešće nije ideja dugoročnog držanja, nego izostanak osobnih pravila.",
  },
  {
    question: "Kako izgleda rezultat programa?",
    answer:
      "Rezultat programa je praktičan sustav za odluke: sažetak pravila, kriterija i sigurnosnih postupaka koje možete koristiti kroz vrijeme. Uključuje budžet, stvarni višak, odnos prema dugu, Bitcoin u neto imovini, pravila akumulacije i trošenja te sigurnosni model.",
  },
  {
    question: "Što ako već kupujem Bitcoin kad imam viška?",
    answer:
      "Tada ne krećemo od pitanja treba li vam još informacija o Bitcoinu, nego od pitanja što je stvarni višak. Gledamo budžet, obveze, sigurnosnu rezervu, dugove i neto imovinu kako biste znali kada višak stvarno postoji i kako ga rasporediti.",
  },
  {
    question: "Je li ovo samo za ljude koji žele biti all-in u Bitcoinu?",
    answer:
      "Ne. Cilj nije gurati vas prema jednoj razini izloženosti, nego razumjeti koja odluka ima smisla u vašoj situaciji. Za nekoga je to veća izloženost, za nekoga prvo rješavanje duga, a za nekoga jasnije pravilo kada ne dirati ništa.",
  },
  {
    question: "Što je Practical Bitcoin Standard?",
    answer:
      "Practical Bitcoin Standard je open source priručnik koji razvijam kao praktičan okvir za korištenje Bitcoina kao novca u stvarnom životu. Obuhvaća budžet, dug, davanje, neto imovinu, potrošnju, kapital i odluke kroz promjene cijene i vremena.",
  },
  {
    question: "Koliko košta?",
    answer:
      "Uvodni razgovor je bez naknade. Plaćeni savjetodavni razgovor je 200 €. Strukturirani program je 1.500 €.",
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

function PlanVisual() {
  const rows = [
    "Budžet i višak",
    "Dug i obveze",
    "Neto imovina",
    "Bitcoin odluke",
  ]

  return (
    <div className="plan-visual" aria-hidden="true">
      <div className="plan-visual__card">
        <div className="plan-visual__header">
          <div>
            <p className="plan-visual__eyebrow">Praktičan okvir</p>
            <h2>Bitcoin standard u praksi</h2>
            <p>Budžet, dug, neto imovina i odluke kroz vrijeme.</p>
          </div>
          <div className="plan-visual__bitcoin-mark">
            <img src="/bitcoin-logo.png" alt="" />
          </div>
        </div>

        <div className="plan-visual__rows">
          {rows.map((row) => (
            <div key={row} className="plan-visual__row">
              <Check className="plan-visual__check" />
              <span>{row}</span>
            </div>
          ))}
        </div>

      </div>
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
              className="cta-primary hidden rounded-full px-5 xl:inline-flex"
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
                Bitcoin bez nagađanja u stvarnom životu
              </h1>
              <p className="hero-subtitle">
                Ako već imate Bitcoin ili razmišljate o njemu, ali ga još niste
                jasno uklopili u svoje financije — pomažem vam posložiti
                praktičan sustav za budžet, dug, neto imovinu i odluke oko
                Bitcoina.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/80">
                Ovo nije savjetovanje o trgovanju, predviđanju cijene ili
                drugim digitalnim imovinama. Fokus je na tome kako Bitcoin
                koristiti kao novac i kako donositi mirnije odluke kroz vlastitu
                situaciju.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="cta-primary h-12 rounded-full px-6 text-base"
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
                    Pišite mi izravno
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {heroBenefits.map((benefit) => (
                  <span key={benefit} className="hero-benefit">
                    {benefit}
                  </span>
                ))}
              </div>
              <p className="hero-output">
                Nakon rada trebate imati jasniji odnos između budžeta, duga,
                neto imovine i odluka oko Bitcoina.
              </p>
            </div>

            <PlanVisual />
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

        <section id="tipicna-situacija" className="section-shell">
          <div className="case-panel">
            <SectionHeader
              title="Tipična situacija"
              copy="Možda već imate Bitcoin. Možda kupujete kad imate viška sredstava. Možda dugoročno vjerujete u Bitcoin, ali i dalje niste potpuno mirni."
            />
            <div className="mt-7 grid gap-8 lg:grid-cols-[0.86fr_1fr] lg:items-start">
              <div className="space-y-5 text-base leading-8 text-muted-foreground">
                <p className="text-foreground">
                  Najčešće pitanje nije: “Je li Bitcoin važan?”
                </p>
                <p className="font-semibold text-foreground">Pitanje je:</p>
              </div>
              <div className="grid gap-3">
                {typicalSituationQuestions.map((item) => (
                  <div key={item} className="check-row">
                    <Check className="positive-icon mt-1 size-4" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-7 rounded-2xl border border-primary/20 bg-primary/10 p-5 font-semibold text-foreground">
              Ako na ova pitanja nemate jasan odgovor, problem nije manjak
              informacija. Problem je manjak osobnog okvira.
            </p>
          </div>
        </section>

        <section id="o-meni" className="section-shell section-muted">
          <SectionHeader title="Zašto mogu pomoći?" />
          <div className="credibility-grid">
            <aside className="profile-panel">
              <img
                src="/pavao-pahljina.jpg"
                alt="Pavao Pahljina"
              />
              <h3>Pavao Pahljina</h3>
              <p>Bitcoin savjetnik · u Bitcoinu od 2014.</p>
              <div className="profile-socials" aria-label="Kontakt i profili">
                <a
                  href="https://www.linkedin.com/in/pavaopahljina/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profil"
                >
                  <Linkedin className="size-4" />
                </a>
                <a href={`mailto:${EMAIL}`} aria-label="Email">
                  <Mail className="size-4" />
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dogovorite uvodni razgovor"
                >
                  <CalendarDays className="size-4" />
                </a>
              </div>
            </aside>

            <div>
              <div className="credibility-copy">
                <p>
                  U Bitcoinu sam od 2014. godine. Iza mene je više od 10.000
                  sati studiranja Bitcoina, šest godina profesionalnog rada u
                  Bitcoin prostoru sa{" "}
                  <a
                    href={SAIFEDEAN_AMMOUS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Saifedeanom Ammousom
                  </a>
                  , autorom bestseller knjige{" "}
                  <a
                    href={BITCOIN_STANDARD_BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    The Bitcoin Standard
                  </a>
                  , te gradnja regionalne zajednice{" "}
                  <a
                    href={DVADESET_JEDAN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DvadesetJedan
                  </a>{" "}
                  u sklopu svjetske mreže{" "}
                  <a
                    href={TWENTYONE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TwentyOne World
                  </a>
                  .
                </p>
                <p>
                  Od 2020. živim na Bitcoin standardu: primam, držim i trošim
                  Bitcoin kroz različite tržišne uvjete. Ne savjetujem iz
                  pozicije teorije, nego iz prakse: kupnja, čuvanje, trošenje,
                  rizik, oportunitetni trošak i život s Bitcoinom kao primarnim
                  novcem.
                </p>
                <p>
                  Na temelju dosadašnjeg iskustva trenutno radim i na open
                  source priručniku{" "}
                  <a
                    href={PRACTICAL_BITCOIN_STANDARD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Practical Bitcoin Standard
                  </a>
                  .
                </p>
                <p>
                  Danas moj rad nije samo objašnjavanje Bitcoina, nego primjena
                  Bitcoin standarda na stvarne financijske odluke: budžet, dug,
                  potrošnju, kapital, sigurnost i dugoročni smjer.
                </p>
              </div>
            </div>
            <div className="credibility-logo-strip" aria-label="Suradnje i projekti">
              {credibilityLogos.map((logo) => (
                <a
                  key={logo.name}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {logo.darkSrc ? (
                    <>
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className={`${logo.className} credibility-logo-strip__logo--light`}
                      />
                      <img
                        src={logo.darkSrc}
                        alt=""
                        className={`${logo.className} credibility-logo-strip__logo--dark`}
                      />
                    </>
                  ) : (
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className={logo.className}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="za-koga" className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1fr] lg:items-start">
            <SectionHeader
              title="Za koga je ovo?"
              copy="Ova usluga je za ljude koji Bitcoin žele uklopiti u stvarnu financijsku sliku: budžet, dug, višak, neto imovinu i odluke kroz vrijeme."
            />
            <div className="grid gap-3">
              <p className="mb-2 text-base leading-7 text-muted-foreground">
                Ovo je za vas ako:
              </p>
              {audienceItems.map((item) => (
                <div key={item} className="check-row">
                  <Check className="positive-icon mt-1 size-4" />
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
                U tom trenutku problem više nije nedostatak informacija, nego
                pravilnog okvira za donošenje odluka.
              </p>
            </div>
          </div>
        </section>

        <section id="primjer-situacije" className="section-shell">
          <div className="case-panel">
            <SectionHeader title="Primjer situacije" />
            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              <article className="case-card">
                <p>
                  Imate 150.000 € likvidne imovine, nešto Bitcoina, dobar
                  prihod i možda nekretninu. Već godinama pratite Bitcoin, ali
                  niste sigurni treba li povećati izloženost, ostaviti
                  postojeće stanje ili čekati pad.
                </p>
                <p className="font-semibold text-foreground">
                  Problem više nije nedostatak informacija. Problem je što
                  nemate osobna pravila.
                </p>
                <p>
                  U takvoj situaciji savjetovanje ne služi tome da vam netko
                  kaže što morate napraviti, nego da zajedno posložimo okvir za
                  odluke koje možete mirno nositi i za godinu, i za pet, i za
                  deset godina.
                </p>
              </article>
              <article className="case-card">
                <p>
                  Imate Bitcoin koji ste kupovali kroz godine, ali ne znate je
                  li ga previše ili premalo u odnosu na ostatak imovine. Dio
                  držite na burzi, dio na hardverskom novčaniku, a nemate jasno
                  pravilo kada kupujete dodatno, što radite u padu i kako bi
                  vaša obitelj pristupila sredstvima ako vam se nešto dogodi.
                </p>
                <p>
                  U toj situaciji cilj nije “više informacija”, nego uređen
                  sustav: koliki raspon izloženosti ima smisla, gdje se Bitcoin
                  čuva, koja su pravila kupnje i što se ne dira bez obzira na
                  tržišnu buku.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-shell section-muted">
          <SectionHeader
            title="Prije i poslije rada"
            copy="Cilj nije da izađete s još jednim mišljenjem, nego s pravilima koja možete stvarno koristiti."
            align="center"
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <article className="comparison-card">
              <h3>Prije rada</h3>
              <ul>
                {beforeWorkItems.map((item) => (
                  <li key={item}>
                    <X className="negative-icon mt-1 size-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="comparison-card comparison-card--after">
              <h3>Nakon rada</h3>
              <ul>
                {afterWorkItems.map((item) => (
                  <li key={item}>
                    <Check className="positive-icon mt-1 size-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="sto-nije" className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1fr] lg:items-start">
            <SectionHeader
              title="Jasne granice rada"
              copy="Ozbiljan razgovor o Bitcoinu mora biti odvojen od trgovanja, nagovaranja, kratkoročnih prognoza i nerealnih očekivanja."
            />
            <div className="grid gap-2">
              {notForItems.map((item) => (
                <div key={item} className="not-for-row">
                  <X className="negative-icon size-3.5" />
                  <p>{item}</p>
                </div>
              ))}
              <p className="negative-note mt-4">
                Ovo nije za vas ako tražite signal, garanciju prinosa, potvrdu
                već donesene odluke ili nekoga tko će preuzeti odgovornost
                umjesto vas.
              </p>
            </div>
          </div>
        </section>

        <section id="sto-dobivate" className="section-shell section-muted">
          <SectionHeader
            title="Što konkretno dobivate?"
            copy="Ne dobivate još jedno mišljenje, nego praktičan okvir za budžet, dug, neto imovinu i Bitcoin odluke kroz vrijeme."
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

        <section id="okvir" className="section-shell">
          <div className="case-panel">
            <SectionHeader
              title="Okvir iza savjetovanja"
              copy="Savjetovanje se temelji na okviru koji razvijam kroz open source priručnik Practical Bitcoin Standard."
            />
            <div className="mt-7 grid gap-8 lg:grid-cols-[0.86fr_1fr] lg:items-start">
              <div className="space-y-5 text-base leading-8 text-muted-foreground">
                <p>
                  Priručnik nije teorijska knjiga o Bitcoinu, nego praktičan
                  pokušaj odgovora na pitanje:
                </p>
                <p className="text-xl font-semibold leading-8 text-foreground">
                  Kako koristiti Bitcoin kao primarni novac u stvarnom životu?
                </p>
                <p>
                  U savjetovanju ne prolazimo knjigu kao teoriju. Uzimamo okvir
                  i primjenjujemo ga na vašu konkretnu situaciju.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-border/80 bg-background/70"
                >
                  <a
                    href={PRACTICAL_BITCOIN_STANDARD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pogledajte Practical Bitcoin Standard
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>
              <div className="grid gap-3">
                {practicalBitcoinStandardItems.map((item) => (
                  <div key={item} className="check-row">
                    <Check className="positive-icon mt-1 size-4" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="proces"
          className="section-shell border-y border-border/70"
        >
          <SectionHeader
            title="Proces i cijene"
            copy="Proces je namjerno jednostavan. Prvo provjeravamo postoji li stvarna potreba, zatim kroz plaćeni razgovor postavljamo početni okvir, a za dublju primjenu postoji strukturirani program."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {processSteps.map((item) => (
              <article key={item.step} className="process-card">
                <div className="flex items-start justify-between gap-4">
                  <span>{item.step}</span>
                  <strong className={`price-badge price-badge--${item.priceTone}`}>
                    {item.price}
                  </strong>
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                {item.bullets ? (
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-foreground">
                      Nakon razgovora trebate imati:
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <Check className="positive-icon mt-1 size-3.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="program" className="section-shell section-muted">
          <SectionHeader
            title="Što točno dobijete u programu?"
            copy="Program je namijenjen ljudima koji ne žele samo razgovor, nego žele primijeniti Bitcoin standard na vlastiti budžet, dug, neto imovinu, sigurnost i odluke kroz vrijeme."
            align="center"
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {programItems.map((item) => (
              <article key={item.title} className="program-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p className="program-summary">
            Na kraju programa ne biste trebali imati samo više znanja o
            Bitcoinu, nego praktičan sustav: što je višak, kako se odnosite
            prema dugu, koliko Bitcoina ima smisla držati, kada akumulirate,
            kada trošite i kako čuvate Bitcoin kroz vrijeme.
          </p>
        </section>

        <section id="osobni-plan" className="section-shell">
          <SectionHeader
            title="Kako izgleda praktičan sustav odluka?"
            copy="Sustav nije prognoza cijene niti naredba što morate napraviti. To je kratak operativni dokument koji definira pravila za Bitcoin u odnosu na budžet, dug, neto imovinu, sigurnost i dugoročni smjer."
            align="center"
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {personalPlanItems.map((item) => (
              <article key={item.title} className="program-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="program-granice" className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1fr] lg:items-start">
            <SectionHeader
              title="Što nije uključeno u program?"
              copy="Jasne granice važne su jer se ovdje radi o vašem novcu, odgovornosti i dugoročnim odlukama."
            />
            <div className="grid gap-3">
              {programExclusions.map((item) => (
                <div key={item} className="not-for-row">
                  <X className="negative-icon size-3.5" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="bitcoin-krug" className="section-shell section-muted">
          <div className="case-panel">
            <SectionHeader
              title="Što nakon individualnog rada?"
              copy="Nakon individualnog rada, dio ljudi želi nastaviti dugoročno raditi na svojim odlukama, pitanjima i primjeni Bitcoin standarda u stvarnom životu."
            />
            <div className="mt-7 grid gap-8 lg:grid-cols-[0.86fr_1fr] lg:items-start">
              <div className="space-y-5 text-base leading-8 text-muted-foreground">
                <p>
                  Za to razvijam Bitcoin Krug — manju zatvorenu grupu ljudi
                  koji žele održati fokus, donositi bolje odluke i razmjenjivati
                  iskustva s drugima koji ozbiljno pristupaju Bitcoinu.
                </p>
                <p>
                  Bitcoin Krug nije grupa za tržišnu buku, signale ni rasprave
                  o cijeni.
                </p>
                <p>
                  Pristup će u početku biti kroz individualni rad i preporuku.
                </p>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-foreground">
                  Fokus je na:
                </p>
                <div className="grid gap-3">
                  {bitcoinCircleItems.map((item) => (
                    <div key={item} className="check-row">
                      <Check className="positive-icon mt-1 size-4" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pitanja" className="section-shell">
          <SectionHeader title="Česta pitanja" align="center" />
          <div className="mx-auto mt-12 max-w-4xl divide-y divide-border/70 border-y border-border/70">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>
                  <span>{faq.question}</span>
                  <ChevronDown className="faq-item__icon size-5" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section-shell section-muted">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1fr] lg:items-start">
            <SectionHeader
              title="Dobar znak da ima smisla razgovarati"
              copy="Uvodni razgovor ima smisla ako već osjećate da Bitcoin zaslužuje ozbiljniji osobni okvir, ali ne želite donositi odluke prema emocijama, tržišnoj buci ili tuđim mišljenjima."
            />
            <div className="grid gap-3">
              {goodFitItems.map((item) => (
                <div key={item} className="check-row">
                  <Check className="positive-icon mt-1 size-4" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="section-shell">
          <div className="final-cta">
            <div>
              <h2>
                Ako želite primijeniti Bitcoin standard na stvarnu financijsku
                situaciju, krenimo od uvodnog razgovora.
              </h2>
              <p>
                U 15 minuta vidimo gdje ste s budžetom, dugom, Bitcoinom i
                glavnom odlukom koju pokušavate donijeti.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="cta-primary h-12 rounded-full px-6 text-base"
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
                Pišite mi izravno
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p>Bitcoin Savjetovanje | Pavao Pahljina</p>
            <p className="mt-2 text-xs leading-6">
              Ovo nije investicijsko, porezno ni pravno savjetovanje. Ne
              upravljam vašim novcem, ne donosim odluke umjesto vas i ne držim
              vaše ključeve. Rad je edukativan i savjetodavan u području
              osobnog okvira odlučivanja o Bitcoinu.
            </p>
          </div>
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
