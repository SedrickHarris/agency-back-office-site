type Step = { label: string; description: string };

export function ProcessSteps({
  steps,
  returnLabel,
}: {
  steps: Step[];
  returnLabel: string;
}) {
  return (
    <div>
      <ol className="grid gap-0 lg:grid-cols-4 lg:gap-6">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className={`relative pb-8 pl-12 last:pb-0 lg:pb-0 lg:pl-0 ${
              index < steps.length - 1
                ? "before:absolute before:top-8 before:bottom-0 before:left-[15px] before:w-0.5 before:bg-rule lg:before:top-[15px] lg:before:right-0 lg:before:bottom-auto lg:before:left-10 lg:before:h-0.5 lg:before:w-auto"
                : ""
            }`}
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 z-10 grid size-8 place-items-center rounded-full border-2 border-ink bg-paper font-display text-small font-semibold lg:relative"
            >
              {index + 1}
            </span>
            <p className="font-display text-h3 font-semibold lg:mt-6">
              {step.label}
            </p>
            <p className="mt-2 text-muted lg:pr-4">{step.description}</p>
          </li>
        ))}
      </ol>
      <div
        aria-hidden="true"
        className="mt-8 hidden h-6 border-x-2 border-b-2 border-rule lg:block"
      />
      <p className="mt-4 font-display font-semibold">{returnLabel}</p>
    </div>
  );
}
