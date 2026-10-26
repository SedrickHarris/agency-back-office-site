import type { Metadata } from "next";
import { AudienceRouter } from "@/components/content/AudienceRouter";
import { DefinitionsGrid } from "@/components/content/DefinitionsGrid";
import { FaqList } from "@/components/content/FaqList";
import { ProcessTable } from "@/components/content/ProcessTable";
import { ProofSection } from "@/components/content/ProofSection";
import { ResourcesTable } from "@/components/content/ResourcesTable";
import { ServiceIndex } from "@/components/content/ServiceIndex";
import { TrainingFormats } from "@/components/content/TrainingFormats";
import { ClosingBand } from "@/components/conversion/ClosingBand";
import { Hero } from "@/components/pages/home/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
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
import { homeOpenGraph } from "@/lib/metadata/open-graph";
import { pageRobots } from "@/lib/metadata/robots";
import { homeSchemaGraph } from "@/lib/schema/home";
import { isProductionBuild } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: homeMeta.title },
  description: homeMeta.description,
  // Canonical is omitted until the site URL is set (the launch gate).
  alternates: isProductionBuild ? { canonical: "/" } : undefined,
  openGraph: homeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    title: homeMeta.title,
    description: homeMeta.description,
    images: ["/brand/og-home.png"],
  },
  robots: pageRobots(),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeSchemaGraph()} />

      {/* 1. Hero */}
      <Hero content={hero} />

      {/* 2. Service topics */}
      <ServiceIndex content={servicesIndex} />

      {/* 3. Process */}
      <ProcessTable content={process} />

      {/* 4. Audience router */}
      <AudienceRouter content={audienceRouter} />

      {/* 5. Definitions */}
      <DefinitionsGrid content={definitions} lastReviewed={LAST_REVIEWED} />

      {/* 6. Delivery */}
      <TrainingFormats content={delivery} />

      {/* 7. Resources */}
      <ResourcesTable content={resourcesSection} />

      {/* 8. PROOF: omitted until verified content exists (data/proof.ts is empty) */}
      <ProofSection
        heading={proofSection.h2}
        instructors={instructors}
        testimonials={testimonials}
      />

      {/* 9. FAQ */}
      <FaqList content={faq} />

      {/* 10. Closing CTA */}
      <ClosingBand content={closingCta} />
    </>
  );
}
