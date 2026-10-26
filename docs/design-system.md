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

## Brand

Official logo masters live in `assets/brand-masters/` (PNG and WebP). They are source files and are not shipped: they sit outside `public/`, so they never reach the exported site. The artwork is raster only. No editable vector master exists. TODO: request an SVG master from the owner.

Site-sized derivatives (2x of the displayed size) are generated from the masters and live in `public/brand/`: `logo-horizontal`, `logo-horizontal-dark`, `logo-icon` (WebP for the site, PNG alongside), and `logo-stacked.png`. The favicon and Apple icon are `app/icon.png` and `app/apple-icon.png`. The Open Graph image is `public/brand/og-home.png`. The masters carry a faint near-white haze where they should be transparent, so derivatives are cleaned before use on navy.

| Variant | Master file (in `assets/brand-masters/`) | Use |
|---|---|---|
| Horizontal | `agency-back-office-horizontal-transparent` | Header on light surfaces (64px tall desktop, 48px mobile) |
| Horizontal, dark | `agency-back-office-horizontal-white-mark` | Dark navy surfaces, such as the closing band (64px tall) |
| Stacked | `agency-back-office-stacked-transparent` | Compact or square placements |
| Icon | `agency-back-office-icon-transparent` | Footer (36px tall, empty alt text), favicon |

Rules:
- Use the files as supplied. Do not recolor, stretch, crop, or redraw them.
- Logo images carry the alt text "Agency Back Office - Practical Agency Training". The icon in the footer is decorative and uses an empty alt.
- The tagline "Practical Agency Training" is part of the logo artwork. Do not retype it as live text beside the logo.
- Always set explicit `width` and `height` to prevent layout shift (horizontal: 1370 x 510 source, shown at 172 x 64).
- TODO (owner to supply): clear-space rule and minimum sizes. No values are assumed here.

## Typography

Approved font pairing: **Manrope** (display and UI) and **Inter** (text), loaded once with `next/font` (see `nextjs-technical-architecture.md`, Fonts).

| Role | Font | Weight |
|---|---|---|
| Page titles and headings (H1-H6), logo wordmark, step numerals | Manrope | 600-800 |
| Eyebrows, table headers, group labels | Manrope | 600 |
| Buttons | Manrope | 700 |
| Body copy, navigation, forms, tables, course details | Inter | 400-600 |

Updated 2026-10-25 to match the approved home page design: buttons use Manrope 700 (previously Inter 600) and navigation uses Inter.

Sizing:
- Body: 1.0625rem (17px), line-height 1.65.
- Large headings: tighter line-height (1.1-1.3), still readable when wrapped on mobile.
- Fluid sizes use `clamp()` so headings scale down on small screens without shrinking body text below 16px.
- Prose measure: maximum 68ch. Definitions maximum 60ch.

Rules:
- Use only these two families. Do not add a third typeface.
- Use only the specified weights to limit font payload: Manrope 500-800, Inter 400-600.
- Do not rely on font weight alone to convey meaning.
- `display: swap` with a system-font fallback. No render-blocking external font CSS.

### Type Scale

Defined in `styles/globals.css`.

| Role | Size | Font and weight | Line-height |
|---|---|---|---|
| H1 | `clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)` | Manrope 700, tracking -0.02em | 1.1 |
| H2 | `clamp(1.75rem, 1.4rem + 1.4vw, 2.25rem)` | Manrope 700 | 1.2 |
| H3 | 1.25rem | Manrope 600 | 1.3 |
| Definition term | 1.5rem | Manrope 700 | 1.2 |
| Step numeral | 2.5rem | Manrope 800, tracking -0.02em | 1 |
| Body | 1.0625rem | Inter 400 | 1.65 |
| Lead paragraph | 1.25rem | Inter 400 | 1.55 |
| Small / meta | 0.875rem | Inter 400 | 1.5 |
| Eyebrow | 0.8125rem | Manrope 600, uppercase, tracking 0.08em | 1.4 |

## Color Tokens

Tokens are CSS variables defined in `styles/globals.css`. Do not hardcode hex values in components.

| Token | Value | Use | Contrast |
|---|---|---|---|
| `paper` | `#FFFFFF` | Page background | - |
| `tint` | `#EEF3FC` | Tinted band and row hover | - |
| `ink` | `#04153A` | Text, rules, dark surface | 17.9:1 on paper |
| `muted` | `#425068` | Secondary text | 8.1:1 on paper, 7.3:1 on tint |
| `accent` | `#0360FC` | Primary button fill, links, markers | 5.1:1 on paper, 4.6:1 on tint |
| `accent-hover` | `#024BC9` | Button hover | 7.4:1 with white text |
| `accent-on-dark` | `#7BA7FF` | Accent on navy | 7.5:1 on ink |
| `rule` | `#D2DAE8` | 1px hairline rules | decorative |
| `ink-raised` | `#0A2352` | Placeholder on navy | - |
| `on-dark-muted` | `#C9D4EA` | Secondary text on navy | 12.0:1 on ink |
| `placeholder` | `#E6EAF0` | Image placeholder fill | 6.7:1 with muted text |
| `placeholder-line` | `#8D99AB` | Image placeholder dashed outline | decorative |
| `error` | `#B3261E` | Error text, error rule, invalid border | about 6.5:1 on paper |
| `field-border` | `#6B7A94` | Field and pill borders | about 4.3:1 on paper (control border target 3:1) |
| `highlight` | `#D9E5FD` | Annotated example highlight | decorative; ink text on it stays above 4.5:1 |

