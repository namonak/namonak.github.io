---
title: "[Kotlin] PriorityQueue"
description: "Kotlin의 PriorityQueue 개념과 힙 기반 동작, 주요 메서드, 기본 및 Comparator 사용 예제를 정리합니다."
publishedAt: 2024-03-11
category: "kotlin"
tags: ["kotlin", "priorityqueue", "우선순위큐", "코틀린"]
---

## 배경 설명

우리가 일상 생활에서 대기열을 생각할 때, 보통 '먼저 온 사람이 먼저 서비스를 받는다'는 원칙을 따릅니다. 컴퓨터 과학에서도 비슷한 개념의 자료 구조가 있지만, 좀 더 유연하고 다양한 상황에 맞출 수 있는 '우선순위 큐(PriorityQueue)'가 그 중 하나입니다. Kotlin에서 [PriorityQueue](https://developer.android.com/reference/kotlin/java/util/PriorityQueue)는 컬렉션 프레임워크의 일부로, 각 요소가 우선 순위에 따라 처리되도록 합니다. 즉, 요소가 순차적으로 정렬되는 것이 아니라, 각 요소에 할당된 우선순위에 따라 접근 순서가 결정됩니다.

## PriorityQueue의 개념

PriorityQueue는 기본적으로 '우선순위를 고려하는 큐'입니다. 이는 표준 큐(Queue)의 FIFO(First-In-First-Out) 원칙과는 다르게 작동합니다. Kotlin에서의 PriorityQueue는 내부적으로 힙(Heap) 자료 구조를 사용하여 요소들을 관리합니다. 힙을 사용하는 이유는 각 요소를 추가하거나 제거할 때, **우선순위에 따라 자동으로 정렬**되기 때문입니다. 이로 인해, 가장 높은 우선순위를 가진 요소에 항상 O(log n) 시간 안에 접근할 수 있습니다.

## PriorityQueue 사용 사례

1. **작업 스케줄링**: 다양한 우선순위를 가진 작업들을 관리할 때 유용합니다. 예를 들어, 시스템 리소스에 대한 접근이나 처리해야 할 작업의 순서를 결정하는 데 사용됩니다.
2. **다익스트라 알고리즘**: 최단 경로를 찾을 때, 가장 낮은 비용을 가진 노드를 선택하기 위해 사용됩니다.
3. **이벤트 관리 시스템**: 이벤트의 우선순위에 따라 처리 순서를 결정할 수 있습니다.

## Kotlin에서의 PriorityQueue 사용하기

### PriorityQueue의 주요 메서드

- **add(element: E)**: 요소를 PriorityQueue에 추가합니다. 이 메서드는 내부적으로 `offer` 메서드를 호출하여, 요소를 우선순위에 따라 적절한 위치에 삽입합니다.
- **offer(element: E)**: `add`와 마찬가지로 요소를 추가하지만, 큐가 꽉 차 있을 경우 `false`를 반환합니다.
- **poll()**: 큐에서 가장 높은 우선순위를 가진 요소를 제거하고 반환합니다. 큐가 비어있을 경우 `null`을 반환합니다.
- **peek()**: 큐에서 가장 높은 우선순위를 가진 요소를 반환하지만, 이 요소를 큐에서 제거하지는 않습니다. 큐가 비어있을 경우 `null`을 반환합니다.
- **remove(element: Object)**: 지정된 요소를 큐에서 제거합니다. 요소가 성공적으로 제거되면 `true`를, 그렇지 않으면 `false`를 반환합니다.
- **clear()**: 큐의 모든 요소를 제거합니다.

Kotlin에서 PriorityQueue를 사용하려면, 먼저 `import java.util.PriorityQueue`를 통해 가져와야 합니다. 기본적으로 Kotlin은 Java의 클래스와 메소드를 사용할 수 있으므로, Java의 PriorityQueue를 그대로 사용할 수 있습니다.

### 기본적인 사용 예제

```kotlin
import java.util.PriorityQueue

fun main() {
    val pq = PriorityQueue<Int>()

    pq.add(3)
    pq.add(5)
    pq.add(1)
    pq.add(2)

    println("PriorityQueue: $pq")

    while(pq.isNotEmpty()) {
        println("Processing: ${pq.poll()}")
    }
}
```

위 예제에서는 `Int` 타입의 `PriorityQueue`를 생성하고, 몇 가지 숫자를 추가한 후, 우선순위에 따라 하나씩 제거하며 출력합니다. `PriorityQueue`는 기본적으로 가장 낮은 숫자를 가장 높은 우선순위로 간주하여 처리합니다.

### 커스텀 우선순위 정의하기

`PriorityQueue`를 사용할 때, 객체의 우선순위를 커스텀하는 것도 가능합니다. 이를 위해 `Comparator`를 구현하여 `PriorityQueue`의 생성자에 전달할 수 있습니다.

```kotlin
import java.util.PriorityQueue

fun main() {
    val pq = PriorityQueue { a: String, b: String -> b.length - a.length }

    pq.add("Apple")
    pq.add("Banana")
    pq.add("Cherry")
    pq.add("Date")

    while(pq.isNotEmpty()) {
        println("Processing: ${pq.poll()}")
    }
}
```

이 예제에서는 문자열의 길이에 따라 우선순위를 정의하고 있습니다. 가장 긴 문자열이 가장 먼저 처리됩니다.

## 핵심 요약

- Kotlin의 `PriorityQueue`는 우선순위를 고려하여 요소를 처리하는 자료 구조입니다.
- 내부적으로 힙을 사용하여 요소를 자동으로 정렬하며, 이를 통해 우선순위가 가장 높은 요소에 빠르게 접근할 수 있습니다.
- 사용자 정의 우선순위를 설정할 수 있어, 다양한 조건에서 유연하게 사용될 수 있습니다.

## 용어 정리

- **PriorityQueue**: 요소들이 우선순위에 따라 정렬되는 큐.
- **FIFO(First-In-First-Out)**: '먼저 들어온 데이터가 먼저 나간다'는 큐의 기본 원칙.
- **힙(Heap)**: 우선순위 큐 구현에 자주 사용되는, 부모 노드가 자식 노드보다 우선순위가 높은 완전 이진 트리.
- **Comparator**: 두 객체를 비교하는 데 사용되는 비교 함수를 정의할 때 사용되는 인터페이스.
