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

## Cloudflare Pages

Deployment configuration should be documented once the final rendering strategy is selected.

Avoid technical decisions that depend on unsupported runtime assumptions.

## Sitemaps and Robots

Provide:
- `sitemap.ts`
- `robots.ts`

Only include canonical, indexable pages.
