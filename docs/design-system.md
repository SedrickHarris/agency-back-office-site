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

### Type Scale

Defined as Tailwind theme tokens in `styles/globals.css`.

| Role | Size | Font and weight | Line-height |
|---|---|---|---|
| H1 | `clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)` | Manrope 700, tracking -0.02em | 1.1 |
| H2 | `clamp(1.75rem, 1.4rem + 1.4vw, 2.25rem)` | Manrope 700 | 1.2 |
| H3 | 1.25rem | Manrope 600 | 1.3 |
| Body | 1.0625rem | Inter 400 | 1.65 |
| Lead paragraph | 1.25rem | Inter 400 | 1.55 |
| Small / meta | 0.875rem | Inter 400 | 1.5 |
| Eyebrow | 0.8125rem | Manrope 600, uppercase, tracking 0.08em | 1.4 |

Prose measure: maximum 68ch. Definitions and FAQ answers never exceed 68ch.

## Design Tokens

Tokens live in `styles/globals.css` (Tailwind CSS v4 `@theme`). Do not hardcode hex values in components.

| Token | Value | Use |
|---|---|---|
| `ink` | `#0b1a3a` | Text, rules, dark surface |
| `paper` | `#ffffff` | Page background |
| `tint` | `#eef3fb` | Tinted band surface (one per page where needed) |
| `rule` | `#c9d3e6` | 1px hairline rules |
| `muted` | `#45516a` | Secondary text |
| `accent` | `#1558d6` | Primary buttons, text links on light surfaces |
| `accent-strong` | `#0f45a8` | Hover state for accent |

Values are derived from the logo's navy and blue. Check contrast before using a token pair for text.

Layout rules:
- Container: maximum 1200px, 20px gutters (mobile) and 32px (lg and up).
- Section padding: 64px mobile, 96px desktop.
- Structure comes from 1px hairline rules. No card shadows, gradients, or icon sets. Maximum border radius 4px (circular step markers are the exception).
- Focus: 2px solid outline with 2px offset on every interactive element.
- FAQ and disclosure content uses native `details` and `summary`. No JavaScript is required for content sections.

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
