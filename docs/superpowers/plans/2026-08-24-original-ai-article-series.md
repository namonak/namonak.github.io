# 신규 AI 아티클 5편 실행 계획

> **에이전트 작업자용:** 이 계획은 작업 단위별로 `superpowers:executing-plans`를 사용해 실행합니다. 진행 상태는 체크박스(`- [ ]`)로 기록합니다.

**목표:** 2026-08-24부터 8-28까지 외부 아티클 다섯 편을 출발점으로, 조사·근거 검증·로컬 검토를 거친 한국어 신규 개발자 블로그 초안을 하루 한 편씩 만든다.

**구조:** 각 날짜는 독립적인 글 하나와 독립적인 검증·검토 단위다. 원문은 보이는 출발점 링크로 밝히되, 핵심 사실은 1차 출처 GFM 각주로 검증한다. 글은 항상 `draft: true`로 시작하며, 사용자가 로컬 결과를 확인한 뒤에만 공개·서명 커밋·푸시한다.

**기술 스택:** Astro 7 콘텐츠 컬렉션, Markdown/GFM, `remark-gfm`, build-time Mermaid SVG, Vitest, Playwright, GitHub Pages, Git signed commits

**설계 명세:** `docs/superpowers/specs/2026-08-24-original-ai-article-series-design.md`

## 전역 제약 사항

- 이 작업은 WordPress 레거시 이전이 아니다. `docs/superpowers/plans/2026-08-09-legacy-article-migration.md`의 일정과 체크박스를 변경하지 않는다.
- 각 글을 시작하기 전에 `skills/blog-post-writer/SKILL.md` 및 `references/voice-and-structure.md`, `references/evidence-and-citations.md`, `references/quality-gates.md`를 읽고 따른다.
- `ai`는 모델·프롬프트·Agent·AI 개발 도구·AI 시스템 운영을 우선 분류한다. AI와 독립적인 동시성·병렬성·비동기 글은 `software-development`에 둔다.
- 원문은 번역이나 장문 요약의 대상이 아니라 출발점이다. 수치·버전·제품 기능·기술적 주장은 공식 문서, 표준, 원 논문, 공식 저장소를 우선하여 별도로 확인한다.
- 신규 파일은 `src/content/blog/<category>/<slug>.md`에 만들고, 필수 frontmatter와 `draft: true`를 명시한다. `publishedAt`은 이 계획의 작업일을 사용한다.
- 모든 아티클 기반 초안의 frontmatter 다음에는 `> 원문: [원문 제목](원문 URL)`을 둔다. 외부 사실은 의미 있는 식별자의 GFM 각주로 연결하며, 수동 `## 참고` 목록·수동 번호·HTML 앵커는 만들지 않는다.
- Mermaid는 세 단계 이상의 관계 또는 순서를 설명할 때만 사용한다. 사용했다면 `npm run validate:mermaid`를 실행하며, 문법 오류는 커밋 전에 고친다.
- 각 초안에는 `npm run check`, `npm run test`, `npm run build`를 실행하고, 데스크톱·태블릿·모바일 폭에서 로컬 렌더링을 확인한다.
- 사용자 확인 전에는 `draft`를 해제하거나 글을 커밋·푸시하지 않는다. 승인된 공개 글은 글 하나당 하나의 독립적이고 의미 있는 `-S` 서명 커밋으로 남긴다. Git이 서명 암호를 요청하면 즉시 중단하고 사용자에게 알린다.
- "Claude ADHD Skill"의 Progressive Disclosure, Atomic Task, Context-Switching Bridge, 맥락 외부화 원칙은 이번 다섯 글에 자동으로 넣지 않는다. 향후 어느 글에든 넣기 전에 포함할 원칙·목적·근거를 사용자에게 먼저 알리고 승인받는다.

---

## 파일 구조

| 경로 | 책임 |
| --- | --- |
| `docs/superpowers/specs/2026-08-24-original-ai-article-series-design.md` | 카테고리 정책, 글 경계, 검토·공개 조건의 기준 명세 |
| `docs/superpowers/plans/2026-08-24-original-ai-article-series.md` | 일자별 원문, 목표 slug, 조사·초안·검증·인계 체크리스트 |
| `src/content/blog/ai/model-migration-harness-instructions.md` | 모델 이행 시 하네스 지침을 감사하는 8/24 비공개 초안 |
| `src/content/blog/ai/codebase-knowledge-graphs-for-agents.md` | 코드베이스 지식 그래프를 평가하는 8/25 비공개 초안 |
| `src/content/blog/ai/ai-generated-code-review.md` | AI 생성 코드의 검증·리뷰 설계를 다루는 8/26 비공개 초안 |
| `src/content/blog/software-development/concurrency-parallelism-and-async.md` | 동시성·병렬성·비동기를 구분하는 8/27 비공개 초안 |
| `src/content/blog/ai/prompt-engineering-experiments.md` | 프롬프트 엔지니어링의 재현 가능한 실험을 다루는 8/28 비공개 초안 |

