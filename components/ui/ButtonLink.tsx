import Link from "next/link";

export function ButtonLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <Link className="btn" href={href} prefetch={false}>
      {children}
      <span className="arrow" aria-hidden="true">
        &rarr;
      </span>
    </Link>
  );
}
