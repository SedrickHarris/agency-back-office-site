import type { Ref } from "react";
import { Icon } from "@/components/ui/Icon";

export type SummaryItem = { targetId: string; message: string };

// The heading receives focus. Each link moves focus to its field.
export function ErrorSummary({
  heading,
  items,
  headingRef,
}: {
  heading: string;
  items: SummaryItem[];
  headingRef: Ref<HTMLHeadingElement>;
}) {
  return (
    <div className="ct-alert ct-summary" role="alert">
      <h3 className="ct-alert-h" tabIndex={-1} ref={headingRef}>
        <Icon name="alert" />
        {heading}
      </h3>
      <ul>
        {items.map((item) => (
          <li key={item.targetId}>
            <a
              href={`#${item.targetId}`}
              onClick={(event) => {
                event.preventDefault();
                const target = document.getElementById(item.targetId);
                target?.focus();
                target?.scrollIntoView({ block: "center" });
              }}
            >
              {item.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
