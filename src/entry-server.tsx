import { renderToString } from "react-dom/server"

import App from "./App"
import { ThemeProvider } from "@/components/theme-provider"

export function render(url: string) {
  return renderToString(
    <ThemeProvider>
      <App path={url} />
    </ThemeProvider>
  )
}
