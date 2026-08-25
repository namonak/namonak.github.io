# Knowledge Archive: Harness Engineering 설계

**작성일:** 2026-08-25

**상태:** 승인된 설계 · 구현 계획 작성 전

## 목표

공개 Knowledge Archive에 재사용 가능한 개념 중심의 글 네 편을 추가한다. 기사와 세미나 자료는 문서의 제목이나 결론이 아니라, 검증 가능한 근거와 작성 배경으로 취급한다.

기존 `Observability for Agentic Harness` 글은 독립적인 운영 심화 글로 보존한다. 새 Harness Engineering 글은 관찰성의 역할만 요약하고 기존 글로 내부 링크한다.

## 범위와 비범위

### 범위

- AI 카테고리에 Harness Engineering의 상위 원칙과 Brownfield 적용 원칙을 각각 작성한다.
- AI Native 조직의 새로운 Work Layer와 Control Plane Dependency를 독립 Concept 문서로 작성한다.
- Code Review / Verification Bottleneck 및 Slack Human-Agent Collaboration 자료를 Harness Engineering의 근거로 병합한다.
- 모든 신규 글에 기사 기반 또는 주제 기반 글의 콘텐츠 계약, 출처 검증, 서술형 핵심 요약을 적용한다.

### 비범위

- 기존 `ai/observability-for-agentic-harness` 본문을 병합·삭제·재작성하지 않는다.
- 전사 세미나의 회사명, 제품명, 조직 관례, 내부 저장소, 내부 URL, 내부 코드·구성·수치를 공개하지 않는다.
- 기사별 Markdown 네 편을 단순 요약·보관하는 방식을 사용하지 않는다.
- 새 카테고리, 댓글, 검색, RSS, 다국어 기능, 배포 구조는 추가하지 않는다.

## 문서 구조

| 경로 | 제목(초안) | 책임 | 주요 근거 |
| --- | --- | --- | --- |
| `src/content/blog/ai/harness-engineering.md` | Harness Engineering: 에이전트 작업을 통제 가능한 시스템으로 만드는 법 | Context·Task·Execution·Human-Agent Interaction·Verification·Observability를 잇는 상위 모델 | Claude/Slack 공식 글, Code Review 자료, 공개 1차 자료 |
| `src/content/blog/ai/harness-engineering-for-brownfield-codebases.md` | Harness Engineering for Brownfield Codebases | 기존 코드베이스에 상위 원칙을 적용하는 방법 | 공개 근거와 일반화된 작성자 관점 |
| `src/content/blog/ai/ai-native-work-layer.md` | AI Native 조직의 새로운 Work Layer | AI가 기존 업무를 대체하는 대신 추가할 수 있는 업무 계층 | Linear의 공개 데이터와 추가 공개 자료 |
| `src/content/blog/software-development/control-plane-dependency.md` | Control Plane Dependency | Compute 소유와 시스템 통제권을 구별하는 아키텍처 원칙 | GitHub 공식 문서·상태 기록, 장애 사례 |

## 문서 간 관계

```text
Harness Engineering
├── Context / Shared Organizational Context
├── Task / Execution
├── Human-Agent Handoff
├── Verification Bottleneck
└── Observability ──> Observability for Agentic Harness (기존 글)

Harness Engineering for Brownfield Codebases ──> Harness Engineering

AI Native 조직의 새로운 Work Layer
└── Human-Agent coordination cost와 Harness Engineering을 선택적으로 연결

Control Plane Dependency
└── 독립된 Software Development 아키텍처 원칙
```

`model-migration-harness-instructions`, `llm-generated-patches`는 관련 개념을 보완하는 내부 링크 후보로 검토하되, 독자가 반드시 함께 읽어야 하는 경우에만 연결한다.

## 글별 내용 계약

### Harness Engineering

1. Harness가 LLM의 추론을 안전하고 관찰 가능하며 검증 가능한 작업 흐름에 배치하는 시스템이라는 점을 정의한다.
2. Private Context와 Shared / Externalized Context를 비교하고, 공유 가능한 결정 기록이 Human과 Agent 모두의 활용 가능성을 높이는 관계를 설명한다.
3. Agent의 초안·조사·요약·모니터링과 Human의 검토·판단·방향 수정이 반복되는 Handoff 흐름을 제시한다.
4. 생성 비용의 하락이 검증 병목을 만들 수 있음을 설명하되, Review의 결함 검출·유지보수성·지식 전달·gatekeeping·책임 분산 역할을 구분한다.
5. Observability는 독립 글의 심화 범위로 남기고 해당 글에 내부 링크한다.

### Harness Engineering for Brownfield Codebases

