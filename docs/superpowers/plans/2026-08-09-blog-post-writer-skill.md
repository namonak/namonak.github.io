# Blog Post Writer Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 신규 개발자 대상 블로그 글을 조사·검증한 뒤 한국어 비공개 Markdown 초안으로 작성하는 저장소 전용 스킬을 추가한다.

**Architecture:** `skills/blog-post-writer/`를 단일 원본으로 둔다. `SKILL.md`는 흐름과 중단 기준을, 세 보조 문서는 문체·근거·품질 규칙을 담당한다. `AGENTS.md`가 새 원본 글 작업에서 이를 읽게 하고, Vitest 계약 테스트가 문서 연결과 필수 정책을 감시한다.

**Tech Stack:** Markdown, GFM 각주, Astro 7, `remark-gfm`, Vitest 4, npm scripts, Git signed commits

## Global Constraints

- 레거시 WordPress 글 이전은 이 스킬의 대상이 아니다. 기존 마이그레이션 계획을 따른다.
- 스킬과 보조 문서는 한국어로 쓴다. 경로·명령·코드·제품명·원문 제목은 원문을 유지한다.
- 독자는 개발자로 고정한다. 범위·카테고리·슬러그는 스킬이 판단하고, 결론을 바꿀 정도의 모호성만 한 가지 질문으로 확인한다.
- 모든 글은 조사와 출처 확인을 초안보다 먼저 수행한다. 핵심 기술 주장은 1차 출처를 우선한다.
- 아티클 기반 글은 frontmatter 다음에 `> 원문: [제목](URL)`을 보이고, 사실은 독립 GFM 각주로 검증한다.
- 출처는 GFM 각주(`[^source-id]`)만 사용한다. 수동 `## 참고`, 수동 번호, HTML 앵커는 만들지 않는다.
- 새 글은 `src/content/blog/<category>/<slug>.md`에 `draft: true`로 만든다. 명시적 지시 없이는 공개·커밋·푸시하지 않는다.
- 새 글을 만들거나 수정한 뒤에는 `npm run check`, `npm run test`, `npm run build`를 실행한다. Mermaid가 있으면 `npm run validate:mermaid`도 실행한다.
- 모든 Git 커밋은 `-S`로 서명한다. 서명 암호를 요구하면 즉시 중단하고 사용자에게 알린다.

---

## File structure

| Path | Responsibility |
| --- | --- |
| `skills/blog-post-writer/SKILL.md` | 적용 범위, 사전 읽기, 입력 분기, 조사→초안→인계, 중단 기준 |
| `skills/blog-post-writer/references/voice-and-structure.md` | 개발자 대상 문체, 전개, 조건부 단정, 비유 |
| `skills/blog-post-writer/references/evidence-and-citations.md` | 조사, 1차 출처, 원문 검증·정정, GFM 각주 |
| `skills/blog-post-writer/references/quality-gates.md` | `draft: true`, 콘텐츠·코드·Mermaid·반응형 검증, 인계 제한 |
| `tests/blog-post-writer-skill.test.ts` | 스킬 문서 존재·연결·GFM 각주·초안 정책·`AGENTS.md` 활성화 계약 |
| `AGENTS.md` | 새 원본 글에서 스킬을 읽게 하는 저장소 수준 진입점 |

## Task 1: 스킬 문서와 계약 테스트 추가

**Files:**
- Create: `tests/blog-post-writer-skill.test.ts`
- Create: `skills/blog-post-writer/SKILL.md`
- Create: `skills/blog-post-writer/references/voice-and-structure.md`
- Create: `skills/blog-post-writer/references/evidence-and-citations.md`
- Create: `skills/blog-post-writer/references/quality-gates.md`

**Interfaces:**
- Consumes: `ARCHITECTURE.md`, `docs/content-guide.md`, `src/content.config.ts`, `src/content/blog/`, `package.json`.
- Produces: 상대 경로로 세 보조 문서를 읽게 하는 한국어 스킬과 파일 계약 테스트.

