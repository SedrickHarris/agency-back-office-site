# Sessions page (/training/sessions/): spec and copy

Nov 24, 2026 - Proposed, not yet approved. Visual reference: `docs/design-reference/sessions-design-reference.html`.

The Sessions page is the library of video replays of past Agency Back Office sessions. It has one job: let a visitor watch a replay on the page, then move to live training, a topic page, or Get started. Twelve replays at launch.

## Decisions and constraints

| Topic | Decision |
| --- | --- |
| Route | `/training/sessions/`. Existing placeholder route, confirmed format. No routing-doc change. |
| Video host | YouTube. Facade embed: a poster image and play control first, the `youtube-nocookie.com` iframe loads only on click. |
| Access | Public and indexable. No sign-in. Not under `/members/`. |
| Individual replay pages | Not built at launch. Each replay has an anchor (`#{slug}`) for deep links. Reopen when transcripts or chapters exist, to avoid thin pages. |
| Assets | Titles, descriptions, dates, durations, topics and poster images do not exist yet and must be created. Nothing on this page is invented. Missing data renders a labeled placeholder, never fake copy. |
| Indexing | `noindex` while `NEXT_PUBLIC_SITE_URL` is unset. Indexable and in the sitemap after launch. |
| Writing | Hyphens, never em dashes. Acronyms defined on first use. |

## Purpose, audience and search intent

| Field | Value |
| --- | --- |
| Route and canonical | `/training/sessions/` (canonical from the site-URL helper; omitted while the URL is unset) |
| Page type and parent | Training delivery page; parent `/training/` |
| Audience | Agency owners, marketers, consultants, freelancers evaluating or continuing training |
| Search intent | Informational and navigational: "agency training session replays". Topic keywords stay on `/services/` pages. Each replay links to its topic page. |
| Primary CTA | Get started (closing band, one dominant button) |
| Secondary CTAs | Text links: Live training, topic page, contact page |
| Visual needs | One poster image per replay (16:9), created by the owner. Placeholders until supplied. |

## Layout and section patterns

Same ruled-line motif as Home and Contact: 2px navy rule opens each section, hairlines separate rows, radius 4px max, no shadows or gradients. No repeated card grid: the library is a ruled list.

| # | Section | Pattern | Mobile |
| --- | --- | --- | --- |
| 0 | Header and footer | Reused components. Training is the current nav item. | Existing menu |
| 1 | Breadcrumb | Home / Training / Sessions. Drives the visible BreadcrumbList. | Wraps |
| 2 | Intro and latest replay | Two columns (4/12 and 8/12). Left: label SESSIONS, H1, lead, support line, text link to live training. Right: 16:9 player (dark placeholder or poster), then "Latest replay" label, H2 title, meta row, description, topic link. | Single column: intro, then player |
| 3 | More replays | H2 plus count on a 2px rule. Ruled list of the other 11, newest first. Row: 16:9 thumbnail (320px; 240px at 980px), H3 title (no "Replay NN of N" numbering), meta row, description (60ch max), "Watch replay" text link. | Row stacks: thumbnail, text |
| 4 | Keep learning | Tint band. Ruled list of three rows: Live training, Browse training topics, Read the resources. | Stacks |
| 5 | Questions about replays | Native details/summary FAQ, three items, no FAQPage schema | Stacks |
| 6 | Closing band | Existing ClosingBand: H2, one sentence, Get started button | Stacks |

Playing a replay: the facade is a real link to the YouTube watch URL. A small client component upgrades it to a button that swaps in the iframe in place and moves focus to the player. With JavaScript off, the link opens YouTube. Everything else on the page is a server component.

## Data model

One typed file, `data/replays.ts`, newest first. The page, schema and sitemap read only from it.

| Field | Type | Notes |
| --- | --- | --- |
| `slug` | string | Anchor id and analytics key. Unique. |
| `title` | string | Required |
| `description` | string | 1 to 3 sentences, required |
| `youtubeId` | string | Required |
| `recordedOn` | ISO date | Required; used as `uploadDate` |
| `duration` | ISO 8601 duration | Required; shown as mm:ss |
| `topicSlug` | string | Must match a `/services/` slug; drives the topic link |
| `format` | `"live" \| "session"` | Optional |
| `poster` | `{ src, alt, width, height }` | Self-hosted in `public/`, optional until created |
| `transcriptUrl`, `chapters` | optional | Phase 2 |

Build check: fail the build if a replay lacks a required field or `topicSlug` has no matching page. Entries with no `poster` show the ImagePlaceholder.

## Typography and tokens

Follows `design-system.md` unchanged: Manrope for H1-H3, eyebrows and buttons; Inter for body, meta and FAQ answers. H1 uses the existing H1 scale; replay titles use H3 at 1.375rem (new size, add to the type scale if approved). Body 17px, line-height 1.65. Only existing color tokens. Placeholders use `placeholder`, `placeholder-line` and the dark variant.

## Accessibility and mobile behavior

