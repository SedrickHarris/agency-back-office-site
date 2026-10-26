# AEO and AI Search Strategy

## Objective

Make Agency Back Office content easy for answer engines and AI systems to understand, extract, summarize, cite, and connect to relevant user questions.

## Principles

### Answer First

For question-based sections, provide a concise direct answer before deeper explanation.

### Entity Clarity

Use consistent names for:
- Agency Back Office
- SEO
- Answer Engine Optimization
- Google Business Profile
- Local SEO
- Reputation Management
- CRM
- Marketing Automation
- AI Marketing

### Structured Explanations

Favor:
- definitions
- numbered processes
- comparison tables
- pros/cons
- decision frameworks
- FAQs
- checklists
- examples

### Context Completeness

Do not assume the reader or AI system knows what a referenced tool, tactic, or acronym means.

Define important terms on first use.

## Recommended Content Pattern

For major educational topics:

1. What it is
2. Why it matters
3. How it works
4. How agencies use it
5. How to implement it
6. Common mistakes
7. Tools/workflows
8. FAQs
9. Related topics
10. Next step

## AEO Targets

Content may be optimized for:
- featured snippets
- People Also Ask
- voice search
- conversational queries
- question clusters
- AI-generated answers

## AI Visibility Rules

- avoid vague marketing claims
- separate fact from opinion
- use precise language
- provide original frameworks where useful
- create clear relationships between entities
- maintain strong internal links
- refresh platform-specific information when it changes

## Crawler Access and AI Search Policy

### Search Crawlers to Allow

Allow these search crawlers so that content can be discovered, indexed, and surfaced in search and answer experiences:

- Googlebot (Google Search)
- Bingbot (Bing)
- Applebot (Apple Search)
- OAI-SearchBot (OpenAI search)
- PerplexityBot (Perplexity)

### AI Training Crawlers

**Status:** Resolved (split-by-section). Approved 2026-10-25.

Public educational content exists to build authority and visibility, so search bots and AI training crawlers (for example GPTBot and Google-Extended) are allowed there. Premium material is the protected asset, so any future member, course-content, or premium template area is blocked from all crawlers and must sit behind authentication.

| Area | Search and retrieval bots | AI training crawlers |
|---|---|---|
| Public indexable pages (all) | Allow | Per the paths below |
| `/`, `/about/`, `/services/`, `/audiences/`, `/resources/` | Allow | Allow |
| `/training/` (hub and delivery overview pages) | Allow | Allow |
| Future member area, course-content area, or premium template area | Block, and noindex | Block |

Search and retrieval bots: Googlebot, Bingbot, Applebot, OAI-SearchBot, PerplexityBot.

Notes:
- robots.txt is a request that reputable crawlers honor. It does not guarantee compliance and is not access control.
- Truly valuable content must be gated by authentication, not only disallowed in robots.txt.
- User-triggered fetchers (for example when a person asks an AI tool to open a URL) may follow different rules than crawlers. Verify against the vendor's official documentation before implementation.
- Bot names and the behavior of each bot (search, retrieval, or training) must be confirmed. Verify against the vendor's official documentation before implementation.

**Reconsideration trigger:** if full course lessons or paid-quality templates are ever published on open public pages, block training crawlers site-wide until that content is gated.

**Review cadence:** every six months, and whenever a major platform announces crawler changes.

### Rendering Requirement

Key content must be server-rendered in the initial HTML. Do not rely on client-side rendering for headings, answer blocks, definitions, FAQs, internal links, metadata, or schema.

### Consistency Requirement

`app/robots.ts` must stay consistent with this policy. Update this section first, then `robots.ts`.

## Answer Block Standards

- Under each question-style heading, give a direct answer of roughly 40-60 words, then follow with detail.
- Definitions strip pattern: a short, scannable set of term-and-definition entries, each stating what the term is in one or two sentences and linking to the canonical page for that topic.
- Show a visible "last reviewed" date on definition content and on the home page. Update it only when the content is actually reviewed.
- Define acronyms on first use.

## No Guaranteed Inclusion

No tactic in this document guarantees inclusion in featured snippets, People Also Ask (PAA) results, AI-generated answers, or knowledge panels. These surfaces are controlled by the platforms. The goal is to make content clear, accurate, and useful so that it is eligible to be used.

## Important Limitation

Do not write unnatural content for the sake of "LLM optimization." Human usefulness remains the primary standard.
