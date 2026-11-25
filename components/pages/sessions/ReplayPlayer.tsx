"use client";

// All client JavaScript for the Sessions page: the replay player parts and the
// click events. Everything else on the page is a server component.
//
// A facade, not an embed: the server renders a real link to the YouTube watch
// URL, so it works without JavaScript and nothing is requested from YouTube
// until the visitor clicks. After hydration the link behaves as a button that
// swaps in the youtube-nocookie.com iframe. The YouTube IFrame API is not used.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { Icon } from "@/components/ui/Icon";
import { SESSIONS_PATH, library, player, sessionsEvents } from "@/data/sessions";
import { trackEvent } from "@/lib/analytics";

type Video = {
  slug: string;
  title: string;
  youtubeId: string;
  // Already formatted for display, for example 42:07.
  duration: string;
  placement: "latest" | "library";
  // Percentage from the top. Unset keeps the centered default in the CSS.
  playY?: number;
};

// run changes on every start, so the iframe reloads and takes focus again.
type Playback = { start: number; run: number } | null;

type ReplayState = {
  video: Video;
  playback: Playback;
  frame: RefObject<HTMLIFrameElement | null>;
  play: (start?: number) => void;
};

const ReplayContext = createContext<ReplayState | null>(null);

function useReplay(): ReplayState {
  const state = useContext(ReplayContext);
  if (!state) throw new Error("Replay parts need a ReplayProvider");
  return state;
}

// False in the server render and during hydration, then true.
const subscribe = () => () => {};
function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

// Shares one replay's playback between its screen, watch link and chapters.
// Renders no markup of its own.
export function ReplayProvider({
  children,
  ...video
}: Video & { children: ReactNode }) {
  const [playback, setPlayback] = useState<Playback>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const { slug, placement } = video;
  const playing = playback !== null;

  // start is set only by a chapter.
  const play = useCallback(
    (start?: number) => {
      // Already playing and no new position asked for: go to the player.
      if (playing && start === undefined) {
        frame.current?.focus();
        return;
      }
      trackEvent(sessionsEvents.play, {
        page_path: SESSIONS_PATH,
        replay_slug: slug,
        placement,
      });
      setPlayback((current) => ({
        start: start ?? 0,
        run: (current?.run ?? 0) + 1,
      }));
    },
    [playing, slug, placement],
  );

  const run = playback?.run;
  useEffect(() => {
    if (run !== undefined) frame.current?.focus();
  }, [run]);

  return (
    <ReplayContext.Provider value={{ video, playback, frame, play }}>
      {children}
    </ReplayContext.Provider>
  );
}

// A link to YouTube that acts as a button once JavaScript is running. Modified
// clicks (new tab, new window) keep the normal link behavior.
function PlayControl({
  href,
  start,
  className,
  label,
  children,
}: {
  href: string;
  start?: number;
  className: string;
  label?: string;
  children: ReactNode;
}) {
  const { play } = useReplay();
  const hydrated = useHydrated();

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    play(start);
  }

  // Links answer to Enter but not Space. Match a button: stop the page
  // scrolling on keydown and activate on keyup.
  function onKeyDown(event: KeyboardEvent<HTMLAnchorElement>) {
    if (event.key === " ") event.preventDefault();
  }

  function onKeyUp(event: KeyboardEvent<HTMLAnchorElement>) {
    if (event.key !== " ") return;
    event.preventDefault();
    play(start);
  }

  return (
    <a
      href={href}
      className={className}
      aria-label={label}
      {...(hydrated
        ? { role: "button", onClick, onKeyDown, onKeyUp }
        : undefined)}
    >
      {children}
    </a>
  );
}

const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

// The fixed 16:9 box: the poster until activated, then the player.
export function ReplayScreen({ poster }: { poster: ReactNode }) {
  const { video, playback, frame } = useReplay();

  return (
    <div className="rp-screen">
      {playback ? (
        <iframe
          key={playback.run}
          ref={frame}
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0${
            playback.start > 0 ? `&start=${playback.start}` : ""
          }`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <PlayControl
          href={watchUrl(video.youtubeId)}
          className="rp-facade"
          label={player.name(video.title, video.duration)}
        >
          {poster}
          <span
            className="rp-play"
            aria-hidden="true"
            style={
              video.playY === undefined
                ? undefined
                : { top: `${video.playY}%` }
            }
          >
            <Icon name="play" />
          </span>
          <span className="rp-dur" aria-hidden="true">
            {video.duration}
          </span>
        </PlayControl>
      )}
    </div>
  );
}

// The title is added for screen readers, so each link name is distinct while
// still starting with the visible words.
export function ReplayWatchLink() {
  const { video } = useReplay();

  return (
    <PlayControl href={watchUrl(video.youtubeId)} className="rp-watch">
      <Icon name="play" />
      {library.watch}
      <span className="sr-only">: {video.title}</span>
    </PlayControl>
  );
}

// Renders nothing without chapters. The heading is a labelled paragraph: under
// the latest player it comes before that replay's H2, so a heading element
// would break the heading order.
export function ReplayChapters({
  chapters,
}: {
  chapters: ReadonlyArray<{
    title: string;
    startSeconds: number;
    time: string;
  }>;
}) {
  const { video } = useReplay();
  if (chapters.length === 0) return null;
  const labelId = `${video.slug}-chapters`;

  return (
    <div className="rp-chapters">
      <p id={labelId} className="rp-chapters-label">
        {player.chaptersHeading}
      </p>
      <ol aria-labelledby={labelId}>
        {chapters.map((chapter) => (
          <li key={chapter.startSeconds}>
            <PlayControl
              href={`${watchUrl(video.youtubeId)}&t=${chapter.startSeconds}s`}
              start={chapter.startSeconds}
              className="rp-chapter"
            >
              <span className="rp-chapter-time">{chapter.time}</span>{" "}
              <span>{chapter.title}</span>
            </PlayControl>
          </li>
        ))}
      </ol>
    </div>
  );
}

// One delegated listener for the topic and CTA events, so the links themselves
// stay server rendered. A link counts when an ancestor carries the data
// attribute. A route that is not built renders as text, so it sends nothing.
// Only fixed page values are sent.
export function SessionsClickEvents() {
  useEffect(() => {
    function onClick(event: globalThis.MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a");
      if (!link) return;

      const topic = link.closest<HTMLElement>("[data-rp-topic]");
      if (topic) {
        trackEvent(sessionsEvents.topicClick, {
          page_path: SESSIONS_PATH,
          replay_slug: topic.dataset.rpReplay ?? "",
          topic: topic.dataset.rpTopic ?? "",
        });
      }

      const cta = link.closest<HTMLElement>("[data-rp-cta]");
      if (cta) {
        trackEvent(sessionsEvents.ctaClick, {
          page_path: SESSIONS_PATH,
          target: cta.dataset.rpCta ?? "",
        });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