Ratios are computed WCAG contrast ratios. Re-check before introducing a new text and background pair.

Layout:
- Container: maximum 1200px, 32px gutters (20px at 720px and below).
- Section padding: 96px desktop, 64px at 720px and below.
- Breakpoints: 980px and 720px.
- Borders: 1px rules, maximum radius 4px. Circular step markers are the only exception.

## Buttons

- **Primary:** solid `accent` with white text, `accent-hover` on hover, Manrope 700, 48px minimum height, 4px radius.
- **Header action:** 2px `accent` outline with accent text that fills with `accent` on hover.
- **On navy:** primary button with a 1px `accent-on-dark` border.
- **Secondary:** underlined text link, not a second button. One dominant CTA per view.
- **Focus:** 2px solid outline with 2px offset on every interactive element. White on navy. Never removed. Form controls, pills, and form buttons use a 3px `accent` outline with 2px offset.
- Arrows after link text are decorative (`aria-hidden`).

## Form Patterns

Used by conversion pages. All controls are native elements at least 48px tall with 16px text, 4px radius, and a 1px `field-border` border.

- **Label:** above the control, Inter 600 15px. Required fields say "(required)" and optional fields say "(optional)" in text.
- **Field:** text, tel, email, textarea. Border darkens to `ink` on hover. 3px accent focus ring.
- **Helper text:** 14px `muted` below the label or control, tied with `aria-describedby`.
- **Field error:** `error` colored text with an icon under the control, `error` border, `aria-invalid="true"`. Never color alone.
- **Error summary:** white panel with a 2px `error` top rule, an icon, a heading ("Fix N things ..."), and a list of links to each field. `role="alert"`, receives focus.
- **Form notice:** same panel treatment for form-level errors (verification, network, server). `role="alert"`.
- **Success panel:** 2px `ink` top rule, H2, one sentence, two links, a text button. `role="status"`, heading receives focus.
- **Pill (native radio):** radio input styled as a button. Default: 1px `field-border`, white. Hover: `ink` border, `tint` fill. Focus: 3px accent outline, 2px offset. Selected: `ink` fill, white text, check icon. Wraps with a 12px gap (10px on mobile).
- **Step indicator:** text "Step N of 3" plus three 4px segments (`rule`, `ink` when reached). Segments are `aria-hidden`.
- **Back:** underlined accent text button, 48px tall. Not a second primary button.
- **Annotated example:** `tint` panel with a 1px `rule` border, `highlight` spans with small numbered `ink` badges, and a numbered list of callouts below.

## Ruled-Line Motif

Structure comes from lines, not boxes. A 2px `ink` rule opens tables, lists, and FAQ columns. 1px `rule` hairlines separate rows. Group labels sit on a 2px rule. Use this motif for lists, tables, and row layouts before reaching for a card.

## Teaching Visuals

- **Annotated process diagram:** semantic HTML (`figure`, `figcaption`, ordered list), not an image. Numbered circular markers on a 2px vertical line. Callouts such as "Trigger", "Timing", and "Review" are part of the step text so they read in order. The caption states when an example is illustrative and not a client result.
- **Process table:** stage, what you do, what you leave with. On mobile each row restacks as labeled blocks using `data-label`. A loop bar below states that the last stage feeds the first.
- **Image placeholders:** a fixed aspect ratio, a visible "Image placeholder" label and intended-content note, a dark variant for navy sections, and a prop for swapping in a real image later. No stock photography. Placeholders carry `role="img"` and an `aria-label` that says they are placeholders.
- **Cards** are used only for topic cards and definition cards that carry an image slot (1px `rule` border, 4px radius, no shadow). Do not use repeated card grids elsewhere.

## Motion

Added 2026-10-25. This supersedes the earlier "no scroll-triggered animation" guidance. Motion is restrained, optional, and CSS only.

- Everything is visible by default. Motion is an enhancement.
- All motion sits inside `@media (prefers-reduced-motion: no-preference)`.
- Animate `transform` and `opacity` only. No layout-shifting animation.
- No JavaScript for motion.
- Hero load entrance: eyebrow, heading, lead, support text, and CTA row rise in with a stagger. Diagram steps follow. Plays once.
- Scroll reveals use `animation-timeline: view()` inside `@supports`, with `animation-fill-mode: backwards`. Browsers without support show content normally.
- Cards lift 4px on hover and `focus-within`. Link arrows nudge 4px. Audience statements shift 6px on row hover.
- FAQ open and close animate height using `interpolate-size: allow-keywords` inside `@supports`. Other browsers snap.
- Under `prefers-reduced-motion: reduce`, transitions and animations are disabled.

## Icons

Added 2026-10-25. Icons are functional only.

- Inline SVG on a 24px grid, 1.75px stroke, round caps and joins, `currentColor`, `aria-hidden` by default.
- Allowed uses: the resources table, training formats, the process loop bar, and menu, arrow, external-link, and download markers.
- Do not use icons as decoration or build an icon collection. Do not add an icon library.
- Set: live (broadcast), calendar, book (guides), checklist, template, glossary, help (FAQ), edit (blog), loop, menu, arrow, external, download. Live, calendar, book, checklist, template, glossary, help, edit, and loop come from the approved reference. Menu, arrow, external, and download are drawn in the same style.

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
- motion kept optional and restrained (see Motion)

## Responsive Design

Mobile should not be a compressed desktop layout.

Prioritize:
- readable line length
- thumb-friendly controls
- simple nav
- reduced decorative density
- stacked content with preserved hierarchy