- [ ] **Step 1: 실패하는 파일 계약 테스트를 작성한다**

`tests/blog-post-writer-skill.test.ts`에 아래를 작성한다.

```ts
import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const repositoryRoot = new URL("../", import.meta.url);
const readProjectFile = (path: string) =>
  readFile(new URL(path, repositoryRoot), "utf8");

describe("blog post writer skill", () => {
  it("keeps the Korean skill and its focused references together", async () => {
    const [skill, voice, evidence, quality] = await Promise.all([
      readProjectFile("skills/blog-post-writer/SKILL.md"),
      readProjectFile("skills/blog-post-writer/references/voice-and-structure.md"),
      readProjectFile("skills/blog-post-writer/references/evidence-and-citations.md"),
      readProjectFile("skills/blog-post-writer/references/quality-gates.md"),
    ]);

    expect(skill).toContain("블로그 글 작성 스킬");
    expect(skill).toContain("references/voice-and-structure.md");
    expect(skill).toContain("references/evidence-and-citations.md");
    expect(skill).toContain("references/quality-gates.md");
    expect(voice).toContain("개발자");
    expect(evidence).toContain("[^source-id]");
    expect(quality).toContain("draft: true");
  });

  it("requires research, visible article attribution, and GFM citations", async () => {
    const [skill, evidence] = await Promise.all([
      readProjectFile("skills/blog-post-writer/SKILL.md"),
      readProjectFile("skills/blog-post-writer/references/evidence-and-citations.md"),
    ]);

    expect(skill).toContain("조사");
    expect(skill).toContain("초안");
    expect(evidence).toContain("> 원문:");
    expect(evidence).toContain("GFM 각주");
    expect(evidence).toContain("HTML 앵커");
  });
});
```

- [ ] **Step 2: 테스트가 실패하는지 확인한다**

Run: `npm run test -- tests/blog-post-writer-skill.test.ts`

Expected: `skills/blog-post-writer/` 파일이 없으므로 `ENOENT`로 FAIL.

- [ ] **Step 3: `SKILL.md`를 한국어로 작성한다**

다음 헤딩을 순서대로 사용한다.

```md
# 블로그 글 작성 스킬
## 적용 대상과 제외 대상
## 시작 전 필수 읽기
## 입력 판단과 질문 기준
## 조사와 근거 확인
## 글 작성
## 검증과 인계
## 중단 기준
```

- 신규 원본 글의 주제 기반 작성과 외부 아티클 기반 요약에만 적용하고, 레거시 이전은 제외한다.
- `ARCHITECTURE.md`, `docs/content-guide.md`, 스키마, 기존 카테고리·경로를 먼저 읽는다.
- 범위·카테고리·슬러그는 우선 판단한다. 기술 범위·지원 버전·출처 충돌이 결론을 바꿀 때만 한 가지 질문을 한다.
- 핵심 주장과 1차 출처를 연결한 뒤 `draft: true` 초안만 작성한다. 충돌 경로는 덮어쓰지 않는다.
- 세 보조 문서를 상대 경로로 연결한다. 근거 부족·해소 불가능한 충돌·유효 범위 부재 시에는 파일을 만들지 않는다.

- [ ] **Step 4: 문체·구성 보조 문서를 작성한다**

`voice-and-structure.md`에는 `# 문체와 글 구성` 제목 아래 `독자와 어조`, `기본 전개`, `정확한 단정`, `비유의 사용`, `코드·표·Mermaid` 섹션을 둔다.

