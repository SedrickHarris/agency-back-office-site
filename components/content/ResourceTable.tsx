import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ResourceHub } from "@/data/resources";

export function ResourceTable({
  headingId,
  h2,
  intro,
  columns,
  hubs,
  unavailable,
  seeAll,
}: {
  headingId: string;
  h2: string;
  intro: string;
  columns: { resource: string; covers: string; goTo: string };
  hubs: ResourceHub[];
  unavailable: string;
  seeAll: { label: string; href: string };
}) {
  return (
    <div>
      <SectionHeader id={headingId} title={h2} intro={intro} />
      <table className="mt-10 block w-full text-left lg:table">
        <thead className="hidden lg:table-header-group">
          <tr className="border-b border-ink">
            <th
              scope="col"
              className="w-[25%] pb-3 text-eyebrow font-display font-semibold uppercase"
            >
              {columns.resource}
            </th>
            <th
              scope="col"
              className="w-[55%] pb-3 text-eyebrow font-display font-semibold uppercase"
            >
              {columns.covers}
            </th>
            <th
              scope="col"
              className="w-[20%] pb-3 text-eyebrow font-display font-semibold uppercase"
            >
              {columns.goTo}
            </th>
          </tr>
        </thead>
        <tbody className="block lg:table-row-group">
          {hubs.map((hub) => (
            <tr
              key={hub.name}
              className="block border-b border-rule py-4 lg:table-row lg:py-0"
            >
              <th
                scope="row"
                className="block font-display text-h3 font-semibold lg:table-cell lg:py-4 lg:pr-4 lg:align-top"
              >
                {hub.name}
              </th>
              <td className="block text-muted lg:table-cell lg:py-4 lg:pr-4 lg:align-top">
                {hub.description}
              </td>
              <td className="mt-2 block lg:table-cell lg:py-4 lg:align-top">
                {hub.live ? (
                  <Link
                    href={hub.href}
                    className="font-semibold underline underline-offset-4"
                  >
                    {hub.linkLabel}
                  </Link>
                ) : (
                  <span className="text-small text-muted">{unavailable}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-6 font-display font-semibold">
        <Link href={seeAll.href} className="underline underline-offset-4">
          {seeAll.label}
        </Link>{" "}
        <span aria-hidden="true">&rarr;</span>
      </p>
    </div>
  );
}
