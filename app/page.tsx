import type { Metadata } from "next";
import { AudienceRouter } from "@/components/content/AudienceRouter";
import { DefinitionsStrip } from "@/components/content/DefinitionsStrip";
import { DeliveryFormats } from "@/components/content/DeliveryFormats";
import { FaqList } from "@/components/content/FaqList";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { ProofSection } from "@/components/content/ProofSection";
import { ResourceTable } from "@/components/content/ResourceTable";
import { ServiceIndex } from "@/components/content/ServiceIndex";
import { CtaBand } from "@/components/conversion/CtaBand";
import { Hero } from "@/components/pages/home/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import {
  LAST_REVIEWED,
  audienceRouter,
  closingCta,
  definitions,
  delivery,
  faq,
  hero,
  homeMeta,
  process,
  proofSection,
  resourcesSection,
  servicesIndex,
} from "@/data/home";
import { instructors, testimonials } from "@/data/proof";
import { resourceHubs } from "@/data/resources";
import { pageRobots } from "@/lib/metadata/robots";
import { homeSchemaGraph } from "@/lib/schema/home";

export const metadata: Metadata = {
  title: { absolute: homeMeta.title },
  description: homeMeta.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeMeta.title,
    description: homeMeta.description,
    url: "/",
    siteName: "Agency Back Office",
    type: "website",
  },
  robots: pageRobots(),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeSchemaGraph()} />

      <Hero content={hero} />

      <Section labelledBy="home-services-title">
        <ServiceIndex
          headingId="home-services-title"
          h2={servicesIndex.h2}
          intro={servicesIndex.intro}
          themes={servicesIndex.themes}
          moreLabel={servicesIndex.moreLabel}
          more={servicesIndex.more}
          seeAll={servicesIndex.seeAll}
        />
      </Section>

      <Section labelledBy="home-process-title">
        <SectionHeader
          id="home-process-title"
          title={process.h2}
          intro={process.intro}
        />
        <div className="mt-12">
          <ProcessSteps
            steps={process.steps}
            returnLabel={process.returnLabel}
          />
        </div>
      </Section>

      <Section labelledBy="home-audiences-title">
        <AudienceRouter
          headingId="home-audiences-title"
          h2={audienceRouter.h2}
          intro={audienceRouter.intro}
          rows={audienceRouter.rows}
          seeAll={audienceRouter.seeAll}
        />
      </Section>

      <Section labelledBy="home-definitions-title" tone="tint">
        <DefinitionsStrip
          headingId="home-definitions-title"
          h2={definitions.h2}
          lastReviewedLabel={definitions.lastReviewedLabel}
          lastReviewed={LAST_REVIEWED}
          items={definitions.items}
        />
      </Section>

      <Section labelledBy="home-delivery-title">
        <DeliveryFormats
          headingId="home-delivery-title"
          h2={delivery.h2}
          prose={delivery.prose}
          formats={delivery.formats}
          link={delivery.link}
        />
      </Section>

      <Section labelledBy="home-resources-title">
        <ResourceTable
          headingId="home-resources-title"
          h2={resourcesSection.h2}
          intro={resourcesSection.intro}
          columns={resourcesSection.columns}
          hubs={resourceHubs}
          unavailable={resourcesSection.unavailable}
          seeAll={resourcesSection.seeAll}
        />
      </Section>

      <ProofSection
        headingId="home-proof-title"
        h2={proofSection.h2}
        instructors={instructors}
        testimonials={testimonials}
      />

      <Section labelledBy="home-faq-title">
        <FaqList headingId="home-faq-title" h2={faq.h2} items={faq.items} />
      </Section>

      <CtaBand
        headingId="home-cta-title"
        h2={closingCta.h2}
        support={closingCta.support}
        cta={closingCta.cta}
      />

      <Container className="py-4">
        <p className="text-small text-muted">
          Home page content last reviewed:{" "}
          <time dateTime={LAST_REVIEWED}>October 25, 2026</time>
        </p>
      </Container>
    </>
  );
}
