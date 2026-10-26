import Link from "next/link";
import type { ReactNode } from "react";
import { isBuilt } from "@/lib/routing/routes";

// Renders a link only when the route exists. Otherwise it renders plain text
// marked with data-unbuilt-href so the intended target can be listed and wired
// up when the page is built.
export function SiteLink({
  href,
  children,
  className,
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  if (!isBuilt(href)) {
    return (
      <span className={`unbuilt ${className ?? ""}`.trim()} data-unbuilt-href={href}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      {arrow ? (
        <span className="arrow" aria-hidden="true">
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}
