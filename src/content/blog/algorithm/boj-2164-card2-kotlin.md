---
title: "[BOJ 백준] 2164번 : 카드2 – Kotlin[코틀린]"
description: "ArrayDeque로 카드 버리기와 뒤로 보내기를 반복해 백준 2164번을 해결하는 Kotlin 풀이입니다."
publishedAt: 2023-03-15
updatedAt: 2026-08-24
category: "algorithm"
tags: ["boj", "queue", "deque", "kotlin"]
---

## 문제

[백준(BOJ) 2164번: 카드2](https://www.acmicpc.net/problem/2164)

## 풀이

큐에 `1..N` 카드를 넣고, 맨 앞 카드를 버린 뒤 다음 카드를 맨 뒤로 옮기는 작업을 한 장이 남을 때까지 반복합니다. 앞과 뒤에서 빠르게 꺼내고 넣을 수 있는 deque가 이 작업에 맞습니다.

Kotlin에서는 `ArrayDeque`를 사용해 구현할 수 있습니다. 반면 `MutableList`는 인터페이스이므로 자체로는 특정 구현이나 시간 복잡도를 의미하지 않습니다. 앞 요소 제거가 많은 작업에서는 실제 선택한 구현의 연산 비용을 확인해야 합니다.

## 코드

### 테스트 코드

```kotlin
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe

class No2164Test : StringSpec({
    "카드2" {
        No2164.solve(6) shouldBe 4
    }
})
```

### 프로덕션 코드

```kotlin
object No2164 {
    fun solve(input: Int): Int {
        val queue = ArrayDeque<Int>()

        for (card in 1..input) {
            queue.addLast(card)
        }

        while (queue.size > 1) {
            queue.removeFirst()
            queue.addLast(queue.removeFirst())
        }

        return queue.first()
    }
}

fun main() {
    val input = System.`in`.bufferedReader().readLine().toInt()
    println(No2164.solve(input))
}
```

## 결과

![백준 2164번 제출 실행 결과](/images/boj2164-result.png)
