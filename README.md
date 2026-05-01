# Bitcoin Savjetovanje

Stranica za Bitcoin Savjetovanje, izgrađena s Viteom, Reactom, TypeScriptom,
SSR/prerenderom i GitHub Pagesom. Sadržaj je organiziran oko Praktičnog Bitcoin
standarda: osobni proračun, život bez duga, darivanje, Bitcoin kao novac,
kupovna moć, neto imovina, skrbništvo i početne riječi za oporavak.

## Development

```bash
npm ci
npm run dev
```

## Checks

Run the full local verification set before merging:

```bash
npm run format
npm run lint
npm run typecheck
npm run build
npm run verify:dist
```

## Content map

Sadržaj početne stranice:

- `src/content/site.ts`
- `src/content/method.ts`
- `src/content/offers.ts`
- `src/content/faq.ts`

Guides:

- `src/content/guides.ts`

Routes and SEO:

- `src/content/routes.ts`
- `src/content/schema.ts`
- `src/components/Seo.tsx`

Prerender:

- `scripts/prerender.mjs`
- `scripts/verify-dist.mjs`

## Routes

- `/`
- `/vodici/`
- `/vodici/:slug/`
- `/sigurnost/`

## URL conventions

- Canonical početne stranice koristi završnu kosu crtu:
  `https://bitcoin-savjetovanje.com/`.
- Guide index, guide pages and static pages use trailing slash canonicals.
- Sitemap URLs must match canonical URLs.
- Internal guide links should use trailing slash, for example
  `/vodici/stvarni-visak/`.

## Deployment

GitHub Pages deploys from `main`.

The deploy workflow runs:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run verify:dist`

The Pages artifact is uploaded only after `verify:dist` passes.
The verification script checks prerendered HTML, sitemap, robots, schema, guide
pages, the security page, and core CTA/link metadata used for future
privacy-friendly analytics hooks.
