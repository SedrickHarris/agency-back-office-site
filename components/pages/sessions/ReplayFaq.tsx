import { SiteLink } from "@/components/ui/SiteLink";
import type { faq } from "@/data/sessions";

// Native details and summary, as on the home page: works without JavaScript.
export function ReplayFaq({ content }: { content: typeof faq }) {
  return (
    <section className="rp-faq" aria-labelledby="h-faq">
      <div className="wrap rp-split">
        <h2 id="h-faq" className="h2">
          {content.h2}
        </h2>
        <div className="rp-faq-list">
          {content.items.map((item) => (
            <details
              className="q"
              key={item.question}
              open={item.open ? true : undefined}
            >
              <summary>{item.question}</summary>
              <p className="ans">
                {item.answer.map((part, index) =>
                  typeof part === "string" ? (
                    part
                  ) : (
                    <SiteLink key={index} href={part.href}>
                      {part.text}
                    </SiteLink>
                  ),
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
