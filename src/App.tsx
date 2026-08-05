import { Suspense, lazy, useEffect, useState, type ComponentType } from "react"
import { ArrowUp } from "lucide-react"

import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { StickyMobileCta } from "@/components/layout/StickyMobileCta"
import { Button } from "@/components/ui/button"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"

export type RouteComponents = {
  Home: ComponentType
  PavaoPahljina: ComponentType
  Budget: ComponentType
  BudgetZero: ComponentType
  Debt: ComponentType
  Giving: ComponentType
  BitcoinMoney: ComponentType
  NetWorth: ComponentType
  TimeVolatility: ComponentType
  LongTermTrend: ComponentType
  BitcoinToday: ComponentType
  CustodySecurity: ComponentType
  BitcoinAdvice: ComponentType
  MissedBitcoin: ComponentType
  BusinessBitcoin: ComponentType
  BusinessBitcoinOnePager: ComponentType
  GuidesIndex: ComponentType
  Conversation: ComponentType
  BitcoinConsultation: ComponentType
  PersonalBitcoinStandard: ComponentType
  SamplePersonalBitcoinStandard: ComponentType
  BitcoinStandardCheck: ComponentType
  PersonalPage: ComponentType
  FamilyPage: ComponentType
  EntrepreneursPage: ComponentType
  Guide: ComponentType<{ slug: string }>
  Security: ComponentType
  Privacy: ComponentType
  NotFound: ComponentType
}

const lazyRouteComponents = {
  Home: lazy(() =>
    import("@/pages/Home").then((module) => ({ default: module.Home }))
  ),
  PavaoPahljina: lazy(() =>
    import("@/pages/PavaoPahljina").then((module) => ({
      default: module.PavaoPahljina,
    }))
  ),
  Budget: lazy(() =>
    import("@/pages/Budget").then((module) => ({ default: module.Budget }))
  ),
  BudgetZero: lazy(() =>
    import("@/pages/BudgetZero").then((module) => ({
      default: module.BudgetZero,
    }))
  ),
  Debt: lazy(() =>
    import("@/pages/Debt").then((module) => ({ default: module.Debt }))
  ),
  Giving: lazy(() =>
    import("@/pages/Giving").then((module) => ({ default: module.Giving }))
  ),
  BitcoinMoney: lazy(() =>
    import("@/pages/BitcoinMoney").then((module) => ({
      default: module.BitcoinMoney,
    }))
  ),
  NetWorth: lazy(() =>
    import("@/pages/NetWorth").then((module) => ({
      default: module.NetWorth,
    }))
  ),
  TimeVolatility: lazy(() =>
    import("@/pages/TimeVolatility").then((module) => ({
      default: module.TimeVolatility,
    }))
  ),
  LongTermTrend: lazy(() =>
    import("@/pages/LongTermTrend").then((module) => ({
      default: module.LongTermTrend,
    }))
  ),
  BitcoinToday: lazy(() =>
    import("@/pages/BitcoinToday").then((module) => ({
      default: module.BitcoinToday,
    }))
  ),
  CustodySecurity: lazy(() =>
    import("@/pages/CustodySecurity").then((module) => ({
      default: module.CustodySecurity,
    }))
  ),
  BitcoinAdvice: lazy(() =>
    import("@/pages/BitcoinAdvice").then((module) => ({
      default: module.BitcoinAdvice,
    }))
  ),
  MissedBitcoin: lazy(() =>
    import("@/pages/MissedBitcoin").then((module) => ({
      default: module.MissedBitcoin,
    }))
  ),
  BusinessBitcoin: lazy(() =>
    import("@/pages/BusinessBitcoin").then((module) => ({
      default: module.BusinessBitcoin,
    }))
  ),
  BusinessBitcoinOnePager: lazy(() =>
    import("@/pages/BusinessBitcoinOnePager").then((module) => ({
      default: module.BusinessBitcoinOnePager,
    }))
  ),
  GuidesIndex: lazy(() =>
    import("@/pages/GuidesIndex").then((module) => ({
      default: module.GuidesIndex,
    }))
  ),
  Conversation: lazy(() =>
    import("@/pages/Conversation").then((module) => ({
      default: module.Conversation,
    }))
  ),
  BitcoinConsultation: lazy(() =>
    import("@/pages/BitcoinConsultation").then((module) => ({
      default: module.BitcoinConsultation,
    }))
  ),
  PersonalBitcoinStandard: lazy(() =>
    import("@/pages/PersonalBitcoinStandard").then((module) => ({
      default: module.PersonalBitcoinStandard,
    }))
  ),
  SamplePersonalBitcoinStandard: lazy(() =>
    import("@/pages/SamplePersonalBitcoinStandard").then((module) => ({
      default: module.SamplePersonalBitcoinStandard,
    }))
  ),
  BitcoinStandardCheck: lazy(() =>
    import("@/pages/BitcoinStandardCheck").then((module) => ({
      default: module.BitcoinStandardCheck,
    }))
  ),
  PersonalPage: lazy(() =>
    import("@/pages/PersonalPage").then((module) => ({
      default: module.PersonalPage,
    }))
  ),
  FamilyPage: lazy(() =>
    import("@/pages/FamilyPage").then((module) => ({
      default: module.FamilyPage,
    }))
  ),
  EntrepreneursPage: lazy(() =>
    import("@/pages/EntrepreneursPage").then((module) => ({
      default: module.EntrepreneursPage,
    }))
  ),
  Guide: lazy(() =>
    import("@/pages/Guide").then((module) => ({ default: module.Guide }))
  ),
  Security: lazy(() =>
    import("@/pages/Security").then((module) => ({ default: module.Security }))
  ),
  Privacy: lazy(() =>
    import("@/pages/Privacy").then((module) => ({ default: module.Privacy }))
  ),
  NotFound: lazy(() =>
    import("@/pages/NotFound").then((module) => ({ default: module.NotFound }))
  ),
} satisfies RouteComponents

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1)
  }

  return pathname
}

