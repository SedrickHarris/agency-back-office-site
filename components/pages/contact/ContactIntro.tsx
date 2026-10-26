import { Icon } from "@/components/ui/Icon";
import type { intro } from "@/data/contact";

// Left column: label, H1, lead, and the ruled list of what to write about.
// On mobile the wrapper dissolves (display: contents) so the survey can sit
// between the lead and the list. See styles/globals.css (.ct-side).
export function ContactIntro({ content }: { content: typeof intro }) {
  return (
    <div className="ct-side">
      <div className="ct-intro">
        <p className="ct-label">{content.label}</p>
        <h1 className="ct-h1">{content.h1}</h1>
        <p className="ct-lead">{content.lead}</p>
      </div>
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
    </div>
  );
}
