// Service registry. Source: docs/master-service-registry.md
export type ServiceTheme = "search-visibility" | "reputation-leads" | "systems";

export type Service = {
  slug: string;
  name: string;
  priority: "High" | "Medium";
  // Set only for services listed in a themed group on the home page.
  theme?: ServiceTheme;
  // Approved one-line description. Omitted until approved copy exists.
  description?: string;
  // Intended content for the topic card image slot (see ImagePlaceholder).
  imageNote?: string;
  // Real image for the topic card. Falls back to the placeholder when unset.
  image?: { src: string; alt: string };
};

export const serviceThemes: Record<ServiceTheme, string> = {
  "search-visibility": "Search visibility",
  "reputation-leads": "Reputation and leads",
  systems: "Systems",
};

export const services: Service[] = [
  {
    slug: "digital-marketing-training",
    name: "Digital Marketing Training",
    priority: "High",
    theme: "systems",
    description:
      "The foundation: how the main channels fit together in client work.",
    imageNote: "channel map diagram",
    image: {
      src: "/images/trainings/webp/agency-back-office-digital-marketing-training-channels.webp",
      alt: "Laptop, phone, and paper cards showing search, email, and analytics icons arranged around a blank center card on a desk.",
    },
  },
  {
    slug: "seo-training",
    name: "SEO Training",
    priority: "High",
    theme: "search-visibility",
    description:
      "Learn keyword research, on-page SEO, technical SEO, and how to run SEO for client websites.",
    imageNote: "SEO workflow screenshot",
    image: {
      src: "/images/trainings/webp/agency-back-office-seo-training-keyword-research-client-websites.webp",
      alt: "Laptop showing a ranking trend chart beside a keyword checklist, a page mockup, and a site structure sketch on a desk.",
    },
  },
  {
    slug: "aeo-training",
    name: "AEO Training",
    priority: "High",
    theme: "search-visibility",
    description:
      "Learn answer engine optimization (AEO): structuring content for featured snippets, voice search, and artificial intelligence (AI) answers.",
    imageNote: "answer structure example",
    image: {
      src: "/images/trainings/webp/agency-back-office-aeo-training-answer-engine-optimization.webp",
      alt: "Paper strip showing a question, answer text, a tag, linked nodes, and a link icon, with a microphone and smart speaker behind it.",
    },
  },
  {
    slug: "google-business-profile-training",
    name: "Google Business Profile Training",
    priority: "High",
    theme: "search-visibility",
    description:
      "Learn what a Google Business Profile (GBP) contains and how agencies set up and maintain it.",
    imageNote: "annotated profile example",
    image: {
      src: "/images/trainings/webp/agency-back-office-google-business-profile-training.webp",
      alt: "Laptop and phone showing a business listing with a storefront photo, map pin, action buttons, and star rating.",
    },
  },
  {
    slug: "reputation-management-training",
    name: "Reputation Management Training",
    priority: "High",
    theme: "reputation-leads",
    description: "Build review request, response, and monitoring workflows.",
    imageNote: "review workflow example",
    image: {
      src: "/images/trainings/webp/agency-back-office-reputation-management-training-review-workflows.webp",
      alt: "Phone showing a five-star review beside three cards that show a review request, review monitoring, and a reply.",
    },
  },
  {
    slug: "local-seo-training",
    name: "Local SEO Training",
    priority: "High",
    theme: "search-visibility",
    description:
      "Learn how local search works and how agencies approach it for clients.",
    imageNote: "local search diagram",
    image: {
      src: "/images/trainings/webp/agency-back-office-local-seo-training-local-search.webp",
      alt: "City map with location pins next to a phone showing a local results list and a star rating card.",
    },
  },
  {
    slug: "website-seo-training",
    name: "Website SEO Training",
    priority: "Medium",
  },
  {
    slug: "content-marketing-training",
    name: "Content Marketing Training",
    priority: "Medium",
  },
  {
    slug: "ai-marketing-training",
    name: "AI Marketing Training",
    priority: "High",
    theme: "systems",
    description:
      "Use AI tools in marketing workflows, with clear points for human review.",
    imageNote: "AI workflow with review step",
    image: {
      src: "/images/trainings/webp/agency-back-office-ai-marketing-training-human-review-workflows.webp",
      alt: "Laptop showing a workflow from idea to draft to human review to approval, with a checkmark sign and a marked-up page on the desk.",
    },
  },
  {
    slug: "marketing-automation-training",
    name: "Marketing Automation Training",
    priority: "High",
    theme: "systems",
    description: "Set up follow-up, lead nurture, and onboarding workflows.",
    imageNote: "automation flow screenshot",
    image: {
      src: "/images/trainings/webp/agency-back-office-marketing-automation-training-follow-up-workflows.webp",
      alt: "Four connected icon tiles for a contact, an email, a notification, and a folder, with a phone and timer on a white desk.",
    },
  },
  {
    slug: "lead-generation-training",
    name: "Lead Generation Training",
    priority: "High",
    theme: "reputation-leads",
    description:
      "Learn how agencies attract, capture, and follow up on leads for clients.",
    imageNote: "lead capture flow",
    image: {
      src: "/images/trainings/webp/agency-back-office-lead-generation-training-client-leads.webp",
      alt: "Laptop showing a funnel leading to a form and a list of leads, with a phone notification and a checklist notebook.",
    },
  },
  {
    slug: "conversion-optimization-training",
    name: "Conversion Optimization Training",
    priority: "Medium",
  },
  {
    slug: "website-strategy-training",
    name: "Website Strategy Training",
    priority: "Medium",
  },
  {
    slug: "agency-operations-training",
    name: "Agency Operations Training",
    priority: "High",
    theme: "systems",
    description:
      "Build systems for onboarding, delivery, reporting, and client retention.",
    imageNote: "onboarding checklist example",
    image: {
      src: "/images/trainings/webp/agency-back-office-agency-operations-training-client-workflows.webp",
      alt: "Board showing a client folder flowing through a checklist, a reporting chart, and a calendar, on a desk with folders.",
    },
  },
  {
    slug: "crm-training",
    name: "CRM Training",
    priority: "Medium",
  },
];
