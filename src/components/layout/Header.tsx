import { useEffect, useState } from "react"
import { CalendarDays, Menu, MoonStar, SunMedium, X } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { navLinks } from "@/content/navigation"
import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

const tabletNavLinks = [
  { label: "Metoda", href: "/#metoda" },
  { label: "Program", href: "/#program" },
  { label: "Sigurnost", href: "/sigurnost/" },
  { label: "Vodiči", href: "/vodici/" },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-11 rounded-full border-border/80 bg-background/80 backdrop-blur sm:size-10"
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
          className="min-w-0 font-display text-base font-semibold whitespace-nowrap"
          href="/"
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

        <nav className="hidden items-center gap-5 lg:flex xl:hidden">
          {tabletNavLinks.map((link) => (
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
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="header-booking"
            >
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
            </a>
          </Button>
          <ThemeToggle />
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
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary mt-1 rounded-lg border border-border/70 px-4 py-3.5 text-center text-sm font-semibold shadow-sm"
            onClick={() => setMobileMenuOpen(false)}
            data-cta="mobile-menu-booking"
          >
            {PRIMARY_CTA}
          </a>
        </nav>
      ) : null}
    </header>
  )
}
