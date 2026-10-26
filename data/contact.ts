// Approved Contact page copy and form configuration.
// Source: docs/contact-page-spec.md and docs/design-reference/contact-design-reference.html.
// Preserve copy verbatim. Use hyphens, not em dashes. No email address, phone
// number, hours, or response-time statement belongs on this page.
import type { IconName } from "@/components/ui/Icon";
import {
  CONTACT_LIMITS,
  type ContactErrorCode,
  type ContactField,
  type ContactStep,
  type RoleValue,
  type TopicValue,
} from "@/shared/contact-schema";

export const CONTACT_PATH = "/contact/";

export const contactMeta = {
  // The root layout has no title template, so the full title is used.
  title: "Contact Agency Back Office | Training Questions",
  description:
    "Ask a question about Agency Back Office training for agency owners, marketers, consultants and freelancers, or tell us what you are trying to learn.",
  h1: "Contact Agency Back Office",
};

export const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "Contact", href: CONTACT_PATH },
] as const;

export const intro = {
  label: "Contact",
  h1: contactMeta.h1,
  lead: "Ask a question about Agency Back Office training, or tell us what you are trying to learn. The more you say about your work, the more useful the reply can be.",
  listH2: "What you can write about",
  list: [
    {
      icon: "book" as IconName,
      title: "Training topics",
      text: "Search engine optimization (SEO), answer engine optimization (AEO), Google Business Profile (GBP), local SEO, reputation management, AI marketing, marketing automation, lead generation, agency operations, and the other topics we teach.",
    },
    {
      icon: "calendar" as IconName,
      title: "Live training and sessions",
      text: "Questions about the live training and sessions formats.",
    },
    {
      icon: "message" as IconName,
      title: "Something else",
      text: "A question that fits neither of the above, or a note about this site.",
    },
  ],
};

export const roleOptions: ReadonlyArray<{ value: RoleValue; label: string }> = [
  { value: "agency-owner", label: "Agency owner or leader" },
  { value: "new-agency-owner", label: "New agency owner" },
  { value: "consultant", label: "Consultant" },
  { value: "freelancer", label: "Freelancer" },
  { value: "other", label: "Other" },
];

export const topicOptions: ReadonlyArray<{ value: TopicValue; label: string }> = [
  { value: "training-topics", label: "Training topics" },
  { value: "live-training", label: "Live training" },
  { value: "sessions", label: "Sessions" },
  { value: "other", label: "Something else" },
];

export const TOTAL_STEPS = 3;

export const survey = {
  h2: "Send a message",
  progress: (step: number) => `Step ${step} of ${TOTAL_STEPS}`,
  next: "Next",
  back: "Back",
  clear: "Clear answer",
  send: "Send message",
  sending: "Sending...",
  sendingStatus: "Sending your message",
  steps: {
    1: {
      question: "Which describes you best?",
      qualifier: "(optional)",
      helper: "Choose one, or skip this question.",
    },
    2: {
      question: "What is your message about?",
      qualifier: "(required)",
      helper: undefined,
    },
    3: {
      question: "Your contact details",
      qualifier: undefined,
      helper: undefined,
    },
  } as Record<
    ContactStep,
    { question: string; qualifier?: string; helper?: string }
  >,
  privacy: {
    before: "We use the details you send to reply to your message. See the ",
    linkText: "privacy page",
    after: " for more.",
    href: "/privacy/",
  },
  securityCheck: "Security check",
  noscript:
    "This form needs JavaScript to send your message. Turn JavaScript on, or try a different browser.",
};

type FieldConfig = {
  name: ContactField;
  label: string;
  qualifier: string;
  helper?: string;
  type?: "text" | "tel" | "email";
  inputMode?: "tel" | "email";
  autoComplete?: string;
  maxLength?: number;
  rows?: number;
};

export const fieldConfig: Record<
  "message" | "name" | "phone" | "email",
  FieldConfig
