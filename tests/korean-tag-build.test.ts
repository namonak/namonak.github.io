import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("Korean tag routes", () => {
  it("builds a static route for a Korean tag", () => {
    const result = spawnSync("npm", ["run", "build"], {
      cwd: process.cwd(),
      encoding: "utf8",
    });

    expect(result.status, result.stderr).toBe(0);
    const tagPage = join(
      process.cwd(),
      "dist",
      "tags",
      "우선순위큐",
      "index.html",
    );

    expect(existsSync(tagPage)).toBe(true);
    const tagPageHtml = readFileSync(tagPage, "utf8");

    expect(tagPageHtml).toContain("태그: 우선순위큐");
    expect(tagPageHtml).toContain('href="/kotlin/priority-queue/"');
  });
});
