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

### 2026-10-25 - Internal links do not prefetch

**Area:** Technical

**Decision:**  
All internal links set `prefetch={false}` (the shared `SiteLink` and `ButtonLink` components and the header links).

**Reason:**  
In the static export with `trailingSlash: true`, the browser requested prefetch payloads such as `/training/__next.training.__PAGE__.txt?_rsc=...`, but the files are exported under a nested path (`__next.training/__PAGE__.txt`). Each request returned a 404 and logged a console error. Navigation still worked through a normal page load, so disabling prefetch removes the errors at no functional cost.

**Affected Files/Routes:**  
`components/ui/SiteLink.tsx`, `components/ui/ButtonLink.tsx`, `components/layout/Header.tsx`.

**Follow-Up:**  
Re-test prefetching after the first Cloudflare deploy or a Next.js upgrade. Remove `prefetch={false}` if exported prefetch payloads resolve.

---

### 2026-10-25 - Home hero spacing fix

**Area:** Design

**Decision:**  
The hero lead paragraph has a 28px top margin and the support paragraph has 20px. The fix raises specificity (`.page p.lead`, `.page p.support`) because the reset `.page p{margin:0}` was overriding the class margins. Other paragraphs are unchanged.

**Reason:**  
The design intends these margins. The reset had been hiding them.

**Affected Files/Routes:**  
`styles/globals.css`, `docs/design-reference/home-design-reference.html`.

**Follow-Up:**  
The same reset also overrides the eyebrow `margin-bottom` (16px) and the process loop bar `margin-top` (32px). Decide whether to fix those too.

---

### 2026-10-25 - Resources section copy

**Area:** Content

**Decision:**  
The resources heading is "Resources" and the intro is "Guides, checklists, templates, a glossary, and blog posts that support the training." The page does not imply the resources are free until the owner confirms it. The table caption is "Resource hubs" (the design reference still reads "Free resource hubs").

**Reason:**  
Whether the resources are free is unconfirmed.

**Affected Files/Routes:**  
`data/home.ts`, `docs/content-specification.md`, `docs/design-reference/home-design-reference.html`.

**Follow-Up:**  
Owner to confirm pricing for resources. Update the design reference caption.

---

### 2026-10-25 - Brand masters moved out of public

**Area:** Technical

**Decision:**  
The full logo masters moved from `public/brand/logos/` to `assets/brand-masters/` so they are not copied into the static export. `public/brand/` keeps only the site-sized derivatives and the Open Graph image, and `app/` keeps the favicon and Apple icon. This supersedes the location in "Brand, logo files, and color tokens".

**Reason:**  
The masters are large source files (about 4.7 MB) that the site does not use.

**Affected Files/Routes:**  
`assets/brand-masters/`, `docs/design-system.md`, `components/ui/Logo.tsx`.

**Follow-Up:**  
Regenerate derivatives from `assets/brand-masters/` if the logo changes.

---

### 2026-10-25 - Brand, logo files, and color tokens

**Area:** Design

**Decision:**  
Use the logo pack in `public/brand/logos/` as the official brand assets (horizontal, horizontal dark, stacked, icon). Replace the earlier provisional palette with the approved tokens: paper `#FFFFFF`, tint `#EEF3FC`, ink `#04153A`, muted `#425068`, accent `#0360FC`, accent-hover `#024BC9`, accent-on-dark `#7BA7FF`, rule `#D2DAE8`. Colors are CSS variables, never hardcoded in components.

**Reason:**  
The approved home page design uses these assets and colors. Contrast ratios were computed and meet 4.5:1 for text pairs.

**Affected Files/Routes:**  
`docs/design-system.md`, `styles/globals.css`, `public/brand/logos/`, `components/ui/Logo.tsx`.

**Follow-Up:**  
Owner to supply the logo clear-space rule, minimum sizes, and an SVG master if one exists.

---

### 2026-10-25 - Motion added (reverses no scroll-triggered animation)

**Area:** Design

**Decision:**  
Add restrained, CSS-only motion: hero load entrance, scroll-driven reveals inside `@supports (animation-timeline: view())`, card lift on hover and focus-within, arrow nudge, audience row shift, and FAQ height transition inside `@supports (interpolate-size: allow-keywords)`. Everything sits inside `prefers-reduced-motion: no-preference`, animates `transform` and `opacity` only, and uses no JavaScript. This reverses the earlier "no scroll-triggered animation" guidance.

**Reason:**  
The approved design includes this motion. It is an enhancement: all content is visible without it.

**Affected Files/Routes:**  
`docs/design-system.md` (Motion), `docs/qa-checklist.md` (Motion), `styles/globals.css`.

