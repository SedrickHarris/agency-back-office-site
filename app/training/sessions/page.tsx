import type { Metadata } from "next";
import { ClosingBand } from "@/components/conversion/ClosingBand";
import { KeepLearning } from "@/components/pages/sessions/KeepLearning";
import { ReplayFaq } from "@/components/pages/sessions/ReplayFaq";
import { ReplayLibrary } from "@/components/pages/sessions/ReplayLibrary";
import { SessionsClickEvents } from "@/components/pages/sessions/ReplayPlayer";
import { SessionsIntro } from "@/components/pages/sessions/SessionsIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { replays } from "@/data/replays";
import {
  SESSIONS_PATH,
  breadcrumb,
  closingBand,
  faq,
  keepLearning,
  sessionsMeta,
} from "@/data/sessions";
import { pageRobots } from "@/lib/metadata/robots";
import { sessionsSchemaGraph } from "@/lib/schema/sessions";
import { isProductionBuild } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: sessionsMeta.title },
  description: sessionsMeta.description,
  // Canonical is omitted until the site URL is set (the launch gate).
  alternates: isProductionBuild ? { canonical: SESSIONS_PATH } : undefined,
  // No image until a real brand Open Graph image exists.
  openGraph: {
    title: sessionsMeta.title,
    description: sessionsMeta.description,
    url: SESSIONS_PATH,
    siteName: "Agency Back Office",
    type: "website",
  },
  // noindex until the launch gate, then index and follow.
  robots: pageRobots(),
};

export default function SessionsPage() {
  // Newest first, so the first entry is the latest replay.
  const [latest, ...more] = replays;

  return (
    <div className="rp-page">
      <JsonLd data={sessionsSchemaGraph()} />
      <SessionsClickEvents />

      <div className="wrap rp-crumbs">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* 2. Intro and latest replay */}
      <SessionsIntro latest={latest} />

      {/* 3. More replays */}
      <ReplayLibrary items={more} />

      {/* 4. Keep learning */}
      <KeepLearning content={keepLearning} />

      {/* 5. Questions about replays */}
      <ReplayFaq content={faq} />

      {/* 6. Closing band */}
      <div data-rp-cta={closingBand.cta.href}>
        <ClosingBand content={closingBand} showLogo={false} />
      </div>
    </div>
  );
}
