import { useEffect, useState } from "react"
import { CalendarDays, Menu, MoonStar, SunMedium, X } from "lucide-react"

import { CalBookingLink } from "@/components/CalBookingLink"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { navLinks } from "@/content/navigation"
import { CONVERSATION_PATH } from "@/content/site"

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1)
  }

  return pathname
}

function pathFromHref(href: string) {
  return normalizePath(href.split("#")[0] || "/")
}

function hashFromHref(href: string) {
  const hash = href.split("#")[1]

  return hash ? `#${hash}` : ""
}

function routeActiveHref(pathname: string) {
  const normalizedPath = normalizePath(pathname)

  return (
    navLinks.find((link) => {
      if (hashFromHref(link.href)) {
        return false
      }

      return pathFromHref(link.href) === normalizedPath
    })?.href ?? ""
  )
}

function currentActiveHref(fallbackPath: string) {
  if (typeof window === "undefined") {
    return routeActiveHref(fallbackPath)
  }

  const pathname = normalizePath(window.location.pathname)

  if (pathname !== "/") {
    return routeActiveHref(pathname)
  }

  const sectionLine = Math.min(180, window.innerHeight * 0.28)
  let activeHref = ""

  for (const link of navLinks) {
    const hash = hashFromHref(link.href)

    if (!hash || pathFromHref(link.href) !== "/") {
      continue
    }

    const section = document.getElementById(hash.slice(1))

    if (!section) {
      continue
    }

    const rect = section.getBoundingClientRect()

    if (rect.top <= sectionLine && rect.bottom >= sectionLine) {
      activeHref = link.href
    }
  }

  return activeHref
}

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

type HeaderProps = {
  currentPath: string
}

export function Header({ currentPath }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState(() =>
    routeActiveHref(currentPath)
  )
  const onConversationPage = currentPath === "/razgovor"

  useEffect(() => {
    let frame = 0

    function updateActiveHref() {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        setActiveHref(currentActiveHref(currentPath))
      })
    }

    updateActiveHref()

    window.addEventListener("scroll", updateActiveHref, { passive: true })
    window.addEventListener("resize", updateActiveHref)
    window.addEventListener("hashchange", updateActiveHref)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", updateActiveHref)
      window.removeEventListener("resize", updateActiveHref)
      window.removeEventListener("hashchange", updateActiveHref)
    }
  }, [currentPath])

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
          <ul className="flex list-none items-center gap-1 xl:gap-5">
            {navLinks.map((link) => {
              const active = activeHref === link.href

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="site-nav-link"
                    data-active={active ? "true" : undefined}
                    aria-current={
                      active
                        ? hashFromHref(link.href)
                          ? "location"
                          : "page"
                        : undefined
                    }
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="lg"
            className="cta-primary hidden rounded-full px-4 text-sm lg:inline-flex xl:px-5"
          >
            {onConversationPage ? (
              <CalBookingLink data-cta="header-intro-call">
                <CalendarDays className="size-4" />
                Dogovorite razgovor
              </CalBookingLink>
            ) : (
              <a href={CONVERSATION_PATH} data-cta="header-intro-call">
                <CalendarDays className="size-4" />
                Dogovorite razgovor
              </a>
            )}
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
          {navLinks.map((link) => {
            const active = activeHref === link.href

            return (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                data-active={active ? "true" : undefined}
                aria-current={
                  active
                    ? hashFromHref(link.href)
                      ? "location"
                      : "page"
                    : undefined
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            )
          })}
          {onConversationPage ? (
            <CalBookingLink
              className="cta-primary mt-1 rounded-lg border border-border/70 px-4 py-3.5 text-center text-sm font-semibold shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
              data-cta="mobile-menu-intro-call"
            >
              Dogovorite razgovor
            </CalBookingLink>
          ) : (
            <a
              href={CONVERSATION_PATH}
              className="cta-primary mt-1 rounded-lg border border-border/70 px-4 py-3.5 text-center text-sm font-semibold shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
              data-cta="mobile-menu-intro-call"
            >
              Dogovorite razgovor
            </a>
          )}
        </nav>
      ) : null}
    </header>
  )
}
