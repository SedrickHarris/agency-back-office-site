# Information Architecture

## Architecture Objective

Create a logical hierarchy that supports user navigation, crawlability, internal linking, topical authority, and long-term growth.

## Primary Sections

```text
/
├── about/
├── services/
├── audiences/
├── training/
├── resources/
├── contact/
└── get-started/
```

## Services

```text
/services/
/services/{service-slug}/
```

Services represent what Agency Back Office teaches.

## Audiences

```text
/audiences/
/audiences/{audience-slug}/
```

Audiences represent who the training is for.

## Audience + Service

```text
/audiences/{audience-slug}/{service-slug}/
```

These pages explain how a specific training topic applies to a specific audience.

Only publish pages that have distinct intent and can provide useful audience-specific value.

## Training

```text
/training/
/training/courses/
/training/workshops/
/training/live/
/training/sessions/
```

Training pages explain how education is delivered.

## Resources

```text
/resources/
/resources/blog/
/resources/guides/
/resources/faq/
/resources/checklists/
/resources/templates/
/resources/glossary/
```

Resources support topic clusters and visitor education.

## Recommended Navigation

Primary:
- Training
- Topics
- Who We Help
- Resources
- About
- Get Started

## Breadcrumbs

Service:
Home → Services → SEO Training

Audience:
Home → Audiences → Agency Owners

Audience + Service:
Home → Audiences → Agency Owners → SEO Training

Resource:
Home → Resources → Guides → Guide Name

Conversion:
Home → Contact

Contact and Reviews live in the footer Company group. Contact is not in the primary navigation. Get started is the header action and also appears in the footer.

## Architecture Rules

- Avoid unnecessary nesting.
- Keep evergreen URLs stable.
- Do not create duplicate pages for synonyms without a clear intent reason.
- Maintain one canonical page for each primary topic.
- Avoid orphan pages.
- Every page should have a defined parent, siblings, and internal-link targets.