> = {
  message: {
    name: "message",
    label: "Your message",
    qualifier: "(required)",
    helper: "Say what you are working on and what you want to know.",
    rows: 6,
    // Typing past the limit is not blocked, so pasting is never cut off; the
    // length rule shows its error instead.
  },
  name: {
    name: "name",
    label: "Full name",
    qualifier: "(required)",
    type: "text",
    autoComplete: "name",
  },
  phone: {
    name: "phone",
    label: "Phone number",
    qualifier: "(required)",
    type: "tel",
    inputMode: "tel",
    autoComplete: "tel",
  },
  email: {
    name: "email",
    label: "Email address",
    qualifier: "(required)",
    helper: "Use the address where you want your reply.",
    type: "email",
    inputMode: "email",
    autoComplete: "email",
  },
};

export const fieldErrors: Record<ContactErrorCode, string> = {
  "role-invalid": "Choose one of the options, or skip this question.",
  "topic-required": "Choose what your message is about.",
  "message-empty": "Enter your message.",
  "message-short": `Write at least ${CONTACT_LIMITS.messageMin} characters.`,
  "message-long": "Keep your message under 2,000 characters.",
  "name-required": "Enter your full name.",
  "phone-empty": "Enter your phone number.",
  "phone-invalid": "Enter a phone number with 10 to 15 digits.",
  "email-empty": "Enter your email address.",
  "email-invalid": "Enter an email address like name@example.com.",
};

export const errorSummary = {
  continue: (count: number) =>
    `Fix ${count} ${count === 1 ? "thing" : "things"} to continue`,
  send: (count: number) =>
    `Fix ${count} ${count === 1 ? "thing" : "things"} to send your message`,
};

export const notices = {
  verification:
    "The security check did not finish. Wait for it to complete, then send again.",
  network:
    "Your message did not send. Check your connection and try again. What you wrote is still here.",
  server:
    "Something went wrong and your message did not send. Try again in a few minutes. What you wrote is still here.",
};

export const success = {
  h2: "Message sent",
  withName: (firstName: string) =>
    `Thanks, ${firstName}. Your message has been sent.`,
  withoutName: "Thanks. Your message has been sent.",
  followUp: {
    before: "In the meantime, you can ",
    topicsText: "browse training topics",
    topicsHref: "/services/",
    middle: " or ",
    startText: "see how to get started",
    startHref: "/get-started/",
    after: ".",
  },
  again: "Send another message",
};

export const example = {
  h2: "What makes a useful message",
  intro: "You do not need to write much. Three details help most.",
  label: "Example message (illustrative, not from a real person)",
  parts: [
    { n: 1, text: "I run a small web design agency" },
    {
      n: 2,
      text: "want to add Google Business Profile work for my existing clients.",
    },
    { n: 3, text: "Which topics should I start with, and in what order?" },
  ],
  // The words between the highlighted parts of the example message.
  joiners: [" and ", " "],
  callouts: [
    {
      n: 1,
      title: "Who you are.",
      text: "Your role helps point you to the right training.",
    },
    {
      n: 2,
      title: "What you are working on.",
      text: "Your situation shapes the answer.",
    },
    {
      n: 3,
      title: "What you want to know.",
      text: "A specific question can get a specific reply.",
    },
  ],
};

export const options = {
  h2: "Not ready to write?",
  intro: "These pages may answer your question first.",
  rows: [
    {
      icon: "book" as IconName,
      href: "/services/",
      title: "Browse training topics",
      text: "See what Agency Back Office teaches, from SEO to agency operations.",
    },
    {
      icon: "layers" as IconName,
      href: "/training/",
      title: "Explore training formats",
      text: "See how training is delivered, including live training and sessions.",
    },
    {
      icon: "file" as IconName,
      href: "/resources/",
      title: "Read the resources",
      text: "Guides, checklists, templates, and answers to common questions.",
    },
  ],
};

export const getStartedBand = {
  h2: "Ready to take the next step?",
  text: "If you already know you want training, the Get started page is the faster route.",
  linkText: "See how to get started",
  href: "/get-started/",
};

// Analytics event names. Source: docs/analytics-measurement.md (Contact Events).
export const contactEvents = {
  formView: "contact_form_view",
  stepView: "contact_step_view",
  fieldFocus: "contact_field_focus",
  stepComplete: "contact_step_complete",
  submit: "contact_submit",
  success: "contact_success",
  error: "contact_error",
} as const;

export const SUBMIT_TIMEOUT_MS = 15000;