## 공통 초안 인계 형식

각 작업은 아래 네 가지를 사용자에게 제공하고, 사용자의 명시적 공개 지시 전까지 멈춘다.

1. `draft: true` 초안의 저장소 경로
2. 프로덕션 빌드에서 확인할 수 있는 로컬 URL
3. 실행한 검사 명령과 결과
4. 원문을 제외한 주요 1차 출처와 남은 불확실성

## Task 1: 2026-08-24 모델 이행 시 하네스 지침 감사 초안

**Files:**

- Create: `src/content/blog/ai/model-migration-harness-instructions.md`
- Modify: `docs/superpowers/plans/2026-08-24-original-ai-article-series.md`

**Interfaces:**

- Consumes: Opus 5 원문, 모델 제공자의 공식 출시·이행·프롬프트 문서, 현 저장소의 `AGENTS.md`·`ARCHITECTURE.md`·콘텐츠 계약
- Produces: `/ai/model-migration-harness-instructions/`에서 렌더링되는 `draft: true` 초안과 8/24 작업 기록

- [x] **Step 1: 신규 글 작성 지침과 URL 충돌 여부를 확인한다**

Run:

```bash
sed -n '1,260p' skills/blog-post-writer/SKILL.md
sed -n '1,260p' skills/blog-post-writer/references/voice-and-structure.md
sed -n '1,260p' skills/blog-post-writer/references/evidence-and-citations.md
sed -n '1,260p' skills/blog-post-writer/references/quality-gates.md
test ! -e src/content/blog/ai/model-migration-harness-instructions.md
test ! -e dist/ai/model-migration-harness-instructions/index.html
```

Expected: 작성 지침의 조사·`draft: true`·GFM 각주 조건을 확인하고, 대상 Markdown 파일과 공개 경로가 아직 없다.

- [x] **Step 2: 원문의 삭제 권고를 공식 이행 문서와 대조한다**

원문에서 인용할 후보 주장을 `모델 기본 동작`, `기존 지시의 유지·삭제 판단`, `effort와 출력 길이의 관계`, `검증 규칙의 회귀 확인`으로 나눈다. 각 항목에 모델 제공자의 공식 출시·이행·프롬프트 문서를 연결한다. 공식 문서가 원문의 수치 또는 표현을 뒷받침하지 않으면 그 수치·표현은 본문에 쓰지 않는다.

Expected: 초안에 넣을 주장마다 URL·확인일·적용 모델 또는 버전이 적힌 근거 목록을 갖는다.

- [x] **Step 3: 범위를 ‘지시 삭제’가 아닌 ‘하네스 규칙 감사’로 고정한다**

다음 네 단계만을 글의 실무 절차로 사용한다.

```text
기존 규칙 인벤토리
  -> 규칙의 원래 실패 모드·근거 기록
  -> 새 모델에서 최소 재현·평가 실행
  -> keep / rewrite / delete 결정과 회귀 검증
```

모델의 능력이 올랐다는 이유만으로 테스트, 보안 정책, 권한 경계, 사용자 승인 같은 독립 검증 규칙을 삭제하라고 권하지 않는다.

- [x] **Step 4: `draft: true` Markdown 초안을 작성한다**

아래 frontmatter와 보이는 원문 블록을 사용한다. `title`과 `description`은 조사 결과를 반영해 문법만 다듬을 수 있지만, 카테고리·날짜·draft 값은 바꾸지 않는다.

```yaml
---
title: "모델을 교체할 때 하네스 지침을 유지·삭제·재검증하는 방법"
description: "새 모델의 기본 동작을 확인하면서도 보안·검증 경계를 잃지 않도록 프롬프트, 훅, 평가 규칙을 감사하는 절차를 정리합니다."
publishedAt: 2026-08-24
category: "ai"
tags: ["ai-agent", "harness", "prompt-engineering", "evaluations"]
draft: true
---

> 원문: [Everyone Benchmarked Opus 5. Nobody Read the Deletion List That Shipped With It](https://medium.com/ai-all-in/everyone-benchmarked-opus-5-nobody-read-the-deletion-list-that-shipped-with-it-daa43800d4eb)
```

