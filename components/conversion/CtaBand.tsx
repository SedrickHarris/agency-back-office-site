import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";

export function CtaBand({
  headingId,
  h2,
  support,
  cta,
}: {
  headingId: string;
  h2: string;
  support: string;
  cta: { label: string; href: string };
}) {
  return (
    <Section labelledBy={headingId} tone="ink" className="py-14 lg:py-20">
      <div className="lg:max-w-[66%]">
        <h2 id={headingId} className="font-display text-h2 font-bold">
          {h2}
        </h2>
        <p className="mt-4 max-w-[68ch]">{support}</p>
        <div className="mt-8">
          <ButtonLink
            href={cta.href}
            variant="inverse"
            className="w-full sm:w-auto"
          >
            {cta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
