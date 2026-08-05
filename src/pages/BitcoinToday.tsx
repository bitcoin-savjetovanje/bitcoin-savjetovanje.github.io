import { BitcoinTodayDashboard } from "@/components/bitcoin-today/BitcoinTodayDashboard"
import { Seo } from "@/components/Seo"
import { bitcoinTodayRoute } from "@/content/clientRoutes"

export function BitcoinToday() {
  return (
    <>
      <Seo {...bitcoinTodayRoute} />
      <BitcoinTodayDashboard />
    </>
  )
}
