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
    // prefetch is off: in the static export the prefetch payload URLs 404
    // (see docs/decisions-change-log.md, "Internal links do not prefetch").
    <Link href={href} className={className} prefetch={false}>
      {children}
      {arrow ? (
        <span className="arrow" aria-hidden="true">
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}
