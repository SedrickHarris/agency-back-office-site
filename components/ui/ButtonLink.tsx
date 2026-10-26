import Link from "next/link";

type Variant = "primary" | "inverse";

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-paper hover:bg-accent-strong",
  inverse: "bg-paper text-ink hover:bg-tint",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-6 py-3 font-sans text-body font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}
