---
title: "Kotlin 코루틴 취소를 경계에서 다루는 방법"
description: "구조화된 동시성에서 취소 신호를 전파하고, UI 상태를 안전하게 정리하는 기준을 살펴봅니다."
publishedAt: 2024-07-31
category: "android"
tags: ["kotlin", "coroutines", "android"]
---

코루틴 취소는 예외 처리의 변형이 아니라 작업 생명 주기의 정상적인 신호입니다. 화면이 사라지거나 더 최신 요청이 시작되면 이전 작업은 결과를 만들 필요가 없습니다.

## 취소를 다시 던지기

`CancellationException`을 일반 오류처럼 삼키면 부모 작업이 끝났다는 사실을 잃게 됩니다. 정리 작업만 수행하고 취소는 호출자에게 전달하는 편이 안전합니다.

```kotlin
suspend fun refresh(): UiState = try {
    repository.load()
} catch (error: CancellationException) {
    throw error
} catch (error: IOException) {
    UiState.Error(error.message ?: "네트워크 오류")
}
```

| 상황 | 기대 동작 | UI 처리 |
| --- | --- | --- |
| 화면 종료 | 자식 코루틴 취소 | 로딩 상태를 별도로 표시하지 않음 |
| 새로고침 재시작 | 이전 요청 취소 | 최신 요청의 결과만 반영 |
| 네트워크 오류 | 오류 상태 반환 | 재시도 동작 제공 |

![Coroutine cancellation flow](/images/kotlin-coroutines-flow.svg)

취소의 출발점을 ViewModel과 화면 생명 주기에 가깝게 두면, 저장소 계층은 불필요한 화면 상태를 알 필요가 없습니다.
