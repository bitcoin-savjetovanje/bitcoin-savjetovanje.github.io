import { useEffect, useState } from "react"
import { CalendarDays, Menu, MoonStar, SunMedium, X } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { navLinks } from "@/content/navigation"
import { CONVERSATION_PATH } from "@/content/site"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-11 rounded-full border-transparent bg-transparent text-muted-foreground shadow-none hover:bg-muted hover:text-foreground sm:size-10"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Promijeni temu"
    >
      {isDark ? (
        <SunMedium className="size-4" />
      ) : (
        <MoonStar className="size-4" />
      )}
    </Button>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
      }
    }

    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeydown)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("keydown", handleKeydown)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3.5 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <a
          className="flex min-w-0 items-center gap-2 font-display text-base font-semibold whitespace-nowrap"
          href="/"
        >
          <img
            src="/bitcoin-logo.png"
            alt=""
            aria-hidden="true"
            className="size-6 shrink-0 rounded-full"
            draggable="false"
          />
          <span className="truncate">Bitcoin Savjetovanje</span>
        </a>

        <nav className="hidden lg:block" aria-label="Glavna navigacija">
          <ul className="flex list-none items-center gap-3 xl:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs whitespace-nowrap text-muted-foreground hover:text-foreground xl:text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="lg"
            className="cta-primary hidden rounded-full px-4 text-sm lg:inline-flex xl:px-5"
          >
            <a href={CONVERSATION_PATH} data-cta="header-intro-call">
              <CalendarDays className="size-4" />
              Dogovorite razgovor
            </a>
          </Button>{" "}
          <ThemeToggle />{" "}
          <Button
            variant="outline"
            size="icon"
            className="size-11 rounded-full border-border/80 bg-background/80 sm:size-10 lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={
              mobileMenuOpen ? "Zatvori navigaciju" : "Otvori navigaciju"
            }
          >
            {mobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav
          id="mobile-nav"
          className="mx-auto grid max-w-7xl gap-2 border-t border-border/50 px-3 pt-3 pb-4 sm:px-6 lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg border border-border/70 bg-card px-4 py-3.5 text-sm font-medium shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONVERSATION_PATH}
            className="cta-primary mt-1 rounded-lg border border-border/70 px-4 py-3.5 text-center text-sm font-semibold shadow-sm"
            onClick={() => setMobileMenuOpen(false)}
            data-cta="mobile-menu-intro-call"
          >
            Dogovorite razgovor
          </a>
        </nav>
      ) : null}
    </header>
  )
}
