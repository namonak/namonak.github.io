---
title: "OSTEP 09. Lottery Scheduling"
description: "티켓으로 CPU 비율을 배분하는 Lottery Scheduling과 결정론적 대안인 Stride Scheduling을 정리합니다."
publishedAt: 2018-05-18
category: "operating-system"
tags: ["operating-system", "ostep", "cpu-scheduling", "lottery-scheduling", "stride-scheduling"]
---

> 학습 자료: [OSTEP 9장 Lottery Scheduling](https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/09-lottery.pdf)

앞선 CPU 스케줄링 정책은 반환 시간이나 응답 시간을 중심으로 작업 순서를 정했습니다. **비례 배분(proportional share)** 스케줄링은 자원을 누가 먼저 받는지가 아니라, 각 작업이 장기적으로 얼마만큼의 자원을 받는지를 정합니다. Lottery Scheduling은 이를 티켓 추첨으로 구현합니다.

## 핵심 개념

| 질문 | 답변 |
| --- | --- |
| 티켓은 무엇인가? | CPU 시간을 받을 권리를 나타내는 단위입니다. |
| 어떻게 실행 대상을 고르는가? | 전체 티켓 범위에서 무작위 번호를 뽑고, 그 번호를 포함하는 작업을 실행합니다. |
| 장점은? | 구현이 단순하고 티켓의 양으로 상대적인 CPU 비율을 자연스럽게 표현합니다. |
| 한계는? | 짧은 구간에서는 난수에 따라 실제 비율이 기대와 다를 수 있습니다. |
| Stride Scheduling은? | 무작위 추첨 대신 pass 값을 이용해 같은 비율을 결정론적으로 배분합니다. |

## 티켓과 비례 배분

두 작업 A와 B에 각각 75장과 25장의 티켓이 있다면, 충분히 긴 시간 동안 A는 CPU의 약 75%, B는 약 25%를 받습니다. 여기서 중요한 것은 절대 개수가 아니라 **상대적인 비율**입니다.

| 작업 | 티켓 | 기대 CPU 점유율 |
| --- | ---: | ---: |
| A | 75 | 75% |
| B | 25 | 25% |

추첨은 전체 티켓 수 안에서 당첨 번호를 하나 선택하고, 준비 큐의 티켓을 차례로 누적해 당첨 번호가 포함된 작업을 찾는 방식으로 구현할 수 있습니다.

```text
counter = 0
winner = random(0, total_tickets)

for job in ready_queue:
  counter += job.tickets
  if counter > winner:
    run(job)
    break
```

![Lottery Scheduling의 추첨 절차를 설명하는 코드 그림](/images/ostep/lottery-code.png)

_그림 12.1. 당첨 번호를 뽑고, 누적 티켓 수로 실행할 작업을 고릅니다. 출처: OSTEP 9장_

## 티켓의 유용한 성질

티켓은 단순한 우선순위 값보다 조합하기 쉽습니다. OSTEP은 다음과 같은 기법을 소개합니다.

| 기법 | 의미 |
| --- | --- |
| Ticket currency | 서로 다른 사용자나 조직이 각자의 통화로 티켓을 배분하고, 시스템이 전역 티켓으로 환산합니다. |
| Ticket transfer | 한 작업이 다른 작업에 자신의 티켓을 잠시 넘겨줄 수 있습니다. 클라이언트가 서버를 기다릴 때 유용합니다. |
| Ticket inflation | 작업이 필요할 때 자신의 티켓 수를 늘릴 수 있습니다. 신뢰할 수 있는 환경에서만 안전합니다. |

예를 들어 클라이언트가 RPC 서버의 응답을 기다리는 동안에는, 클라이언트의 티켓을 서버에 넘겨 서버가 더 빨리 실행되도록 할 수 있습니다. 의존 관계가 있는 작업을 함께 빠르게 진행시키는 방법입니다.

## 공정성은 긴 시간에서 드러난다

Lottery Scheduling은 확률적 정책이므로 짧은 실행 구간에서는 기대한 비율과 실제 결과가 다를 수 있습니다. 티켓 비율이 1:1이어도 초반 몇 번의 추첨이 한 작업에 몰릴 수 있습니다. 그러나 추첨 횟수가 늘어날수록 실제 점유율은 기대값에 가까워집니다.

![시행 횟수가 늘수록 Lottery Scheduling의 공정성 오차가 줄어드는 그래프](/images/ostep/lottery-fairness.png)

_그림 12.2. 실행 횟수가 늘수록 난수에 의한 오차는 평균적으로 줄어듭니다. 출처: OSTEP 9장_

따라서 이 정책은 짧은 응답 지연의 상한을 엄격하게 보장해야 하는 환경보다, 장기적인 비율 배분이 중요한 환경에 더 잘 맞습니다.

## Stride Scheduling

Stride Scheduling은 Lottery Scheduling의 비례 배분 아이디어를 난수 없이 구현합니다. 각 작업에는 티켓 수에 반비례하는 `stride`와 현재까지의 누적값인 `pass`가 있습니다.

```text
stride = large_number / tickets
```

스케줄러는 `pass`가 가장 작은 작업을 실행하고, 실행한 작업의 `pass`에 그 작업의 `stride`를 더합니다. 티켓이 많은 작업은 stride가 작으므로 pass가 천천히 증가하고, 더 자주 선택됩니다.

| 작업 | 티켓 | stride | 선택 뒤 pass 변화 |
| --- | ---: | ---: | --- |
| A | 100 | 100 | 0 → 100 → 200 ... |
| B | 50 | 200 | 0 → 200 → 400 ... |

![Stride Scheduling에서 pass 값으로 다음 작업을 고르는 실행 추적](/images/ostep/stride-trace.png)

_그림 12.3. pass가 가장 작은 작업을 선택하면 티켓 비율에 맞는 실행 순서가 만들어집니다. 출처: OSTEP 9장_

Stride Scheduling은 짧은 구간에서도 예측 가능한 비율을 제공하지만, 새 작업이 들어올 때 초기 pass 값을 어떻게 정할지 고민해야 합니다. Lottery Scheduling은 새 작업에 티켓만 부여하면 되므로 이 점에서는 더 단순합니다.

## 비교와 정리

| 정책 | 선택 방식 | 장점 | 주의할 점 |
| --- | --- | --- | --- |
| Lottery Scheduling | 무작위 티켓 추첨 | 단순하고 티켓 이전·통화 같은 확장이 쉽습니다. | 짧은 구간의 비율은 확률적으로 흔들릴 수 있습니다. |
| Stride Scheduling | 가장 작은 pass 선택 | 결정론적이며 짧은 구간에서도 비율이 안정적입니다. | 새 작업의 초기 pass와 상태 관리가 필요합니다. |

- 티켓은 CPU 시간의 **상대적 몫**을 표현합니다.
- Lottery Scheduling은 확률로, Stride Scheduling은 pass 값으로 비례 배분을 실현합니다.
- 두 정책 모두 한 번의 실행 순서보다 장기적으로 자원을 어떻게 나눌지에 초점을 둡니다.
