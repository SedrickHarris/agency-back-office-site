import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SiteLink } from "@/components/ui/SiteLink";
import type { definitions } from "@/data/home";
import { formatLongDate } from "@/lib/utils/date";

export function DefinitionsGrid({
  content,
  lastReviewed,
}: {
  content: typeof definitions;
  lastReviewed: string;
}) {
  return (
    <section className="sec defs" aria-labelledby="h-defs">
      <div className="wrap">
        <div className="defs-head">
          <h2 id="h-defs" className="h2">
            {content.h2}
          </h2>
          <p className="small">
            {content.lastReviewedLabel}{" "}
            <time dateTime={lastReviewed}>{formatLongDate(lastReviewed)}</time>
          </p>
        </div>
        <div className="def-grid">
          {content.items.map((item) => (
            <div className="def" key={item.term}>
              <ImagePlaceholder subject={item.term} note={item.imageNote} />
              <div className="card-body">
                <h3>{item.term}</h3>
                <p>{item.body}</p>
                <SiteLink href={item.href} className="lnk" arrow>
                  {item.linkLabel}
                </SiteLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
