# Decisions and Change Log

Use this file to record approved changes that affect architecture, routing, content systems, design, schema, or technical implementation.

## Format

### YYYY-MM-DD — Decision Name

**Area:** Architecture / SEO / Content / Design / Technical / Conversion

**Decision:**  
Describe the approved decision.

**Reason:**  
Explain why it was selected.

**Affected Files/Routes:**  
List documentation, routes, components, or content affected.

**Follow-Up:**  
List required implementation work.

---

## Initial Decisions

### 2026-08-23 — Core Technology Stack

**Area:** Technical

**Decision:**  
Use Claude Project for research/content, Claude Code + VS Code for implementation, GitHub for source control, Next.js App Router + TypeScript + Tailwind CSS for the site, and Cloudflare Pages for hosting.

### 2026-08-23 — Primary Content Architecture

**Area:** Architecture

**Decision:**  
Use service pages, audience pages, and audience + service pages, supported by training and resource hubs.

### 2026-08-23 — Audience + Service URL Pattern

**Area:** Architecture

**Decision:**  
Use `/audiences/{audience-slug}/{service-slug}/`.

### 2026-10-25 — Rendering and hosting - static export on Cloudflare Pages

**Area:** Technical

**Decision:**  
Use a static export (`output: 'export'`). All pages are generated at build time with no server runtime. Host on Cloudflare Pages, connected to the GitHub repository through Cloudflare's Git integration. The production branch is `main`. Pull requests and other branches get preview deployments.

Consequences: no API routes, no middleware, no server-side redirects from `next.config`, no runtime image optimization, and no on-demand revalidation. Redirects and headers use `public/_redirects` and `public/_headers`. Images use unoptimized mode or pre-optimized assets.

**Reason:**  
The site is a content site with no authenticated features. Static export matches the `CLAUDE.md` preference for static generation and for avoiding unsupported runtime assumptions.

**Affected Files/Routes:**  
`docs/nextjs-technical-architecture.md`, `docs/repository-structure.md`, `docs/migration-redirect-plan.md`, `docs/analytics-measurement.md`, `CLAUDE.md`, `README.md`, `next.config.*`, `public/_redirects`, `public/_headers`, `.github/workflows/ci.yml`.

**Follow-Up:**  
Reconsideration rule: if a feature needs a server runtime, reopen this decision here before implementing it, and verify the current Cloudflare-recommended Next.js approach against Cloudflare's official documentation at that time. Pending: form handling (contact, get started), because static export has no API routes. Pending: production domain.

---

### 2026-10-25 — Search Surface Expansion

**Area:** SEO

**Decision:**  
Expand search-visibility goals beyond Google and Bing to include Apple Search, AI answer engines (ChatGPT, Perplexity, Gemini), rich and featured snippets, People Also Ask (PAA), and the knowledge panel. No inclusion in any of these surfaces is guaranteed.

**Reason:**  
Support visibility, topical authority, customer engagement, and conversion across the surfaces where the target audience searches.

**Affected Files/Routes:**  
`docs/seo-strategy.md`, `docs/aeo-ai-search-strategy.md`, `docs/schema-entity-strategy.md`, `docs/analytics-measurement.md`.

**Follow-Up:**  
Confirm `sameAs` profiles for Organization schema. Set up Apple Search checks and AI-referral channel grouping in GA4 at launch.

---

### 2026-10-25 — Crawler Access Policy for Search Bots

**Area:** Technical

**Decision:**  
Allow Googlebot, Bingbot, Applebot, OAI-SearchBot, and PerplexityBot. Require key content to be server-rendered in the initial HTML. `robots.ts` must match the documented policy. **Pending:** whether to allow or block AI training crawlers (for example GPTBot and Google-Extended). **Resolved 2026-10-25:** see "AI crawler policy - split by section" below.

**Reason:**  
Make content discoverable to search and answer engines while keeping the training-crawler choice an explicit owner decision.

**Affected Files/Routes:**  
`docs/aeo-ai-search-strategy.md`, `app/robots.ts` (not yet implemented).

**Follow-Up:**  
Record the training-crawler decision here, then implement `robots.ts`.

---

### 2026-10-25 — AI crawler policy - split by section

**Area:** Technical / SEO

