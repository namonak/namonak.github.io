# 읽기 탐색과 정적 본문 렌더링 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 정적 배포물에서 Markdown 본문이 빠지지 않게 하고, 최근 글·카테고리·태그 탐색을 읽기 중심으로 정리한다.

**Architecture:** 콘텐츠 수집과 정적 `render()` 경계의 본문 누락을 독립 빌드 테스트로 재현하고, 입력 Markdown과 `dist` HTML의 본문이 일치하게 하는 최소 수정만 적용한다. 홈은 이미 날짜순인 공개 글 배열에서 처음 12개만 보여주며, 기존 카테고리와 태그 경로를 재사용한다. 시각 변경은 현재 토큰 안에서 메타데이터에만 제한한다.

**Tech Stack:** Astro 7, TypeScript, Vitest, Astro content collections, CSS

**Spec:** `docs/superpowers/specs/2026-09-23-reading-navigation-and-static-content-design.md`

## Global Constraints

- 공개 글 URL은 `/{category}/{slug}/`로 유지한다.
- 새 의존성, 검색, 자동 RSS, 페이지네이션, 새 전체 아카이브 경로를 추가하지 않는다.
- Mermaid는 계속 빌드 시 SVG로 렌더링하고, 잘못된 Mermaid는 검증 또는 빌드를 실패시킨다.
- Markdown 글의 문구·frontmatter는 수정하지 않는다.
- 모든 제품 커밋은 서명하고, Angular 형식의 한글 제목과 아래 트레일러를 사용한다.

```text
Co-authored-by: Codex (AI-generated) <codex@namonak.dev>
```

## Review Focus

- 새 Markdown 파일: 개발 서버와 정적 빌드 모두에서 `.prose`에 본문이 있어야 한다.
- 본문 없는 Markdown 파일: 검증은 빈 본문을 통과시키지 않아야 한다.
- 한국어 태그: URL 인코딩된 태그 링크가 기존 정적 태그 경로로 이동해야 한다.
- 글 수가 12개 미만인 사이트: 홈은 가진 글만 보여주고 빈 카드나 오류를 만들지 않아야 한다.
- 모바일 390px: 긴 태그·코드·표는 문서 전체를 가로로 넘치게 하지 않아야 한다.

---

### Task 1: 정적 Markdown 본문 회귀를 고정하고 콘텐츠 경계를 수정한다

**Files:**

- Create: `tests/static-content-body.test.ts`
- Create: `scripts/validate-content-bodies.mjs`
- Modify: `package.json`
- Modify: `src/content.config.ts` 또는 정적 렌더링 경계에서 원인이 확인된 파일
- Modify: `src/pages/[...slug].astro` (정적 `render()` 입력 또는 출력 경계가 원인일 때만)

**Interfaces:**

- Consumes: `src/content/blog/<category>/<slug>.md`의 frontmatter와 본문
- Produces: 본문이 비어 있으면 실패하는 콘텐츠 검증과, `dist/<category>/<slug>/index.html` 안의 비어 있지 않은 `.prose`

- [ ] **Step 1: 본문이 있는 글과 빈 글을 모두 다루는 실패 테스트를 작성한다.**

`tests/static-content-body.test.ts`에서 고유한 본문 문구를 가진 임시 공개 Markdown과 본문이 빈 임시 공개 Markdown을 각각 만든다. 빈 글은 `npm run validate:content`가 해당 파일 경로와 함께 실패해야 하며, 본문이 있는 글은 검증과 `npm run build` 뒤 생성된 HTML의 `.prose`에 고유 문구가 있어야 한다. `finally`에서는 정확히 두 fixture 파일과 빈 디렉터리만 제거한다.

```ts
const fixturePath = join(
  process.cwd(),
  "src/content/blog/test-static-body/fixture.md",
);
const fixtureText = "정적 본문 회귀 검증 문구";
const emptyFixturePath = join(
  process.cwd(),
  "src/content/blog/test-static-body/empty-fixture.md",
);

await mkdir(dirname(fixturePath), { recursive: true });
await writeFile(
  fixturePath,
  `---\ntitle: "정적 본문 검증"\ndescription: "정적 산출물 검증용 글입니다."\npublishedAt: 2026-09-23\ncategory: "test-static-body"\ntags: []\n---\n\n${fixtureText}\n`,
);
await writeFile(
  emptyFixturePath,
  `---\ntitle: "빈 본문 검증"\ndescription: "본문 누락 검증용 글입니다."\npublishedAt: 2026-09-23\ncategory: "test-static-body"\ntags: []\n---\n`,
);

try {
  const emptyResult = spawnSync("npm", ["run", "validate:content"], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  expect(emptyResult.status).toBe(1);
  expect(emptyResult.stderr).toContain("empty-fixture.md");
  await rm(emptyFixturePath);

  const validationResult = spawnSync("npm", ["run", "validate:content"], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  expect(validationResult.status, validationResult.stderr).toBe(0);
  const result = spawnSync("npm", ["run", "build"], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  expect(result.status, result.stderr).toBe(0);
  const html = await readFile(
    join(process.cwd(), "dist/test-static-body/fixture/index.html"),
    "utf8",
  );
  expect(html).toContain(fixtureText);
} finally {
  await rm(fixturePath, { force: true });
  await rm(emptyFixturePath, { force: true });
  await rmdir(dirname(fixturePath));
}
```

