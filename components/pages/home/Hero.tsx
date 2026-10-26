import Link from "next/link";
import { HeroWorkflowDiagram } from "@/components/content/HeroWorkflowDiagram";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import type { hero } from "@/data/home";

export function Hero({ content }: { content: typeof hero }) {
  return (
    <Section
      labelledBy="home-hero-title"
      className="pt-10 pb-16 lg:pt-16 lg:pb-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="lg:col-span-7">
          <p className="text-eyebrow font-display font-semibold uppercase">
            {content.eyebrow}
          </p>
          <h1
            id="home-hero-title"
            className="mt-4 max-w-[16ch] font-display text-h1 font-bold sm:max-w-[20ch]"
          >
            {content.h1}
          </h1>
          <p className="mt-6 max-w-[68ch] border-l-2 border-ink pl-5 text-lead">
            {content.definition}
          </p>
          <p className="mt-4 max-w-[68ch] text-muted">{content.supporting}</p>
          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink href={content.primaryCta.href}>
              {content.primaryCta.label}
            </ButtonLink>
            <Link
              href={content.secondaryCta.href}
              className="text-center font-semibold underline underline-offset-4 sm:text-left"
            >
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <HeroWorkflowDiagram
            title={content.diagram.title}
            steps={content.diagram.steps}
            caption={content.diagram.caption}
          />
        </div>
      </div>
    </Section>
  );
}