// The client entry needs this loader before React starts hydrating the SSR tree.
// eslint-disable-next-line react-refresh/only-export-components
export async function loadHydrationRouteComponents(pathname: string) {
  const path = normalizePath(pathname)
  const routeComponents: RouteComponents = { ...lazyRouteComponents }

  if (path === "/") {
    routeComponents.Home = (await import("@/pages/Home")).Home
  } else if (path === "/pavao-pahljina") {
    routeComponents.PavaoPahljina = (
      await import("@/pages/PavaoPahljina")
    ).PavaoPahljina
  } else if (path === "/vodici") {
    routeComponents.GuidesIndex = (
      await import("@/pages/GuidesIndex")
    ).GuidesIndex
  } else if (path === "/proracun") {
    routeComponents.Budget = (await import("@/pages/Budget")).Budget
  } else if (path === "/proracun/nulta-razina") {
    routeComponents.BudgetZero = (await import("@/pages/BudgetZero")).BudgetZero
  } else if (path === "/dug") {
    routeComponents.Debt = (await import("@/pages/Debt")).Debt
  } else if (path === "/davanje") {
    routeComponents.Giving = (await import("@/pages/Giving")).Giving
  } else if (path === "/bitcoin-kao-novac") {
    routeComponents.BitcoinMoney = (
      await import("@/pages/BitcoinMoney")
    ).BitcoinMoney
  } else if (path === "/bitcoin-i-neto-imovina") {
    routeComponents.NetWorth = (await import("@/pages/NetWorth")).NetWorth
  } else if (path === "/bitcoin-vrijeme-i-volatilnost") {
    routeComponents.TimeVolatility = (
      await import("@/pages/TimeVolatility")
    ).TimeVolatility
  } else if (path === "/dugorocni-trend") {
    routeComponents.LongTermTrend = (
      await import("@/pages/LongTermTrend")
    ).LongTermTrend
  } else if (path === "/bitcoin-danas") {
    routeComponents.BitcoinToday = (
      await import("@/pages/BitcoinToday")
    ).BitcoinToday
  } else if (path === "/skrbnistvo-i-sigurnost") {
    routeComponents.CustodySecurity = (
      await import("@/pages/CustodySecurity")
    ).CustodySecurity
  } else if (path === "/bitcoin-savjetovanje") {
    routeComponents.BitcoinAdvice = (
      await import("@/pages/BitcoinAdvice")
    ).BitcoinAdvice
  } else if (path === "/mogao-sam-kupiti-bitcoin-ranije") {
    routeComponents.MissedBitcoin = (
      await import("@/pages/MissedBitcoin")
    ).MissedBitcoin
  } else if (path === "/za-tvrtke") {
    routeComponents.BusinessBitcoin = (
      await import("@/pages/BusinessBitcoin")
    ).BusinessBitcoin
  } else if (path === "/za-tvrtke/one-pager") {
    routeComponents.BusinessBitcoinOnePager = (
      await import("@/pages/BusinessBitcoinOnePager")
    ).BusinessBitcoinOnePager
  } else if (path === "/razgovor") {
    routeComponents.Conversation = (
      await import("@/pages/Conversation")
    ).Conversation
  } else if (path === "/bitcoin-konzultacija") {
    routeComponents.BitcoinConsultation = (
      await import("@/pages/BitcoinConsultation")
    ).BitcoinConsultation
  } else if (path === "/osobni-bitcoin-standard") {
    routeComponents.PersonalBitcoinStandard = (
      await import("@/pages/PersonalBitcoinStandard")
    ).PersonalBitcoinStandard
  } else if (
    path === "/primjer-osobnog-bitcoin-standarda" ||
    path === "/osobni-bitcoin-standard/primjer"
  ) {
    routeComponents.SamplePersonalBitcoinStandard = (
      await import("@/pages/SamplePersonalBitcoinStandard")
    ).SamplePersonalBitcoinStandard
  } else if (path === "/provjera-bitcoin-standarda") {
    routeComponents.BitcoinStandardCheck = (
      await import("@/pages/BitcoinStandardCheck")
    ).BitcoinStandardCheck
  } else if (path === "/osobno") {
    routeComponents.PersonalPage = (
      await import("@/pages/PersonalPage")
    ).PersonalPage
  } else if (path === "/obitelj") {
    routeComponents.FamilyPage = (await import("@/pages/FamilyPage")).FamilyPage
  } else if (path === "/poduzetnici") {
    routeComponents.EntrepreneursPage = (
      await import("@/pages/EntrepreneursPage")
    ).EntrepreneursPage
  } else if (path.startsWith("/vodici/")) {
    routeComponents.Guide = (await import("@/pages/Guide")).Guide
  } else if (path === "/sigurnost") {
    routeComponents.Security = (await import("@/pages/Security")).Security
  } else if (path === "/privatnost") {
    routeComponents.Privacy = (await import("@/pages/Privacy")).Privacy
  } else {
    routeComponents.NotFound = (await import("@/pages/NotFound")).NotFound
  }

  return routeComponents
}

