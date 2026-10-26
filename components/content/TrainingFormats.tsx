import { Icon } from "@/components/ui/Icon";
import { SiteLink } from "@/components/ui/SiteLink";
import type { delivery } from "@/data/home";

export function TrainingFormats({ content }: { content: typeof delivery }) {
  return (
    <section className="sec" aria-labelledby="h-del">
      <div className="wrap del-grid">
        <div className="del-text">
          <h2 id="h-del" className="h2">
            {content.h2}
          </h2>
          <p>{content.prose}</p>
          <SiteLink href={content.link.href} className="all" arrow>
            {content.link.label}
          </SiteLink>
        </div>
        <dl className="formats">
          {content.formats.map((format) => (
            <div key={format.name}>
              <dt className="h3">
                <span className="ico-row">
                  <Icon name={format.icon} />
                  <SiteLink href={format.href}>{format.name}</SiteLink>
                </span>
              </dt>
              <dd>{format.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
