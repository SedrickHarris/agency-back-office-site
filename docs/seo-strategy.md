# SEO Strategy

## Objective

Build durable organic visibility by combining technically sound implementation with strong information architecture, topic depth, audience relevance, and internal linking.

## Pillars

### 1. Technical SEO

- clean App Router implementation
- server-rendered/static content where appropriate
- canonical URLs
- XML sitemap
- robots controls
- metadata
- semantic HTML
- Core Web Vitals
- mobile usability
- accessible navigation
- no broken links
- no redirect chains

### 2. Topic Ownership

Core service pages should become canonical educational hubs.

Supporting resources should answer narrower questions and reinforce those hubs.

### 3. Audience Relevance

Audience pages and audience + service pages should address distinct operating problems and search intent.

### 4. Internal Linking

Every important page should receive contextual links from related hubs, resources, and sibling pages.

### 5. Content Depth

Pages should cover:
- definitions
- importance
- implementation
- workflows
- examples
- mistakes
- decisions
- FAQs
- next steps

## Metadata

Each indexable page should have:
- unique title
- unique meta description
- canonical
- Open Graph data where appropriate
- clear H1

## Search Intent

Classify pages as:
- navigational
- informational
- commercial investigation
- transactional
- educational/implementation

Match content structure and CTA to the intent.

## Cannibalization Rule

Before adding a new page:
1. search the page registry,
2. identify the intended query/topic,
3. compare with existing canonicals,
4. expand an existing page instead if intent overlaps heavily.

## Search Surfaces

The site is built to be eligible for these surfaces. No ranking or inclusion is guaranteed.

- **Google:** crawlable server-rendered pages, canonicals, sitemap, structured data, and Google Search Console monitoring.
- **Bing:** the same technical foundation, plus Bing Webmaster Tools monitoring.
- **Apple:** Applebot crawl access and Open Graph and canonical metadata in static HTML.
- **AI answer engines:** answer-first content, consistent entities, and search-crawler access.

Details live in `aeo-ai-search-strategy.md`, `schema-entity-strategy.md`, and `analytics-measurement.md`.

Crawler access rules are defined in `aeo-ai-search-strategy.md` (Crawler Access and AI Search Policy).

## Local Intent and Google Business Profile

**Status:** Resolved, Option B (online-only). Approved 2026-10-25.

- No Google Business Profile (GBP) listing.
- No local pack or Maps targeting.
- No "near me" optimization.
- GBP and Local SEO are teaching topics. Their service pages (`/services/google-business-profile-training/` and `/services/local-seo-training/`) target practitioner intent, such as "local SEO training for agencies", which is informational and commercial-investigation intent.

GBP eligibility is governed by Google's guidelines.

**Revisit rule:** if a physical location or service area is later confirmed and is eligible under Google's guidelines, reopen this decision through `decisions-change-log.md` first, before any listing or local markup is created.

## Ongoing SEO

SEO is not complete at launch. The roadmap must include:
- new supporting content
- content refreshes
- internal-link improvements
- query analysis
- CTR optimization
- schema review
- technical monitoring
