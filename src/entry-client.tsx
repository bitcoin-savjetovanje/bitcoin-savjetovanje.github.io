import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"

import App from "./App"
import "./index.css"
import { ThemeProvider } from "@/components/theme-provider"

const root = document.getElementById("root")

if (!root) {
  throw new Error("Root element not found")
}

const app = (
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