function getInitialPath(path?: string) {
  if (path) {
    return normalizePath(path)
  }

  if (typeof window === "undefined") {
    return "/"
  }

  return normalizePath(window.location.pathname)
}

function Route({
  path,
  routeComponents,
}: {
  path: string
  routeComponents: RouteComponents
}) {
  const {
    Home,
    PavaoPahljina,
    Budget,
    BudgetZero,
    Debt,
    Giving,
    BitcoinMoney,
    NetWorth,
    TimeVolatility,
    LongTermTrend,
    BitcoinToday,
    CustodySecurity,
    BitcoinAdvice,
    MissedBitcoin,
    BusinessBitcoin,
    BusinessBitcoinOnePager,
    GuidesIndex,
    Conversation,
    BitcoinConsultation,
    PersonalBitcoinStandard,
    SamplePersonalBitcoinStandard,
    BitcoinStandardCheck,
    PersonalPage,
    FamilyPage,
    EntrepreneursPage,
    Guide,
    Security,
    Privacy,
    NotFound,
  } = routeComponents

  if (path === "/") {
    return <Home />
  }

  if (path === "/pavao-pahljina") {
    return <PavaoPahljina />
  }

  if (path === "/vodici") {
    return <GuidesIndex />
  }

  if (path === "/proracun") {
    return <Budget />
  }

  if (path === "/proracun/nulta-razina") {
    return <BudgetZero />
  }

  if (path === "/dug") {
    return <Debt />
  }

  if (path === "/davanje") {
    return <Giving />
  }

  if (path === "/bitcoin-kao-novac") {
    return <BitcoinMoney />
  }

  if (path === "/bitcoin-i-neto-imovina") {
    return <NetWorth />
  }

  if (path === "/bitcoin-vrijeme-i-volatilnost") {
    return <TimeVolatility />
  }

  if (path === "/dugorocni-trend") {
    return <LongTermTrend />
  }

  if (path === "/bitcoin-danas") {
    return <BitcoinToday />
  }

  if (path === "/skrbnistvo-i-sigurnost") {
    return <CustodySecurity />
  }

  if (path === "/bitcoin-savjetovanje") {
    return <BitcoinAdvice />
  }

  if (path === "/mogao-sam-kupiti-bitcoin-ranije") {
    return <MissedBitcoin />
  }

  if (path === "/za-tvrtke") {
    return <BusinessBitcoin />
  }

  if (path === "/za-tvrtke/one-pager") {
    return <BusinessBitcoinOnePager />
  }

  if (path === "/razgovor") {
    return <Conversation />
  }

  if (path === "/bitcoin-konzultacija") {
    return <BitcoinConsultation />
  }

  if (path === "/osobni-bitcoin-standard") {
    return <PersonalBitcoinStandard />
  }

  if (
    path === "/primjer-osobnog-bitcoin-standarda" ||
    path === "/osobni-bitcoin-standard/primjer"
  ) {
    return <SamplePersonalBitcoinStandard />
  }

  if (path === "/provjera-bitcoin-standarda") {
    return <BitcoinStandardCheck />
  }

  if (path === "/osobno") {
    return <PersonalPage />
  }

  if (path === "/obitelj") {
    return <FamilyPage />
  }

  if (path === "/poduzetnici") {
    return <EntrepreneursPage />
  }

  if (path.startsWith("/vodici/")) {
    const slug = decodeURIComponent(path.replace("/vodici/", ""))

    if (!slug) {
      return <GuidesIndex />
    }

    return <Guide slug={slug} />
  }

  if (path === "/sigurnost") {
    return <Security />
  }

  if (path === "/privatnost") {
    return <Privacy />
  }

  return <NotFound />
}

