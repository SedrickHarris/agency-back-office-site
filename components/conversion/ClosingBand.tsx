import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Logo } from "@/components/ui/Logo";
import { SiteLink } from "@/components/ui/SiteLink";

type ClosingContent = {
  h2: string;
  support: string;
  cta: { label: string; href: string };
  // The image column renders only when an image is supplied.
  imageNote?: string;
  image?: { src: string; alt: string };
};

export function ClosingBand({
  content,
  showLogo = true,
}: {
  content: ClosingContent;
  showLogo?: boolean;
}) {
  return (
    <section className="band on-dark" aria-labelledby="h-cta">
      <div className="wrap">
        <div className="txt">
          {showLogo ? <Logo variant="horizontal-dark" /> : null}
          <h2 id="h-cta" className="h2">
            {content.h2}
          </h2>
          <p>{content.support}</p>
          <div className="act">
            <SiteLink href={content.cta.href} className="btn" arrow>
              {content.cta.label}
            </SiteLink>
          </div>
        </div>
        {content.image ? (
          <div className="media">
            <ImagePlaceholder
              aspect="4:3"
              variant="dark"
              subject="the closing call to action"
              note={content.imageNote ?? ""}
              image={{ ...content.image, width: 1448, height: 1086 }}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
