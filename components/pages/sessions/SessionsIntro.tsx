import {
  ChapterList,
  ReplayMeta,
  ReplayPosterImage,
  ReplaySlot,
  TopicLink,
} from "@/components/pages/sessions/ReplayParts";
import { ReplayScreen } from "@/components/pages/sessions/ReplayPlayer";
import { SiteLink } from "@/components/ui/SiteLink";
import type { Replay } from "@/data/replays";
import { emptyLibrary, intro, latestReplay } from "@/data/sessions";
import { getService } from "@/lib/content/registry";

// The intro (4/12) beside the latest replay (8/12). With no replays, one plain
// sentence takes the player's place and the "Newest first" line is left out.
export function SessionsIntro({ latest }: { latest?: Replay }) {
  return (
    <section className="wrap rp-top" aria-labelledby="h-sessions">
      <div className="rp-split">
        <div className="rp-col">
          <p className="eyebrow">{intro.label}</p>
          <h1 id="h-sessions" className="h1">
            {intro.h1}
          </h1>
          <p className="rp-lead">{intro.lead}</p>
          {latest ? <p className="rp-support">{intro.support}</p> : null}
          <p className="rp-live" data-rp-cta={intro.link.href}>
            <SiteLink href={intro.link.href} className="rp-tap">
              {intro.link.text}
            </SiteLink>
          </p>
        </div>

        {latest ? (
          <div id={latest.slug} className="rp-col rp-latest">
            <ReplaySlot replay={latest} placement="latest">
              <ReplayScreen
                poster={<ReplayPosterImage replay={latest} latest />}
              />
              <ChapterList replay={latest} />
            </ReplaySlot>
            <p className="eyebrow rp-latest-label">{latestReplay.label}</p>
            <h2 className="h2">{latest.title}</h2>
            <ReplayMeta replay={latest} />
            <p className="rp-desc">{latest.description}</p>
            <p className="rp-topic">
              <TopicLink replay={latest}>
                {latestReplay.topicLink(getService(latest.topicSlug).name)}
              </TopicLink>
            </p>
          </div>
        ) : (
          <div className="rp-col">
            <p>{emptyLibrary}</p>
          </div>
        )}
      </div>
    </section>
  );
}
