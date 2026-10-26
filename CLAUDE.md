# CLAUDE.md — Agency Back Office Website

## Purpose

This file governs Claude Code behavior for the Agency Back Office website.

## Project Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- GitHub
- Cloudflare Pages

Claude Project is used for research, page strategy, content, and planning. Claude Code is used for implementation.

## Source of Truth

Before making architecture, routing, SEO, content, schema, conversion, or design decisions, review the relevant files in `/docs/`.

Do not silently override approved strategy.

## Deployment Constraints

The site is a static export (`output: 'export'`) hosted on Cloudflare Pages. See `docs/nextjs-technical-architecture.md`.

- No API routes and no middleware.
- No `next.config` redirects, rewrites, or headers. Redirects and headers live in `public/_redirects` and `public/_headers`.
- No runtime image optimization or on-demand revalidation.
- Dynamic routes need `generateStaticParams`.
- The production domain comes from the `NEXT_PUBLIC_SITE_URL` environment variable via `lib/site.ts`. Never hardcode it.
- If a feature needs a server runtime, reopen the rendering decision in `docs/decisions-change-log.md` first.

## Git Workflow

All work is committed directly to main. Do not create branches or pull requests.

## Core Business

Agency Back Office provides practical training in:

- Digital marketing
- SEO
- AEO
- Local SEO
- Google Business Profile optimization
- Reputation management
- Website SEO
- Content marketing
- AI marketing
- Marketing automation
- Lead generation
- Conversion optimization
- Website strategy
- Agency operations
- CRM

## Core Architecture

- `/services/` — training topic/service hub
- `/services/{service-slug}/` — individual service/topic pages
- `/audiences/` — audience hub
- `/audiences/{audience-slug}/` — individual audience pages
- `/audiences/{audience-slug}/{service-slug}/` — audience + service pages
- `/training/` — training delivery hub
- `/resources/` — educational resource hub

## Development Rules

1. Use App Router conventions.
2. Prefer server components unless interactivity requires client components.
3. Minimize client JavaScript.
4. Use semantic HTML.
5. Maintain accessible heading order.
6. Use reusable components for repeated patterns.
7. Preserve approved copy verbatim unless explicitly instructed to edit it.
8. Do not invent claims, pricing, testimonials, credentials, student counts, ratings, or results.
9. Keep metadata and canonical URLs deterministic.
10. Avoid route duplication and keyword cannibalization.
11. Do not create thin programmatic audience + service pages.
12. Use structured content/data where it improves consistency and scalability.
13. Keep Core Web Vitals and accessibility in mind during every implementation.

## Design Rules

Avoid generic AI/SaaS visual patterns such as excessive gradients, glassmorphism, oversized empty heroes, repetitive three-card grids, and decorative blobs.

Favor editorial hierarchy, strong typography, instructional diagrams, screenshots, tables, checklists, process visuals, and evidence-driven design.

## Before Building a Page

Confirm:

- route
- page type
- content source
- parent page
- internal links
- metadata
- schema requirements
- CTA
- reusable components
- responsive behavior

## QA Before Commit

Verify:

- no TypeScript errors
- no broken imports
- no invalid routes
- metadata exists
- canonical is correct
- links resolve
- images have alt text
- schema matches visible content
- mobile layout works
- no placeholder copy remains
- no invented facts are present
