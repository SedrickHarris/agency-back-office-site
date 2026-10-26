import { SiteLink } from "@/components/ui/SiteLink";
import type { faq } from "@/data/home";

// Native details and summary: works without JavaScript. The two columns
// stack on mobile.
export function FaqList({ content }: { content: typeof faq }) {
  return (
    <section className="sec rule-top" aria-labelledby="h-faq">
      <div className="wrap">
        <div className="faq-wrap">
          <h2 id="h-faq" className="h2">
            {content.h2}
          </h2>
          <div className="faq-cols">
            {content.columns.map((column) => (
              <div className="faq-col" key={column.label}>
                <p className="faq-label">{column.label}</p>
                {column.items.map((item) => (
                  <details
                    className="q"
                    key={item.question}
                    open={"open" in item && item.open ? true : undefined}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
