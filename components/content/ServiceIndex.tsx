import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getService, serviceHref } from "@/lib/content/registry";
import { serviceThemes, type ServiceTheme } from "@/data/services";

type Theme = { id: ServiceTheme; slugs: string[] };
type More = { slug: string; suffix?: string };

export function ServiceIndex({
  headingId,
  h2,
  intro,
  themes,
  moreLabel,
  more,
  seeAll,
}: {
  headingId: string;
  h2: string;
  intro: string;
  themes: Theme[];
  moreLabel: string;
  more: More[];
  seeAll: { label: string; href: string };
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-3">
        <SectionHeader
          id={headingId}
          title={h2}
          intro={intro}
          className="lg:sticky lg:top-8"
        />
      </div>
      <div className="space-y-12 lg:col-span-9">
        {themes.map((theme) => (
          <div key={theme.id} className="border-t border-rule pt-4">
            <h3 className="text-eyebrow font-display font-semibold uppercase">
              {serviceThemes[theme.id]}
            </h3>
            <ul className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {theme.slugs.map((slug) => {
                const service = getService(slug);
                return (
                  <li key={slug}>
                    <Link
                      href={serviceHref(slug)}
                      className="font-display text-h3 font-semibold underline decoration-rule underline-offset-4 hover:decoration-accent"
                    >
                      {service.name}
                    </Link>
                    {service.description ? (
                      <p className="mt-2 text-muted">{service.description}</p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <div className="border-t border-rule pt-4">
          <h3 className="text-eyebrow font-display font-semibold uppercase">
            {moreLabel}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-small">
            {more.map((item) => (
              <li key={item.slug}>
                <Link
                  href={serviceHref(item.slug)}
                  className="underline underline-offset-4"
                >
                  {getService(item.slug).name}
                </Link>
                {item.suffix ? (
                  <span className="text-muted"> {item.suffix}</span>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-display font-semibold">
            <Link href={seeAll.href} className="underline underline-offset-4">
              {seeAll.label}
            </Link>{" "}
            <span aria-hidden="true">&rarr;</span>
          </p>
        </div>
      </div>
    </div>
  );
}
