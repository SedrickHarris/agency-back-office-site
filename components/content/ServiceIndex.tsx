import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SiteLink } from "@/components/ui/SiteLink";
import { serviceThemes } from "@/data/services";
import type { servicesIndex } from "@/data/home";
import { getService, serviceHref } from "@/lib/content/registry";

export function ServiceIndex({ content }: { content: typeof servicesIndex }) {
  return (
    <section className="sec rule-top" aria-labelledby="h-topics">
      <div className="wrap svc-grid">
        <div className="svc-aside">
          <div className="inner">
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              {content.eyebrow}
            </p>
            <h2 id="h-topics" className="h2">
              {content.h2}
            </h2>
            <p>{content.intro}</p>
          </div>
        </div>
        <div className="svc-main">
          {content.themes.map((theme) => (
            <div key={theme.id}>
              <h3 className="group-label">{serviceThemes[theme.id]}</h3>
              <ul className="topics cards">
                {theme.slugs.map((slug) => {
                  const service = getService(slug);
                  return (
                    <li key={slug}>
                      <ImagePlaceholder
                        subject={service.name}
                        note={service.imageNote ?? "image"}
                      />
                      <div className="card-body">
                        <h4 className="h3">
                          <SiteLink href={serviceHref(slug)}>
                            {service.name}
                          </SiteLink>
                        </h4>
                        <p>{service.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div className="more">
            <h3 className="group-label">{content.moreLabel}</h3>
            <ul>
              {content.more.map((item) => (
                <li key={item.slug}>
                  <SiteLink href={serviceHref(item.slug)}>
                    {getService(item.slug).name}
                  </SiteLink>
                  {"suffix" in item && item.suffix ? (
                    <>
                      {" "}
                      <span className="small">{item.suffix}</span>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="all-link">
              <SiteLink href={content.seeAll.href} arrow>
                {content.seeAll.label}
              </SiteLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
