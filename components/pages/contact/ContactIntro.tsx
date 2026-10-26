import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import type { intro } from "@/data/contact";

// Renders the label, H1 and lead, then the survey (passed as children), then
// the ruled list of what to write about. The DOM order is the mobile order, so
// reading order and tab order match what is on screen. On desktop the grid in
// styles/globals.css (.ct-grid) moves the survey to the right column.
export function ContactIntro({
  content,
  children,
}: {
  content: typeof intro;
  children: ReactNode;
}) {
  return (
    <>
      <div className="ct-intro">
        <p className="ct-label">{content.label}</p>
        <h1 className="ct-h1">{content.h1}</h1>
        <p className="ct-lead">{content.lead}</p>
      </div>
      {children}
      <div className="ct-list">
        <h2 className="ct-h2-sm">{content.listH2}</h2>
        <ol>
          {content.list.map((item) => (
            <li key={item.title} className="ct-row">
              <span className="ct-ico">
                <Icon name={item.icon} />
              </span>
              <div>
                <p className="ct-row-title">{item.title}</p>
                <p className="ct-row-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
