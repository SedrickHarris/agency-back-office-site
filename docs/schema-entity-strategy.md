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

## Entity Consistency

Avoid switching randomly between abbreviations and names without context.

Example:
First use: "Google Business Profile (GBP)"
Later uses: "GBP" is acceptable.
