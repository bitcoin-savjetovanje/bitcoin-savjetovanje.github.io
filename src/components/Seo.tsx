import { useEffect } from "react"

import { OG_IMAGE_URL } from "@/content/site"

export type SeoProps = {
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
  ogType?: "website" | "article"
  schema?: object
}

export function Seo({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogType = "website",
  schema,
}: SeoProps) {
  useEffect(() => {
    document.title = title
    const resolvedOgTitle = ogTitle ?? title
    const resolvedOgDescription = ogDescription ?? description

    const entries = [
      ["meta[name='description']", "content", description],
      ["link[rel='canonical']", "href", canonical],
      ["meta[property='og:title']", "content", resolvedOgTitle],
      ["meta[property='og:description']", "content", resolvedOgDescription],
      ["meta[property='og:type']", "content", ogType],
      ["meta[property='og:url']", "content", canonical],
      ["meta[property='og:image']", "content", OG_IMAGE_URL],
      ["meta[property='og:image:width']", "content", "1200"],
      ["meta[property='og:image:height']", "content", "630"],
      ["meta[name='twitter:title']", "content", resolvedOgTitle],
      ["meta[name='twitter:description']", "content", resolvedOgDescription],
      ["meta[name='twitter:image']", "content", OG_IMAGE_URL],
    ] as const

    entries.forEach(([selector, attribute, value]) => {
      let element = document.head.querySelector(selector)

      if (!element) {
        element = selector.startsWith("link")
          ? document.createElement("link")
          : document.createElement("meta")

        if (selector.includes("canonical")) {
          element.setAttribute("rel", "canonical")
        }

        const propertyMatch = selector.match(/property='([^']+)'/)
        if (propertyMatch) {
          element.setAttribute("property", propertyMatch[1])
        }

        const nameMatch = selector.match(/name='([^']+)'/)
        if (nameMatch) {
          element.setAttribute("name", nameMatch[1])
        }

        document.head.appendChild(element)
      }

      element.setAttribute(attribute, value)
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
  }, [canonical, description, ogDescription, ogTitle, ogType, schema, title])

  return null
}
