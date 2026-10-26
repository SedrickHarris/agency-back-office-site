# Schema and Entity Strategy

## Objective

Use structured data and consistent entity references to clarify site meaning without misrepresenting content.

## Candidate Schema Types

- Organization
- WebSite
- WebPage
- AboutPage
- ContactPage
- BreadcrumbList
- Article
- BlogPosting
- FAQPage when eligible and appropriate
- Course when a real course exists
- ItemList
- Person when supported
- VideoObject when video content is present

## Rules

1. Schema must reflect visible content.
2. Do not fabricate ratings, reviews, pricing, instructors, credentials, dates, or course availability.
3. Do not add a schema type solely because it exists.
4. Keep entity names consistent throughout the site.
5. Use canonical URLs inside schema references.

## Primary Entity

Agency Back Office

## Related Topic Entities

- Digital Marketing
- Search Engine Optimization
- Answer Engine Optimization
- Local SEO
- Google Business Profile
- Reputation Management
- Marketing Automation
- CRM
- Lead Generation
- Conversion Rate Optimization
- Content Marketing
- Artificial Intelligence
- Agency Operations

## Breadcrumb Schema

Implement `BreadcrumbList` where breadcrumbs are visible.

## Course Schema

Use only for confirmed, visible course offerings with accurate course information.

## FAQ Schema

Use selectively and only where the page includes genuine FAQ content and current search-engine eligibility makes implementation worthwhile.

## Organization Entity and Knowledge Panel

Goal: give search engines a clear, consistent description of Agency Back Office as an organization.

- Use one consistent legal/brand name, logo, and description across the site, schema, and external profiles.
- Use `Organization` schema with `sameAs` links limited to real, verified profiles supplied by the site owner. Do not invent or guess profile URLs.
- The About page must match the `Organization` schema (name, description, and logo).
- Knowledge panel display is determined by Google and cannot be guaranteed.
- Use `Organization` schema, not `LocalBusiness`. Agency Back Office is online-only (see `seo-strategy.md`). Do not include a street address, geo coordinates, opening hours, or service-area markup unless a real, eligible location is later confirmed and the decision is recorded in `decisions-change-log.md`.
- Do not create local-listing or entity profiles that imply a physical presence.

**TODO - profiles to confirm for `sameAs` (owner to supply, none assumed):**

- [ ] Legal name and brand name as it should appear in schema
- [ ] Official one-sentence organization description
- [ ] Logo file to reference (see `public/logos/`)
- [ ] LinkedIn page URL
- [ ] YouTube channel URL
- [ ] Facebook page URL
- [ ] X (formerly Twitter) profile URL
- [ ] Instagram profile URL
- [ ] Other verified profiles (for example Wikidata or Crunchbase, only if they exist)

## Home Page Schema

Recommended for `/`:

- `Organization`
- `WebSite`
- `WebPage`

Add `FAQPage` only if the FAQ is visible on the page and current search-engine eligibility makes it worthwhile.

Do not add `Course` schema until a real course is confirmed and visible on the site.

## Entity Consistency

Avoid switching randomly between abbreviations and names without context.

Example:
First use: "Google Business Profile (GBP)"
Later uses: "GBP" is acceptable.
