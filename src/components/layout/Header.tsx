import { useEffect, useState } from "react"
import { CalendarDays, Menu, MoonStar, SunMedium, X } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { navLinks } from "@/content/navigation"
import { CALENDLY_URL, PRIMARY_CTA } from "@/content/site"

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

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

    window.addEventListener("keydown", handleKeydown)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("keydown", handleKeydown)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/86 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a
          className="font-display text-base font-semibold whitespace-nowrap"
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

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="lg"
            className="cta-primary hidden rounded-full px-5 xl:inline-flex"
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
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
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border/70 bg-card px-4 py-3 text-sm font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            {PRIMARY_CTA}
          </a>
        </nav>
      ) : null}
    </header>
  )
}
