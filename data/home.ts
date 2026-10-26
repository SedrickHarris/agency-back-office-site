// Approved home page copy. Source: docs/design-reference/home-design-reference.html
// and docs/content-specification.md (Core Page: Home).
// Preserve copy verbatim. Use hyphens, not em dashes.
import type { IconName } from "@/components/ui/Icon";

// Date the definitions grid and home content were last reviewed (ISO 8601).
export const LAST_REVIEWED = "2026-10-25";

export type LinkPart = { text: string; href: string };
// Inline content: plain text mixed with links.
export type Inline = (string | LinkPart)[];

export const homeMeta = {
  title: "Agency Back Office | Practical Digital Marketing and Agency Training",
  description:
    "Practical training in SEO, AEO, Google Business Profile, reputation management, automation, and agency operations for agency owners, marketers, and consultants.",
};

export const hero = {
  eyebrow: "Online training for agencies and marketers",
  h1: "Practical digital marketing training for people who deliver client work",
  definition:
    "Agency Back Office is an online training company that teaches agency owners, marketers, and consultants the practical systems behind search engine optimization (SEO), reputation management, automation, and agency operations.",
  supporting:
    "Learn the work, build repeatable systems, and apply them to real client projects.",
  primaryCta: { label: "Explore the training", href: "/training/" },
  secondaryCta: { label: "Browse training topics", href: "/services/" },
  diagram: {
    title: "Example workflow: asking for reviews after a finished job",
    steps: [
      {
        label: "Job marked complete",
        callout: "Trigger",
        description: "a status change in your system starts the workflow.",
      },
      {
        label: "Review request sent",
        description:
          "A short text or email asks for a review and includes a direct link.",
      },
      {
        label: "One reminder, then stop",
        callout: "Timing",
        description: "a single follow-up avoids over-messaging the customer.",
      },
      {
        label: "New review arrives",
        callout: "Review",
        description: "the right person is notified so nothing sits unseen.",
      },
      {
        label: "Reply published",
        description:
          "Every review, positive or negative, gets a considered response.",
      },
    ],
    caption:
      "Illustrative example of the kind of workflow covered in reputation management training. Not a client result.",
  },
};

export const servicesIndex = {
  eyebrow: "Training topics",
  h2: "What you can learn",
  intro:
    "Fifteen training topics, grouped by the problem they solve. Each links to a page that explains what the topic is, how agencies use it, and what the training covers.",
  themes: [
    {
      id: "search-visibility" as const,
      slugs: [
        "seo-training",
        "aeo-training",
        "local-seo-training",
        "google-business-profile-training",
      ],
    },
    {
      id: "reputation-leads" as const,
      slugs: ["reputation-management-training", "lead-generation-training"],
    },
    {
      id: "systems" as const,
      slugs: [
        "digital-marketing-training",
        "ai-marketing-training",
        "marketing-automation-training",
        "agency-operations-training",
      ],
    },
  ],
  moreLabel: "More topics",
  more: [
    { slug: "website-seo-training" },
    { slug: "content-marketing-training" },
    { slug: "conversion-optimization-training" },
    { slug: "website-strategy-training" },
    {
      slug: "crm-training",
      suffix: "(customer relationship management, or CRM, systems)",
    },
  ],
  seeAll: { label: "See all training topics", href: "/services/" },
};

export const process = {
  h2: "How the training works",
  intro:
    "Every topic follows the same four-part path, from understanding a tactic to running it as an ongoing discipline. The examples below use the review-request workflow from the top of this page.",
  caption: "The four stages of training and what each one produces",
  columns: { stage: "Stage", does: "What you do", leaves: "What you leave with" },
  rows: [
    {
      num: "1",
      stage: "Learn the work",
      does: "Understand what a tactic is, why it matters, and how it works.",
      example:
        "what a review request is, and why the timing of the ask matters.",
      leaves:
        "Plain-language definitions and a clear picture of how the tactic works.",
    },
    {
      num: "2",
      stage: "Build the system",
      does: "Turn that knowledge into a repeatable process your team can follow.",
      example: "the five-step workflow, from a finished job to a published reply.",
      leaves: "A repeatable process, written down so your team can follow it.",
    },
    {
      num: "3",
      stage: "Apply it to clients",
      does: "Connect the process to client delivery, outcomes, and retention.",
      example:
        "set the workflow up in a client's system and adjust the message to their business.",
      leaves:
        "A client-ready version of the process, connected to delivery and retention.",
    },
    {
      num: "4",
      stage: "Keep improving",
      does: "Treat SEO, AEO, reputation, content, and automation as ongoing work, not one-time tasks.",
      example: "check which requests get responses, then adjust the message and timing.",
      leaves: "A review routine for refining the work over time.",
    },
  ],
  loopLabel:
    "Stage 4 leads back to stage 1: improvement feeds the next round of learning.",
};

