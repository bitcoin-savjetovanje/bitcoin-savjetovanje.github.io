import { renderToString } from "react-dom/server"

import App, { type RouteComponents } from "./App"
import { ThemeProvider } from "@/components/theme-provider"
export { notFoundRoute, prerenderRoutes } from "@/content/routes"

let routeComponentsPromise: Promise<RouteComponents> | null = null

function loadRouteComponents() {
  routeComponentsPromise ??= Promise.all([
    import("@/pages/Home"),
    import("@/pages/Budget"),
    import("@/pages/Debt"),
    import("@/pages/Giving"),
    import("@/pages/BitcoinMoney"),
    import("@/pages/NetWorth"),
    import("@/pages/TimeVolatility"),
    import("@/pages/CustodySecurity"),
    import("@/pages/BitcoinAdvice"),
    import("@/pages/GuidesIndex"),
    import("@/pages/Conversation"),
    import("@/pages/BitcoinConsultation"),
    import("@/pages/PersonalBitcoinStandard"),
    import("@/pages/AudiencePage"),
    import("@/pages/Guide"),
    import("@/pages/Security"),
    import("@/pages/Privacy"),
    import("@/pages/NotFound"),
  ]).then(
    ([
      home,
      budget,
      debt,
      giving,
      bitcoinMoney,
      netWorth,
      timeVolatility,
      custodySecurity,
      bitcoinAdvice,
      guidesIndex,
      conversation,
      bitcoinConsultation,
      personalBitcoinStandard,
      audiencePage,
      guide,
      security,
      privacy,
      notFound,
    ]) => ({
      Home: home.Home,
      Budget: budget.Budget,
      Debt: debt.Debt,
      Giving: giving.Giving,
      BitcoinMoney: bitcoinMoney.BitcoinMoney,
      NetWorth: netWorth.NetWorth,
      TimeVolatility: timeVolatility.TimeVolatility,
      CustodySecurity: custodySecurity.CustodySecurity,
      BitcoinAdvice: bitcoinAdvice.BitcoinAdvice,
      GuidesIndex: guidesIndex.GuidesIndex,
      Conversation: conversation.Conversation,
      BitcoinConsultation: bitcoinConsultation.BitcoinConsultation,
      PersonalBitcoinStandard: personalBitcoinStandard.PersonalBitcoinStandard,
      AudiencePage: audiencePage.AudiencePage,
      Guide: guide.Guide,
      Security: security.Security,
      Privacy: privacy.Privacy,
      NotFound: notFound.NotFound,
    })
  )

  return routeComponentsPromise
}

export async function render(url: string) {
  const routeComponents = await loadRouteComponents()

  return renderToString(
    <ThemeProvider>
      <App path={url} routeComponents={routeComponents} />
    </ThemeProvider>
  )
}
