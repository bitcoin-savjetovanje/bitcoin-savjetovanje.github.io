export function SectionHeader({
  title,
  copy,
  align = "left",
}: {
  title: string
  copy?: string
  align?: "left" | "center"
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      <h2 className="font-display text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          {copy}
        </p>
      ) : null}
    </div>
  )
}