**Follow-Up:**  
Verify with reduced motion on, and in a browser without scroll-driven animation support.

---

### 2026-10-25 - Icons - functional only

**Area:** Design

**Decision:**  
Use a small inline SVG icon set (24px grid, 1.75px stroke, `currentColor`, `aria-hidden`) only in the resources table, training formats, the process loop bar, and menu, arrow, external, and download markers. No icon library and no decorative icons.

**Reason:**  
Keeps icons functional and avoids the arbitrary icon collections the design system warns against.

**Affected Files/Routes:**  
`docs/design-system.md` (Icons), `components/ui/Icon.tsx`.

**Follow-Up:**  
None.

---

### 2026-10-25 - Cards and image placeholders (exceptions to card guidance)

**Area:** Design

**Decision:**  
Allow bordered cards (1px rule, 4px radius, no shadow) only for service topic cards and definition cards, each with an image slot. Use a reusable image placeholder (visible label, fixed aspect ratio, light and dark variants) including a dark 4:3 placeholder in the closing band. No stock photography.

**Reason:**  
The approved design reserves slots for real screenshots and diagrams. The earlier guidance discouraged repeated card grids, so the exception is limited to these two uses.

**Affected Files/Routes:**  
`docs/design-system.md` (Teaching Visuals), `components/ui/ImagePlaceholder.tsx`.

**Follow-Up:**  
Replace each placeholder with a real screenshot or diagram. Placeholders must not ship to production.

---

### 2026-10-25 - Typography update - buttons use Manrope 700

**Area:** Design

**Decision:**  
Buttons use Manrope 700 (previously Inter 600) and navigation uses Inter. Manrope loads at weights 500-800 and Inter at 400-600.

**Reason:**  
Matches the approved home page design.

**Affected Files/Routes:**  
`docs/design-system.md` (Typography), `app/layout.tsx`.

**Follow-Up:**  
None.

---

### 2026-10-25 - Home page FAQ expanded to 8 questions

**Area:** Content

**Decision:**  
The home page FAQ has 8 questions in two columns ("About the training" and "Topics and expectations"), replacing the earlier 5. The added questions cover where to start, the difference between SEO and AEO, and how long SEO takes.

**Reason:**  
The approved design covers more of the questions visitors ask. Answers avoid guarantees and invented claims.

**Affected Files/Routes:**  
`docs/content-specification.md`, `data/home.ts`.

**Follow-Up:**  
None. `FAQPage` schema is still not used on the home page.

---

### 2026-10-25 - Home page proof section omitted until verified

**Area:** Content / Conversion

**Decision:**  
The proof section is omitted from the home page. `data/proof.ts` stays empty until a verified instructor bio and testimonials with permission to publish are supplied.

**Reason:**  
No verified proof content exists, and nothing may be invented.

**Affected Files/Routes:**  
`docs/content-specification.md`, `data/proof.ts`, `components/content/ProofSection.tsx`.

**Follow-Up:**  
Owner to supply the bio and testimonials.

---

### 2026-10-25 - Unbuilt links render as text; resources heading drops the free claim

**Area:** Content / Technical

**Decision:**  
Links to routes that do not exist yet render as plain text marked `data-unbuilt-href`, and no `href="#"` ships. The resources section heading is "Resources" with no "free" claim until that is confirmed.

**Reason:**  
Avoids 404 links while most pages are unbuilt, and avoids an unconfirmed claim.

**Affected Files/Routes:**  
`lib/routing/routes.ts`, `components/ui/SiteLink.tsx`, `scripts/check-home-links.mjs`, `data/home.ts`.

**Follow-Up:**  
Add each route to `lib/routing/routes.ts` when its page is built. Restore "Free resources" only after the owner confirms the resources are free.

---

### 2026-10-25 - Home page CTAs

**Area:** Conversion

**Decision:**  
The dominant CTA is "Explore the training" (`/training/`). The secondary CTA is "Browse training topics" (`/services/`), shown in the hero only. "Get started" (`/get-started/`) stays in the header navigation only.

**Reason:**  
`/get-started/` depends on form handling, which is still pending. `/training/` works as a static page now, matches the page's navigational and commercial-investigation intent, and is a low-friction next step.

**Affected Files/Routes:**  
`docs/content-specification.md`, `docs/master-page-build-list.md`, `/`.

**Follow-Up:**  
Revisit when form handling is decided and `/get-started/` has a working conversion path.

---

### 2026-10-25 - Home page schema and proof handling

**Area:** SEO / Conversion

**Decision:**  
Do not add `FAQPage` schema on the home page. The FAQ stays visible on the page. Use Organization, WebSite, and WebPage only, emitted only when the site URL is configured, with no `sameAs`, logo, address, or `LocalBusiness`. The proof section is data-driven: it renders only from verified entries in `data/proof.ts` and is omitted while that data is empty.

