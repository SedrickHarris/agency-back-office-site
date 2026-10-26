import { Icon } from "@/components/ui/Icon";
import { SiteLink } from "@/components/ui/SiteLink";
import type { getStartedBand } from "@/data/contact";

// A text link, not a button: the survey's Send message button stays the only
// dominant CTA on the page.
export function GetStartedBand({ content }: { content: typeof getStartedBand }) {
  return (
    <section className="ct-band" aria-labelledby="h-next-step">
      <div className="wrap ct-band-inner">
        <div className="ct-band-text">
          <h2 id="h-next-step" className="ct-h2-sm">
            {content.h2}
          </h2>
          <p>{content.text}</p>
        </div>
        <SiteLink href={content.href} className="ct-band-link">
          {content.linkText}
          <Icon name="arrow" />
        </SiteLink>
      </div>
    </section>
  );
}
