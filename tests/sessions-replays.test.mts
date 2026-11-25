// Checks for data/replays.ts (validation, order, durations) and
// lib/schema/sessions.ts. Every entry here is synthetic test data. None of it
// may be copied into data/.
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { describe, it } from "node:test";
import {
  durationSeconds,
  formatDuration,
  prepareReplays,
  replays as shippedReplays,
  validateReplays,
  type Replay,
} from "../data/replays.ts";
import { services } from "../data/services.ts";
import { sessionsSchemaGraph } from "../lib/schema/sessions.ts";

function synthetic(n: number): Replay {
  const id = String(n).padStart(2, "0");
  return {
    slug: `test-replay-${id}`,
    title: `Test replay ${id}`,
    description: `Synthetic description ${id}.`,
    youtubeId: `testVideo${id}`,
    // Entry 12 is the newest.
    recordedOn: `2026-01-${id}`,
    duration: "PT42M7S",
    topicSlug: services[n % services.length].slug,
    poster: {
      src: `/images/test/poster-${id}.webp`,
      alt: `Synthetic poster ${id}`,
      width: 1280,
      height: 720,
    },
  };
}

// Deliberately out of order.
const twelve = [3, 12, 1, 7, 5, 9, 2, 11, 4, 10, 6, 8].map(synthetic);

const withField = (field: string, value: unknown) => [
  { ...synthetic(1), [field]: value } as unknown as Replay,
];

describe("replay validator", () => {
  it("ships only real entries whose posters exist in public/", () => {
    assert.doesNotThrow(() => validateReplays(shippedReplays));
    for (const replay of shippedReplays) {
      assert.doesNotMatch(replay.slug, /^test-|scratch/);
      if (replay.poster) {
        assert.ok(
          existsSync(new URL(`../public${replay.poster.src}`, import.meta.url)),
          replay.poster.src,
        );
      }
    }
  });

  it("accepts 12 complete entries", () => {
    assert.doesNotThrow(() => validateReplays(twelve));
  });

  it("accepts the optional fields, and accepts their absence", () => {
    const bare = { ...synthetic(1) };
    delete bare.poster;
    assert.doesNotThrow(() => validateReplays([bare]));
    assert.doesNotThrow(() =>
      validateReplays([
        {
          ...synthetic(1),
          format: "live",
          chapters: [
            { title: "Start", startSeconds: 0 },
            { title: "Middle", startSeconds: 600 },
          ],
        },
      ]),
    );
  });

  for (const field of [
    "slug",
    "title",
    "description",
    "youtubeId",
    "recordedOn",
    "duration",
    "topicSlug",
  ]) {
    it(`rejects a missing or empty ${field}`, () => {
      for (const value of [undefined, "", "   "]) {
        assert.throws(
          () => validateReplays(withField(field, value)),
          new RegExp(field),
        );
      }
    });
  }

  const malformed: Record<string, unknown[]> = {
    slug: ["Has Space", "UPPER", "trailing-", "a/b"],
    youtubeId: [
      "short",
      "twelve-chars",
      "bad id here",
      "https://youtu.be/abcdefghijk",
    ],
    recordedOn: ["2026-1-5", "January 5, 2026", "2026-02-30", "2026-13-01"],
    duration: ["42:07", "PT", "PT0S", "P1D", "42M", "PT7S42M", "PT1.5M"],
    format: ["webinar"],
    poster: [
      { src: "https://i.ytimg.com/x.jpg", alt: "a", width: 1, height: 1 },
      { src: "//example.test/x.jpg", alt: "a", width: 1, height: 1 },
      { src: "/images/x.webp", alt: "", width: 1280, height: 720 },
      { src: "/images/x.webp", alt: "a", width: 0, height: 720 },
      { src: "/images/x.webp", alt: "a", width: 1280 },
    ],
    chapters: [
      [{ title: "", startSeconds: 0 }],
      [{ title: "a", startSeconds: -1 }],
      [{ title: "a", startSeconds: 1.5 }],
      // At or past the end of a 42:07 recording.
      [{ title: "a", startSeconds: 2527 }],
      [
        { title: "a", startSeconds: 60 },
        { title: "b", startSeconds: 60 },
      ],
    ],
  };
  for (const [field, values] of Object.entries(malformed)) {
    it(`rejects a malformed ${field}`, () => {
      for (const value of values) {
        assert.throws(
          () => validateReplays(withField(field, value)),
          new RegExp(field),
          JSON.stringify(value),
        );
      }
    });
  }

  it("accepts a playY from 0 to 100", () => {
    for (const value of [0, 39, 39.5, 50, 100]) {
      assert.doesNotThrow(
        () => validateReplays(withField("playY", value)),
        String(value),
      );
    }
  });

  it("rejects an out-of-range or non-numeric playY", () => {
    for (const value of [-1, -0.1, 100.1, 101, NaN, Infinity, "39", null]) {
      assert.throws(
        () => validateReplays(withField("playY", value)),
        /playY/,
        String(value),
      );
    }
  });

  it("rejects a duplicate slug", () => {
    assert.throws(
      () =>
        validateReplays([
          synthetic(1),
          { ...synthetic(2), slug: synthetic(1).slug },
        ]),
      /duplicate slug/,
    );
  });

  it("rejects a topicSlug with no matching service", () => {
    assert.throws(
      () => validateReplays(withField("topicSlug", "not-a-service")),
      /topicSlug/,
    );
  });
});