도입부 다음에 `규칙 인벤토리`, `실패 모드와 근거`, `평가 기반 keep/rewrite/delete`, `독립 검증 규칙`을 각각 설명한다. 외부 기술 사실에는 Step 2에서 만든 GFM 각주만 사용한다. 이 글에 ADHD Skill 원칙을 넣지 않는다.

- [x] **Step 5: 초안을 정적 검사하고 로컬 렌더링을 확인한다**

Run:

```bash
npm run check
npm run test
npm run build
python3 -m http.server 4322 --directory dist
```

브라우저에서 `http://127.0.0.1:4322/ai/model-migration-harness-instructions/`를 데스크톱·태블릿·모바일 폭으로 확인한다. 제목, 원문 링크, 표 또는 코드 블록, GFM 각주 이동·복귀가 읽기 쉬워야 한다. Mermaid를 실제로 추가한 경우에만 `npm run validate:mermaid`를 추가 실행한다.

Expected: 모든 명령이 종료 코드 0으로 끝나고, 초안은 공개 글 목록에는 나타나지 않지만 개별 경로는 프로덕션 빌드에서 확인할 수 있다.

- [x] **Step 6: 사용자 검토를 위해 초안을 인계하고 중단한다**

초안 파일 경로, 4322 로컬 URL, 검사 결과, 주요 공식 근거, 제거하거나 조건부로 바꾼 원문 주장을 보고한다. 사용자가 `draft` 해제와 커밋·푸시를 명시적으로 승인할 때까지 파일을 stage하지 않는다.

## Task 2: 2026-08-25 코드베이스 지식 그래프 초안

**Files:**

- Create: `src/content/blog/ai/codebase-knowledge-graphs-for-agents.md`
- Modify: `docs/superpowers/plans/2026-08-24-original-ai-article-series.md`

**Interfaces:**

- Consumes: Graphify 원문, Graphify 공식 저장소·평가 자료, 코드 구조 추출과 provenance를 설명하는 1차 자료
- Produces: `/ai/codebase-knowledge-graphs-for-agents/`에서 렌더링되는 `draft: true` 초안과 8/25 작업 기록

- [ ] **Step 1: 글 작성 지침과 대상 경로를 확인한다**

Run:

```bash
sed -n '1,260p' skills/blog-post-writer/SKILL.md
test ! -e src/content/blog/ai/codebase-knowledge-graphs-for-agents.md
```

Expected: 신규 원본 글 규칙을 읽었고 slug 충돌이 없다.

- [ ] **Step 2: Graphify의 구현 주장과 벤치마크 범위를 감사한다**

공식 README와 제공된 평가 자료에서 입력 corpus, 비교 대상, token 계산 방식, 실행 환경, graph의 `EXTRACTED`·`INFERRED`·`AMBIGUOUS` 관계 정의를 확인한다. `71.5x`처럼 도구가 제공한 결과는 일반적 성능 보장이 아니라 해당 corpus와 측정법의 결과로만 쓴다.

Expected: 그래프 기반 탐색, 벡터 검색, raw file 탐색의 차이와 각 방식의 실패 모드를 독립적으로 설명할 근거를 확보한다.

- [ ] **Step 3: 코드베이스 이해의 입력·출력·검증 경계를 정한다**

본문은 다음 관계를 중심으로 작성한다.

```text
Repository and documents
  -> deterministic extraction / model inference
  -> graph with provenance labels
  -> developer or agent query
  -> source-file verification before a change
```

그래프의 요약이나 추론 결과만으로 코드 변경을 확정하지 않으며, 답변 또는 변경 전 원본 파일·테스트·버전을 다시 확인하는 경계를 명시한다.

- [ ] **Step 4: `draft: true` Markdown 초안을 작성한다**

