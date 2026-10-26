import { Icon } from "@/components/ui/Icon";
import { SiteLink } from "@/components/ui/SiteLink";
import type { options } from "@/data/contact";

export function OptionsTable({ content }: { content: typeof options }) {
  return (
    <section className="ct-sec" aria-labelledby="h-options">
      <div className="wrap">
        <div className="ct-sec-rule">
          <h2 id="h-options" className="ct-h2">
            {content.h2}
          </h2>
          <p className="ct-sec-intro">{content.intro}</p>
          <ul className="ct-options">
            {content.rows.map((row) => (
              <li key={row.href} className="ct-row ct-opt">
                <span className="ct-ico">
                  <Icon name={row.icon} />
                </span>
                <div className="ct-opt-body">
                  <SiteLink href={row.href} className="ct-opt-link">
                    {row.title}
                  </SiteLink>
                  <p className="ct-row-text">{row.text}</p>
                </div>
                <Icon name="arrow" className="ct-opt-arrow" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