**Decision:**  
Use a split-by-section crawler policy. Search and retrieval bots (Googlebot, Bingbot, Applebot, OAI-SearchBot, PerplexityBot) are allowed on all public indexable pages. AI training crawlers (for example GPTBot and Google-Extended) are allowed on public educational content: `/`, `/about/`, `/services/`, `/audiences/`, `/training/` (hub and delivery overview pages), and `/resources/`. Any future member, course-content, or premium template area is blocked from all crawlers, indexing, and AI training, and must sit behind authentication. A robots.txt disallow alone is not sufficient protection. Resolves the training-crawler note in "Crawler Access Policy for Search Bots".

**Reason:**  
Public educational content exists to build authority and visibility. Premium material is the protected asset.

**Affected Files/Routes:**  
`docs/aeo-ai-search-strategy.md`, `docs/nextjs-technical-architecture.md`, `docs/seo-strategy.md`, `docs/analytics-measurement.md`, `docs/post-launch-seo-roadmap.md`, `app/robots.ts` (not yet implemented).

**Follow-Up:**  
Implement `robots.ts` at the site build phase. Define and confirm the premium path prefix (`/members/` is a placeholder) before any gated content ships. Verify bot names against vendor documentation. Review every six months, and whenever a major platform announces crawler changes. If full course lessons or paid-quality templates are published on open public pages, block training crawlers site-wide until that content is gated.

---

### 2026-10-25 — Home Page Outline and Section Order Approved

**Area:** Architecture / Conversion

**Decision:**  
Approve the home page outline and section order. Copy is not yet written. Primary CTA (Explore the training) and secondary CTA (Get started) are pending confirmation.

**Reason:**  
Establish the home page structure before copy and design work.

**Affected Files/Routes:**  
`docs/content-specification.md`, `docs/master-page-build-list.md`, `/`.

**Follow-Up:**  
Write home page copy, confirm CTAs, and confirm the proof section content (verified items only).

---

### 2026-10-25 — Pending: GBP and Local Intent Scope

**Status:** Resolved on 2026-10-25. See "GBP/local intent scope - online-only (Option B)" below.

**Area:** SEO

**Decision:**  
Pending. Option A: Agency Back Office has an eligible physical location or service area, so a Google Business Profile (GBP) listing is in scope. Option B: online-only, so no GBP listing, and GBP and local SEO remain educational topics the site teaches. Awaiting owner decision.

**Reason:**  
GBP eligibility is governed by Google's guidelines and has not been confirmed.

**Affected Files/Routes:**  
`docs/seo-strategy.md`.

**Follow-Up:**  
Owner to choose Option A or B, then update `seo-strategy.md`.

---

### 2026-10-25 — GBP/local intent scope - online-only (Option B)

**Area:** SEO

**Decision:**  
Agency Back Office is an online-only business. It will not create a Google Business Profile (GBP) listing and will not compete for local pack or Maps results. GBP and Local SEO remain educational topics the site teaches. Local-intent content targets informational and commercial-investigation queries from practitioners (for example "local SEO training for agencies"), not "near me" queries. Resolves the earlier "Pending: GBP and Local Intent Scope" entry.

**Reason:**  
No eligible physical location or service area. This avoids an ineligible listing and misleading local signals.

**Affected Files/Routes:**  
`docs/seo-strategy.md`, `docs/schema-entity-strategy.md`, `docs/analytics-measurement.md`, `docs/keyword-topic-map.md`, `docs/project-overview.md`, `/services/google-business-profile-training/`, `/services/local-seo-training/`.

**Follow-Up:**  
Review this decision if a physical location or service area is ever established. Use `Organization` schema, not `LocalBusiness`.

---

### 2026-10-25 — Typography Font Pairing

**Area:** Design

**Decision:**  
Use Manrope for headings, page titles, and navigation, and Inter for body copy, forms, tables, course details, buttons, and labels. Load both through `next/font/google`.

**Reason:**  
Approved font pairing for editorial hierarchy with readable body text.

**Affected Files/Routes:**  
`docs/design-system.md`, `docs/nextjs-technical-architecture.md`, `app/layout.tsx`.

**Follow-Up:**  
Map `--font-manrope` / `--font-inter` to heading and body styles in global styles or Tailwind theme once the project is scaffolded.

---

### 2026-08-23 — Matrix Quality Rule

**Area:** Content

**Decision:**  
Do not automatically publish every theoretical audience × service combination. Each page must provide distinct value and intent.
