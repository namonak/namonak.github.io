import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const runValidator = (target: string) =>
  spawnSync(process.execPath, ["scripts/validate-mermaid.mjs", target], {
    cwd: process.cwd(),
    encoding: "utf8",
  });

describe("Mermaid validation", () => {
  it("rejects malformed Mermaid source with its file path", () => {
    const result = runValidator("tests/fixtures/invalid-mermaid.md");

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("tests/fixtures/invalid-mermaid.md");
    expect(result.stderr).toContain("Mermaid validation failed");
  });

  it("accepts the published Mermaid article", () => {
    const result = runValidator(
      "src/content/blog/web/markdown-mermaid-rendering.md",
    );

    expect(result.status).toBe(0);
  });
});