- [ ] **Step 2: 빈 본문 검증이 없는 현재 상태의 실패를 기록한다.**

Run: `npx vitest run tests/static-content-body.test.ts`

Expected: 빈 fixture가 존재할 때는 `validate:content` 명령이 아직 없거나 빈 본문을 허용하므로 테스트가 실패한다.

- [ ] **Step 3: 수집·렌더링 경계를 비교한다.**

`src/content.config.ts`의 `glob` loader가 만든 entry의 `body`와 `[...slug].astro`의 `render(post)` 결과를 개발·빌드 모드에서 각각 확인한다. 본문이 처음 사라지는 한 경계만 수정 대상으로 정한다.

```ts
const posts = getPublishedPosts(await getCollection("blog"));
const { Content } = await render(post);
```

- [ ] **Step 4: 빈 공개 Markdown을 거부하는 검증을 최소로 추가하고, 렌더링 경계만 필요할 때 수정한다.**

`scripts/validate-content-bodies.mjs`는 frontmatter 뒤의 Markdown 본문을 검사해 공백뿐인 공개 글의 파일 경로를 표준 오류로 출력하고 종료 상태 1을 반환한다. `package.json`에 `validate:content` 스크립트를 추가하고, `prebuild`에서 이를 실행해 수동 빌드와 CI 빌드 모두를 막는다. 수집 단계에서 본문이 비거나 `render(post)` 뒤에 본문이 빠지는 것이 관찰된 경우에만 loader 또는 정적 경로의 entry 전달을 수정한다. 본문 fixture의 문구가 `Content`를 거쳐 정적 HTML의 `.prose`에 남는 변경만 허용한다.

- [ ] **Step 5: 회귀 테스트와 Mermaid 검증을 통과시킨다.**

Run: `npx vitest run tests/static-content-body.test.ts tests/mermaid-validation.test.ts`

Expected: 빈 fixture는 콘텐츠 검증에서 실패하고, 임시 본문 문구는 `dist`에 있으며, 잘못된 Mermaid fixture는 계속 실패하고 공개 Mermaid 글은 통과한다.

- [ ] **Step 6: 독립 커밋을 만든다.**

```bash
git add package.json scripts/validate-content-bodies.mjs src/content.config.ts src/pages/[...slug].astro tests/static-content-body.test.ts
git commit -S -m "fix(content): 빈 본문 글을 검증한다" \
  -m "빈 공개 Markdown을 빌드 전에 거부하고 정적 본문 렌더링을 회귀 검증한다." \
  -m "Co-authored-by: Codex (AI-generated) <codex@namonak.dev>"
```

### Task 2: 홈의 최신 글 범위와 주제 탐색을 연결한다

**Files:**

- Modify: `src/lib/posts.ts`
- Modify: `tests/posts.test.ts`
- Modify: `src/pages/index.astro`
- Create: `tests/home-navigation.test.ts`

**Interfaces:**

- Consumes: 날짜순 공개 글 `readonly T[]`
- Produces: `getRecentPosts<T>(posts, limit): T[]`, 홈의 최대 12개 카드, `/categories/`와 `/categories/<category>/` 링크

- [ ] **Step 1: 최신 글 수 제한 테스트를 작성한다.**

`tests/posts.test.ts`에 13개 항목을 생성해 `getRecentPosts(entries, 12)`가 최신 12개만 반환하고, 2개인 입력은 그대로 반환하는 기대값을 추가한다.

```ts
expect(getRecentPosts(entries, 12)).toHaveLength(12);
expect(getRecentPosts(entries.slice(0, 2), 12)).toEqual(entries.slice(0, 2));
```

- [ ] **Step 2: 실패를 확인한다.**

Run: `npx vitest run tests/posts.test.ts`

Expected: `getRecentPosts`를 아직 내보내지 않아 실패한다.

- [ ] **Step 3: 최소 조회 함수를 추가한다.**

`src/lib/posts.ts`에 이미 정렬된 공개 글 배열을 자르는 함수만 추가한다.

```ts
export function getRecentPosts<T>(posts: readonly T[], limit: number): T[] {
  return posts.slice(0, limit);
}
```

