import { ArrowUpRight, CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  CONVERSATION_PATH,
  DVADESET_JEDAN_URL,
  PRACTICAL_BITCOIN_STANDARD_URL,
  STEMI_URL,
} from "@/content/site"

export function AboutSection() {
  return (
    <section id="o-meni" className="section-shell about-editorial-section">
      <div className="about-editorial-copy">
        <p className="section-kicker">O meni</p>
        <h2>Pavao Pahljina</h2>
        <div className="credibility-copy">
          <p>
            Pomažem pojedincima, obiteljima i poduzetnicima urediti sustav
            odluka u kojem Bitcoin ima ulogu novca.
          </p>
          <p>
            Ne dajem financijske savjete niti upravljam sredstvima. Radim s
            principima, procesima i disciplinom koja traje.
          </p>
          <p>
            Prije punog rada u Bitcoinu bio sam suosnivač i direktor{" "}
            <a href={STEMI_URL} target="_blank" rel="noopener noreferrer">
              STEMI-ja
            </a>
            . Zato Bitcoin savjetovanje ne gledam samo kao teoriju novca, nego
            kroz stvarne odluke o novčanom toku, riziku, ljudima, obvezama i
            vremenu.
          </p>
          <p>
            Dio okvira javno razvijam kroz{" "}
            <a
              href={PRACTICAL_BITCOIN_STANDARD_URL}
              data-link="bitcoin-as-money-guides"
            >
              vodiče
            </a>{" "}
            i{" "}
            <a
              href={DVADESET_JEDAN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              DvadesetJedan
            </a>{" "}
            zajednicu.
          </p>
        </div>
        <div className="about-editorial-actions">
          <Button asChild className="cta-primary rounded-md">
            <a
              href={CONVERSATION_PATH}
              className="justify-center text-center"
              data-cta="about-intro-call"
            >
              <CalendarDays className="size-4" />
              Dogovorite razgovor
            </a>
          </Button>
          <a
            href="/bitcoin-savjetovanje/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
            data-link="about-more"
          >
            Saznajte više o meni
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
      <aside className="profile-panel about-editorial-profile">
        <img src="/pavao-pahljina.jpg" alt="Portret Pavla Pahljine" />
        <h3>Pavao Pahljina</h3>
        <p>
          Bitcoin savjetovanje kao nastavak knjige, vodiča i osobnog okvira.
        </p>
      </aside>
    </section>
  )
}