export const audienceRouter = {
  h2: "Which describes you?",
  intro: "Pick the situation closest to yours to see the training that fits.",
  rows: [
    {
      slug: "agency-owners",
      statement: "I run an agency and need delivery systems that hold up as we grow.",
      linkLabel: "Training for agency owners",
    },
    {
      slug: "new-agency-owners",
      statement:
        "I am starting an agency and need to know what to sell and how to fulfill it.",
      linkLabel: "Training for new agency owners",
    },
    {
      slug: "digital-marketing-agencies",
      statement:
        "We offer several services and want search, reputation, and automation work to follow one process.",
      linkLabel: "Training for digital marketing agencies",
    },
    {
      slug: "seo-agencies",
      statement:
        "We do SEO and need to extend into AEO, local search, and structured content.",
      linkLabel: "Training for SEO agencies",
    },
    {
      slug: "web-design-agencies",
      statement:
        "We build websites and want to offer SEO-informed structure and ongoing services after launch.",
      linkLabel: "Training for web design agencies",
    },
    {
      slug: "ai-automation-agencies",
      statement:
        "We build automations and need marketing and search work that brings in clients.",
      linkLabel: "Training for AI automation agencies",
    },
    {
      slug: "gohighlevel-agencies",
      statement:
        "We run on GoHighLevel and want SEO and Google Business Profile services to go with our CRM and automation work.",
      linkLabel: "Training for GoHighLevel agencies",
    },
    {
      slug: "marketing-consultants",
      statement:
        "I advise clients and need practical tools to carry out the strategy.",
      linkLabel: "Training for marketing consultants",
    },
  ],
  seeAll: { label: "See all audiences", href: "/audiences/" },
};

export const definitions = {
  h2: "Core topics, defined",
  lastReviewedLabel: "Last reviewed:",
  items: [
    {
      term: "SEO",
      imageNote: "SEO diagram",
      body: "Search engine optimization (SEO) is the practice of improving a website so search engines can find it, understand it, and show it to people searching for related topics. It covers technical setup, content, site structure, and links. Agencies use SEO to help clients earn more qualified organic visits without paying for each click.",
      linkLabel: "SEO training for agencies",
      href: "/services/seo-training/",
    },
    {
      term: "AEO",
      imageNote: "AEO diagram",
      body: "Answer engine optimization (AEO) is the practice of structuring content so search features and AI assistants can pull a clear, accurate answer from it. That means direct answers, defined terms, logical steps, and consistent naming. Agencies use AEO alongside SEO. No method guarantees a page will be quoted or cited.",
      linkLabel: "AEO training",
      href: "/services/aeo-training/",
    },
    {
      term: "GBP",
      imageNote: "GBP diagram",
      body: "A Google Business Profile (GBP) is the free listing a business manages to control how it appears in Google Search and Maps. It holds details like categories, services, hours, photos, and reviews. Agencies that manage listings for clients use GBP training to learn setup, optimization, and ongoing maintenance.",
      linkLabel: "Google Business Profile training",
      href: "/services/google-business-profile-training/",
    },
    {
      term: "Local SEO",
      imageNote: "Local SEO diagram",
      body: "Local SEO is search engine optimization focused on helping a business appear when people search for services in a specific area. It combines Google Business Profile management, location and service content, directory listings, reviews, and local links. Agencies use it to serve clients that depend on customers in their area.",
      linkLabel: "Local SEO training",
      href: "/services/local-seo-training/",
    },
  ],
};

export const delivery = {
  h2: "How training is delivered",
  prose:
    "Agency Back Office is an online-only business, and all training is delivered online. These are the formats currently available.",
  // TODO: owner to confirm these one-line descriptions before launch.
  formats: [
    {
      name: "Live training",
      icon: "live" as IconName,
      href: "/training/live/",
      description:
        "Training led live and delivered online. Details are on the live training page.",
    },
    {
      name: "Sessions",
      icon: "calendar" as IconName,
      href: "/training/sessions/",
      description:
        "Training sessions delivered online. Details are on the sessions page.",
    },
  ],
  link: { label: "See all training", href: "/training/" },
};