- [ ] **Step 4: 홈이 최근 12개와 작동하는 카테고리를 렌더링하게 한다.**

`src/pages/index.astro`에서 `getRecentPosts(posts, 12)`를 카드 목록에 사용한다. `aside`의 각 카테고리는 `/categories/${category}/` 링크로 만들고, 제목 또는 짧은 행동 링크는 기존 `/categories/`로 연결한다.

```astro
<a href="/categories/">모든 주제 보기</a>
{categories.map((category) => (
  <li><a href={`/categories/${category}/`}>{category}</a></li>
))}
```

- [ ] **Step 5: 정적 홈 탐색 테스트를 작성하고 실행한다.**

`tests/home-navigation.test.ts`는 빌드 뒤 `dist/index.html`을 읽어 다음을 확인한다.

```ts
expect(homeHtml.match(/class="post-card"/g)).toHaveLength(12);
expect(homeHtml).toContain('href="/categories/"');
expect(homeHtml).toContain('href="/categories/ai/"');
```

Run: `npx vitest run tests/posts.test.ts tests/home-navigation.test.ts`

Expected: 홈에 12개 카드와 카테고리 링크가 생성된다.

- [ ] **Step 6: 독립 커밋을 만든다.**

```bash
git add src/lib/posts.ts src/pages/index.astro tests/posts.test.ts tests/home-navigation.test.ts
git commit -S -m "feat(홈): 최근 글과 주제 탐색을 정리한다" \
  -m "홈에는 최근 12개 글을 두고 기존 카테고리 경로로 탐색을 연결한다." \
  -m "Co-authored-by: Codex (AI-generated) <codex@namonak.dev>"
```

### Task 3: 글 카드 태그를 태그 경로로 연결한다

**Files:**

- Modify: `src/components/PostCard.astro`
- Modify: `tests/home-navigation.test.ts`

**Interfaces:**

- Consumes: `tags: string[]`
- Produces: `/tags/${encodeURIComponent(tag)}/`를 가리키는 카드 태그 링크

- [ ] **Step 1: 최신 12개 범위 안에 한국어 태그 fixture를 만들고 링크 기대값을 추가한다.**

`tests/home-navigation.test.ts`는 빌드 전에 `src/content/blog/test-home-navigation/korean-tag.md` fixture를 만든다. fixture에는 다른 공개 글보다 최신인 `publishedAt: 2099-01-01`, `category: "test-home-navigation"`, 태그 `ai-agent`와 `우선순위큐`, 고유 본문을 둔다. 따라서 홈이 최신 12개로 제한돼도 두 태그가 항상 카드에 포함된다. `finally`에서 fixture 파일과 빈 디렉터리만 제거한 뒤, 한국어 태그와 영문 태그의 홈 HTML 링크를 확인한다.

```ts
expect(homeHtml).toContain('href="/tags/ai-agent/"');
expect(homeHtml).toContain(
  'href="/tags/%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84%ED%81%90/"',
);
```

- [ ] **Step 2: 실패를 확인한다.**

Run: `npx vitest run tests/home-navigation.test.ts`

Expected: 최신 fixture의 카드 태그가 텍스트만 렌더링되므로 두 링크 기대값이 실패한다. 기존 `우선순위큐` 글이 최신 12개 밖에 있다는 이유만으로 실패해서는 안 된다.

- [ ] **Step 3: 카드 태그를 기존 태그 경로에 연결한다.**

```astro
{tags.map((tag) => (
  <li><a href={`/tags/${encodeURIComponent(tag)}/`}>{tag}</a></li>
))}
```

- [ ] **Step 4: 링크 테스트를 통과시킨다.**

Run: `npx vitest run tests/home-navigation.test.ts tests/korean-tag-build.test.ts`

Expected: 최신 fixture의 홈 카드 태그가 올바른 URL을 갖고, fixture를 정리한 뒤에도 기존 한국어 태그 정적 경로가 계속 빌드된다.

- [ ] **Step 5: 독립 커밋을 만든다.**

```bash
git add src/components/PostCard.astro tests/home-navigation.test.ts
git commit -S -m "feat(탐색): 글 카드 태그를 연결한다" \
  -m "카드의 태그 칩이 상세 글과 같은 태그 경로로 이동하게 한다." \
  -m "Co-authored-by: Codex (AI-generated) <codex@namonak.dev>"
```

### Task 4: 읽기 기록형 메타데이터 표현을 적용한다

**Files:**

