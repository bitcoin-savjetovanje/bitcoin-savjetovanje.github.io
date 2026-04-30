import { useEffect } from "react"

export type SeoProps = {
  title: string
  description: string
  canonical: string
  type?: "website" | "article"
  schema?: object
}

export function Seo({
  title,
  description,
  canonical,
  type = "website",
  schema,
}: SeoProps) {
  useEffect(() => {
    document.title = title

    const entries = [
      ["meta[name='description']", "content", description],
      ["link[rel='canonical']", "href", canonical],
      ["meta[property='og:title']", "content", title],
      ["meta[property='og:description']", "content", description],
      ["meta[property='og:type']", "content", type],
      ["meta[property='og:url']", "content", canonical],
      ["meta[name='twitter:title']", "content", title],
      ["meta[name='twitter:description']", "content", description],
    ] as const

    entries.forEach(([selector, attribute, value]) => {
      const element = document.head.querySelector(selector)
      element?.setAttribute(attribute, value)
    })

    const existingSchema = document.head.querySelector(
      "script[data-route-schema='true']"
    )
    existingSchema?.remove()

    if (schema) {
      const schemaScript = document.createElement("script")
      schemaScript.type = "application/ld+json"
      schemaScript.dataset.routeSchema = "true"
      schemaScript.textContent = JSON.stringify(schema)
      document.head.appendChild(schemaScript)
    }
  }, [canonical, description, schema, title, type])

  return null
}
