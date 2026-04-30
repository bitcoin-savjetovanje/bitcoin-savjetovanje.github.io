# Bitcoin Savjetovanje

Website for Bitcoin Savjetovanje, built with Vite, React, TypeScript,
SSR/prerender and GitHub Pages.

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

Homepage content:

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

## URL conventions

- Homepage canonical uses a trailing slash: `https://bitcoin-savjetovanje.com/`.
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
