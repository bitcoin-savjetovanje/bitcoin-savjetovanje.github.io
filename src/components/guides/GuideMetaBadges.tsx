import type { Guide } from "@/content/guides"

type GuideMetaBadgeData = Pick<Guide, "difficulty" | "freshness">

export function GuideMetaBadges({ guide }: { guide: GuideMetaBadgeData }) {
  if (!guide.difficulty && guide.freshness !== "često se mijenja") {
    return null
  }

  return (
    <ul className="guide-meta-badges" aria-label="Oznake vodiča">
      {guide.difficulty ? <li>{guide.difficulty}</li> : null}
      {guide.freshness === "često se mijenja" ? (
        <li>Često se mijenja</li>
      ) : null}
    </ul>
  )
}
