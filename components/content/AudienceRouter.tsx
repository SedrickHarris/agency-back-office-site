import { SiteLink } from "@/components/ui/SiteLink";
import type { audienceRouter } from "@/data/home";
import { audienceHref, getAudience } from "@/lib/content/registry";

export function AudienceRouter({ content }: { content: typeof audienceRouter }) {
  return (
    <section className="sec rule-top" aria-labelledby="h-aud">
      <div className="wrap">
        <div className="aud-head">
          <h2 id="h-aud" className="h2">
            {content.h2}
          </h2>
          <p>{content.intro}</p>
        </div>
        <ul className="rows">
          {content.rows.map((row) => {
            // Validates the slug against the audience registry at build time.
            getAudience(row.slug);
            return (
              <li key={row.slug}>
                <p className="stmt">&ldquo;{row.statement}&rdquo;</p>
                <p className="go">
                  <SiteLink href={audienceHref(row.slug)} arrow>
                    {row.linkLabel}
                  </SiteLink>
                </p>
              </li>
            );
          })}
        </ul>
        <p style={{ marginTop: 28, fontWeight: 600 }}>
          <SiteLink href={content.seeAll.href} arrow>
            {content.seeAll.label}
          </SiteLink>
        </p>
      </div>
    </section>
  );
}
