# 신규 AI 아티클 5편 설계

## 목적과 범위

2026-08-24부터 2026-08-28까지 외부 아티클 다섯 편을 출발점으로, 한국어 개발자 독자를 위한 신규 원본 글을 하루 한 편씩 작성한다. 이 작업은 WordPress 레거시 이전이 아니며, `docs/superpowers/plans/2026-08-09-legacy-article-migration.md`의 일정·체크박스·규칙을 변경하지 않는다.

각 글은 원문을 번역하거나 요약하는 것이 아니라, 원문이 제기한 문제를 공식 문서·표준·원 논문·공식 저장소로 다시 검증하여 독자가 판단하고 적용할 수 있게 재구성한다. 원문은 모든 글의 frontmatter 다음에 보이는 `> 원문:` 링크로 밝힌다.

## 카테고리 정책

- `ai`는 모델, 프롬프트, Agent, AI 개발 도구, AI 시스템 운영을 우선 분류한다.
- `software-development`는 AI 여부와 독립적인 설계, 테스트, 리뷰, 동시성, 실행 모델 등 소프트웨어 공학 주제를 분류한다.
- 따라서 모델 이행, 코드베이스 지식 그래프, AI 생성 코드 검증, 프롬프트 엔지니어링은 `ai`에 둔다. Concurrency·Parallelism·Async는 특정 AI 도구 또는 JavaScript 문법에 한정하지 않으므로 `software-development`에 둔다.
- 기존 공개 Agent 글의 카테고리 이동은 이번 설계의 범위 밖이다. 추후 별도 검토·승인 없이는 파일 이동이나 URL 변경을 하지 않는다.

## 발행 순서와 글의 경계

