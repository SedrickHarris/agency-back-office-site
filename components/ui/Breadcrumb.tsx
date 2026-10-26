import { SiteLink } from "@/components/ui/SiteLink";

export type BreadcrumbItem = { label: string; href: string };

// The last item is the current page. This markup is what the BreadcrumbList
// JSON-LD describes, so keep the two in step.
export function Breadcrumb({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.href} aria-current={current ? "page" : undefined}>
              {current ? (
                item.label
              ) : (
                <>
                  <SiteLink href={item.href}>{item.label}</SiteLink>
                  <span className="crumb-sep" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
