import { bookingSteps } from "@/content/method"

export function BookingStepsSection() {
  return (
    <section className="section-shell">
      <div className="case-panel">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            Što se dogodi nakon što rezervirate termin?
          </h2>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {bookingSteps.map((step, index) => (
            <article key={step.title} className="process-card bg-background/70">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4">{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