**Reason:**  
`schema-entity-strategy.md` allows `FAQPage` only where current eligibility makes it worthwhile. No bio or testimonial text has been supplied, and nothing may be invented.

**Affected Files/Routes:**  
`docs/schema-entity-strategy.md`, `docs/content-specification.md`, `data/proof.ts`, `/`.

**Follow-Up:**  
Owner to supply the instructor bio and testimonials with permission to publish. Reversible through this change log.

---

### 2026-10-25 - Confirmed training formats and home page launch gate

**Area:** Content / Technical

**Decision:**  
The only confirmed training formats are Live training (`/training/live/`) and Sessions (`/training/sessions/`). Courses and workshops are not referenced on the home page until confirmed. The home page stays `noindex` until the launch gate: `NEXT_PUBLIC_SITE_URL` is set and `robots.txt` and page metadata are released together.

**Reason:**  
Do not claim offerings that are not confirmed. Many home page links target pages that are not built yet, which is acceptable only while the site is `noindex`.

**Affected Files/Routes:**  
`docs/master-page-build-list.md`, `docs/content-specification.md`, `/`, `/training/`.

**Follow-Up:**  
Before `NEXT_PUBLIC_SITE_URL` is set, resolve every internal link on the home page (run `npm run links:home`). Owner to confirm the one-line descriptions for Live training and Sessions and which resource hubs exist at launch.

---

### 2026-10-25 — Git workflow - direct pushes to main, no PRs

**Area:** Technical

**Decision:**  
All work is committed directly to main. No feature branches, no pull requests. This supersedes the preview-deployment wording for pull requests and other branches in "Rendering and hosting - static export on Cloudflare Pages".

**Reason:**  
Owner's hard rule.

**Affected Files/Routes:**  
`README.md`, `CLAUDE.md`, `.github/workflows/ci.yml`, Cloudflare Pages settings.

**Follow-Up:**  
Run `npm run check` locally before every push. Review CI results after each push and fix forward with a new commit. Cloudflare deploys production on every push to main.

---

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

### 2026-10-25 - Contact build: recorded foundations

**Area:** Architecture / SEO / Technical

**Decision:**
Consolidated record of approved foundations the Contact build depends on. Each is also recorded in its own entry where one exists.

- **Online-only and Organization schema.** No GBP listing, no "near me" targeting, no street address. Use `Organization`, never `LocalBusiness` (see "GBP/local intent scope - online-only").
- **Split crawler policy.** Search and retrieval bots are allowed on public pages. AI training bots are limited to public educational paths (see "Crawler Access Policy for Search Bots" and "AI crawler policy - split by section").
- **noindex and site-URL rule.** Pages are `noindex`, canonicals are omitted, JSON-LD is not rendered, and the sitemap is empty until `NEXT_PUBLIC_SITE_URL` is set. `NEXT_PUBLIC_SITE_URL` stays unset until launch.
- **Static export on Cloudflare Pages.** `output: 'export'`, `trailingSlash: true`, redirects and headers in `public/_redirects` and `public/_headers` (see "Rendering and hosting").
- **Main-only commits.** Work is committed directly to `main`. No branches or pull requests (see "Git workflow").
- **No response-time promises.** No page states or implies how fast a reply, call, or enrollment will happen.
- **Hyphens rule.** Copy uses hyphens, never em dashes. Acronyms are defined on first use.

**Reason:**
Keeps the Contact build and later conversion pages consistent with decisions already made, and records the two rules (no response-time promises, hyphens) that had no entry.

**Affected Files/Routes:**
All pages. `docs/contact-page-spec.md`.

**Follow-Up:**
None.

---

### 2026-10-25 - Contact form handling - Cloudflare Pages Function with Turnstile

**Area:** Technical

