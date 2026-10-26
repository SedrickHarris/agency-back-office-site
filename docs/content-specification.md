# Content Specification

## Purpose

Define the minimum planning and content requirements for each page type.

## Universal Page Fields

Each indexable page should define:

- page name
- URL
- page type
- target audience
- primary topic
- primary intent
- title tag
- meta description
- H1
- canonical
- parent page
- internal-link targets
- primary CTA
- secondary CTA if needed
- schema recommendation
- image/visual requirements
- status

## Service Page

Recommended structure:

1. Hero/value proposition
2. Direct explanation of the training topic
3. Why the topic matters for agencies
4. What students should understand
5. Core areas covered
6. Implementation workflow
7. Common mistakes
8. Who this training is for
9. Related services
10. FAQs
11. CTA

## Audience Page

Recommended structure:

1. Audience-specific hero
2. Current challenges
3. What this audience needs to learn
4. Relevant Agency Back Office training areas
5. Common mistakes
6. Recommended learning path
7. Related resources
8. FAQs
9. CTA

## Audience + Service Page

Recommended structure:

1. Audience/service value proposition
2. Why this topic matters specifically to the audience
3. audience-specific use cases
4. workflows/examples
5. mistakes and gaps
6. what to learn
7. related training
8. resources
9. FAQs
10. CTA

## Resource Page

Must identify:
- parent topic
- target question
- direct answer
- detailed explanation
- implementation guidance
- related resources
- canonical service link
- next step

## Conversion Page (Survey)

Used by `/contact/`. Reusable for `/get-started/`.

Must identify:
- route, parent, canonical
- one job and one dominant CTA (the form submit)
- survey steps, fields, rules, and error text (one source of truth shared by client and server)
- states: idle, step error, sending, verification error, network error, server error, success, JavaScript off
- supporting sections that reduce effort (what to write about, an annotated example, alternatives)
- a secondary text link to the neighbouring conversion page
- analytics events with no typed values
- schema (ContactPage and BreadcrumbList only unless a public contact method exists)

Rules:
- Do not show an email address, phone number, hours, or response-time statement that has not been supplied.
- No FAQ, proof, or image placeholders unless verified content exists.

## Legal Page

Used by `/privacy/` and `/terms/`.

Must identify:
- route and parent (Home)
- effective date and last reviewed date, visible
- plain-language sections with descriptive H2s
- what data is collected, why, how long it is kept, and how to ask about it, matching what the forms collect
- a text link back to `/contact/`

Rules:
- Content comes from the owner or counsel. Do not generate legal claims.
- Robots and schema follow the global launch gate. Breadcrumb only.

## Core Page: Home

Visual reference: `docs/design-reference/home-design-reference.html` (approved design). Copy is approved and lives in `data/home.ts`.

| Field | Value |
|---|---|
| Page name | Home |
| URL and canonical | `/` (canonical resolves through `metadataBase`; omitted until the site URL is set) |
| Page type | Core page, Phase 1, Critical |
| Parent | None (root) |
| Purpose | Define Agency Back Office, route visitors to the right training topic, audience page, and format |
| Audience | Agency owners and new agency owners first |
| Primary intent | Navigational with some commercial investigation |
| Title tag | "Agency Back Office \| Practical Digital Marketing and Agency Training" |
| Meta description | "Practical training in SEO, AEO, Google Business Profile, reputation management, automation, and agency operations for agency owners, marketers, and consultants." |
| H1 | "Practical digital marketing training for people who deliver client work" |
| Primary CTA | Explore the training (`/training/`) |
| Secondary CTA | Browse training topics (`/services/`), hero only. "Get started" (`/get-started/`) stays in the header navigation. |
| Schema | Organization, WebSite, WebPage. Emitted only when the site URL is set. No `FAQPage`, no `Course`, no `sameAs`. |
| Robots | `noindex` until the launch gate |
| Visual needs | Annotated process diagram (HTML), process table, image placeholders (topic cards, definition cards, closing band), functional icons |
| Status | In build |

### Section Order

1. Hero with a standalone one-sentence entity definition and an annotated workflow diagram
2. Service topics - grouped by theme (Search visibility, Reputation and leads, Systems), topic cards with image placeholders, a "More topics" list, and a link to all topics
3. Process table - Learn the work, Build the system, Apply it to clients, Keep improving - with a loop bar
4. Audience router ("Which describes you?") - ruled rows
5. Definitions - SEO, AEO, GBP, and Local SEO as a 2x2 grid of cards with image placeholders, each linking to its canonical service page, with a visible "last reviewed" date
6. How training is delivered - names only confirmed formats (currently Live training and Sessions). Courses and workshops are not referenced until confirmed. No pricing, schedule, curriculum, or duration language.
7. Resources - a table of resource hubs. Heading: "Resources". Intro: "Guides, checklists, templates, a glossary, and blog posts that support the training." Nothing on the page implies the resources are free until the owner confirms it.
8. Proof - conditional. Renders only from verified data (`data/proof.ts`). Omitted while the data is empty. Never invent bios, quotes, counts, or ratings.
9. FAQ - 8 questions in two columns on desktop ("About the training" and "Topics and expectations"), one column on mobile, using native `details` and `summary`
10. Closing band - dark surface. Logo, H2, support line, and the primary CTA on the left. A dark 4:3 image placeholder on the right, stacked below on mobile.

### Internal-Link Targets

- `/services/`, `/audiences/`, `/training/`, `/training/live/`, `/training/sessions/`, `/resources/`
- priority service pages and priority audience pages (see `master-page-build-list.md`)
- `/about/`, `/contact/`, `/get-started/`
- legal pages (`/privacy/`, `/terms/`) in the footer once they exist

Links to routes that do not exist yet render as plain text (marked `data-unbuilt-href`) until the page is built. Never ship `href="#"`.

### Notes

- Include a visible "last reviewed" date on the definitions grid (see `aeo-ai-search-strategy.md`, Answer Block Standards).
- The FAQ is visible on the page. `FAQPage` schema is not used on the home page (see `decisions-change-log.md`).
- The home page stays `noindex` until the launch gate: `NEXT_PUBLIC_SITE_URL` is set, `robots.txt` and page metadata are released together, and all internal links resolve. The page is excluded from the sitemap while `noindex`.
- Do not invent proof, claims, pricing, or student counts.
- Define acronyms on first use (SEO, AEO, AI, GBP, CRM).

## Writing Rules

- define acronyms on first use
- avoid filler introductions
- use plain language
- use examples
- do not keyword stuff
- do not fabricate claims
- use headings that communicate meaning
- prioritize usefulness over word count
