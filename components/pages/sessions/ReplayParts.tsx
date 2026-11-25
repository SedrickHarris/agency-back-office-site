// Server-rendered pieces shared by the latest replay and the library rows.
import {
  ReplayChapters,
  ReplayProvider,
} from "@/components/pages/sessions/ReplayPlayer";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SiteLink } from "@/components/ui/SiteLink";
import { formatDuration, formatSeconds, type Replay } from "@/data/replays";
import { player } from "@/data/sessions";
import { getService, serviceHref } from "@/lib/content/registry";
import { formatLongDate } from "@/lib/utils/date";
import type { ReactNode } from "react";

export function ReplaySlot({
  replay,
  placement,
  children,
}: {
  replay: Replay;
  placement: "latest" | "library";
  children: ReactNode;
}) {
  return (
    <ReplayProvider
      slug={replay.slug}
      title={replay.title}
      youtubeId={replay.youtubeId}
      duration={formatDuration(replay.duration)}
      placement={placement}
      playY={replay.playY}
    >
      {children}
    </ReplayProvider>
  );
}

export function ReplayPosterImage({
  replay,
  latest = false,
}: {
  replay: Replay;
  latest?: boolean;
}) {
  return (
    <ImagePlaceholder
      aspect="16:9"
      variant={latest ? "dark" : "light"}
      note={player.posterNote}
      subject={replay.title}
      image={replay.poster}
      eager={latest}
    />
  );
}

export function ChapterList({ replay }: { replay: Replay }) {
  return (
    <ReplayChapters
      chapters={(replay.chapters ?? []).map((chapter) => ({
        ...chapter,
        time: formatSeconds(chapter.startSeconds),
      }))}
    />
  );
}

// A topic link that reports replay_topic_click.
export function TopicLink({
  replay,
  children,
}: {
  replay: Replay;
  children: ReactNode;
}) {
  return (
    <span data-rp-topic={replay.topicSlug} data-rp-replay={replay.slug}>
      <SiteLink href={serviceHref(replay.topicSlug)} className="rp-tap">
        {children}
      </SiteLink>
    </span>
  );
}

// Recorded date, duration and topic, separated by hyphens.
export function ReplayMeta({
  replay,
  linkTopic = false,
}: {
  replay: Replay;
  linkTopic?: boolean;
}) {
  const topic = getService(replay.topicSlug).name;

  return (
    <p className="rp-meta">
      <time dateTime={replay.recordedOn}>
        {formatLongDate(replay.recordedOn)}
      </time>
      {" - "}
      <time dateTime={replay.duration}>{formatDuration(replay.duration)}</time>
      {" - "}
      {linkTopic ? <TopicLink replay={replay}>{topic}</TopicLink> : topic}
    </p>
  );
}
