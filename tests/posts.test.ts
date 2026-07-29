import { describe, expect, it } from "vitest";
import {
  getAdjacentPosts,
  getPostsByCategory,
  getPostsByTag,
  getPublishedPosts,
} from "../src/lib/posts";

const entries = [
  {
    id: "android/older",
    data: {
      publishedAt: new Date("2026-07-01T00:00:00.000Z"),
      category: "android",
      tags: ["kotlin", "coroutines"],
    },
  },
  {
    id: "web/newer",
    data: {
      publishedAt: new Date("2026-07-02T00:00:00.000Z"),
      category: "web",
      tags: ["astro", "markdown"],
    },
  },
  {
    id: "web/draft",
    data: {
      publishedAt: new Date("2026-07-03T00:00:00.000Z"),
      category: "web",
      tags: ["astro"],
      draft: true,
    },
  },
] as const;

describe("post queries", () => {
  it("excludes drafts and sorts published posts newest first", () => {
    expect(getPublishedPosts(entries).map((entry) => entry.id)).toEqual([
      "web/newer",
      "android/older",
    ]);
  });

  it("filters published posts by category and tag", () => {
    expect(getPostsByCategory(entries, "web").map((entry) => entry.id)).toEqual([
      "web/newer",
    ]);
    expect(getPostsByTag(entries, "kotlin").map((entry) => entry.id)).toEqual([
      "android/older",
    ]);
  });

  it("returns null at the boundaries of an adjacent-post list", () => {
    const published = getPublishedPosts(entries);

    expect(getAdjacentPosts(published, "web/newer")).toEqual({
      previous: null,
      next: entries[0],
    });
    expect(getAdjacentPosts(published, "android/older")).toEqual({
      previous: entries[1],
      next: null,
    });
  });
});
