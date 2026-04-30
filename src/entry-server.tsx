import { renderToString } from "react-dom/server"

import App from "./App"
import { ThemeProvider } from "@/components/theme-provider"
export { notFoundRoute, prerenderRoutes } from "@/content/routes"

export function render(url: string) {
  return renderToString(
    <ThemeProvider>
      <App path={url} />
    </ThemeProvider>
  )
}
