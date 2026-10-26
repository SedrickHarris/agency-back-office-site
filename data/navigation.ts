// Navigation. Source: docs/information-architecture.md
export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Training", href: "/training/" },
  { label: "Topics", href: "/services/" },
  { label: "Who We Help", href: "/audiences/" },
  { label: "Resources", href: "/resources/" },
  { label: "About", href: "/about/" },
  { label: "Get Started", href: "/get-started/" },
];

export const footerNavigation: NavItem[] = [
  ...primaryNavigation,
  { label: "Contact", href: "/contact/" },
];