- 존댓말을 사용하고 기본 전개를 `정의 → 원리 → 코드·예시 → 적용 또는 주의점 → 정리`로 정한다.
- 도입부는 2~4문장으로 개념과 얻을 결과를 제시한다.
- 검증된 사실은 “이때 … 합니다”, “이 메서드는 … 을 반환합니다”처럼 명료하게 쓴다. 버전·환경·설정 의존 내용은 조건을 먼저 밝힌다.
- 비유는 정확한 정의와 원리 뒤의 짧은 보조 설명이며, 서론 장식이나 기술 설명의 대체물이 아니다.
- 코드에는 언어 식별자를 붙이고, 비교에는 표를, 세 단계 이상의 관계·흐름에는 필요한 경우 Mermaid를 쓴다.

- [ ] **Step 5: 근거·인용 보조 문서를 작성한다**

`evidence-and-citations.md`에는 `# 근거와 인용` 제목 아래 `출처 우선순위`, `주제 기반 글`, `아티클 기반 글`, `GFM 각주`, `출처 충돌과 불확실성` 섹션을 둔다.

- 표준·공식 문서·원 논문·공식 API 문서를 우선한다. 2차 출처는 맥락에만 사용한다.
- 아티클 기반 글은 frontmatter 뒤에 `> 원문: [원문 제목](원문 URL)`을 둔다. 장문 인용과 단순 재서술은 하지 않는다.
- 원문과 검증 근거가 충돌하면 원문의 맥락·버전을 밝히고 검증 근거를 기준으로 정정한다.
- 외부 사실은 GFM 각주로 연결하고 수동 `## 참고`, 수동 번호, HTML 앵커는 금지한다.
- 아래 예시를 포함한다.

```md
HTTP 상태 코드는 응답의 결과를 나타냅니다.[^rfc-9110]

[^rfc-9110]: [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
```

- [ ] **Step 6: 품질 게이트 보조 문서를 작성한다**

`quality-gates.md`에는 `# 품질 게이트` 제목 아래 `초안 생성 전`, `초안 내용 점검`, `명령 검증`, `로컬 렌더링 확인`, `인계와 금지된 작업` 섹션을 둔다.

- 새 파일 경로, frontmatter, `draft: true`, GFM 각주 식별자, 코드 언어, 이미지 경로, Mermaid 문법을 점검한다.
- `npm run check`, `npm run test`, `npm run build`, Mermaid가 있을 때 `npm run validate:mermaid`를 실행하도록 명시한다.
- 데스크톱·태블릿·모바일에서 본문·코드·표·이미지·Mermaid·각주 이동과 복귀를 확인한다.
- 인계에는 초안 경로, 검사 결과, 주요 출처, 남은 확인 사항만 적고, 명시적 지시 없이는 `draft` 해제·커밋·푸시를 금지한다.

- [ ] **Step 7: 계약 테스트가 통과하는지 확인한다**

Run: `npm run test -- tests/blog-post-writer-skill.test.ts`

Expected: PASS. 네 스킬 문서의 존재, 한국어 제목, 상호 참조, 조사·원문 블록·GFM 각주·`draft: true` 계약을 확인한다.

- [ ] **Step 8: Task 1을 서명 커밋한다**

```bash
git add skills/blog-post-writer/ tests/blog-post-writer-skill.test.ts
git diff --cached --check
git diff --cached --stat
git commit -S -m "docs: add Korean blog post writer skill"
```

Expected: 스킬 문서 네 개와 계약 테스트 한 개만 포함한 서명 커밋.

## Task 2: `AGENTS.md`로 스킬을 활성화한다

**Files:**
- Modify: `tests/blog-post-writer-skill.test.ts`
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: Task 1의 `skills/blog-post-writer/SKILL.md`.
- Produces: 새 원본 글에만 스킬을 적용하고 레거시 이전은 제외하는 저장소 지침.

- [ ] **Step 1: `AGENTS.md` 활성화 계약을 테스트에 추가한다**

같은 `describe` 블록에 아래 테스트를 추가한다.

```ts
  it("activates the repository skill for new original posts only", async () => {
    const agents = await readProjectFile("AGENTS.md");

    expect(agents).toContain("skills/blog-post-writer/SKILL.md");
    expect(agents).toContain("신규 원본 블로그 글");
    expect(agents).toContain("레거시 마이그레이션");
  });
```

