import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { StickyMobileCta } from "@/components/layout/StickyMobileCta"
import { Button } from "@/components/ui/button"
import { BitcoinClarity } from "@/pages/BitcoinClarity"
import { Conversation } from "@/pages/Conversation"
import { Guide } from "@/pages/Guide"
import { GuidesIndex } from "@/pages/GuidesIndex"
import { Home } from "@/pages/Home"
import { NotFound } from "@/pages/NotFound"
import { Security } from "@/pages/Security"

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1)
  }

  return pathname
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

function Route({ path }: { path: string }) {
  if (path === "/") {
    return <Home />
  }

  if (path === "/vodici") {
    return <GuidesIndex />
  }

  if (path === "/razgovor") {
    return <Conversation />
  }

  if (path === "/bitcoin-jasnoca") {
    return <BitcoinClarity />
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

  return <NotFound />
}

export function App({ path }: { path?: string }) {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showStickyMobileCta, setShowStickyMobileCta] = useState(false)
  const currentPath = getInitialPath(path)
  const hasStickyMobileCta = currentPath !== "/razgovor"
  const stickyMobileCtaVisible = hasStickyMobileCta && showStickyMobileCta

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY

      setShowStickyMobileCta(scrollY > 320)
      setShowBackToTop(scrollY > 640)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

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
        <Route path={currentPath} />
      </main>
      <Footer />
      {hasStickyMobileCta ? (
        <StickyMobileCta visible={stickyMobileCtaVisible} />
      ) : null}

      {showBackToTop ? (
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
