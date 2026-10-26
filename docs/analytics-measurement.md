# Analytics and Measurement

## Objective

Measure acquisition, engagement, learning behavior, and conversion.

## Recommended Platforms

- Google Analytics 4
- Google Search Console
- Bing Webmaster Tools
- Cloudflare analytics as supplemental infrastructure data

Additional tools may be added only when they provide clear value.

## Hostname Handling

The Cloudflare Pages default hostname and any `*.pages.dev` preview hostnames must not be indexed and must not be counted as production traffic in GA4. Use a GA4 hostname filter or environment-gated tracking so that only the final production domain is measured.

## Core Events

Track:

- primary CTA click
- secondary CTA click
- contact form start
- contact form submit
- get-started action
- training enrollment/registration click
- resource download
- outbound platform click
- video start/completion where relevant
- scroll milestones only if useful

## SEO Measurement

Monitor:

- indexed pages
- impressions
- clicks
- CTR
- average position
- queries by service
- queries by audience
- non-brand vs brand traffic
- landing-page growth
- rich result performance where available

## Apple Search Checks

- Verify Applebot crawl access in server logs or Cloudflare logs.
- Confirm Open Graph and canonical metadata render in the static HTML (view source or fetch without JavaScript).

## Crawler Activity Check

Monthly: review server or Cloudflare logs for crawler activity from the allowed search bots and the AI training bots. Once a premium area exists, confirm that blocked paths receive no crawler access.

## AI Referral Tracking

- Identify referral traffic from `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, and similar sources.
- Group these sources as a separate channel in Google Analytics 4 (GA4) so they can be reviewed apart from organic search and general referral traffic.
- Review monthly and update the source list as new referrers appear.

## Question-Query Monitoring

In Google Search Console and Bing Webmaster Tools, review queries by question pattern (for example queries starting with what, how, why, which, can, or should) to find:

- featured snippet and People Also Ask (PAA) style opportunities
- question queries with impressions but low CTR
- pages that need a clearer direct answer block

## Local Reporting Scope

Local pack, Maps, and Google Business Profile (GBP) Insights reporting do not apply. Agency Back Office is online-only and has no GBP listing (see `seo-strategy.md`).

In Google Search Console and Bing Webmaster Tools, create a query-intent grouping for **practitioner local-SEO queries**: agency-focused local SEO and GBP training terms (for example "local SEO training for agencies"). Track this group separately from branded queries.

## Content Measurement

For resources:
- organic entrances
- engagement
- downstream CTA clicks
- assisted conversions
- internal-link navigation

## Conversion Measurement

Track conversion by:
- landing page
- page type
- service topic
- audience
- traffic source
- device

## Contact Events

Events go through one `trackEvent(name, params)` helper in `lib/analytics.ts`. It does nothing until an analytics tool is chosen. Never send a name, phone number, email address, message text, or any other typed value.

| Event | Fires when | Parameters |
|---|---|---|
| `contact_form_view` | Survey first enters the viewport, once per page load | `page_path` |
| `contact_step_view` | A step is shown, including step 1 on load | `page_path`, `step` |
| `contact_field_focus` | A text field is focused or a pill group is first used, once per field | `page_path`, `field` |
| `contact_step_complete` | Next passes validation | `page_path`, `step`, `role` (step 1), `topic` (step 2) |
| `contact_submit` | Send message passes client validation | `page_path`, `topic`, `role` |
| `contact_success` | The Function returns ok | `page_path`, `topic`, `role` |
| `contact_error` | Validation fails or the request fails | `page_path`, `step`, `error_type`, `field_count` |

Funnel: `contact_form_view`, `contact_step_complete` for steps 1 to 3, `contact_success`. Conversion rate is `contact_success` divided by `contact_form_view`. `role` and `topic` are the selected option values only.

## Naming

Use consistent event naming, for example:

- `cta_primary_click`
- `cta_secondary_click`
- `contact_submit`
- `resource_download`
- `training_click`

Document event changes before implementation.
