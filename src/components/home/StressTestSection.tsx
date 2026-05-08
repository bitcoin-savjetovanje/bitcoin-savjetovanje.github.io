import { SectionHeader } from "@/components/layout/SectionHeader"
import { conversationProblemCards } from "@/content/home"

export function StressTestSection() {
  return (
    <section id="zasto-razgovor" className="section-shell">
      <SectionHeader
        title="Možda vam ne treba još jedan video o Bitcoinu."
        copy={
          <>
            Informacija ima dovoljno. Problem je što knjiga, podcast, graf ili
            objava ne zna vašu situaciju. Ne zna imate li dug, koliko vam je
            obitelj spremna, što vas najviše brine, koliko razumijete monetarnu
            tezu i što još nedostaje za mirniju odluku.
            <br />
            <br />
            Zato razgovor može vrijediti više od još deset sati samostalnog
            istraživanja.
            <br />
            <br />
            Ne zato što razgovor zamjenjuje učenje, nego zato što učenje mora
            doći do vaše konkretne odluke.
          </>
        }
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {conversationProblemCards.map((card) => (
          <article key={card.title} className="value-card bg-card">
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
