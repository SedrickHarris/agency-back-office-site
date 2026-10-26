import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Item = { term: string; body: string; linkLabel: string; href: string };

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function DefinitionsStrip({
  headingId,
  h2,
  lastReviewedLabel,
  lastReviewed,
  items,
}: {
  headingId: string;
  h2: string;
  lastReviewedLabel: string;
  lastReviewed: string;
  items: Item[];
}) {
  return (
    <div>
      <SectionHeader id={headingId} title={h2} />
      <p className="mt-3 text-small text-muted">
        {lastReviewedLabel}{" "}
        <time dateTime={lastReviewed}>{formatDate(lastReviewed)}</time>
      </p>
      <dl className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.term} className="border-t border-rule pt-6">
            <dt className="font-display text-[1.5rem] leading-tight font-bold">
              {item.term}
            </dt>
            <dd className="mt-3 max-w-[60ch]">
              <p>{item.body}</p>
              <p className="mt-3 font-semibold">
                <Link
                  href={item.href}
                  className="text-accent underline underline-offset-4"
                >
                  {item.linkLabel}
                </Link>{" "}
                <span aria-hidden="true">&rarr;</span>
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
