# Contact page (/contact/): spec and copy

Oct 25, 2026 - Sedrick Harris

Contact is a high-intent Conversion page with one job: take a question or inquiry about training through a spam-protected form handled by a Cloudflare Pages Function, with no invented contact details or response promises.

## Decisions and constraints

| Topic | Decision |
| --- | --- |
| Form handling | Cloudflare Pages Function at `/api/contact`, Cloudflare Turnstile (free plan) plus a hidden honeypot field, then forward to an email provider through secrets. Provider is chosen at deployment. |
| Privacy page | `/privacy/`. Docs change from `/privacy-policy/`, logged before the build. |
| Contact vs. Get started | Distinct jobs. Contact answers questions and inquiries. Get started is the enroll or membership path once terms are confirmed. Contact links to it as a secondary text link. |
| Page registry | `master-page-build-list.md` is canonical. The xlsx is a tracker and gets corrected to match. |
| No invented details | No email address, phone, hours, address or response-time statement on the page. The form is the only channel. |
| Formats named in the form | Live training and Sessions only. Courses, workshops and membership are unconfirmed, so they do not appear. |
| Indexing | `noindex` while `NEXT_PUBLIC_SITE_URL` is unset. Indexable and in the sitemap after launch. |
| Writing | Hyphens, never em dashes. Acronyms defined on first use. |

The email address that receives submissions is not published anywhere. It is a deployment secret (`CONTACT_TO_EMAIL`).

**Survey change.** The form is a three-step survey: step 1 role pills (optional), step 2 topic pills plus the message, step 3 full name, phone number and email (all required). Phone number is a newly collected field. A Reviews link was also added to the footer. Both need change-log entries.

## Purpose, audience and search intent

| Field | Value |
| --- | --- |
| Route and canonical | `/contact/` (canonical from the site-URL helper; omitted while the URL is unset) |
| Page type and parent | Conversion; parent Home |
| Purpose | Let a visitor ask a question or make an inquiry about Agency Back Office training |
| Audience | Everyone on the audience registry. The form asks one optional question about role. |
| Search intent | Navigational and transactional-light. Not built to rank for topic keywords, which avoids cannibalization with service pages and Get started. |
| Primary CTA | Send message (the form submit button) |
| Secondary CTA | Text link to Get started |
| Visual needs | One annotated example message (built, not an image). No stock photos, no image placeholders. |

## Layout and section patterns

The 2px navy rule opens each section, hairlines separate rows, radius is 4px at most, no shadows or gradients.

