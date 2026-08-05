import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"

import App, { loadHydrationRouteComponents } from "./App"
import "./index.css"
// Route styles stay in the client entry so prerendered pages are styled before
// lazy route modules hydrate. Moving these imports back into route components
// reintroduces a visible unstyled flash during full-page navigation.
import "@/styles/bitcoin-standard-check.css"
import "@/styles/bitcoin-consultation.css"
import "@/styles/personal-bitcoin-standard.css"
import "@/styles/sample-personal-bitcoin-standard.css"
import "@/styles/conversation.css"
import "@/styles/business.css"
import "@/styles/entrepreneurs.css"
import "@/styles/family.css"
import "@/styles/pavao-pahljina.css"
import "@/styles/budget-zero.css"
import "@/styles/missed-bitcoin.css"
import "@/styles/personal-page.css"
import "@/styles/bitcoin-money.css"
import "@/styles/bitcoin-today.css"
import "@/styles/custody-security.css"
import "@/components/bitcoin-today/market-sentiment.css"
import "@/styles/mining-energy-pulse.css"
import { ThemeProvider } from "@/components/theme-provider"
import { initConversationCalendarWarmup } from "@/lib/conversationCalendarWarmup"
import { sanitizeConversationLocation } from "@/lib/conversationUrl"
import { initCtaClickEvents } from "@/lib/ctaEvents"

sanitizeConversationLocation()
initCtaClickEvents()
initConversationCalendarWarmup()

const root = document.getElementById("root")

if (!root) {
  throw new Error("Root element not found")
}

const rootElement = root
const hydrationDocument = rootElement.ownerDocument
const hydrationPath = window.location.pathname

async function mount() {
  // Keep the styled server-rendered page visible until the component for this
  // exact route is ready. Hydrating the SSR tree with a pending React.lazy
  // component removes the page and produces a visible transition flash.
  const routeComponents = await loadHydrationRouteComponents(hydrationPath)

  if (
    !rootElement.isConnected ||
    rootElement.ownerDocument !== hydrationDocument ||
    window.location.pathname !== hydrationPath
  ) {
    return
  }

  const app = (
    <StrictMode>
      <ThemeProvider>
        <App routeComponents={routeComponents} />
      </ThemeProvider>
    </StrictMode>
  )

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app)
  } else {
    createRoot(rootElement).render(app)
  }
}

void mount()
