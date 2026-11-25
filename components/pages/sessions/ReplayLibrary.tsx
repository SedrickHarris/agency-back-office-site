import {
  ChapterList,
  ReplayMeta,
  ReplayPosterImage,
  ReplaySlot,
} from "@/components/pages/sessions/ReplayParts";
import {
  ReplayScreen,
  ReplayWatchLink,
} from "@/components/pages/sessions/ReplayPlayer";
import type { Replay } from "@/data/replays";
import { library } from "@/data/sessions";

// Every replay after the latest one, as a ruled list. Renders nothing when
// there is none. Chapters sit in the text column, so that reading and tab
// order stay player, title, details, chapters.
export function ReplayLibrary({ items }: { items: readonly Replay[] }) {
  if (items.length === 0) return null;

  return (
    <section className="wrap rp-library" aria-labelledby="h-more">
      <div className="rp-library-head">
        <h2 id="h-more" className="h2">
          {library.h2}
        </h2>
        <p className="rp-meta">{library.count(items.length)}</p>
      </div>
      <ol className="rp-rows">
        {items.map((replay) => (
          <li key={replay.slug} id={replay.slug} className="rp-row">
            <ReplaySlot replay={replay} placement="library">
              <ReplayScreen poster={<ReplayPosterImage replay={replay} />} />
              <div>
                <h3 className="rp-title">{replay.title}</h3>
                <ReplayMeta replay={replay} linkTopic />
                <p className="rp-desc">{replay.description}</p>
                <ReplayWatchLink />
                <ChapterList replay={replay} />
              </div>
            </ReplaySlot>
          </li>
        ))}
      </ol>
    </section>
  );
}
