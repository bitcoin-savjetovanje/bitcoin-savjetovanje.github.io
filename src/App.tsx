import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { StickyMobileCta } from "@/components/layout/StickyMobileCta"
import { Button } from "@/components/ui/button"
import { Guide } from "@/pages/Guide"
import { Home } from "@/pages/Home"
import { NotFound } from "@/pages/NotFound"

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

  if (path.startsWith("/vodici/")) {
    return <Guide slug={decodeURIComponent(path.replace("/vodici/", ""))} />
  }

  return <NotFound />
}

export function App({ path }: { path?: string }) {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const currentPath = getInitialPath(path)

  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > 480)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background pb-16 text-foreground md:pb-0">
      <Header />
      <main id="top">
        <Route path={currentPath} />
      </main>
      <Footer />
      <StickyMobileCta />

      {showBackToTop ? (
        <Button
          type="button"
          size="icon"
          className="fixed right-4 bottom-20 z-50 size-10 rounded-full border border-border/70 bg-background/94 text-foreground shadow-lg hover:bg-muted hover:text-foreground md:right-6 md:bottom-6"
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