| # | Section | Pattern | Mobile |
| --- | --- | --- | --- |
| 0 | Header and footer | Reused components. Footer Company group reads About, Reviews, Contact, Get Started. Contact is a footer link, not a primary nav item. | Existing mobile menu |
| 1 | Breadcrumb | One quiet text row: Home / Contact. Drives the visible BreadcrumbList. | One line |
| 2 | Intro and survey | Two columns on desktop. Left (about 5/12): small-caps label, H1, lead, ruled list of three things to write about. Right (about 7/12): survey panel with 2px navy top rule and 1px side and bottom rules. Inside: H2 "Send a message", step indicator ("Step N of 3" plus three 4px segments), one fieldset per step. The left column is not sticky: the DOM order is intro, survey, list so reading order and tab order match the mobile order. | Single column: H1, lead, survey, then the ruled list. |
| 3 | Useful message | Annotated example built from text, with three numbered callouts | Callouts stack |
| 4 | Not ready to write | Ruled list of three rows, each with icon and descriptive link | Rows stack |
| 5 | Ready to start instead | Tint band (#EEF3FC): text left, one text link to Get started right. Not a button. | Stacks |

No FAQ, no proof section, no image placeholders.

## Form fields and validation

Three-step survey, the page's only client component. Native elements, `noValidate`, same rules on client and in the Function. The Function is the authority.

| Step | Field (name) | Control | Required | Rules | Error text | Autocomplete |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Which describes you best? (`role`) | Pills (radio group) plus a "Clear answer" text button | No | One of: agency-owner, new-agency-owner, consultant, freelancer, other. May stay empty. | None. A value outside the list is rejected by the Function. | none |
| 2 | What is your message about? (`topic`) | Pills (radio group), nothing preselected | Yes | One of: training-topics, live-training, sessions, other | Choose what your message is about. | none |
| 2 | Your message (`message`) | Textarea, 6 rows | Yes | Trimmed, 10 to 2,000 characters | Empty: Enter your message. Short: Write at least 10 characters. Long: Keep your message under 2,000 characters. | none |
| 3 | Full name (`name`) | Text | Yes | Trimmed, 1 to 100 characters | Enter your full name. | `name` |
| 3 | Phone number (`phone`) | Tel, `inputmode=tel` | Yes | Digits, spaces, dashes, dots, parentheses and one leading plus allowed. 10 to 15 digits once stripped. 30 characters max. | Empty: Enter your phone number. Invalid: Enter a phone number with 10 to 15 digits. | `tel` |
| 3 | Email address (`email`) | Email | Yes | Trimmed, 254 characters max, one `@` with text on both sides and a dot in the domain | Empty: Enter your email address. Invalid: Enter an email address like name@example.com. | `email` |
| 3 | Honeypot (`website`) | Text, visually hidden, `aria-hidden`, `tabindex=-1`, `autocomplete=off` | No | Must be empty. If filled, the Function returns a normal success response and sends nothing. | None shown | none |
| 3 | Security check | Turnstile widget (managed mode) | Yes | Token must verify server side with the secret key | The security check did not finish. Wait for it to complete, then send again. | n/a |

**Validation behavior**

1. Next validates only the current step. If an answer is missing or invalid, stay on the step, show the error summary above the question, move focus to its heading, and mark each problem with `aria-invalid` and `aria-describedby`. The pill group's error attaches to its fieldset.
2. Step 1 has no required answer, so Next is always available there. Steps 2 and 3 do not move forward until valid.
3. Back never validates and never clears an answer. Nothing advances automatically when a pill is chosen.
3a. Step 1 shows a "Clear answer" text button under the pills, only after a role is selected. It clears the selection, returns focus to the first pill, and fires no analytics event. It uses the Back button styling and a 48px target.
4. After a failed attempt, re-validate a field on blur and clear its error as soon as it is valid. Never validate on focus or on each keystroke. Do not block pasting.
5. Load the Turnstile script on the first pill or field interaction, so the check is ready by step 3.
6. The Function re-validates every field. If it rejects something from an earlier step, return the visitor to that step with its summary.

**Server side (`functions/api/contact.ts`)**

- POST only, JSON body, 8 KB max. Otherwise 405 or 413.
- Checks the honeypot, validates every field, verifies the Turnstile token with Cloudflare, then sends one email through a single `sendEmail` helper so the provider can be swapped.
- Secrets from the Pages environment: `TURNSTILE_SECRET_KEY`, `EMAIL_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Public site key: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- When the site URL is set, accepts only requests whose Origin matches it.
- Returns `{ok:true}` or `{ok:false, code}` with code `validation`, `verification` or `server`. Never a stack trace or provider message.
- Logs no message text, phone number or email address. Shared helpers go in `functions/_lib/`.

## Success and error states

Errors never rely on color alone: each has an icon, a text message and a 2px top rule in the error color, on a white background.

| State | Trigger | What the visitor sees | Focus and announcement |
| --- | --- | --- | --- |
| Idle, step 1 | Page load | Step 1 question with five unselected pills and Next. Security check not loaded yet. | None |
| Clear answer | Activate "Clear answer" on step 1 | The selection is cleared and the button disappears. No analytics event. | Focus moves to the first pill |
| Pill focus and selection | Keyboard or pointer | Focused pill gets the 3px ring. Selected pill fills navy with white text and a check icon. Arrow keys move inside the group. | Native radio announcements |
| Step change | Next passes validation, or Back | The next or previous step replaces the current one. Indicator updates. Earlier answers kept. | Focus moves to the new step's question. Hidden status line says "Step N of 3". |
| Step error | Next with a missing or invalid answer | Summary above the question ("Fix N things to continue") with a link to each problem, plus a message under each field or pill group | Focus moves to the summary heading; summary has `role=alert` |
| Field error | Blur after a failed attempt | Message under the field, field border and label marked | Announced through `aria-describedby` |
| Send errors | Send message with invalid step 3 fields | Summary above the fields ("Fix N things to send your message") and a message under each field | Focus moves to the summary heading |
| Sending | Valid submit | Button becomes "Sending...", `aria-disabled`, Back hidden, fields locked | Focus stays on the button; hidden `role=status` line says "Sending your message" |
| Verification error | Turnstile missing, expired or rejected | Form-level notice above the buttons; security check reset | Focus moves to the notice (`role=alert`) |
| Network error | Request fails or times out (15 seconds) | Form-level notice; every answer kept | Focus moves to the notice |
| Server error | Function returns `server` | Form-level notice; every answer kept | Focus moves to the notice |
| Success | `{ok:true}` | Survey replaced by a confirmation panel with a heading, one sentence and two links. "Send another message" restores step 1 with all answers cleared. | Focus moves to the confirmation heading (`tabindex=-1`); panel has `role=status` |
| JavaScript off | No scripts | A plain notice that the form needs JavaScript. No mailto fallback. | Static text |

No state mentions how fast a reply will come. A honeypot hit shows the normal success panel.

## Accessibility and mobile behavior

- One H1 ("Contact Agency Back Office"), H2s for the form, the example, the options and the Get started band. No skipped levels.
- Every control has a visible label above it. Required fields say "(required)" in text. Optional fields say "(optional)".
- Helper and error text tied to the control with `aria-describedby`. Invalid fields get `aria-invalid=true`.
- Error summary links move focus to the field. Summary and form-level errors use `role=alert`; success uses `role=status`.
- Focus ring: 3px accent outline, 2px offset (accent-on-dark on dark bands).
- Contrast on white: ink #04153A and muted #425068 pass easily; accent #0360FC about 5.2:1; error #B3261E about 6.5:1 (new token).
- Honeypot hidden from assistive technology and the tab order.
- Turnstile managed mode; the widget sits after the message field and before the submit button in reading order.
- Respect `prefers-reduced-motion`: no animation on panel swaps.
- Annotated example has real text and a text alternative for its callouts.
- Each step is a `fieldset` with its question as the legend. Pills are native radio inputs styled as buttons.
- The segment bar is decorative and `aria-hidden`.
- Unselected pills keep a 1px border of at least 3:1 against white (#6B7A94 is about 4.3:1).
- Mobile: single column. Order: breadcrumb, H1, lead, form, "What you can write about", example, options, Get started band. Controls at least 48px tall with 16px text. 16px gap between fields. Submit full width. Email field uses `type=email`, `inputmode=email`. Error summary scrolls into view. Turnstile fits 320px.
- Pills wrap; every row keeps a 48px tap target and a 10px gap. Primary button full width with Back as a text link beneath it.

## Metadata, schema, internal links and CTA

| Item | Value |
| --- | --- |
| Title tag | Contact Agency Back Office \| Training Questions. If the site's title template already appends the brand, use "Contact - Training Questions". |
| Meta description | Ask a question about Agency Back Office training for agency owners, marketers, consultants and freelancers, or tell us what you are trying to learn. |
| H1 | Contact Agency Back Office |
| Canonical | `/contact/` through the site-URL helper; omitted while `NEXT_PUBLIC_SITE_URL` is unset |
| Robots | `noindex` while the site URL is unset. After launch: `index, follow`, listed in `sitemap.ts`. Excluded from the sitemap while noindex. |
| Open Graph | Title, description, URL, type website. No image. |
| Schema | `ContactPage` with name, URL, description and `isPartOf` the WebSite, plus `BreadcrumbList`. Rendered only when the site URL is set. |
| Schema not used | No `contactPoint`, no `LocalBusiness`, no `FAQPage`, no `sameAs`, no ratings, no Review. |

**Internal links**

| Direction | Link | Anchor text |
| --- | --- | --- |
| Out | Home `/` | Breadcrumb "Home" and the logo |
| Out | Get started `/get-started/` | See how to get started |
| Out | Services `/services/` | Browse training topics |
| Out | Training `/training/` | Explore training formats |
| Out | Resources `/resources/` | Read the resources |
| Out | Privacy `/privacy/` | privacy page |
| In | Footer on every page | Contact |
| In | Get started (when built) | Have a question first? Contact us |
| In | Privacy and Terms (when built) | Contact |

Build rule: link only to routes that exist when the page ships. For routes not yet built, use the home build convention and list each in the final report.

**CTA.** One dominant CTA: the solid blue "Send message" button, 48px minimum height. The Get started link is a secondary text link, never a button.

## Analytics events

Events go through one `trackEvent(name, params)` helper in `lib/analytics.ts` that does nothing until a tool is chosen. No event carries a name, phone number, email address, message text or any other typed value.

| Event | Fires when | Parameters |
| --- | --- | --- |
| `contact_form_view` | The survey first enters the viewport, once per page load | `page_path` |
| `contact_step_view` | A step is shown, including step 1 on load | `page_path`, `step` (1, 2, 3) |
| `contact_field_focus` | A text field is focused, or a pill group is first used, once per field per page load | `page_path`, `field` (role, topic, message, name, phone, email) |
| `contact_step_complete` | Next passes validation | `page_path`, `step`, plus `role` on step 1 and `topic` on step 2 (selected option values only) |
| `contact_submit` | Send message passes client validation and the request starts | `page_path`, `topic`, `role` (empty if skipped) |
| `contact_success` | The Function returns ok | `page_path`, `topic`, `role` |
| `contact_error` | Validation fails on any step, or the request fails | `page_path`, `step`, `error_type` (validation, verification, network, server), `field_count` (validation only) |

Funnel: `contact_form_view`, then `contact_step_complete` for steps 1, 2 and 3, then `contact_success`. Page conversion rate is `contact_success` divided by `contact_form_view`.

## Final page copy

Hyphens only. Items in curly braces are filled by code.

### Breadcrumb

Home / Contact

### Intro (left column)

- Label: CONTACT
- H1: Contact Agency Back Office
- Lead: Ask a question about Agency Back Office training, or tell us what you are trying to learn. The more you say about your work, the more useful the reply can be.

**H2: What you can write about**

1. **Training topics.** Search engine optimization (SEO), answer engine optimization (AEO), Google Business Profile (GBP), local SEO, reputation management, AI marketing, marketing automation, lead generation, agency operations, and the other topics we teach.
2. **Live training and sessions.** Questions about the live training and sessions formats.
3. **Something else.** A question that fits neither of the above, or a note about this site.

### Form

**H2: Send a message**

- Progress label: Step {n} of 3
- **Step 1.** Question: Which describes you best? (optional). Helper: Choose one, or skip this question. Pills: Agency owner or leader, New agency owner, Consultant, Freelancer, Other. Text button under the pills, shown only after a selection: Clear answer. Button: Next
- **Step 2.** Question: What is your message about? (required). Pills: Training topics, Live training, Sessions, Something else. Then the field Your message (required). Helper: Say what you are working on and what you want to know. Buttons: Back, Next
- **Step 3.** Heading: Your contact details. Fields: Full name (required); Phone number (required); Email address (required), helper: Use the address where you want your reply. Label above the Turnstile widget: Security check
- Privacy line (step 3): We use the details you send to reply to your message. See the privacy page for more. ("privacy page" links to /privacy/)
- Buttons on step 3: Back, Send message. While sending: Sending...
- No-JavaScript notice: This form needs JavaScript to send your message. Turn JavaScript on, or try a different browser.

**Errors**

- Summary heading on step 2: Fix {N} things to continue (singular: Fix 1 thing to continue)
- Summary heading on step 3: Fix {N} things to send your message (singular: Fix 1 thing to send your message)
- Field messages are listed in the validation table above.
- Security check: The security check did not finish. Wait for it to complete, then send again.
- Network: Your message did not send. Check your connection and try again. What you wrote is still here.
- Server: Something went wrong and your message did not send. Try again in a few minutes. What you wrote is still here.

**Success**

- H2: Message sent
- Text: Thanks, {first name}. Your message has been sent. (If no first name: Thanks. Your message has been sent.)
- Text: In the meantime, you can browse training topics or see how to get started. (two links)
- Text button: Send another message

### Useful message (annotated example)

- H2: What makes a useful message
- Intro: You do not need to write much. Three details help most.
- Panel label: Example message (illustrative, not from a real person)
- Example: I run a small web design agency and want to add Google Business Profile work for my existing clients. Which topics should I start with, and in what order?
- Callout 1, on "I run a small web design agency": Who you are. Your role helps point you to the right training.
- Callout 2, on "want to add Google Business Profile work for my existing clients": What you are working on. Your situation shapes the answer.
- Callout 3, on "Which topics should I start with, and in what order?": What you want to know. A specific question can get a specific reply.

### Not ready to write

- H2: Not ready to write?
- Intro: These pages may answer your question first.
- Row 1 (link to /services/): Browse training topics. See what Agency Back Office teaches, from SEO to agency operations.
- Row 2 (link to /training/): Explore training formats. See how training is delivered, including live training and sessions.
- Row 3 (link to /resources/): Read the resources. Guides, checklists, templates, and answers to common questions.

### Get started band

- H2: Ready to take the next step?
- Text: If you already know you want training, the Get started page is the faster route.
- Link: See how to get started (to /get-started/)

### Items the owner should confirm

1. The privacy line says submitted details are used to reply. The /privacy/ page must say the same once written.
2. The Resources row says guides, checklists, templates and answers exist. Keep only what exists at launch.
3. Role and topic option labels match what you are willing to answer.
4. Phone number is required. If you plan to call or text, check what consent wording applies where you operate, and have the privacy page cover it. The privacy line does not promise a call or text.
5. The footer Reviews link needs a page that shows only real, verified reviews. No review or rating schema until real reviews are on the page.