**Decision:**
The Contact form posts JSON to a Cloudflare Pages Function at `/api/contact` (`functions/api/contact.ts`). Spam protection is Cloudflare Turnstile in managed mode plus a hidden honeypot field named `website`. The Function validates input, verifies the Turnstile token, and sends one email through a single `sendEmail` helper in `functions/_lib/`. The email provider is not chosen. `sendEmail` returns the `server` error code until a provider and its secrets are configured. Secret and variable names: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `EMAIL_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

**Reason:**
The static export has no API routes. A Pages Function adds a server runtime for this one endpoint only, which is the reconsideration path named in `nextjs-technical-architecture.md`. The rest of the site stays a static export.

**Affected Files/Routes:**
`functions/`, `shared/contact-schema.ts`, `/contact/`, `/api/contact` (non-page endpoint, excluded from the sitemap), `docs/nextjs-technical-architecture.md`.

**Follow-Up:**
Choose the email provider and set secrets in Cloudflare Pages. Create the Turnstile widget and set the site key and secret. Reuse the Function helpers for Get started.

---

### 2026-10-25 - Privacy route is /privacy/

**Area:** Architecture

**Decision:**
The privacy page route is `/privacy/`, replacing `/privacy-policy/` in the docs.

**Reason:**
Shorter, matches `/terms/`, and avoids a redundant word.

**Affected Files/Routes:**
`docs/master-page-build-list.md`, `docs/content-specification.md`, `docs/url-routing-strategy.md`.

**Follow-Up:**
Write the privacy page. It must say that submitted details are used to reply and cover phone number collection. Until it exists, the Contact form's "privacy page" text is not a link and the page is a launch blocker.

---

### 2026-10-25 - Contact vs Get started

**Area:** Conversion

**Decision:**
Contact answers questions and inquiries. Get started is the enroll or membership path once terms are confirmed. Contact links to Get started as a secondary text link, never a button. Get started links back to Contact for visitors with a question first.

**Reason:**
Two high-intent pages with one job each avoid competing CTAs and keyword cannibalization.

**Affected Files/Routes:**
`/contact/`, `/get-started/`, `docs/conversion-architecture.md`.

**Follow-Up:**
None.

---

### 2026-10-25 - Contact survey format and phone number collection

**Area:** Conversion / Technical

**Decision:**
The Contact form is a three-step survey: step 1 role pills (optional), step 2 topic pills (required) and message (required, 10 to 2,000 characters), step 3 full name, phone number, and email (all required) plus the Turnstile check. Nothing advances automatically and Back keeps every answer. Phone number is collected but never displayed anywhere. No email address, phone number, hours, or response-time statement is shown on the page.

**Reason:**
A short survey lowers effort per step and gives replies useful context (role, topic). The form is the only channel.

**Affected Files/Routes:**
`/contact/`, `functions/api/contact.ts`, `shared/contact-schema.ts`, `docs/contact-page-spec.md`.

**Follow-Up:**
Owner to confirm consent wording for calling or texting. The privacy line does not promise a call or text.

---

### 2026-10-25 - Reviews link in the footer

**Area:** Trust / Architecture

**Decision:**
Add "Reviews" (`/reviews/`) to the footer Company group, after About. It renders as plain text until the page exists. The page may show only real, verified reviews. No `Review` or `AggregateRating` schema until real reviews are on the page.

**Reason:**
Reserves the trust route without inventing proof.

**Affected Files/Routes:**
`components/layout/Footer.tsx`, `data/home.ts`, `/reviews/`, `docs/schema-entity-strategy.md`.

**Follow-Up:**
Build `/reviews/` only when verified reviews exist.

---

### 2026-10-25 - Contact page spec approved

**Area:** Content / Design

**Decision:**
`docs/contact-page-spec.md` is the approved spec and copy for `/contact/`. The visual reference is `docs/design-reference/contact-design-reference.html`. The page registry is `docs/master-page-build-list.md`. `ABO-Site-Page-Build-List.xlsx` is a tracker and is corrected to match.

**Reason:**
Single approved source for the build.

**Affected Files/Routes:**
`/contact/`.

**Follow-Up:**
Owner corrects the spreadsheet (see the Contact build report).

---

### 2026-10-25 - Contact: reading order, Clear answer, analytics hook

**Area:** Design / Conversion / Technical

**Decision:**  
1. The Contact DOM order is breadcrumb, H1, lead, survey, "What you can write about", example, options, Get started band, on every viewport. Desktop moves the survey to the right column with CSS grid, so the left column is no longer sticky.
2. Step 1 gets a "Clear answer" text button, shown only after a role is selected. It clears the selection, returns focus to the first pill, and fires no analytics event.
3. `trackEvent` also dispatches an `abo:track` window event so calls can be inspected in tests. It sends nothing anywhere until a tool is chosen.

**Reason:**  
Reading and tab order should match the mobile order. Radio inputs cannot be unselected, so an optional question needs a way to skip after choosing. The Playwright check needs a place to observe analytics calls without a tool.

**Affected Files/Routes:**  
`docs/contact-page-spec.md`, `docs/design-system.md`, `docs/qa-checklist.md`, `docs/analytics-measurement.md`, `/contact/`, `lib/analytics.ts`.

**Follow-Up:**  
Attach the analytics tool inside `trackEvent` when chosen.

---

### 2026-08-23 — Matrix Quality Rule

**Area:** Content

**Decision:**  
Do not automatically publish every theoretical audience × service combination. Each page must provide distinct value and intent.
