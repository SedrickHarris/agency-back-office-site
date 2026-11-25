// Sessions page copy. Source: docs/sessions-page-spec.md (Final page copy).
// Preserve copy verbatim. Use hyphens, not em dashes. Video details live in
// data/replays.ts, never here.

export const SESSIONS_PATH = "/training/sessions/";

export const sessionsMeta = {
  // The root layout has no title template, so the full title is used.
  title: "Session Replays | Agency Back Office Training",
  description:
    "Watch recordings of past Agency Back Office training sessions on lead generation, website structure, AI-assisted content and search tools.",
};

export const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "Training", href: "/training/" },
  { label: "Sessions", href: SESSIONS_PATH },
] as const;

export const intro = {
  label: "Sessions",
  h1: "Session replays",
  lead: "Watch recordings of past Agency Back Office sessions on your own schedule.",
  // Shown only when there is at least one replay.
  support: "Newest first. Each one plays on this page, with no sign-in.",
  link: {
    text: "Prefer to learn live? See live training",
    href: "/training/live/",
  },
};

export const emptyLibrary = "New replays will be added here.";

export const latestReplay = {
  label: "Latest replay",
  topicLink: (topic: string) => `Open the ${topic} page`,
};

export const library = {
  h2: "More replays",
  count: (more: number) => `${more} more, newest first`,
  watch: "Watch replay",
};

export const player = {
  name: (title: string, duration: string) =>
    `Play replay: ${title} (${duration})`,
  chaptersHeading: "In this replay",
  posterNote: "replay poster",
};

export const keepLearning = {
  h2: "Keep learning",
  rows: [
    {
      title: "Live training",
      text: "Learn with an instructor in a live format.",
      href: "/training/live/",
    },
    {
      title: "Browse training topics",
      text: "Find the topic a replay belongs to and what else we teach on it.",
      href: "/services/",
    },
    {
      title: "Read the resources",
      text: "Guides, checklists, and templates that go with the training.",
      href: "/resources/",
    },
  ],
};

type Inline = Array<string | { text: string; href: string }>;

export const faq = {
  h2: "Questions about replays",
  items: [
    {
      question: "What is a session replay?",
      // The first answer starts open, as on the approved board.
      open: true,
      answer: [
        "A recording of a past Agency Back Office session, published here so you can watch it later.",
      ] as Inline,
    },
    {
      question: "Do I need an account to watch?",
      open: false,
      answer: ["No. Replays on this page play without signing in."] as Inline,
    },
    {
      question: "Can I ask a question about a replay?",
      open: false,
      answer: [
        "Yes. Use the ",
        { text: "contact page", href: "/contact/" },
        " and name the replay you watched.",
      ] as Inline,
    },
  ],
};

export const closingBand = {
  h2: "Ready to go beyond the replays?",
  support: "See how to get started with Agency Back Office training.",
  cta: { label: "Get started", href: "/get-started/" },
};

// Analytics event names. Source: docs/analytics-measurement.md (Sessions Events).
export const sessionsEvents = {
  play: "replay_play",
  topicClick: "replay_topic_click",
  ctaClick: "sessions_cta_click",
} as const;
