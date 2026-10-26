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
  },
  {
    slug: "seo-training",
    name: "SEO Training",
    priority: "High",
    theme: "search-visibility",
    description:
      "Learn keyword research, on-page SEO, technical SEO, and how to run SEO for client websites.",
  },
  {
    slug: "aeo-training",
    name: "AEO Training",
    priority: "High",
    theme: "search-visibility",
    description:
      "Learn answer engine optimization (AEO): structuring content for featured snippets, voice search, and artificial intelligence (AI) answers.",
  },
  {
    slug: "google-business-profile-training",
    name: "Google Business Profile Training",
    priority: "High",
    theme: "search-visibility",
    description:
      "Learn what a Google Business Profile (GBP) contains and how agencies set up and maintain it.",
  },
  {
    slug: "reputation-management-training",
    name: "Reputation Management Training",
    priority: "High",
    theme: "reputation-leads",
    description: "Build review request, response, and monitoring workflows.",
  },
  {
    slug: "local-seo-training",
    name: "Local SEO Training",
    priority: "High",
    theme: "search-visibility",
    description:
      "Learn how local search works and how agencies approach it for clients.",
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
  },
  {
    slug: "marketing-automation-training",
    name: "Marketing Automation Training",
    priority: "High",
    theme: "systems",
    description: "Set up follow-up, lead nurture, and onboarding workflows.",
  },
  {
    slug: "lead-generation-training",
    name: "Lead Generation Training",
    priority: "High",
    theme: "reputation-leads",
    description:
      "Learn how agencies attract, capture, and follow up on leads for clients.",
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
  },
  {
    slug: "crm-training",
    name: "CRM Training",
    priority: "Medium",
  },
];
