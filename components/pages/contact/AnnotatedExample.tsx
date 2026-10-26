import type { example } from "@/data/contact";

// Built from text, not an image. The numbered badges inside the message are
// decorative; the numbered list below carries the same information as text.
export function AnnotatedExample({ content }: { content: typeof example }) {
  return (
    <section className="ct-sec" aria-labelledby="h-example">
      <div className="wrap">
        <div className="ct-sec-grid">
          <div>
            <h2 id="h-example" className="ct-h2">
              {content.h2}
            </h2>
            <p className="ct-sec-intro">{content.intro}</p>
          </div>
          <div>
            <div className="ct-example">
              <p className="ct-label">{content.label}</p>
              <p className="ct-example-text">
                {content.parts.map((part, index) => (
                  <span key={part.n}>
                    <span className="ct-hl">
                      {part.text}
                      <span className="ct-badge" aria-hidden="true">
                        {part.n}
                      </span>
                    </span>
                    {content.joiners[index] ?? ""}
                  </span>
                ))}
              </p>
            </div>
            <ol className="ct-callouts">
              {content.callouts.map((callout) => (
                <li key={callout.n} className="ct-row">
                  <span className="ct-badge ct-badge-lg" aria-hidden="true">
                    {callout.n}
                  </span>
                  <p>
                    <strong>{callout.title}</strong>{" "}
                    <span>{callout.text}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