| 작업일·예정 `publishedAt` | 원문 | 대상 카테고리 | 제안 제목과 독자 효용 |
| --- | --- | --- | --- |
| 2026-08-24 | [Everyone Benchmarked Opus 5. Nobody Read the Deletion List That Shipped With It](https://medium.com/ai-all-in/everyone-benchmarked-opus-5-nobody-read-the-deletion-list-that-shipped-with-it-daa43800d4eb) | `ai` | **모델을 교체할 때 하네스 지침을 유지·삭제·재검증하는 방법** — 모델 업데이트 때 오래된 프롬프트, 훅, 검증 규칙을 무조건 누적하지 않고 근거와 회귀 검증으로 정리하는 방법을 설명한다. |
| 2026-08-25 | [Andrej Karpathy Asked for a Tool. 48 Hours Later, Graphify Went Viral.](https://www.towardsdeeplearning.com/andrej-karpathy-asked-for-a-tool-48-hours-later-graphify-went-viral-10d8ead5f50e) | `ai` | **AI 코딩 에이전트를 위한 코드베이스 지식 그래프: 출처, 추론, 평가 기준** — 지식 그래프가 RAG·검색과 다른 경계, 추출 관계와 추론 관계의 구분, 성능 주장을 평가하는 재현 조건을 설명한다. |
| 2026-08-26 | [The Agent Writes 10,000 Lines Before Lunch. Good Luck Reviewing Them.](https://thilo-hermann.medium.com/the-agent-writes-10-000-lines-before-lunch-good-luck-reviewing-them-34aa69bf0db1) | `ai` | **AI가 만든 코드의 검증 비용을 관리하는 리뷰 설계** — 생성량이 늘어날 때 독립 verifier, 테스트, 변경 규모 제한, provenance와 human review를 어떻게 배치할지 다룬다. |
| 2026-08-27 | [Concurrency, Parallelism, and Async](https://code.likeagirl.io/concurrency-parallelism-async-47312e0be553) | `software-development` | **Concurrency·Parallelism·Async를 실행 모델과 병목으로 구분하기** — 세 용어를 혼용하지 않고 CPU 병렬 처리, I/O 대기, 이벤트 루프, 작업 분할의 선택 기준으로 설명한다. |
| 2026-08-28 | [Prompt Engineering](https://www.kaggle.com/whitepaper-prompt-engineering) | `ai` | **프롬프트 엔지니어링을 재현 가능한 실험으로 다루는 방법** — 지시·문맥·예시·출력 형식·모델 설정을 분리하고, 평가 세트와 반복 실험으로 개선하는 기준을 설명한다. |

제안 제목과 slug는 초안 전 조사에서 기존 URL과 충돌하지 않는지 확인한 뒤 확정한다. 원문이 말하는 제품명·수치·평가 결과는 제목 또는 본문의 사실로 자동 채택하지 않는다.

## 글별 조사와 근거 기준

각 작업일에는 `skills/blog-post-writer/SKILL.md`와 다음 보조 문서를 먼저 읽고 따른다.

- `skills/blog-post-writer/references/voice-and-structure.md`
- `skills/blog-post-writer/references/evidence-and-citations.md`
- `skills/blog-post-writer/references/quality-gates.md`

각 글의 조사 순서는 다음과 같다.

1. 독자가 글을 읽고 이해·판단·적용할 수 있어야 하는 범위를 한 문장으로 정한다.
2. 원문에서 가져오려는 핵심 주장, 수치, 제품 기능, 버전 의존 설명을 목록으로 만든다.
3. 각 항목을 1차 출처로 검증한다. 예를 들어 모델 이행 글은 모델 제공자의 출시·이행 문서, Graphify 글은 공식 저장소·재현 가능한 평가 자료, 코드 검증 글은 공식 프로젝트 기여 지침·검증 도구 문서, 동시성 글은 언어 런타임·플랫폼 문서, 프롬프트 글은 Kaggle 백서와 모델 제공자의 공식 프롬프트 가이드가 기준이다.
4. 원문 자체의 주장과 확인한 근거가 다르면, 원문의 시점·조건을 밝히고 검증한 근거를 기준으로 글의 범위를 좁히거나 정정한다.
5. 근거가 부족한 수치 또는 재현할 수 없는 성능 비교는 삭제하거나, 측정 조건과 한계를 분명히 적는다.

기술적 사실에는 의미 있는 식별자의 GFM 각주를 사용한다. 수동 `## 참고` 목록, 수동 번호, HTML 앵커는 사용하지 않는다.

## 초안·검토·공개 흐름

각 글은 `src/content/blog/<category>/<slug>.md`에 `draft: true`로 만든다. 필수 frontmatter는 `title`, `description`, `publishedAt`, `category`, `tags`, `draft: true`이며, 원문 링크는 frontmatter 다음에 놓는다.

```text
조사·근거 목록
  -> draft: true Markdown 초안
  -> check/test/build 및 Mermaid 검증
  -> 데스크톱·태블릿·모바일 로컬 검토 링크
  -> 사용자 확인
  -> draft 해제, 의미 있는 서명 커밋, 푸시
```

- 초안 단계에서는 사용자의 명시적 지시 없이 `draft`를 해제하거나 글을 커밋·푸시하지 않는다.
- Mermaid를 사용하면 `npm run validate:mermaid`도 실행한다. Mermaid는 관계나 순서가 세 단계 이상일 때만 사용하며, 빌드 시 SVG로 렌더링되어야 한다.
- 각 초안에는 `npm run check`, `npm run test`, `npm run build`를 실행한다. 공개·배포 준비 완료를 말하기 전에는 해당 글을 데스크톱·태블릿·모바일 폭에서 확인한다.
- 사용자가 공개를 승인하면 글 한 편당 하나의 독립적이고 의미 있는 `-S` 서명 커밋을 만든다. Git이 서명 암호를 요구하면 즉시 중단하고 사용자에게 알린다.

## ADHD Skill 원칙의 처리

"Claude ADHD Skill" 원문은 독립적인 아카이브 또는 이번 5편의 자동 구성 요소로 만들지 않는다. Progressive Disclosure, Atomic Task, Context-Switching Bridge, 프로젝트 맥락의 외부화 같은 원칙은 향후 신규 글의 범위와 1차 근거에 실제로 필요할 때만 후보로 검토한다.

그 원칙을 어떤 글에라도 넣기 전에, 포함할 원칙·글의 목적·근거를 사용자에게 먼저 알리고 승인을 받는다. 이 설계는 향후 이를 별도의 신규 원본 글로 반드시 만들겠다는 약속이 아니다.

## 계획 문서와 완료 기준

승인된 실행 계획은 `docs/superpowers/plans/2026-08-24-original-ai-article-series.md`에 별도로 기록한다. 레거시 이전 계획과 이 신규 글 일정은 서로의 체크박스를 수정하지 않는다.

각 작업일의 완료는 다음 모두를 만족할 때만 선언한다.

- 해당 글의 범위, 카테고리, slug가 기존 공개 경로와 충돌하지 않는다.
- 원문 링크, 독립적인 1차 근거, GFM 각주, 한국어 문체, `draft: true` 초안 계약을 만족한다.
- 필요한 정적 검사와 반응형 로컬 검토를 마쳤다.
- 공개·커밋·푸시 여부는 사용자의 해당 글 확인에 따라 별도로 결정했다.
