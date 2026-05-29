import type { Guide } from "@/content/guides"

const WORDS_PER_MINUTE = 220

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function estimateGuideReadingMinutes(guide: Guide) {
  if (guide.readingMinutes) {
    return guide.readingMinutes
  }

  const text = [
    guide.title,
    guide.excerpt,
    guide.practicalQuestion ?? "",
    ...guide.sections.flatMap((section) => [section.heading, ...section.body]),
  ].join(" ")
  const words = text.trim().split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}