```yaml
---
title: "AI 코딩 에이전트를 위한 코드베이스 지식 그래프: 출처, 추론, 평가 기준"
description: "코드베이스 지식 그래프의 구조와 provenance, RAG·파일 탐색과의 차이, 성능 주장을 검토하는 재현 조건을 정리합니다."
publishedAt: 2026-08-25
category: "ai"
tags: ["ai-agent", "knowledge-graph", "codebase", "context-engineering"]
draft: true
---

> 원문: [Andrej Karpathy Asked for a Tool. 48 Hours Later, Graphify Went Viral.](https://www.towardsdeeplearning.com/andrej-karpathy-asked-for-a-tool-48-hours-later-graphify-went-viral-10d8ead5f50e)
```

`그래프가 보존하는 구조`, `EXTRACTED/INFERRED/AMBIGUOUS provenance`, `RAG와 파일 탐색의 역할 분담`, `벤치마크 재현과 한계`, `변경 전 원본 검증`의 순서로 작성한다.

- [ ] **Step 5: 검사·로컬 반응형 검토 후 사용자에게 인계한다**

Run:

```bash
npm run check
npm run test
npm run build
python3 -m http.server 4322 --directory dist
```

`http://127.0.0.1:4322/ai/codebase-knowledge-graphs-for-agents/`를 세 화면 폭에서 확인한다. Mermaid를 추가했다면 `npm run validate:mermaid`도 실행한다. 초안 경로, URL, 검사 결과, 공식 저장소·평가 자료, 성능 주장의 한계를 보고하고 사용자의 공개 결정을 기다린다.

## Task 3: 2026-08-26 AI 생성 코드의 검증·리뷰 설계 초안

**Files:**

- Create: `src/content/blog/ai/ai-generated-code-review.md`
- Modify: `docs/superpowers/plans/2026-08-24-original-ai-article-series.md`

**Interfaces:**

- Consumes: 대량 생성 코드 원문, Linux Kernel tool-generated content 지침, 프로젝트별 테스트·리뷰·보안 검증 문서
- Produces: `/ai/ai-generated-code-review/`에서 렌더링되는 `draft: true` 초안과 8/26 작업 기록

- [ ] **Step 1: 신규 글 지침과 경로 충돌을 확인한다**

Run:

```bash
sed -n '1,260p' skills/blog-post-writer/SKILL.md
test ! -e src/content/blog/ai/ai-generated-code-review.md
```

Expected: 초안 규칙을 확인했고 기존 URL·파일을 덮어쓰지 않는다.

- [ ] **Step 2: 생성과 검증을 분리하는 근거를 수집한다**

Linux Kernel의 tool-generated content와 patch 제출 지침에서 제출자 책임, provenance, 설명 가능성, 테스트 책임을 확인한다. 프로젝트별 CI·정적 분석·보안 검사 문서는 "생성한 Agent 자신이 통과 판정을 내리는 것"과 독립적으로 작동하는 verifier 사례로만 사용한다.

Expected: 검증 비용이 커진다는 주장을 추상적 경고가 아니라 변경 범위, 테스트, reviewer 전문성, side effect로 나누어 설명할 수 있다.

- [ ] **Step 3: 리뷰 흐름의 독립 경계를 설계한다**

```text
Issue and acceptance criteria
  -> bounded agent change
  -> deterministic checks and independent reviewer
  -> integration or security checks
  -> approval, merge, and post-merge observation
```

동일 Agent가 작성한 mock과 테스트의 상호 확인만으로 기능 검증이 끝난다고 설명하지 않는다. 작은 변경 단위, 명시적 acceptance criteria, 독립 테스트, 사람이 맡을 판단을 구분한다.

- [ ] **Step 4: `draft: true` Markdown 초안을 작성한다**

```yaml
---
title: "AI가 만든 코드의 검증 비용을 관리하는 리뷰 설계"
description: "대량 생성된 코드가 review queue에 넘기는 비용을 줄이도록 변경 범위, 독립 verifier, 테스트, provenance를 설계하는 방법을 정리합니다."
publishedAt: 2026-08-26
category: "ai"
tags: ["ai-agent", "code-review", "testing", "software-quality"]
draft: true
---

> 원문: [The Agent Writes 10,000 Lines Before Lunch. Good Luck Reviewing Them.](https://thilo-hermann.medium.com/the-agent-writes-10-000-lines-before-lunch-good-luck-reviewing-them-34aa69bf0db1)
```

`생성 비용과 검증 비용`, `변경 단위와 acceptance criteria`, `독립 verifier`, `provenance와 reviewer 책임`, `merge 이후 관찰`을 차례로 설명한다.

- [ ] **Step 5: 검사·반응형 검토 후 사용자에게 인계한다**

Run:

