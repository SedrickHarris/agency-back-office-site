# Next.js Technical Architecture

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- GitHub
- Cloudflare Pages

## Routing

Recommended application structure:

```text
app/
├── page.tsx
├── about/page.tsx
├── services/
│   ├── page.tsx
│   └── [service]/page.tsx
├── audiences/
│   ├── page.tsx
│   └── [audience]/
│       ├── page.tsx
│       └── [service]/page.tsx
├── training/
├── resources/
├── contact/page.tsx
└── get-started/page.tsx
```

## Rendering

Prefer:
- server components
- static generation for evergreen content
- deterministic route generation
- minimal client-side state

Use client components only for interactions that require them.

## Content Model

Prefer structured content/data for:
- service registry
- audience registry
- page metadata
- related links
- FAQs
- breadcrumbs
- schema inputs

Avoid duplicating route/content logic across many page files.

## Metadata

Use Next.js metadata APIs.

Each page should support:
- title
- description
- canonical
- Open Graph metadata
- robots controls when needed

## Performance

- minimize client JS
- lazy-load non-critical media
- optimize images
- avoid oversized third-party libraries
- keep font loading efficient
- monitor Core Web Vitals

## Fonts

Load Manrope and Inter with `next/font/google` (built into Next.js; no font packages) in `app/layout.tsx`. This is the only font-loading method.

- Fonts are self-hosted at build time with `display: "swap"`.
- Each font exposes a CSS variable: `--font-manrope` and `--font-inter`.
- Request only the approved weights: Manrope 600, 700; Inter 400, 500, 600.
- Inter is the default body font. Manrope is applied to headings and navigation through global styles or Tailwind theme tokens once those exist.
- Typography roles and sizing are defined in `design-system.md`.

## Accessibility

Use:
- semantic landmarks
- proper heading hierarchy
- accessible navigation
- labels for forms
- visible focus
- keyboard support

## Deployment

Approved 2026-10-25 (see `decisions-change-log.md`): static export hosted on Cloudflare Pages through Cloudflare's Git integration with the GitHub repository.

### Static Export

- `next.config` sets `output: 'export'`. All pages are generated at build time. There is no server runtime.
- Dynamic routes (`[service]`, `[audience]`, `[slug]`, `[term]`) must define `generateStaticParams` driven by the registries in `data/`.
- With `output: 'export'`, `generateStaticParams` must return at least one entry (confirmed by a failed build on Next.js 16.4.3). A dynamic route file therefore cannot exist while its registry is empty. Add the route's `page.tsx` in the same change as the first real registry entry. Until then the route directories hold only a `.gitkeep`.
- Avoid technical decisions that depend on unsupported runtime assumptions.

### Constraints

- No API routes.
- No middleware.
- No server-side redirects or headers from `next.config`.
- No runtime image optimization.
- No on-demand revalidation.
- Redirects and headers use `public/_redirects` and `public/_headers`.

If a feature needs a server runtime, reopen the rendering decision through `decisions-change-log.md` before implementing it. Verify the current Cloudflare-recommended Next.js approach against Cloudflare's official documentation at that time.

### Build Settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Production branch | `main` |
| Node version | Pinned in `.nvmrc` and `package.json` `engines`. Also set `NODE_VERSION` in Cloudflare Pages to match. Verify against official documentation. |

### Trailing Slashes

`trailingSlash: true` so that exported routes match the trailing-slash URL patterns in `url-routing-strategy.md` (for example `/services/seo-training/`). Canonical URLs and sitemap entries must use the same trailing-slash form. Verify against official documentation how Cloudflare Pages serves exported `index.html` files and handles requests without a trailing slash, then test after the first deploy.

### Images

Runtime image optimization is unavailable. Use `images: { unoptimized: true }` and supply pre-optimized assets (for example the WebP files in `public/logos/webp/`).

### Redirects and Headers

- `public/_redirects` holds redirects. It stays empty until a real URL inventory exists (see `migration-redirect-plan.md`).
- `public/_headers` holds security headers, cache rules, and the `X-Robots-Tag: noindex` rule for `*.pages.dev` hostnames.
- A Content-Security-Policy is a future task. Do not add one without testing.

### Environment Variables

- `NEXT_PUBLIC_SITE_URL` is the production site URL. It is read in one place (`lib/site.ts`) and used for `metadataBase`, canonicals, the sitemap, and robots. It is inlined at build time.
- Variables are documented in `.env.example` with no real values. Never commit secrets or `.env` files.

### Production vs Non-Production Builds

- Production: the `main` branch, with `NEXT_PUBLIC_SITE_URL` set to the final domain.
- Non-production builds (local builds, and any build without a final production domain): leave `NEXT_PUBLIC_SITE_URL` unset. When it is unset, `robots.ts` disallows all crawling.
- `*.pages.dev` hostnames also receive `X-Robots-Tag: noindex` from `public/_headers`.

### Forms

Static export has no API routes, so form handling (contact, get started) cannot use them.

**Pending decision:** form handling approach. Options:

- A third-party form service.
- A Cloudflare Pages Function. This adds a server runtime for that endpoint, so it must go through the reconsideration rule above first. Verify against official documentation.

Do not choose until the decision is recorded in `decisions-change-log.md`.

## Sitemaps and Robots

Provide:
- `sitemap.ts`
- `robots.ts`

Only include canonical, indexable pages.

Under static export, `sitemap.ts` and `robots.ts` must be statically generated (`export const dynamic = 'force-static'`) and emit only canonical URLs built from the configured site URL.

### robots.ts Specification

`robots.ts` must implement the crawler policy in `aeo-ai-search-strategy.md` (Crawler Access and AI Search Policy).

- Define rules per user agent.
- Allow search and retrieval bots on public pages.
- Allow AI training bots only on the public educational paths listed in the policy.
- Disallow all bots on any future member or premium path prefix. Reserve `/members/` as a placeholder prefix, to be confirmed before use.
- Reference the sitemap URL. The sitemap lists only canonical, indexable pages.
- Store bot names in one constant or data file so updates are made in one place.
- Verify bot names against each vendor's official documentation before implementation.
- robots.txt is a request that reputable crawlers honor, not access control. `noindex` and authentication, not robots.txt, control indexing and access for private pages.

Implementation is deferred to the site build phase.