- Modify: `src/styles/global.css`
- Modify: `src/components/PostCard.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**

- Consumes: 기존 색상·공간 토큰과 카테고리·날짜·태그 마크업
- Produces: 메타데이터에만 적용되는 `--font-mono`와 일관된 링크 상태

- [ ] **Step 1: 기존 색상과 타이포그래피의 시각 기준을 기록한다.**

데스크톱 1440px, 태블릿 768px, 모바일 390px에서 홈의 헤더·카드·카테고리 패널을 캡처한다. 현재 `--color-ink`, `--color-muted`, `--color-accent` 값과 카드·메타데이터의 계산된 글꼴을 기록한다.

- [ ] **Step 2: 메타데이터 전용 모노스페이스 토큰을 추가한다.**

```css
:root {
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
}

.meta,
.tags,
.eyebrow {
  font-family: var(--font-mono);
}
```

- [ ] **Step 3: 링크 칩의 상호작용 상태를 카드에 맞춘다.**

```css
.tags a {
  color: inherit;
  text-decoration: none;
}

.tags a:hover {
  color: var(--color-ink);
}
```

- [ ] **Step 4: 각 화면 폭에서 시각 회귀를 점검한다.**

홈, `/categories/`, `/tags/우선순위큐/`, `/web/markdown-mermaid-rendering/`을 데스크톱·태블릿·모바일로 확인한다. 카테고리와 태그가 링크임을 알 수 있고, 포커스 외곽선·표·코드의 내부 가로 스크롤·문서 가로 폭이 유지되는지 검사한다.

- [ ] **Step 5: 독립 커밋을 만든다.**

```bash
git add src/styles/global.css src/components/PostCard.astro src/pages/index.astro
git commit -S -m "style(읽기): 메타데이터 인덱스를 다듬는다" \
  -m "기존 읽기 중심 색상과 여백을 유지하며 탐색 메타데이터의 구분을 강화한다." \
  -m "Co-authored-by: Codex (AI-generated) <codex@namonak.dev>"
```

### Task 5: 전체 산출물과 반응형 동작을 검증한다

**Files:**

- Verify only: 변경된 소스와 `dist/`

**Interfaces:**

- Consumes: Tasks 1–4의 콘텐츠·탐색·스타일 변경
- Produces: 정적 본문, 12개 최신 글, 작동하는 주제·태그 링크, 반응형 읽기 화면

- [ ] **Step 1: 정적 검사와 단위 테스트를 실행한다.**

Run: `npm run check && npm run test`

Expected: Astro 진단 0개, Vitest 실패 0개.

- [ ] **Step 2: Mermaid를 포함한 정적 사이트를 생성한다.**

Run: `npm run build && npm run validate:mermaid`

Expected: 모든 Mermaid가 SVG로 렌더링되고, build가 성공한다.

- [ ] **Step 3: 정적 본문과 탐색 산출물을 직접 검사한다.**

```bash
rg -n "Astro에서 Markdown과 Mermaid를 정적 페이지로 렌더링하기" dist/web/markdown-mermaid-rendering/index.html
rg -n 'href="/categories/ai/"|href="/tags/ai-agent/"' dist/index.html
```

Expected: 테스트 fixture 원본은 정리돼 없고, 기존 공개 글 본문과 홈의 카테고리·태그 링크가 정적 산출물에 있다. 본문 누락을 재현한 새 공개 글의 대표 문구도 해당 `dist` 파일에서 확인한다.

- [ ] **Step 4: 배포 전 화면 검토를 한다.**

정적 preview에서 데스크톱 1440px, 태블릿 768px, 모바일 390px으로 홈·카테고리·한국어 태그·Mermaid 글·404를 확인한다. 각 화면에서 문서 가로 넘침이 없고, 키보드 포커스가 보이며, 코드 블록만 내부 가로 스크롤을 가져야 한다.

- [ ] **Step 5: 검증 결과를 보고하고 사용자 확인 뒤 푸시한다.**

`git status --short`, `git log --show-signature -3`, `git diff origin/main...HEAD --check`를 확인한다. 사용자 미추적 파일은 스테이징하지 않고, 사용자 확인 뒤에만 `git push origin main`을 실행한다.

## Self-Review

- **Spec coverage:** Task 1은 정적 본문·Mermaid 제약, Tasks 2–3은 카테고리·태그·최신 12개, Task 4는 시각 언어와 접근성, Task 5는 전체 검증을 다룬다.
- **Placeholder scan:** 실행 전 조사 단계는 본문 누락의 원인이 관찰 전에는 확정되지 않았기 때문에 한 경계만 고치도록 명시했다. 그 밖의 파일·테스트·명령·커밋 메시지는 구체적으로 적었다.
- **Type consistency:** `getRecentPosts<T>(posts, limit): T[]`는 Task 2의 테스트와 홈에서 같은 이름·매개변수로 사용한다.
- **Review focus:** 임시 새 Markdown, 빈 본문, 한국어 태그, 12개 미만 글, 모바일 가로 폭을 각각 Tasks 1–5에 배치했다.
