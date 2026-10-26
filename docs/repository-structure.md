# Repository Structure

## Recommended Top-Level Structure

```text
agency-back-office-site/
├── app/
├── components/
├── content/
├── data/
├── docs/
├── lib/
├── public/
├── scripts/
├── styles/
├── .github/
├── .env.example
├── .nvmrc
├── CLAUDE.md
├── README.md
├── next.config.*
├── package.json
└── tsconfig.json
```

## Static Export Additions

The site is a static export hosted on Cloudflare Pages (see `nextjs-technical-architecture.md`). These files support that setup:

| Path | Purpose |
|---|---|
| `.github/workflows/` | Continuous integration (lint, typecheck, build). Deployment is handled by Cloudflare's Git integration, not by GitHub Actions. |
| `.github/pull_request_template.md` | Short QA checklist derived from `qa-checklist.md`. |
| `public/_redirects` | Cloudflare Pages redirects. Static export cannot use `next.config` redirects. |
| `public/_headers` | Cloudflare Pages response headers (security, caching, noindex for `*.pages.dev`). |
| `.nvmrc` | Pins the Node version for local, CI, and Cloudflare builds. |
| `.env.example` | Documents environment variables with no real values. |
| `scripts/` | Build or maintenance scripts, only when one is required. |
| `lib/site.ts` | Single source for the site URL, read from `NEXT_PUBLIC_SITE_URL`. |

## Recommended Responsibilities

### `app/`

Routes, layouts, metadata, route-level components.

### `components/`

Reusable UI:
- header
- footer
- breadcrumbs
- CTA blocks
- FAQ
- cards
- tables
- resource lists
- related-content modules

### `content/`

Approved page copy or structured content if content is stored separately from route files.

### `data/`

Registries and structured data:
- services
- audiences
- route maps
- navigation
- related links

### `docs/`

Project strategy and governance.

### `lib/`

Utilities:
- metadata helpers
- schema builders
- route helpers
- content parsers
- analytics helpers

### `public/`

Static assets.

## Rule

Do not allow the repository to become a collection of page-specific one-off components when a reusable pattern is appropriate.
