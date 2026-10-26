import { ButtonLink } from "@/components/ui/ButtonLink";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Logo } from "@/components/ui/Logo";
import type { closingCta } from "@/data/home";

export function ClosingBand({ content }: { content: typeof closingCta }) {
  return (
    <section className="band on-dark" aria-labelledby="h-cta">
      <div className="wrap">
        <div className="txt">
          <Logo variant="horizontal-dark" />
          <h2 id="h-cta" className="h2">
            {content.h2}
          </h2>
          <p>{content.support}</p>
          <div className="act">
            <ButtonLink href={content.cta.href}>{content.cta.label}</ButtonLink>
          </div>
        </div>
        <div className="media">
          <ImagePlaceholder
            aspect="4:3"
            variant="dark"
            subject="the closing call to action"
            note={content.imageNote}
          />
        </div>
      </div>
    </section>
  );
}