export function App({
  path,
  routeComponents = lazyRouteComponents,
}: {
  path?: string
  routeComponents?: RouteComponents
}) {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showStickyMobileCta, setShowStickyMobileCta] = useState(false)
  const [familyCtaInView, setFamilyCtaInView] = useState(false)
  const [homeStickyConversation, setHomeStickyConversation] = useState(false)
  const currentPath = getInitialPath(path)
  const hasStickyMobileCta =
    currentPath !== "/razgovor" &&
    currentPath !== "/provjera-bitcoin-standarda" &&
    currentPath !== "/dugorocni-trend" &&
    currentPath !== "/bitcoin-danas" &&
    currentPath !== "/mogao-sam-kupiti-bitcoin-ranije" &&
    currentPath !== "/poduzetnici" &&
    currentPath !== "/proracun/nulta-razina"
  const hasBackToTop = currentPath !== "/proracun/nulta-razina"
  const stickyMobileCtaVisible =
    hasStickyMobileCta && showStickyMobileCta && !familyCtaInView

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY
      const servicesSection =
        currentPath === "/" ? document.getElementById("suradnja") : null

      setShowStickyMobileCta(scrollY > 320)
      setShowBackToTop(scrollY > 640)
      setHomeStickyConversation(
        Boolean(
          servicesSection &&
          servicesSection.getBoundingClientRect().top <=
            window.innerHeight * 0.7
        )
      )
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [currentPath])

  useEffect(() => {
    if (currentPath !== "/obitelj") {
      return
    }

    if (!("IntersectionObserver" in window)) {
      return
    }

    const visibility = new Map<Element, boolean>()
    let intersectionObserver: IntersectionObserver | null = null
    let mutationObserver: MutationObserver | null = null

    const connectFamilyCtas = () => {
      const familyCtas = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-cta="family-hero-conversation"], [data-cta="family-final-conversation"]'
        )
      )

      if (familyCtas.length === 0) {
        return false
      }

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visibility.set(entry.target, entry.isIntersecting)
          }

          setFamilyCtaInView([...visibility.values()].some(Boolean))
        },
        { threshold: 0.5 }
      )

      for (const cta of familyCtas) {
        visibility.set(cta, false)
        intersectionObserver.observe(cta)
      }

      return true
    }

    if (!connectFamilyCtas()) {
      const body = document.body

      if (!body) {
        return
      }

      mutationObserver = new MutationObserver(() => {
        if (connectFamilyCtas()) {
          mutationObserver?.disconnect()
          mutationObserver = null
        }
      })
      mutationObserver.observe(body, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      intersectionObserver?.disconnect()
      mutationObserver?.disconnect()
      setFamilyCtaInView(false)
    }
  }, [currentPath])

  useEffect(() => {
    if (
      currentPath !== "/" ||
      !showStickyMobileCta ||
      !homeStickyConversation
    ) {
      return
    }

    trackFirstPartyInteraction("home-sticky-cta-mode", {
      mode: "conversation",
    })
  }, [currentPath, homeStickyConversation, showStickyMobileCta])

  useEffect(() => {
    const viewport = window.visualViewport

    if (!viewport) {
      return
    }

    const updateMobileViewportShift = () => {
      const shift = viewport.offsetTop + viewport.height - window.innerHeight
      const clampedShift = Math.max(0, Math.min(96, shift))

      document.documentElement.style.setProperty(
        "--mobile-cta-visual-shift",
        `${clampedShift}px`
      )
    }

    viewport.addEventListener("resize", updateMobileViewportShift)
    viewport.addEventListener("scroll", updateMobileViewportShift)
    window.addEventListener("resize", updateMobileViewportShift)
    updateMobileViewportShift()

    return () => {
      viewport.removeEventListener("resize", updateMobileViewportShift)
      viewport.removeEventListener("scroll", updateMobileViewportShift)
      window.removeEventListener("resize", updateMobileViewportShift)
      document.documentElement.style.removeProperty("--mobile-cta-visual-shift")
    }
  }, [])

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${
        hasStickyMobileCta
          ? "pb-[calc(5.25rem+env(safe-area-inset-bottom))] lg:pb-0"
          : ""
      }`}
    >
      <Header currentPath={currentPath} />
      <main id="top">
        <Suspense fallback={null}>
          <Route path={currentPath} routeComponents={routeComponents} />
        </Suspense>
      </main>
      <Footer />
      {hasStickyMobileCta ? (
        <StickyMobileCta
          visible={stickyMobileCtaVisible}
          variant={
            currentPath === "/"
              ? homeStickyConversation
                ? "conversation"
                : "assessment"
              : currentPath === "/osobno"
                ? "personal"
                : currentPath === "/bitcoin-kao-novac"
                  ? "bitcoin-money"
                  : currentPath === "/skrbnistvo-i-sigurnost"
                    ? "custody"
                    : currentPath === "/obitelj"
                      ? "family"
                      : currentPath === "/sigurnost"
                        ? "security"
                        : "conversation"
          }
        />
      ) : null}

      {showBackToTop && hasBackToTop ? (
        <Button
          type="button"
          size="icon"
          className="back-to-top-button fixed z-50 size-10 rounded-full border border-border/70 bg-background/94 text-foreground shadow-lg hover:bg-muted hover:text-foreground lg:right-6 lg:bottom-6"
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
