import { Icon } from "@/components/ui/Icon";
import { SiteLink } from "@/components/ui/SiteLink";
import type { resourcesSection } from "@/data/home";

export function ResourcesTable({ content }: { content: typeof resourcesSection }) {
  return (
    <section className="sec rule-top" aria-labelledby="h-res">
      <div className="wrap">
        <div className="res-head" style={{ maxWidth: "40rem" }}>
          <h2 id="h-res" className="h2">
            {content.h2}
          </h2>
          <p>{content.intro}</p>
        </div>
        <table className="res">
          <caption>{content.caption}</caption>
          <thead>
            <tr>
              <th scope="col">{content.columns.resource}</th>
              <th scope="col">{content.columns.covers}</th>
              <th scope="col">{content.columns.goTo}</th>
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row) => (
              <tr key={row.name}>
                <td>
                  <span className="ico-row">
                    <Icon name={row.icon} />
                    {row.name}
                  </span>
                </td>
                <td>{row.description}</td>
                <td>
                  <SiteLink href={row.href}>{row.linkLabel}</SiteLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <SiteLink href={content.seeAll.href} className="res-all" arrow>
          {content.seeAll.label}
        </SiteLink>
      </div>
    </section>
  );
}