1. Brownfield에서 규칙과 의도가 코드·도구·관례에 분산되는 문제를 정의한다.
2. 암묵 규칙을 지침으로 추출하고, 디렉터리·서브시스템 단위로 Context Boundary를 두며, 생성물·죽은 코드·무관한 영역을 제외하는 원칙을 제시한다.
3. 탐색과 구현을 분리하고, 작은 변경·테스트·정적 검사·리뷰로 회귀를 증명하는 루프를 설명한다.
4. 조직 고유의 절차처럼 보일 수 있는 내용은 작성자 관점으로 제한하고 적용 조건·한계를 밝힌다.

### AI Native 조직의 새로운 Work Layer

1. AI 도입을 단순 절감 시간으로만 판단할 수 없는 이유를 설명한다.
2. Planning·Development·Review·Communication 위에 AI Chat·Agent Delegation·Prompting·Verification·Agent Monitoring이 추가되는 구조를 제시한다.
3. throughput 증가, workload 증가, Human-Agent coordination cost를 구분한다.
4. Linear은 단일 Evidence / Case Study로 한정하고, 추후 다른 공개 연구를 추가할 수 있는 Living Document 구조를 만든다.

### Control Plane Dependency

1. Data Plane과 Control Plane의 책임을 구분한다.
2. Self-hosted GitHub Actions Runner가 있어도 GitHub의 scheduling·authentication·repository metadata·workflow control에 의존할 수 있음을 조건부 사례로 설명한다.
3. `Self-hosted ≠ Independent`를 절대 명제가 아니라, 소유한 Control Plane의 범위에 따라 달라지는 원칙으로 서술한다.
4. Kubernetes, cloud provider, managed database, CI/CD, CDN, SaaS, identity provider에 적용할 수 있는 exit readiness와 degraded operation 질문을 제시한다.

## 출처·문체·공개 상태

- `skills/blog-post-writer/SKILL.md` 및 보조 문서의 필수 절차를 따른다.
- 글 작성 직전에 `ARCHITECTURE.md`, `docs/content-guide.md`, 콘텐츠 스키마, 기존 공개 경로를 다시 확인한다.
- 신규 글은 기본적으로 `draft: true`로 작성한다. 사용자의 명시 승인 없이 `draft`를 해제하거나 커밋·푸시하지 않는다.
- 아티클 기반 글에는 frontmatter 다음에 보이는 `> 원문:` 링크를 두고, 그 뒤에 `## 핵심 요약`을 둔다.
- 핵심 요약은 1~3개의 짧은 서술형 문단으로 작성하며, 각 문단은 1~3문장으로 제한한다.
- 외부의 검증 가능한 주장은 GFM 각주를 사용한다. 원문 기사·Hada는 출발점 또는 보조 근거이며, 핵심 기술 사실·수치·장애 기록은 1차 출처로 검증한다.
- 내부 세미나 자료는 공개 링크나 각주에 넣지 않는다. 그로부터 나온 일반화는 실무 관점임을 표시하고, 일반 사실로 단정하지 않는다.
- `Progressive Disclosure`, `Atomic Task`, `Context-Switching Bridge`는 이번 문서에 자동으로 추가하지 않는다. 이후 신규 글에 추가가 필요할 때는 작성 전에 사용자에게 알린다.

## 검증과 인계

각 초안은 독립적으로 다음을 만족해야 한다.

1. 기존 URL·파일과 충돌하지 않는 경로와 유효한 frontmatter를 사용한다.
2. source URL, GFM 각주, Mermaid 문법(사용 시)을 검토한다.
3. `npm run check`, `npm run test`, `npm run build`를 실행한다.
4. Mermaid를 사용할 경우 `npm run validate:mermaid`도 실행한다.
5. 로컬에서 데스크톱·태블릿·모바일 폭으로 렌더링을 확인하고, 검토 가능한 로컬 링크를 제공한다.

## 커밋 경계

커밋은 모두 서명하고, 아래처럼 독립 검토 가능한 단위로 준비한다.

1. 본 설계 명세
2. Harness Engineering 초안
3. Brownfield Codebases 초안
4. AI Native Work Layer 초안
5. Control Plane Dependency 초안

Git이 서명 비밀번호를 요구하면 즉시 중단하고 사용자에게 알린다. 사용자가 명시적으로 요청할 때에만 커밋·푸시하며, 날짜는 그 요청 시점의 지시를 따른다.

## 수용 기준

- 네 편의 새 글은 기사 제목이 아니라 장기적으로 재사용 가능한 Concept 제목을 사용한다.
- Code Review와 Slack 자료는 Harness Engineering에 중복 없이 흡수된다.
- Observability 글은 독립성을 보존하면서 Harness Engineering에서 연결된다.
- Brownfield 글에는 어떠한 회사 식별 정보나 내부 링크도 없다.
- Linear과 GitHub 장애는 각각 Evidence / Case Study로 제한되며 문서의 중심은 일반 원칙이다.
- 모든 초안은 콘텐츠 작성 스킬의 근거·요약·검증 규칙을 충족한다.
