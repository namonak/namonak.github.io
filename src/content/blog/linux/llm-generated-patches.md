---
title: "Linux Kernel의 LLM 생성 Patch 지침: AI 시대의 Maintainer Economics"
description: "Linux Kernel의 tool-generated content 지침을 바탕으로, LLM 생성 patch가 maintainer의 검증 비용과 기여자 책임을 어떻게 바꾸는지 정리합니다."
publishedAt: 2026-01-20
category: "linux"
tags: ["linux-kernel", "open-source", "llm", "code-review", "maintainers"]
draft: false
---

> 원문: [Kernel Guidelines for Tool-Generated Content](https://docs.kernel.org/process/generated-content.html)

## 핵심 요약

LLM이 patch 작성 비용을 낮춰도, 변경의 의도·안전성·테스트 범위를 확인하는 maintainer의 비용까지 자동으로 줄어들지는 않습니다. Linux Kernel의 지침은 AI 사용을 일괄 금지하기보다, 제출자가 결과물을 이해하고 방어하며 도구 사용과 검증 맥락을 투명하게 남겨 review 부담을 떠넘기지 않도록 요구합니다.

## 핵심은 AI 사용 여부가 아니라 검증 비용의 분배입니다

LLM이 생성한 patch를 둘러싼 논의는 종종 "AI가 작성한 코드를 받아야 하는가"라는 찬반으로 흐릅니다. Linux Kernel의 최근 지침은 더 실무적인 질문을 던집니다. 제출자는 자신이 보낸 내용을 이해하고 설명할 수 있는가, 그리고 maintainer가 그 사실을 확인하는 비용은 누가 부담하는가입니다.[^kernel-generated-content]

Kernel은 chatbot이 만든 함수, coding assistant가 만든 뒤 사람이 다듬은 파일, 생성형 AI가 쓴 changelog까지 tool-generated content의 예로 듭니다. 애매하면 투명성을 택하라고 하며, 도구·입력·영향 받은 범위·테스트 방법을 cover letter나 changelog에 설명할 수 있다고 안내합니다.[^kernel-generated-content] 즉 LLM 사용을 일괄 금지하는 규칙이라기보다, 대량 생성이 review queue에 숨기는 검증 비용을 드러내는 규칙입니다.

## 1. Patch의 공급이 늘어도 review 역량은 자동으로 늘지 않습니다

LLM은 비슷한 형태의 patch, 설명문, 답변 초안을 빠르게 만들 수 있습니다. 그러나 kernel maintainer가 해야 하는 일은 단순히 diff를 읽는 데 그치지 않습니다.

| 기여자가 제출하는 것 | maintainer가 확인해야 하는 것                                      |
| -------------------- | ------------------------------------------------------------------ |
| 코드 변경            | concurrency, memory ownership, error path, subsystem 규칙이 맞는가 |
| changelog            | 문제·원인·해결 범위가 정확한가                                     |
| 테스트 결과          | 대상 하드웨어·설정·재현 조건에서 의미 있는가                       |
| AI 사용 설명         | 제출자가 실제 동작과 한계를 이해하는가                             |

LLM이 만든 patch는 문법적으로 그럴듯하고 style checker를 통과할 수 있습니다. 그렇다고 concurrency bug, 잘못된 lifetime 가정, 드물게만 발생하는 오류 경로까지 검증되었다는 뜻은 아닙니다. Kernel의 patch 제출 문서는 AI가 hallucination이나 부적절한 코드·설명·문서를 만들 수 있다고 지적하며, 제출자가 이해하거나 설명할 수 없는 결과물은 보내지 말라고 명시합니다.[^submitting-patches]

이 차이를 **Maintainer Economics**로 볼 수 있습니다. 기여자 한 명이 생성 도구로 patch 100개를 만드는 비용은 낮아져도, 각 patch의 정확성과 맥락을 확인하는 maintainer의 비용은 줄지 않을 수 있습니다. 오히려 provenance가 불명확하면 우선순위 판단과 질문 왕복이 늘어납니다.

## 2. DCO는 도구가 아니라 제출자를 책임 주체로 둡니다

Linux Kernel의 Developer's Certificate of Origin(DCO)은 제출자가 기여할 권리와 책임을 확인하는 절차입니다. tool-generated content 지침도 먼저 DCO와 patch 제출 가이드를 읽고, 제출한 내용을 전부 이해하며 review 질문에 답할 준비가 되어 있어야 한다고 말합니다.[^kernel-generated-content]

따라서 다음 두 상황은 다릅니다.

- **AI를 보조 도구로 쓴 기여**: 제출자가 문제를 재현하고, 설계 대안을 비교하고, diff와 테스트를 검토한 뒤 자신의 변경으로 설명할 수 있습니다.
- **AI 출력을 전달만 한 기여**: 왜 이 lock을 잡는지, 왜 이 error path가 필요한지, 어떤 환경에서 검증했는지 설명하지 못합니다.

두 번째 경우 문제는 작성자가 사람이냐 모델이냐가 아닙니다. 검토자가 변경의 의도와 위험을 알아내기 위해 제출자를 대신해 탐색해야 한다는 점입니다. Kernel 문서는 자동 생성 비중이 클수록 추가 검토를 예상하라고 하고, maintainer는 거절·추가 테스트·낮은 우선순위·추가 설명을 요구할 재량이 있다고 밝힙니다.[^kernel-generated-content]

## 3. 좋은 AI 사용은 생성보다 검증을 강화합니다

LLM을 쓰지 말자는 결론이 꼭 필요한 것은 아닙니다. 오히려 Kernel의 patch 제출 문서가 권하는 방향은 전체 해답을 복사하기보다, 디버깅·스타일 점검·명백한 실수 탐지 같은 보조 작업에 신중하게 쓰는 것입니다.[^submitting-patches]

기여자 관점의 안전한 흐름은 다음과 같습니다.

```mermaid
flowchart LR
  A[문제 재현] --> B[원인 가설]
  B --> C[작은 변경 작성]
  C --> D[AI로 반례·누락 점검]
  D --> E[테스트·diff 검토]
  E --> F[provenance와 한계 기록]
  F --> G[patch 제출]
```

여기서 AI는 `C`만 담당하는 자동 작성기가 아닙니다. 예를 들어 제출자는 AI에게 "이 error path에서 reference count가 새는 반례가 있는가"를 물을 수 있고, 그 답을 실제 코드와 test로 검증할 수 있습니다. 이 방식은 생성량을 최대화하기보다 제출자의 이해와 테스트 범위를 넓힙니다.

changelog도 marketing 문구가 아니라 review를 위한 계약입니다. 최소한 다음이 있어야 합니다.

1. 문제를 어떤 조건에서 재현했는가
2. 변경이 왜 그 원인을 해결하는가
3. 어떤 테스트를 어디에서 실행했는가
4. 도구가 실질적으로 관여했다면 어느 범위와 어떤 방식이었는가

원문 prompt 전문이 항상 필요한 것은 아닙니다. 그러나 한두 개의 prompt로 코드 대부분을 생성했다면 입력을 포함하고, 긴 대화였다면 도움의 성격을 요약하라는 Kernel 지침은 review에 필요한 맥락을 남기는 현실적인 기준입니다.[^kernel-generated-content]

## 4. 프로젝트가 설계해야 할 것은 금지 규칙보다 review 경로입니다

모든 오픈소스 프로젝트가 Kernel과 같은 정책을 복제할 필요는 없습니다. 규모가 작은 프로젝트는 간단한 PR template과 CI만으로도 충분할 수 있습니다. 다만 LLM 사용이 늘면 다음 질문에는 답할 수 있어야 합니다.

- 생성된 변경을 누가 end-to-end로 이해하고 소유하는가?
- 테스트 로그와 재현 조건은 변경 위험에 비례하는가?
- reviewer가 provenance를 알아야 하는 이유와 형식이 정해져 있는가?
- 자동 생성으로 늘어난 PR 수가 maintainer의 triage 시간을 잠식하지 않는가?
- 반복적으로 낮은 품질을 보내는 기여에 어떤 피드백·제한·교육 경로가 있는가?

AI는 코드 작성의 한계 비용을 낮춥니다. 그러나 오픈소스의 병목은 이미 오래전부터 작성보다 review, release, 유지보수였습니다. Kernel 지침의 중요한 메시지는 AI 출력의 출처를 고백하라는 데서 끝나지 않습니다. **변경을 이해하고 방어할 책임과 검증 비용을 제출자에게 남겨 두라**는 데 있습니다.

[^kernel-generated-content]: [Linux Kernel documentation, "Kernel Guidelines for Tool-Generated Content"](https://docs.kernel.org/process/generated-content.html)

[^submitting-patches]: [Linux Kernel documentation, "Submitting patches: the essential guide"](https://www.kernel.org/pub/software/scm/git/docs/SubmittingPatches.html)