```bash
npm run check
npm run test
npm run build
python3 -m http.server 4322 --directory dist
```

`http://127.0.0.1:4322/ai/ai-generated-code-review/`를 세 화면 폭에서 확인한다. Mermaid를 추가했다면 `npm run validate:mermaid`도 실행한다. 검토 결과와 공식 지침을 보고하고 사용자 승인 전에는 공개·커밋·푸시하지 않는다.

## Task 4: 2026-08-27 Concurrency·Parallelism·Async 초안

**Files:**

- Create: `src/content/blog/software-development/concurrency-parallelism-and-async.md`
- Modify: `docs/superpowers/plans/2026-08-24-original-ai-article-series.md`

**Interfaces:**

- Consumes: 원문, 언어 런타임·운영체제의 동시성·비동기 I/O 공식 문서, 기존 `/web/promise-and-async-await/` 글
- Produces: `/software-development/concurrency-parallelism-and-async/`에서 렌더링되는 `draft: true` 초안과 8/27 작업 기록

- [ ] **Step 1: 신규 글 지침·경로와 기존 Promise 글의 경계를 확인한다**

Run:

```bash
sed -n '1,260p' skills/blog-post-writer/SKILL.md
test ! -e src/content/blog/software-development/concurrency-parallelism-and-async.md
sed -n '1,220p' src/content/blog/web/promise-and-async-await.md
```

Expected: 이 글이 JavaScript Promise 문법을 반복하지 않고 실행 모델과 병목 선택 기준을 설명한다는 경계를 확인한다.

- [ ] **Step 2: 용어의 적용 조건을 공식 문서로 확인한다**

CPU core를 동시에 사용하는 parallelism, 여러 진행 중인 작업을 조율하는 concurrency, 결과를 기다리는 제어 흐름을 막지 않는 asynchronous I/O를 서로 다른 질문으로 정리한다. 각 정의와 runtime 동작은 선택한 언어·플랫폼의 공식 문서에 연결하며, 서로 다른 runtime의 event loop 또는 scheduler를 일반화하지 않는다.

Expected: 하나의 "더 빠른" 해결책 대신 CPU-bound, I/O-bound, shared-state, cancellation 요구에 따라 선택할 판단표를 만들 수 있다.

- [ ] **Step 3: 독자가 비교할 실행 흐름을 만든다**

```text
CPU-bound work -> bounded worker parallelism -> synchronization cost
I/O-bound work  -> asynchronous wait -> event loop or runtime scheduler
shared state    -> ownership or synchronization -> correctness before throughput
```

이 흐름이 세 줄 이상의 관계를 직접 설명하므로 Mermaid를 쓸 경우에만 `mermaid` fenced block으로 작성한다.

- [ ] **Step 4: `draft: true` Markdown 초안을 작성한다**

```yaml
---
title: "Concurrency·Parallelism·Async를 실행 모델과 병목으로 구분하기"
description: "동시성, 병렬성, 비동기를 서로 다른 실행 문제로 구분하고 CPU·I/O·공유 상태에 따른 선택 기준을 정리합니다."
publishedAt: 2026-08-27
category: "software-development"
tags: ["concurrency", "parallelism", "async", "performance"]
draft: true
---

> 원문: [Concurrency, Parallelism, and Async](https://code.likeagirl.io/concurrency-parallelism-async-47312e0be553)
```

`세 용어가 답하는 질문`, `CPU-bound와 I/O-bound`, `공유 상태와 취소`, `선택 기준`, `JavaScript Promise 글과의 연결` 순서로 작성한다.

- [ ] **Step 5: Mermaid를 포함했다면 별도 검증하고 로컬 검토 후 인계한다**

Run:

```bash
npm run check
npm run test
npm run validate:mermaid
npm run build
python3 -m http.server 4322 --directory dist
```

`http://127.0.0.1:4322/software-development/concurrency-parallelism-and-async/`를 세 화면 폭에서 확인한다. 다이어그램, 비교표, 긴 용어와 각주가 좁은 화면에서도 읽히는지 확인하고 사용자 승인 전에는 공개·커밋·푸시하지 않는다.

## Task 5: 2026-08-28 프롬프트 엔지니어링 실험 초안

**Files:**

- Create: `src/content/blog/ai/prompt-engineering-experiments.md`
- Modify: `docs/superpowers/plans/2026-08-24-original-ai-article-series.md`

**Interfaces:**