- One H1 ("Session replays"). H2s for the latest replay, More replays, Keep learning, Questions, closing band. Replay titles in the list are H3.
- Play control is a 48px minimum target with a visible name: "Play replay: {title}". Duration is in the accessible name.
- The iframe has a `title` equal to the replay title. Focus moves into the player after activation.
- Focus ring: 3px accent, 2px offset (accent-on-dark on navy).
- Poster images carry alt text describing the image; placeholders use `role="img"` and say they are placeholders.
- No autoplay on load. Autoplay only after the visitor's click.
- Captions: confirm YouTube captions are enabled on all 12 videos before launch.
- Mobile: single column, 48px targets, no horizontal scroll at 320px, rows keep hierarchy.
- Motion: no new motion. The existing scroll reveals may apply to rows.

## Performance and privacy

- No YouTube request until click: self-hosted posters, no thumbnail from `i.ytimg.com`.
- Iframe `loading="lazy"` is not needed because it is created on click.
- No new dependency or font method.
- `public/_headers` needs no change today. If a Content-Security-Policy is added later: `frame-src https://www.youtube-nocookie.com`, and `img-src https://i.ytimg.com` only if YouTube thumbnails are ever used.

## Metadata, schema, internal links and CTA

| Item | Value |
| --- | --- |
| Title tag | Session Replays \| Agency Back Office Training (drop the brand if the template appends it) |
| Meta description | Watch recordings of past Agency Back Office training sessions on SEO, AEO, Google Business Profile, automation, and agency operations. Adjust to the real topics once the 12 are known. |
| H1 | Session replays |
| Canonical | `/training/sessions/` through the site-URL helper |
| Robots | `noindex` while site URL unset. After launch `index, follow`, in `sitemap.ts`. |
| Open Graph | Title, description, URL, type website. No image until a real one exists. |
| Schema | `CollectionPage` with `isPartOf` the WebSite, `BreadcrumbList` matching the visible breadcrumb, and one `VideoObject` per replay with name, description, `thumbnailUrl`, `uploadDate`, `duration`, `embedUrl`. Rendered only when the site URL is set, and only for replays with complete data. |
| Schema not used | No `FAQPage`, `Course`, `Review`, ratings, `sameAs`, or view counts |

**Internal links**

| Direction | Link | Anchor text |
| --- | --- | --- |
| Out | `/training/` | Breadcrumb "Training" |
| Out | `/training/live/` | See live training |
| Out | `/services/{topicSlug}/` | One per replay, topic name |
| Out | `/services/` | Browse training topics |
| Out | `/resources/` | Read the resources |
| Out | `/contact/` | contact page (FAQ) |
| Out | `/get-started/` | Get started |
| In | `/training/` hub, footer, matching service pages | Session replays |

Build rule: link only to routes that exist when the page ships; list the rest in the final report.

## Analytics events

Through `trackEvent` in `lib/analytics.ts`. No personal data.

| Event | Fires when | Parameters |
| --- | --- | --- |
| `replay_play` | A visitor activates a play control | `page_path`, `replay_slug`, `placement` (latest, library) |
| `replay_topic_click` | Topic link clicked | `page_path`, `replay_slug`, `topic` |
| `sessions_cta_click` | Get started or Live training clicked | `page_path`, `target` |

Completion tracking needs the YouTube IFrame API script. Not included: it adds a second third-party script. Decide separately.

## Final page copy

Hyphens only. Items in curly braces come from `data/replays.ts`.

- Label: SESSIONS
- H1: Session replays
- Lead: Watch recordings of past Agency Back Office sessions on your own schedule.
- Support: Newest first. Each one plays on this page, with no sign-in.
- Link: Prefer to learn live? See live training
- Latest replay: label "Latest replay", then {title}, {recordedOn} - {duration} - {topic}, {description}, link "Open the {topic} page"
- H2: More replays. Count line: {count - 1} more, newest first
- Row: {title}, meta, {description}, link "Watch replay" (no replay numbering)
- H2: Keep learning. Rows: Live training - Learn with an instructor in a live format. / Browse training topics - Find the topic a replay belongs to and what else we teach on it. / Read the resources - Guides, checklists, and templates that go with the training.
- H2: Questions about replays. What is a session replay? A recording of a past Agency Back Office session, published here so you can watch it later. / Do I need an account to watch? No. Replays on this page play without signing in. / Can I ask a question about a replay? Yes. Use the contact page and name the replay you watched.
- Closing band: H2 "Ready to go beyond the replays?" Support: See how to get started with Agency Back Office training. Button: Get started

## Open items

1. Create the 12 assets: title, description, recording date, duration, topic and a 16:9 poster each.
2. Owner to confirm the one-sentence definition of the Sessions format, and whether "Learn with an instructor" is accurate for live training.
3. Confirm "no sign-in" holds for every video (YouTube visibility set to Public or Unlisted with embedding allowed).
4. Add a play icon to the icon set in `design-system.md` (functional use only, same 24px style).
5. Log this page in `master-page-build-list.md` Phase 7 and `decisions-change-log.md` once approved.
