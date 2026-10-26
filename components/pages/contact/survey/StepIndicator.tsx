import { TOTAL_STEPS, survey } from "@/data/contact";

// The text is the real indicator. The segments are decorative.
export function StepIndicator({ step }: { step: number }) {
  return (
    <div className="ct-progress">
      <p className="ct-label">{survey.progress(step)}</p>
      <div className="ct-segs" aria-hidden="true">
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <span key={index} className={index < step ? "ct-seg on" : "ct-seg"} />
        ))}
      </div>
    </div>
  );
}
