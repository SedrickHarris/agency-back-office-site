# URL Routing Strategy

## Objectives

URLs should be stable, descriptive, scalable, human-readable, and aligned with information architecture.

## Canonical Patterns

### Service

`/services/{service-slug}/`

Example:
`/services/seo-training/`

### Audience

`/audiences/{audience-slug}/`

Example:
`/audiences/agency-owners/`

### Audience + Service

`/audiences/{audience-slug}/{service-slug}/`

Example:
`/audiences/agency-owners/seo-training/`

### Resource

`/resources/{resource-type}/{resource-slug}/`

Example:
`/resources/guides/google-business-profile-optimization/`

### Training

`/training/{training-type}/{training-slug}/`

Example:
`/training/courses/local-seo-foundations/`

## Slug Rules

- lowercase only
- hyphens between words
- no dates for evergreen content
- no version numbers
- no tracking parameters in canonical URLs
- no unnecessary stop words
- avoid acronyms where the full entity is clearer
- do not change an established slug without a redirect plan

## Preferred Examples

Use:
`/services/google-business-profile-training/`

Avoid:
`/services/gbp-training/`

Use:
`/resources/guides/answer-engine-optimization-guide/`

Avoid:
`/resources/aeo-guide-2026/`

## Redirect Rules

When a route changes:
1. map old URL to the best new equivalent,
2. use permanent 301 redirects,
3. update internal links,
4. update sitemap/canonical references,
5. document the change in `decisions-change-log.md`.

Avoid redirect chains.
