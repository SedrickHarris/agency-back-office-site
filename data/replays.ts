// Session replay library. Source: docs/sessions-page-spec.md (Data model).
// The Sessions page and its schema read only from this file.
//
// To add a replay, add an object to `entries` below. Order does not matter:
// the list is sorted newest first. The build fails if a required field is
// missing or malformed. Use only real video details. Never add sample entries.
//
// Posters are self-hosted: put the 16:9 file in public/ and set `src` to its
// path from the site root, for example "/images/sessions/{slug}.webp".

// A relative path with its extension, so node --test can load this file.
import { services } from "./services.ts";

export type ReplayPoster = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ReplayChapter = { title: string; startSeconds: number };

export type Replay = {
  // Anchor id on the page and analytics key. Unique, lowercase with hyphens.
  slug: string;
  title: string;
  // One to three sentences.
  description: string;
  youtubeId: string;
  // ISO date (YYYY-MM-DD). Also the schema uploadDate.
  recordedOn: string;
  // ISO 8601 duration, for example PT1H2M3S.
  duration: string;
  // Must match a slug in data/services.ts.
  topicSlug: string;
  format?: "live" | "session";
  poster?: ReplayPoster;
  chapters?: ReplayChapter[];
};

const DURATION = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const REQUIRED = [
  "slug",
  "title",
  "description",
  "youtubeId",
  "recordedOn",
  "duration",
  "topicSlug",
] as const;

// Total seconds, or null when the value is not a positive PT#H#M#S duration.
export function durationSeconds(iso: string): number | null {
  const match = DURATION.exec(iso);
  if (!match) return null;
  const [, hours = "0", minutes = "0", seconds = "0"] = match;
  const total =
    Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
  return total > 0 ? total : null;
}

// Seconds as m:ss, or h:mm:ss from one hour up.
export function formatSeconds(total: number): string {
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = String(total % 60).padStart(2, "0");
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${seconds}`
    : `${minutes}:${seconds}`;
}

export function formatDuration(iso: string): string {
  const total = durationSeconds(iso);
  if (total === null) throw new Error(`Malformed duration: ${iso}`);
  return formatSeconds(total);
}

const isText = (value: unknown): boolean =>
  typeof value === "string" && value.trim() !== "";

// Rejects impossible dates such as 2026-02-30, which Date would roll over.
function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value)
  );
}

// A path on this site, never a remote or protocol-relative URL.
function isPoster(poster: ReplayPoster): boolean {
  return (
    isText(poster.src) &&
    /^\/(?!\/)/.test(poster.src) &&
    isText(poster.alt) &&
    [poster.width, poster.height].every(
      (size) => Number.isInteger(size) && size > 0,
    )
  );
}

// Whole seconds, in ascending order, inside the recording.
function areChapters(chapters: ReplayChapter[], length: number): boolean {
  return chapters.every(
    (chapter, index) =>
      isText(chapter.title) &&
      Number.isInteger(chapter.startSeconds) &&
      chapter.startSeconds >= 0 &&
      chapter.startSeconds < length &&
      (index === 0 || chapter.startSeconds > chapters[index - 1].startSeconds),
  );
}

// Throws on the first problem, so a bad entry fails the build.
export function validateReplays(list: readonly Replay[]): void {
  const slugs = new Set<string>();
  const topics = new Set(services.map((service) => service.slug));

  list.forEach((replay, index) => {
    const fail = (problem: string): never => {
      throw new Error(
        `Replay ${replay.slug || `at index ${index}`}: ${problem}`,
      );
    };

    for (const field of REQUIRED) {
      if (!isText(replay[field])) fail(`missing ${field}`);
    }
    if (!SLUG.test(replay.slug)) fail("malformed slug");
    if (slugs.has(replay.slug)) fail("duplicate slug");
    slugs.add(replay.slug);
    if (!YOUTUBE_ID.test(replay.youtubeId)) fail("malformed youtubeId");
    if (!isIsoDate(replay.recordedOn)) fail("malformed recordedOn");
    const length = durationSeconds(replay.duration);
    if (length === null) fail("malformed duration");
    if (!topics.has(replay.topicSlug)) {
      fail(`topicSlug "${replay.topicSlug}" is not in data/services.ts`);
    }
    if (
      replay.format !== undefined &&
      !["live", "session"].includes(replay.format)
    ) {
      fail("malformed format");
    }
    if (replay.poster && !isPoster(replay.poster)) fail("malformed poster");
    if (replay.chapters && !areChapters(replay.chapters, length as number)) {
      fail("malformed chapters");
    }
  });
}

// Validates, then returns a copy sorted newest first. Entries recorded on the
// same day keep the order they were written in.
export function prepareReplays(list: readonly Replay[]): Replay[] {
  validateReplays(list);
  return [...list].sort((a, b) => b.recordedOn.localeCompare(a.recordedOn));
}

// Real replays only, with details supplied by the owner.
const entries: Replay[] = [
  {
    slug: "lead-gen-site-structure-ai-blog-workflow",
    title: "Lead Gen Website Structure, AI Blog Workflow and Free SEO Tools",
    description:
      "Learn how to structure a client website for lead generation, write AI-assisted blog posts from the owner's own answers, and register a site with free search tools. Recorded live in an Agency Back Office training session.",
    youtubeId: "FeyC1HuPeqM",
    recordedOn: "2026-11-22",
    duration: "PT55M51S",
    topicSlug: "content-marketing-training",
    format: "session",
    poster: {
      src: "/images/trainings/16x9-webp/agency-back-office-training-video-player-chapter-markers-16x9.webp",
      alt: "Laptop on a desk showing a video player with chapter markers.",
      width: 1672,
      height: 941,
    },
    chapters: [
      { title: "Opening and first questions", startSeconds: 0 },
      { title: "Moving a client website from Bluehost to Cloudflare", startSeconds: 31 },
      { title: "A free tool for finding blog topic questions", startSeconds: 517 },
      { title: "Turning one blog post into social content", startSeconds: 614 },
      { title: "AI prompts for writing blog posts from the owner's answers", startSeconds: 691 },
      { title: "Structuring a website for lead generation", startSeconds: 892 },
      { title: "Registering a site with Google Search Console and other tools", startSeconds: 1644 },
      { title: "Bing Webmaster Tools and citation services Q&A", startSeconds: 2879 },
    ],
  },
];

export const replays: Replay[] = prepareReplays(entries);
