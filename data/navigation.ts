// Navigation. Source: docs/information-architecture.md
export type NavItem = {
  label: string;
  href: string;
  // Rendered as the outlined header action.
  action?: boolean;
};

export const primaryNavigation: NavItem[] = [
  { label: "Training", href: "/training/" },
  { label: "Topics", href: "/services/" },
  { label: "Who We Help", href: "/audiences/" },
  { label: "Resources", href: "/resources/" },
  { label: "About", href: "/about/" },
  { label: "Get Started", href: "/get-started/", action: true },
];
