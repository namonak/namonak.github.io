import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const repositoryRoot = new URL("../", import.meta.url);
const readProjectFile = (path: string) =>
  readFile(new URL(path, repositoryRoot), "utf8");

describe("blog post writer skill", () => {
  it("keeps the Korean skill and its focused references together", async () => {
    const [skill, voice, evidence, quality] = await Promise.all([
      readProjectFile("skills/blog-post-writer/SKILL.md"),
      readProjectFile(
        "skills/blog-post-writer/references/voice-and-structure.md",
      ),
      readProjectFile(
        "skills/blog-post-writer/references/evidence-and-citations.md",
      ),
      readProjectFile("skills/blog-post-writer/references/quality-gates.md"),
    ]);

    expect(skill).toContain("블로그 글 작성 스킬");
    expect(skill).toContain("references/voice-and-structure.md");
    expect(skill).toContain("references/evidence-and-citations.md");
    expect(skill).toContain("references/quality-gates.md");
    expect(skill).toContain("글을 쓰기 전에");
    expect(skill).toContain("각 항목을 1차 출처와 연결합니다.");
    expect(skill).toContain("검증을 마친 뒤에만");
    expect(skill).not.toContain(
      "정확한 frontmatter를 사용하고 `draft: true`를 명시합니다.",
    );
    expect(voice).toContain("개발자");
    expect(evidence).toContain("[^source-id]");
    expect(quality).toContain("`draft: true`");
  });

  it("requires research, visible article attribution, and GFM citations", async () => {
    const [skill, evidence] = await Promise.all([
      readProjectFile("skills/blog-post-writer/SKILL.md"),
      readProjectFile(
        "skills/blog-post-writer/references/evidence-and-citations.md",
      ),
    ]);

    expect(skill).toContain("조사");
    expect(skill).toContain("초안");
    expect(skill).toContain("frontmatter 바로 다음");
    expect(evidence).toContain("> 원문:");
    expect(evidence).toContain("GFM 각주");
    expect(evidence).toContain("독립적으로 검증합니다");
    expect(evidence).toContain(
      "수동 `## 참고` 목록, 수동 번호, HTML 앵커는 사용하지 않습니다.",
    );
  });

  it("requires a concise narrative summary before a new post's introduction", async () => {
    const [skill, quality] = await Promise.all([
      readProjectFile("skills/blog-post-writer/SKILL.md"),
      readProjectFile("skills/blog-post-writer/references/quality-gates.md"),
    ]);

    expect(skill).toContain("## 핵심 요약");
    expect(skill).toContain("1~3개의 짧은 서술형 문단");
    expect(skill).toContain("각 문단은 1~3문장");
    expect(skill).toContain("원문 블록 다음");
    expect(quality).toContain("1~3개의 짧은 서술형 문단");
  });

  it("activates the repository skill for new original posts only", async () => {
    const agents = await readProjectFile("AGENTS.md");

    expect(agents).toContain("skills/blog-post-writer/SKILL.md");
    expect(agents).toContain("신규 원본 블로그 글");
    expect(agents).toContain("레거시 마이그레이션");
  });
});