- [ ] **Step 2: 새 계약이 실패하는지 확인한다**

Run: `npm run test -- tests/blog-post-writer-skill.test.ts`

Expected: `AGENTS.md`에 경로와 적용·제외 범위가 없으므로 FAIL.

- [ ] **Step 3: `AGENTS.md`에 활성화 규칙을 추가한다**

`## Working rules` 다음에 아래를 추가한다. 기존 콘텐츠·Git 규칙은 수정하지 않는다.

```md
## 신규 원본 블로그 글

- 신규 원본 블로그 글을 작성·요약·갱신할 때는 먼저 `skills/blog-post-writer/SKILL.md`와 그 보조 문서를 읽고 따른다.
- 레거시 마이그레이션은 이 스킬의 대상이 아니다. `docs/superpowers/plans/2026-08-09-legacy-article-migration.md`의 절차를 따른다.
```

- [ ] **Step 4: 활성화 계약이 통과하는지 확인한다**

Run: `npm run test -- tests/blog-post-writer-skill.test.ts`

Expected: PASS. 문서 계약과 새 원본 글 전용 활성화 규칙을 모두 확인한다.

- [ ] **Step 5: Task 2를 서명 커밋한다**

```bash
git add AGENTS.md tests/blog-post-writer-skill.test.ts
git diff --cached --check
git diff --cached --stat
git commit -S -m "docs: activate blog post writer skill"
```

Expected: `AGENTS.md`와 테스트 변경만 포함한 서명 커밋.

## Task 3: 전체 검증과 적용 경로 점검

**Files:**
- Verify only: `skills/blog-post-writer/`, `AGENTS.md`, `tests/blog-post-writer-skill.test.ts`

**Interfaces:**
- Consumes: Task 1과 Task 2의 스킬 문서·활성화 규칙·계약 테스트.
- Produces: 검사 결과와 수동 적용 경로 확인. 파일 변경이나 커밋은 만들지 않는다.

- [ ] **Step 1: 계약·전체 단위 테스트를 실행한다**

Run:

```bash
npm run test -- tests/blog-post-writer-skill.test.ts
npm run test
```

Expected: PASS. 새 계약과 기존 게시물·Mermaid 테스트가 모두 통과한다.

- [ ] **Step 2: 사이트 검증 명령을 실행한다**

Run:

```bash
npm run check
npm run build
npm run validate:mermaid
npm run format:check
```

Expected: 모두 PASS. 스킬 문서와 `AGENTS.md`가 콘텐츠 컬렉션, Mermaid SVG 렌더링, 정적 빌드, 서식에 회귀를 만들지 않는다.

- [ ] **Step 3: Codex 적용 경로를 수동 점검한다**

1. `AGENTS.md`의 스킬 경로가 존재하는지 확인한다.
2. `SKILL.md`가 세 보조 문서를 모두 상대 경로로 참조하는지 확인한다.
3. 주제 기반 입력과 아티클 기반 입력에서 조사·근거 확인이 초안보다 먼저인지 확인한다.
4. 아티클 기반 입력에서 `> 원문:` 블록과 독립 GFM 각주를 함께 요구하는지 확인한다.
5. `draft: true`와 공개·커밋·푸시 금지 원칙을 확인한다.

Expected: 이 저장소에서 `AGENTS.md`를 읽는 Codex가 새 원본 글에만 스킬을 적용하고 레거시 이전은 기존 계획에 맡긴다.

- [ ] **Step 4: 최종 Git 상태와 서명을 확인한다**

Run:

```bash
git status --short
git log --show-signature -2
```

Expected: 작업 트리 clean, Task 1과 Task 2의 두 커밋이 서명됨. 로컬 GPG 권한 때문에 서명 확인이 제한되면 그 사실을 사용자에게 알린다.
