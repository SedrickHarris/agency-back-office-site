# Design System

## Design Goal

Create an authoritative education/practitioner platform that feels human-designed, useful, and conversion-focused.

## Experience Principles

- editorial clarity
- strong typographic hierarchy
- practical teaching visuals
- easy scanning
- clear navigation
- restrained decoration
- strong mobile usability

## Typography

Approved font pairing: **Manrope** (display/UI) and **Inter** (text).

| Role | Font | Weight |
|---|---|---|
| Page titles and headings (H1–H6) | Manrope | 600–700 |
| Navigation | Manrope | 600 |
| Body copy, forms, tables, course details | Inter | 400–500 |
| Buttons and labels | Inter | 600 |

Sizing:
- Body: approximately 16–18px (1rem–1.125rem), line-height 1.55–1.7.
- Large headings: tighter line-height (approximately 1.1–1.25), still readable when wrapped on mobile.
- Use fluid/responsive sizes (for example `clamp()`) so headings scale down on small screens without shrinking body text below 16px.
- Keep line length readable (approximately 60–75 characters for body copy).

Rules:
- Use only these two families. Do not add a third typeface.
- Use only the specified weights to limit font payload.
- Do not rely on font weight alone to convey meaning; maintain accessible contrast and visible focus states.
- Set `display: swap` and a system-font fallback so text stays visible while fonts load.
- Implementation approach is documented in `nextjs-technical-architecture.md` (Fonts).

## Avoid Generic AI/SaaS Patterns

Avoid overusing:
- gradient blobs
- glassmorphism
- decorative floating shapes
- excessive rounded cards
- huge empty hero sections
- repetitive three-card grids
- generic stock-photo teams
- every section centered
- arbitrary icon collections

## Preferred Visual Content

- diagrams
- process flows
- screenshots
- annotated UI examples
- checklists
- framework graphics
- tables
- training imagery
- whiteboard/classroom motifs where appropriate
- real course/resource previews

## Page Rhythm

Use a mix of:
- editorial text sections
- two-column explanatory layouts
- tables
- callout boxes
- diagrams
- FAQs
- checklists
- evidence/proof
- CTA bands

Do not repeat the same section pattern throughout a page.

## Accessibility

- sufficient contrast
- visible focus states
- semantic headings
- descriptive link labels
- keyboard-accessible navigation
- meaningful alt text
- motion kept optional/restrained

## Responsive Design

Mobile should not be a compressed desktop layout.

Prioritize:
- readable line length
- thumb-friendly controls
- simple nav
- reduced decorative density
- stacked content with preserved hierarchy