export const resourcesSection = {
  // Do not imply the resources are free until the owner confirms it.
  h2: "Resources",
  intro:
    "Guides, checklists, templates, a glossary, and blog posts that support the training.",
  caption: "Resource hubs",
  columns: { resource: "Resource", covers: "What it covers", goTo: "Go to" },
  rows: [
    {
      name: "Guides",
      icon: "book" as IconName,
      description: "Step-by-step implementation guides for each training topic",
      href: "/resources/guides/",
      linkLabel: "Read the guides",
    },
    {
      name: "Checklists",
      icon: "checklist" as IconName,
      description: "Execution checklists for audits, setup, and delivery",
      href: "/resources/checklists/",
      linkLabel: "Use the checklists",
    },
    {
      name: "Templates",
      icon: "template" as IconName,
      description: "Reusable operational and marketing templates",
      href: "/resources/templates/",
      linkLabel: "Browse the templates",
    },
    {
      name: "Glossary",
      icon: "glossary" as IconName,
      description: "Plain-language definitions of marketing and agency terms",
      href: "/resources/glossary/",
      linkLabel: "Open the glossary",
    },
    {
      name: "FAQ",
      icon: "help" as IconName,
      description: "Direct answers to common questions",
      href: "/resources/faq/",
      linkLabel: "Read the FAQ",
    },
    {
      name: "Blog",
      icon: "edit" as IconName,
      description: "Tutorials, updates, and worked examples",
      href: "/resources/blog/",
      linkLabel: "Read the blog",
    },
  ],
  seeAll: { label: "Browse all resources", href: "/resources/" },
};

export const proofSection = {
  h2: "Who teaches the training",
};

export const faq = {
  h2: "Frequently asked questions",
  columns: [
    {
      label: "About the training",
      items: [
        {
          question: "What is Agency Back Office?",
          open: true,
          answer: [
            "Agency Back Office is an online training company that teaches agency owners, marketers, and consultants the practical systems behind digital marketing and agency operations. Training focuses on implementation: workflows, examples, templates, and checklists you can apply to client work.",
          ] as Inline,
        },
        {
          question: "Who is the training for?",
          answer: [
            "It is for people who sell or deliver digital marketing services: agency owners, new agency owners, SEO and web design agencies, AI automation and GoHighLevel agencies, marketing consultants, and freelancers. The audience pages show which topics fit each situation.",
          ] as Inline,
        },
        {
          question: "Where should I start if I'm new?",
          answer: [
            "Start with ",
            {
              text: "Digital Marketing Training",
              href: "/services/digital-marketing-training/",
            },
            ", which shows how the main channels fit together in client work, then choose the topic closest to the service you sell or want to add. The ",
            {
              text: "new agency owners page",
              href: "/audiences/new-agency-owners/",
            },
            " explains what to learn next.",
          ] as Inline,
        },
        {
          question: "Is the training online?",
          answer: [
            "Yes. Agency Back Office is an online-only business, and training is delivered online. The current formats are live training and sessions.",
          ] as Inline,
        },
      ],
    },
    {
      label: "Topics and expectations",
      items: [
        {
          question: "What topics does Agency Back Office teach?",
          answer: [
            "Fifteen topics, including SEO, AEO, Local SEO, Google Business Profile, reputation management, AI marketing, marketing automation, lead generation, and agency operations. The services page lists every topic.",
          ] as Inline,
        },
        {
          question: "What is the difference between SEO and AEO?",
          answer: [
            "SEO helps search engines find, understand, and show a website. AEO structures content so search features and AI assistants can pull a clear answer from it. The two overlap, and agencies use them together. See ",
            { text: "SEO training", href: "/services/seo-training/" },
            " and ",
            { text: "AEO training", href: "/services/aeo-training/" },
            ".",
          ] as Inline,
        },
        {
          question: "How long does SEO take to work?",
          answer: [
            "It depends on the site, the competition, and where the site starts, and no one can promise a timeline. Search engines decide when and how results change, so honest timelines are estimates, not promises. Tracking progress over time is more reliable than expecting a fixed date.",
          ] as Inline,
        },
        {
          question: "Can training guarantee rankings or AI citations?",
          answer: [
            "No. No training or tactic can guarantee rankings, featured snippets, AI answer inclusion, or knowledge panels, because search engines and AI systems make those decisions. Agency Back Office teaches the practices that improve how well a site can be found and understood.",
          ] as Inline,
        },
      ],
    },
  ],
};

export const closingCta = {
  h2: "Start with the training that fits your work",
  support:
    "Pick a topic, choose a format, and apply it to your next client project.",
  cta: { label: "Explore the training", href: "/training/" },
  imageNote: "training session or course preview screenshot",
};

export const footer = {
  line: "Agency Back Office. Home content last reviewed",
  links: [
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
    { label: "Get Started", href: "/get-started/" },
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms", href: "/terms/" },
  ],
};
