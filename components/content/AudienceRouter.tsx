import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { audienceHref, getAudience } from "@/lib/content/registry";

type Row = { slug: string; statement: string; linkLabel: string };

export function AudienceRouter({
  headingId,
  h2,
  intro,
  rows,
  seeAll,
}: {
  headingId: string;
  h2: string;
  intro: string;
  rows: Row[];
  seeAll: { label: string; href: string };
}) {
  return (
    <div>
      <SectionHeader
        id={headingId}
        title={h2}
        intro={intro}
        className="lg:max-w-[66%]"
      />
      <ul className="mt-10 border-b border-rule">
        {rows.map((row) => {
          // Validates the slug against the audience registry at build time.
          getAudience(row.slug);
          return (
            <li
              key={row.slug}
              className="grid gap-3 border-t border-rule py-5 hover:bg-tint lg:grid-cols-12 lg:gap-8 lg:px-2"
            >
              <p className="font-display text-lead font-semibold lg:col-span-8">
                {row.statement}
              </p>
              <p className="lg:col-span-4 lg:text-right">
                <Link
                  href={audienceHref(row.slug)}
                  className="font-semibold underline underline-offset-4"
                >
                  {row.linkLabel}
                </Link>{" "}
                <span aria-hidden="true">&rarr;</span>
              </p>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 font-display font-semibold">
        <Link href={seeAll.href} className="underline underline-offset-4">
          {seeAll.label}
        </Link>{" "}
        <span aria-hidden="true">&rarr;</span>
      </p>
    </div>
  );
}
