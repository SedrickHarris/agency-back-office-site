// Audience registry (priority audiences only). Source: docs/master-audience-registry.md
export type Audience = {
  slug: string;
  name: string;
  priority: "High" | "Medium";
};

export const audiences: Audience[] = [
  { slug: "agency-owners", name: "Agency Owners", priority: "High" },
  { slug: "new-agency-owners", name: "New Agency Owners", priority: "High" },
  {
    slug: "digital-marketing-agencies",
    name: "Digital Marketing Agencies",
    priority: "High",
  },
  { slug: "seo-agencies", name: "SEO Agencies", priority: "High" },
  { slug: "web-design-agencies", name: "Web Design Agencies", priority: "High" },
  {
    slug: "ai-automation-agencies",
    name: "AI Automation Agencies",
    priority: "High",
  },
  {
    slug: "gohighlevel-agencies",
    name: "GoHighLevel Agencies",
    priority: "High",
  },
  {
    slug: "marketing-consultants",
    name: "Marketing Consultants",
    priority: "High",
  },
];
