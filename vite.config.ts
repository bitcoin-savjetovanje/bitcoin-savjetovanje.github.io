import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base:
    process.env.GITHUB_PAGES === "true" &&
    process.env.GITHUB_REPOSITORY !==
      "bitcoin-savjetovanje/bitcoin-savjetovanje.github.io"
      ? "/bitcoin-savjetovanje.github.io/"
      : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
  },
})
