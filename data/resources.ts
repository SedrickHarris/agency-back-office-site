// Resource hub registry. Source: docs/information-architecture.md
export type ResourceHub = {
  name: string;
  description: string;
  href: string;
  linkLabel: string;
  // Link only hubs that exist. TODO: owner to confirm which hubs are live at
  // launch and that each resource type is free.
  live: boolean;
};

export const resourceHubs: ResourceHub[] = [
  {
    name: "Guides",
    description: "Step-by-step implementation guides for each training topic",
    href: "/resources/guides/",
    linkLabel: "Read the guides",
    live: false,
  },
  {
    name: "Checklists",
    description: "Execution checklists for audits, setup, and delivery",
    href: "/resources/checklists/",
    linkLabel: "Use the checklists",
    live: false,
  },
  {
    name: "Templates",
    description: "Reusable operational and marketing templates",
    href: "/resources/templates/",
    linkLabel: "Browse the templates",
    live: false,
  },
  {
    name: "Glossary",
    description: "Plain-language definitions of marketing and agency terms",
    href: "/resources/glossary/",
    linkLabel: "Open the glossary",
    live: false,
  },
  {
    name: "FAQ",
    description: "Direct answers to common questions",
    href: "/resources/faq/",
    linkLabel: "Read the FAQ",
    live: false,
  },
  {
    name: "Blog",
    description: "Tutorials, updates, and worked examples",
    href: "/resources/blog/",
    linkLabel: "Read the blog",
    live: false,
  },
];
