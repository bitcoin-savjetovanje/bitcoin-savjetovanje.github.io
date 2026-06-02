import { Copyright } from "lucide-react"

import {
  BITCOIN_ADVICE_PATH,
  BUSINESS_AUDIENCE_PATH,
  CONVERSATION_PATH,
  DVADESET_JEDAN_URL,
  EMAIL,
  FAMILY_AUDIENCE_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
  PERSONAL_AUDIENCE_PATH,
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
            Ovo nije investicijsko, porezno ni pravno savjetovanje. Ne upravljam
            vašim novcem, ne donosim odluke umjesto vas, ne čuvam vaš Bitcoin i
            ne tražim seed phrase ili privatne ključeve. Pomažem vam razumjeti
            Bitcoin, vlastitu situaciju i sigurnosni okvir dovoljno jasno da
            odluka ostane vaša.
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
            Osobni Bitcoin standard
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
          <a href={PRACTICAL_BITCOIN_STANDARD_URL} data-link="footer-guides">
            Vodiči
          </a>{" "}
          <a href={CONVERSATION_PATH} data-cta="footer-intro-call">
            Razgovor
          </a>{" "}
          <a href="/sigurnost/" data-link="footer-security">
            Sigurnost
          </a>{" "}
          <a href={PRIVACY_PATH} data-link="footer-privacy">
            Privatnost
          </a>{" "}
          <a
            href={DVADESET_JEDAN_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-link="footer-dvadesetjedan"
          >
            DvadesetJedan
          </a>{" "}
          <a href={`mailto:${EMAIL}`} data-link="footer-email">
            {EMAIL}
          </a>
        </div>
      </div>
    </footer>
  )
}
