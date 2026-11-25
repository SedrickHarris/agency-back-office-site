import { SiteLink } from "@/components/ui/SiteLink";
import type { keepLearning } from "@/data/sessions";

const LIVE_TRAINING = "/training/live/";

export function KeepLearning({ content }: { content: typeof keepLearning }) {
  return (
    <section className="rp-keep" aria-labelledby="h-keep">
      <div className="wrap rp-split">
        <h2 id="h-keep" className="h2">
          {content.h2}
        </h2>
        <ul className="rp-keep-list">
          {content.rows.map((row) => (
            <li
              key={row.href}
              // Only the Live training link reports sessions_cta_click.
              data-rp-cta={row.href === LIVE_TRAINING ? row.href : undefined}
            >
              <SiteLink href={row.href} className="rp-keep-link">
                {row.title}
              </SiteLink>
              <p>{row.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
