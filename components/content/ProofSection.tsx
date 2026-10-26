import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Instructor, Testimonial } from "@/data/proof";

export function ProofSection({
  headingId,
  h2,
  instructors,
  testimonials,
}: {
  headingId: string;
  h2: string;
  instructors: Instructor[];
  testimonials: Testimonial[];
}) {
  // Renders only from verified data. Omitted entirely when there is none.
  if (instructors.length === 0 && testimonials.length === 0) return null;

  const hasBoth = instructors.length > 0 && testimonials.length > 0;

  return (
    <Section labelledBy={headingId}>
      <SectionHeader id={headingId} title={h2} />
      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
        {instructors.length > 0 ? (
          <div className={hasBoth ? "lg:col-span-6" : "lg:col-span-8"}>
            {instructors.map((person) => (
              <div key={person.name}>
                {person.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={person.photo.src}
                    alt={person.photo.alt}
                    width={person.photo.width}
                    height={person.photo.height}
                    className="mb-6 h-auto max-w-[240px] rounded-sm"
                  />
                ) : null}
                <p className="font-display text-h3 font-semibold">
                  {person.name}
                </p>
                <p className="text-small text-muted">{person.role}</p>
                <p className="mt-4 max-w-[68ch]">{person.background}</p>
              </div>
            ))}
          </div>
        ) : null}
        {testimonials.length > 0 ? (
          <div
            className={
              hasBoth ? "lg:col-span-6" : "lg:col-span-8"
            }
          >
            {testimonials.map((item) => (
              <blockquote
                key={item.quote}
                className="border-t border-rule py-6 first:border-t-0 first:pt-0"
              >
                <p className="font-display text-lead font-medium">
                  {item.quote}
                </p>
                <footer className="mt-3 text-small text-muted">
                  <cite className="not-italic">{item.attribution}</cite>
                </footer>
              </blockquote>
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
