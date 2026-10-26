import type { Metadata } from "next";
import { AnnotatedExample } from "@/components/pages/contact/AnnotatedExample";
import { ContactIntro } from "@/components/pages/contact/ContactIntro";
import { ContactSurvey } from "@/components/pages/contact/ContactSurvey";
import { GetStartedBand } from "@/components/pages/contact/GetStartedBand";
import { OptionsTable } from "@/components/pages/contact/OptionsTable";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  CONTACT_PATH,
  breadcrumb,
  contactMeta,
  example,
  getStartedBand,
  intro,
  options,
} from "@/data/contact";
import { pageRobots } from "@/lib/metadata/robots";
import { contactSchemaGraph } from "@/lib/schema/contact";
import { isProductionBuild } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: contactMeta.title },
  description: contactMeta.description,
  // Canonical is omitted until the site URL is set (the launch gate).
  alternates: isProductionBuild ? { canonical: CONTACT_PATH } : undefined,
  // No image until a real brand Open Graph image exists.
  openGraph: {
    title: contactMeta.title,
    description: contactMeta.description,
    url: CONTACT_PATH,
    siteName: "Agency Back Office",
    type: "website",
  },
  // noindex until the launch gate, then index and follow.
  robots: pageRobots(),
};

export default function ContactPage() {
  return (
    <div className="ct-page">
      <JsonLd data={contactSchemaGraph()} />

      <div className="wrap ct-crumbs">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* 2. Intro and survey */}
      <section className="wrap ct-main" aria-labelledby="h-survey">
        <div className="ct-grid">
          <ContactIntro content={intro} />
          <ContactSurvey />
        </div>
      </section>

      {/* 3. Useful message */}
      <AnnotatedExample content={example} />

      {/* 4. Not ready to write */}
      <OptionsTable content={options} />

      {/* 5. Ready to start instead */}
      <GetStartedBand content={getStartedBand} />
    </div>
  );
}