- Consumes: Kaggle Prompt Engineering 백서, 모델 제공자의 공식 프롬프트 가이드, 작고 대표성 있는 평가 입력·기대 결과
- Produces: `/ai/prompt-engineering-experiments/`에서 렌더링되는 `draft: true` 초안과 8/28 작업 기록

- [ ] **Step 1: 신규 글 지침과 대상 경로를 확인한다**

Run:

```bash
sed -n '1,260p' skills/blog-post-writer/SKILL.md
test ! -e src/content/blog/ai/prompt-engineering-experiments.md
```

Expected: 글의 범위가 특정 모델의 비밀 prompt recipe가 아니라 재현 가능한 개선 과정임을 확인한다.

- [ ] **Step 2: 프롬프트의 변수를 공식 가이드와 백서로 분리한다**

`task instruction`, `context`, `examples`, `output format`, `model configuration`, `evaluation input`을 별도 변수로 정의한다. Kaggle 백서에서 설명하는 일반 원칙은 백서에, 모델별 문법·권장 파라미터는 해당 모델 제공자의 공식 문서에 연결한다.

Expected: 모델·버전·temperature 같은 설정과 프롬프트 텍스트 변경을 한 실험 결과로 섞어 설명하지 않는다.

- [ ] **Step 3: 반복 평가 절차를 정한다**

```text
Task and acceptance criteria
  -> representative evaluation set
  -> one controlled prompt or configuration change
  -> score failures by category
  -> keep, revert, or refine with the recorded result
```

예시는 민감 정보나 실제 비공개 프롬프트를 포함하지 않는다. 단일 인상이나 한 번의 성공 사례를 일반적인 품질 향상으로 결론내리지 않는다.

- [ ] **Step 4: `draft: true` Markdown 초안을 작성한다**

```yaml
---
title: "프롬프트 엔지니어링을 재현 가능한 실험으로 다루는 방법"
description: "지시, 문맥, 예시, 출력 형식, 모델 설정을 분리하고 작은 평가 세트로 프롬프트 개선을 검증하는 절차를 정리합니다."
publishedAt: 2026-08-28
category: "ai"
tags: ["prompt-engineering", "llm", "evaluations", "experimentation"]
draft: true
---

> 원문: [Prompt Engineering](https://www.kaggle.com/whitepaper-prompt-engineering)
```

`프롬프트를 구성하는 변수`, `평가 세트와 acceptance criteria`, `한 번에 하나만 바꾸는 실험`, `실패 분류`, `모델별 조건 기록`을 순서대로 설명한다.

- [ ] **Step 5: 검사·반응형 검토 후 사용자에게 인계한다**

Run:

```bash
npm run check
npm run test
npm run build
python3 -m http.server 4322 --directory dist
```

`http://127.0.0.1:4322/ai/prompt-engineering-experiments/`를 세 화면 폭에서 확인한다. Mermaid를 추가했다면 `npm run validate:mermaid`도 실행한다. 초안 경로, URL, 검사 결과, 주요 공식 출처, 모델별로 달라지는 조건을 보고하고 공개 승인을 기다린다.

## 일일 공개·커밋 절차

사용자가 특정 날짜의 초안을 승인했을 때만 아래 순서로 실행한다. 작업일 체크박스는 글의 공개 커밋까지 끝난 뒤에만 `- [x]`로 바꾼다.

1. 사용자가 승인한 초안에서만 `draft: false`로 바꾼다.
2. `npm run check`, `npm run test`, `npm run build`를 다시 실행한다. Mermaid가 있으면 `npm run validate:mermaid`도 다시 실행한다.
3. 프로덕션 빌드의 개별 URL을 데스크톱·태블릿·모바일에서 다시 확인한다.
4. 글 파일과 이 계획 파일의 해당 체크박스만 stage하고 `git diff --cached --check`와 `git diff --cached --stat`을 확인한다.
5. 아래 형식으로 서명 커밋을 만든다. 본문은 조사한 핵심 초점을 한 문장으로 쓰고 Codex trailer를 붙인다.

```bash
git commit -S \
  -m "content(ai): add <slug>" \
  -m "Explain <the reviewed technical focus> with independently verified primary sources." \
  -m "Co-authored-by: Codex (AI-generated) <codex@joannes.kr>"
```

6. Git이 서명 암호를 요청하면 즉시 중단하고 사용자에게 알린다. 그렇지 않으면 `git push origin main`으로 해당 날짜의 단일 글 커밋을 푸시한다.
