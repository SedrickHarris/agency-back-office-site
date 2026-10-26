# Repository Structure

## Recommended Top-Level Structure

```text
agency-back-office-site/
├── app/
├── components/
├── content/
├── data/
├── docs/
├── lib/
├── public/
├── styles/
├── CLAUDE.md
├── README.md
├── next.config.*
├── package.json
└── tsconfig.json
```

## Recommended Responsibilities

### `app/`

Routes, layouts, metadata, route-level components.

### `components/`

Reusable UI:
- header
- footer
- breadcrumbs
- CTA blocks
- FAQ
- cards
- tables
- resource lists
- related-content modules

### `content/`

Approved page copy or structured content if content is stored separately from route files.

### `data/`

Registries and structured data:
- services
- audiences
- route maps
- navigation
- related links

### `docs/`

Project strategy and governance.

### `lib/`

Utilities:
- metadata helpers
- schema builders
- route helpers
- content parsers
- analytics helpers

### `public/`

Static assets.

## Rule

Do not allow the repository to become a collection of page-specific one-off components when a reusable pattern is appropriate.
