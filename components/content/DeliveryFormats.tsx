import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Format = { name: string; href: string; description: string };

export function DeliveryFormats({
  headingId,
  h2,
  prose,
  formats,
  link,
}: {
  headingId: string;
  h2: string;
  prose: string;
  formats: Format[];
  link: { label: string; href: string };
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <SectionHeader id={headingId} title={h2} intro={prose} />
        <p className="mt-6 font-display font-semibold">
          <Link href={link.href} className="underline underline-offset-4">
            {link.label}
          </Link>{" "}
          <span aria-hidden="true">&rarr;</span>
        </p>
      </div>
      <dl className="border-b border-rule lg:col-span-7">
        {formats.map((format) => (
          <div key={format.name} className="border-t border-rule py-5">
            <dt>
              <Link
                href={format.href}
                className="font-display text-h3 font-semibold underline decoration-rule underline-offset-4 hover:decoration-accent"
              >
                {format.name}
              </Link>
            </dt>
            <dd className="mt-2 max-w-[60ch] text-muted">
              {format.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
