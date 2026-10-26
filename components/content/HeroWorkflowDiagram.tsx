type Step = {
  label: string;
  description: string;
  callout?: string;
};

export function HeroWorkflowDiagram({
  title,
  steps,
  caption,
}: {
  title: string;
  steps: Step[];
  caption: string;
}) {
  return (
    <figure aria-labelledby="hero-diagram-title" className="lg:pl-6">
      <p
        id="hero-diagram-title"
        className="text-eyebrow font-display font-semibold uppercase"
      >
        {title}
      </p>
      <ol className="mt-6">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className={`relative pb-8 pl-12 last:pb-0 ${
              index < steps.length - 1
                ? "before:absolute before:top-8 before:bottom-0 before:left-[15px] before:w-0.5 before:bg-rule"
                : ""
            }`}
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 grid size-8 place-items-center rounded-full border-2 border-ink bg-paper font-display text-small font-semibold"
            >
              {index + 1}
            </span>
            <p className="font-display text-h3 font-semibold">{step.label}</p>
            <p className="mt-1 text-muted">
              {step.callout ? (
                <>
                  <strong className="font-semibold text-ink">
                    {step.callout}:
                  </strong>{" "}
                </>
              ) : null}
              {step.description}
            </p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 border-t border-rule pt-3 text-small text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