describe("replay order", () => {
  it("sorts newest first by recordedOn without changing the input", () => {
    const before = twelve.map((r) => r.slug);
    const sorted = prepareReplays(twelve);
    assert.deepEqual(
      sorted.map((r) => r.recordedOn),
      Array.from({ length: 12 }, (_, i) =>
        `2026-01-${String(12 - i).padStart(2, "0")}`,
      ),
    );
    assert.deepEqual(
      twelve.map((r) => r.slug),
      before,
    );
  });

  it("validates while preparing", () => {
    assert.throws(() => prepareReplays(withField("title", "")), /title/);
  });
});

describe("durations", () => {
  it("parses ISO 8601 durations into seconds", () => {
    assert.equal(durationSeconds("PT42M7S"), 2527);
    assert.equal(durationSeconds("PT1H2M3S"), 3723);
    assert.equal(durationSeconds("PT2H"), 7200);
    assert.equal(durationSeconds("nonsense"), null);
  });

  it("formats as m:ss", () => {
    assert.equal(formatDuration("PT42M7S"), "42:07");
    assert.equal(formatDuration("PT5M"), "5:00");
    assert.equal(formatDuration("PT9S"), "0:09");
  });

  it("formats over one hour as h:mm:ss", () => {
    assert.equal(formatDuration("PT1H2M3S"), "1:02:03");
    assert.equal(formatDuration("PT75M"), "1:15:00");
    assert.equal(formatDuration("PT1H"), "1:00:00");
  });

  it("throws on a malformed duration", () => {
    assert.throws(() => formatDuration("42:07"), /duration/);
  });
});

describe("sessions schema", () => {
  const siteUrl = "https://example.test";
  const launched = {
    isProductionBuild: true,
    siteUrl,
    absoluteUrl: (path: string) => `${siteUrl}${path}`,
  };
  type Node = Record<string, unknown>;
  const nodes = (list: readonly Replay[]) =>
    (sessionsSchemaGraph(list, launched) as { "@graph": Node[] })["@graph"];
  const videos = (list: readonly Replay[]) =>
    nodes(list).filter((node) => node["@type"] === "VideoObject");

  it("is null when no site URL is set", () => {
    assert.equal(
      sessionsSchemaGraph(twelve, { ...launched, isProductionBuild: false }),
      null,
    );
  });

  it("has CollectionPage and the visible breadcrumb, even when empty", () => {
    const graph = nodes([]);
    assert.deepEqual(
      graph.map((node) => node["@type"]),
      ["CollectionPage", "BreadcrumbList"],
    );
    assert.equal(graph[0]["@id"], `${siteUrl}/training/sessions/#webpage`);
    assert.deepEqual(graph[0].isPartOf, { "@id": `${siteUrl}/#website` });
    assert.deepEqual(
      (graph[1].itemListElement as Node[]).map((item) => item.name),
      ["Home", "Training", "Sessions"],
    );
  });

  it("has one VideoObject per complete replay", () => {
    assert.equal(videos(prepareReplays(twelve)).length, 12);
  });

  it("describes a video with only the approved properties", () => {
    const replay = synthetic(1);
    assert.deepEqual(videos([replay])[0], {
      "@type": "VideoObject",
      name: replay.title,
      description: replay.description,
      thumbnailUrl: `${siteUrl}/images/test/poster-01.webp`,
      uploadDate: replay.recordedOn,
      duration: replay.duration,
      embedUrl: `https://www.youtube-nocookie.com/embed/${replay.youtubeId}`,
    });
  });

  it("has no VideoObject for a replay without a poster", () => {
    const bare = synthetic(2);
    delete bare.poster;
    const list = videos([synthetic(1), bare]);
    assert.deepEqual(
      list.map((node) => node.name),
      ["Test replay 01"],
    );
  });

  it("uses none of the excluded types or properties", () => {
    const json = JSON.stringify(sessionsSchemaGraph(twelve, launched));
    assert.doesNotMatch(
      json,
      /FAQPage|Course|Review|Rating|sameAs|interactionStatistic|contentUrl/,
    );
  });
});
