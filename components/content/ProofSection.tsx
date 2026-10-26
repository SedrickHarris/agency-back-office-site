import Image from "next/image";
import type { Instructor, Testimonial } from "@/data/proof";

// Renders only from verified data in data/proof.ts. Returns null while that
// data is empty, so no proof section ships until content is supplied.
export function ProofSection({
  heading,
  instructors,
  testimonials,
}: {
  heading: string;
  instructors: Instructor[];
  testimonials: Testimonial[];
}) {
  if (instructors.length === 0 && testimonials.length === 0) return null;

  return (
    <section className="sec rule-top" aria-labelledby="h-proof">
      <div className="wrap">
        <h2 id="h-proof" className="h2">
          {heading}
        </h2>
        <div style={{ marginTop: 48 }}>
          {instructors.map((person) => (
            <div key={person.name}>
              {person.photo ? (
                <Image
                  src={person.photo.src}
                  alt={person.photo.alt}
                  width={person.photo.width}
                  height={person.photo.height}
                />
              ) : null}
              <p className="h3">{person.name}</p>
              <p className="small">{person.role}</p>
              <p style={{ marginTop: 16, maxWidth: "68ch" }}>
                {person.background}
              </p>
            </div>
          ))}
          {testimonials.map((item) => (
            <blockquote
              key={item.quote}
              style={{ margin: "32px 0 0", maxWidth: "68ch" }}
            >
              <p className="h3">{item.quote}</p>
              <footer className="small">
                <cite style={{ fontStyle: "normal" }}>{item.attribution}</cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
