# Website QA Checklist

## Content

- [ ] Page purpose is clear.
- [ ] Copy is approved.
- [ ] No placeholder text remains.
- [ ] No invented claims are present.
- [ ] Acronyms are defined on first use.
- [ ] Headings follow a logical hierarchy.
- [ ] CTA matches visitor intent.

## SEO

- [ ] Unique title tag.
- [ ] Unique meta description.
- [ ] Correct canonical.
- [ ] One clear H1.
- [ ] Internal links are present.
- [ ] No obvious cannibalization.
- [ ] Index/noindex setting is intentional.
- [ ] Sitemap inclusion is correct.

## AEO / AI Search

- [ ] Important questions receive direct answers.
- [ ] Entities are clearly named.
- [ ] Definitions are precise.
- [ ] Processes use logical steps.
- [ ] Tables/checklists are used where they improve clarity.
- [ ] Content is understandable without hidden context.

## Technical

- [ ] No TypeScript/build errors.
- [ ] No broken imports.
- [ ] No broken internal links.
- [ ] No redirect chains.
- [ ] Images load correctly.
- [ ] Image alt text is appropriate.
- [ ] Mobile layout works.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Forms have accessible labels.

## Schema

- [ ] Schema matches visible content.
- [ ] Breadcrumb schema is valid where used.
- [ ] No fabricated ratings/reviews/pricing.
- [ ] URLs inside schema are canonical.

## Performance

- [ ] Avoid unnecessary client components.
- [ ] Avoid oversized scripts.
- [ ] Images are appropriately sized.
- [ ] Layout shift is minimized.
- [ ] Fonts are loaded efficiently.

## Motion

- [ ] Reduced motion on: the page is fully visible and usable.
- [ ] In a browser without scroll-driven animation support, all content is visible.
- [ ] Only `transform` and `opacity` are animated. No layout shift from animation.
- [ ] No JavaScript is used for motion.
- [ ] Hover and `focus-within` effects have a keyboard focus equivalent.
- [ ] FAQ open and close works with a keyboard and without animation support.

## Conversion

- [ ] Primary CTA is visible.
- [ ] CTA wording is specific.
- [ ] High-intent pages include necessary objection handling.
- [ ] Analytics event exists for key conversion actions.

## Forms

- [ ] Every control has a visible label. Each step is a fieldset with a legend.
- [ ] Errors are tied to inputs with `aria-invalid` and `aria-describedby`. The error summary has `role="alert"` and its links jump to fields.
- [ ] Errors never rely on color alone.
- [ ] The honeypot is hidden from assistive technology and the tab order.
- [ ] Turnstile sits in reading order before the submit button and fits 320px.
- [ ] Pills work by keyboard (arrow keys, Space) and show a visible focus ring.
- [ ] Focus moves to the new step's question on step change. A hidden live line announces "Step N of 3".
- [ ] Back keeps every answer. Nothing advances automatically.
- [ ] "Clear answer" appears only after a role is selected, clears it, returns focus to the first pill, fires no analytics event, and is at least 48px tall.
- [ ] DOM order matches the mobile order: breadcrumb, H1, lead, survey, "What you can write about", example, options, Get started band.
- [ ] Phone validation: 9 digits fails, 10 to 15 passes, 16 fails.
- [ ] Success and error states (validation, verification, network, server) all show and keep answers.
- [ ] No typed values (name, phone, email, message) are sent to analytics.
- [ ] No email address, phone number, hours, or response-time statement appears on the page.
- [ ] The page is `noindex` while `NEXT_PUBLIC_SITE_URL` is unset, with no canonical or JSON-LD.
- [ ] `/api/contact` is not in the sitemap.
