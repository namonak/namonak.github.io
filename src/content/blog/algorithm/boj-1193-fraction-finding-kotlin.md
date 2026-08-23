---
title: "[BOJ 백준] 1193번 : 분수찾기 – Kotlin[코틀린]"
description: "백준 1193번에서 대각선의 누적 개수와 방향을 이용해 X번째 분수를 찾는 Kotlin 풀이입니다."
publishedAt: 2023-06-07
category: "algorithm"
tags: ["boj", "math", "implementation", "kotlin"]
---

## 문제

[백준(BOJ) 1193번: 분수찾기](https://www.acmicpc.net/problem/1193)

## 풀이

분수는 대각선마다 `1개`, `2개`, `3개`처럼 개수가 하나씩 늘어나며 지그재그로 나열됩니다. 먼저 입력 `X`가 몇 번째 대각선에 속하는지 찾고, 그 대각선 안에서의 순서를 이용해 분자와 분모를 계산합니다.

대각선 번호가 홀수이면 위에서 아래 방향, 짝수이면 아래에서 위 방향으로 분수가 진행됩니다. 코드에서는 지금까지 지난 대각선의 개수를 `prevCountSum`, 현재 대각선의 길이를 `crossCount`로 유지합니다.

## 코드

### 테스트 코드

```kotlin
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe

class No1193Test : StringSpec({
    "분수찾기 : https://www.acmicpc.net/problem/1193" {
        val testCases = listOf(
            1 to "1/1",
            2 to "1/2",
            3 to "2/1",
            4 to "3/1",
            5 to "2/2",
            6 to "1/3",
            7 to "1/4",
            8 to "2/3",
            9 to "3/2",
            14 to "2/4"
        )

        testCases.forEach { (input, expected) ->
            No1193.solve(input) shouldBe expected
        }
    }
})
```

### 프로덕션 코드

```kotlin
object No1193 {
    fun solve(input: Int): String {
        var crossCount = 1
        var prevCountSum = 0

        while (true) {
            if (input <= prevCountSum + crossCount) {
                if (crossCount % 2 == 1) {
                    return "${crossCount - (input - prevCountSum - 1)}/${input - prevCountSum}"
                }
                return "${input - prevCountSum}/${crossCount - (input - prevCountSum - 1)}"
            }
            prevCountSum += crossCount
            crossCount++
        }
    }
}

fun main() {
    val input = System.`in`.bufferedReader().readLine().toInt()
    println(No1193.solve(input))
}
```

## 결과

![백준 1193번 제출 실행 결과](/images/boj1193-result.png)
