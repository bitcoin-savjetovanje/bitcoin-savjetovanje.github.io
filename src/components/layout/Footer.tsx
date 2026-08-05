import { Copyright } from "lucide-react"

import {
  BITCOIN_ADVICE_PATH,
  BITCOIN_CONSULTATION_PATH,
  BITCOIN_STANDARD_CHECK_PATH,
  BITCOIN_TODAY_PATH,
  BUSINESS_BITCOIN_PATH,
  BUSINESS_AUDIENCE_PATH,
  CONVERSATION_PATH,
  FAMILY_AUDIENCE_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
  PERSONAL_AUDIENCE_PATH,
  PAVAO_PAHLJINA_PATH,
  PRACTICAL_BITCOIN_STANDARD_URL,
  PRIVACY_PATH,
} from "@/content/site"

export function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2">
            <Copyright className="size-3.5" aria-hidden="true" />
            <span>2026 Bitcoin Savjetovanje | Pavao Pahljina</span>
          </p>
          <p className="mt-2 text-xs leading-6">
            Sadržaj i rad imaju edukativnu i savjetodavnu svrhu; nisu
            investicijski, porezni, pravni ni računovodstveni savjet. Ne
            upravljam vašim novcem, ne donosim odluke umjesto vas, ne čuvam vaš
            Bitcoin i ne tražim privatne ključeve, Bitcoin Core wallet backup
            datoteke, wallet passphraseove ni početne riječi drugih walleta.
            Odgovornost za odluke ostaje na vama.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href={BITCOIN_ADVICE_PATH} data-link="footer-bitcoin-advice">
            Savjetovanje
          </a>{" "}
          <a
            href={PERSONAL_BITCOIN_STANDARD_PATH}
            data-link="footer-personal-bitcoin-standard"
          >
            Program
          </a>{" "}
          <a
            href={BITCOIN_CONSULTATION_PATH}
            data-link="footer-bitcoin-consultation"
          >
            Konzultacija
          </a>{" "}
          <a
            href={BITCOIN_STANDARD_CHECK_PATH}
            data-link="footer-standard-check"
          >
            Provjera
          </a>{" "}
          <a href={PAVAO_PAHLJINA_PATH} data-link="footer-about">
            O meni
          </a>{" "}
          <a href={PERSONAL_AUDIENCE_PATH} data-link="footer-osobno">
            Osobno
          </a>{" "}
          <a href={FAMILY_AUDIENCE_PATH} data-link="footer-obitelj">
            Obitelj
          </a>{" "}
          <a href={BUSINESS_AUDIENCE_PATH} data-link="footer-poduzetnici">
            Poduzetnici
          </a>{" "}
          <a href={BUSINESS_BITCOIN_PATH} data-link="footer-za-tvrtke">
            Za tvrtke
          </a>{" "}
          <a href={PRACTICAL_BITCOIN_STANDARD_URL} data-link="footer-guides">
            Vodiči
          </a>{" "}
          <a href={BITCOIN_TODAY_PATH} data-link="footer-bitcoin-today">
            Bitcoin danas
          </a>{" "}
          <a href={CONVERSATION_PATH} data-cta="footer-intro-call">
            Razgovor
          </a>{" "}
          <a href="/sigurnost/" data-link="footer-security">
            Sigurnost
          </a>{" "}
          <a href={PRIVACY_PATH} data-link="footer-privacy">
            Privatnost
          </a>
        </div>
      </div>
    </footer>
  )
}
