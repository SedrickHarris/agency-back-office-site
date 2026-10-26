# Decisions and Change Log

Use this file to record approved changes that affect architecture, routing, content systems, design, schema, or technical implementation.

## Format

### YYYY-MM-DD — Decision Name

**Area:** Architecture / SEO / Content / Design / Technical / Conversion

**Decision:**  
Describe the approved decision.

**Reason:**  
Explain why it was selected.

**Affected Files/Routes:**  
List documentation, routes, components, or content affected.

**Follow-Up:**  
List required implementation work.

---

## Initial Decisions

### 2026-08-23 — Core Technology Stack

**Area:** Technical

**Decision:**  
Use Claude Project for research/content, Claude Code + VS Code for implementation, GitHub for source control, Next.js App Router + TypeScript + Tailwind CSS for the site, and Cloudflare Pages for hosting.

### 2026-08-23 — Primary Content Architecture

**Area:** Architecture

**Decision:**  
Use service pages, audience pages, and audience + service pages, supported by training and resource hubs.

### 2026-08-23 — Audience + Service URL Pattern

**Area:** Architecture

**Decision:**  
Use `/audiences/{audience-slug}/{service-slug}/`.

### 2026-10-25 — Typography Font Pairing

**Area:** Design

**Decision:**  
Use Manrope for headings, page titles, and navigation, and Inter for body copy, forms, tables, course details, buttons, and labels. Load both through `next/font/google`.

**Reason:**  
Approved font pairing for editorial hierarchy with readable body text.

**Affected Files/Routes:**  
`docs/design-system.md`, `docs/nextjs-technical-architecture.md`, `app/layout.tsx`.

**Follow-Up:**  
Map `--font-manrope` / `--font-inter` to heading and body styles in global styles or Tailwind theme once the project is scaffolded.

---

### 2026-08-23 — Matrix Quality Rule

**Area:** Content

**Decision:**  
Do not automatically publish every theoretical audience × service combination. Each page must provide distinct value and intent.
