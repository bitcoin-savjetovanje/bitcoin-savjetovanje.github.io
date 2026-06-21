import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

import { CalBookingLink } from "@/components/CalBookingLink"
import { SiteSearch } from "@/components/layout/SiteSearch"
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

      const linkPath = pathFromHref(link.href)

      if (linkPath === "/vodici") {
        return (
          normalizedPath === "/vodici" || normalizedPath.startsWith("/vodici/")
        )
      }

      return linkPath === normalizedPath
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

type HeaderProps = {
  currentPath: string
}

export function Header({ currentPath }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState(() =>
    routeActiveHref(currentPath)
  )
  const onConversationPage = currentPath === "/razgovor"
  const onHomePage = currentPath === "/"

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
    <header className={`site-header ${onHomePage ? "site-header--home" : ""}`}>
      <div className="site-header__shell">
        <div className="site-header__inner">
          <a className="site-header__brand" href="/">
            <img
              src="/bitcoin-logo.png"
              alt=""
              aria-hidden="true"
              className="site-header__logo"
              draggable="false"
            />
            <span>BITCOIN SAVJETOVANJE</span>
          </a>

          <nav className="site-header__nav" aria-label="Glavna navigacija">
            <ul>
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

          <div className="site-header__actions">
            <SiteSearch onOpen={() => setMobileMenuOpen(false)} />
            <Button asChild size="lg" className="cta-primary site-header__cta">
              {onConversationPage ? (
                <CalBookingLink data-cta="header-intro-call">
                  Dogovorite razgovor
                </CalBookingLink>
              ) : (
                <a href={CONVERSATION_PATH} data-cta="header-intro-call">
                  Dogovorite razgovor
                </a>
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="site-header__menu-button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={
                mobileMenuOpen ? "Zatvori navigaciju" : "Otvori navigaciju"
              }
            >
              <span className="site-header__menu-icon-stack" aria-hidden="true">
                <Menu
                  className="site-header__menu-icon size-4"
                  data-visible={!mobileMenuOpen ? "true" : undefined}
                />
                <X
                  className="site-header__menu-icon size-4"
                  data-visible={mobileMenuOpen ? "true" : undefined}
                />
              </span>
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobilna navigacija"
          className="mobile-nav-panel"
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
