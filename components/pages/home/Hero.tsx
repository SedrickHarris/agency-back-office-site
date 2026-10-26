import { SiteLink } from "@/components/ui/SiteLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { hero } from "@/data/home";

export function Hero({ content }: { content: typeof hero }) {
  return (
    <section className="hero" aria-labelledby="h-hero">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 id="h-hero" className="h1">
            {content.h1}
          </h1>
          <p className="lead">{content.definition}</p>
          <p className="support">{content.supporting}</p>
          <div className="cta-row">
            <ButtonLink href={content.primaryCta.href}>
              {content.primaryCta.label}
            </ButtonLink>
            <SiteLink href={content.secondaryCta.href} className="sec-link">
              {content.secondaryCta.label}
            </SiteLink>
          </div>
        </div>
        <figure className="diagram" aria-labelledby="h-diagram">
          <p id="h-diagram" className="dtitle">
            {content.diagram.title}
          </p>
          <ol className="flow">
            {content.diagram.steps.map((step, index) => (
              <li key={step.label}>
                <span className="mark" aria-hidden="true">
                  {index + 1}
                </span>
                <p className="step">{step.label}</p>
                <p>
                  {"callout" in step && step.callout ? (
                    <>
                      <span className="ann">{step.callout}:</span>{" "}
                    </>
                  ) : null}
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
          <figcaption className="small">{content.diagram.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
