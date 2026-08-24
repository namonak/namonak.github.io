import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const repositoryRoot = new URL("../", import.meta.url);

describe("Markdown rendering configuration", () => {
  it("labels generated footnotes as Korean references", async () => {
    const config = await readFile(
      new URL("astro.config.mjs", repositoryRoot),
      "utf8",
    );

    expect(config).toContain('footnoteLabel: "참고 자료"');
  });
});
