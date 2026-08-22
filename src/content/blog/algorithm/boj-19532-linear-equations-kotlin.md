---
title: "[BOJ 백준] 19532번 : 수학은 비대면강의입니다 – Kotlin[코틀린]"
description: "백준 19532번을 브루트포스와 연립방정식의 가감법으로 해결하는 Kotlin 풀이입니다."
publishedAt: 2023-06-16
category: "algorithm"
tags: ["boj", "brute-force", "math", "kotlin", "linear-equations"]
---

## 문제

[백준(BOJ) 19532번: 수학은 비대면강의입니다](https://www.acmicpc.net/problem/19532)

## 풀이

두 일차방정식은 다음과 같습니다.

![두 일차방정식 ax + by = c, dx + ey = f](/images/boj19532-equation-system.png)

문제에서 해 `x`, `y`의 범위가 `-999..999`로 주어지므로 모든 조합을 확인하는 브루트포스 풀이가 가능합니다.

```kotlin
for (x in -999..999) {
    for (y in -999..999) {
        if (a * x + b * y == c && d * x + e * y == f) {
            return "$x $y"
        }
    }
}
```

가감법으로도 해를 구할 수 있습니다. 첫 식에 `d`, 둘째 식에 `a`를 곱하면 `x` 항을 없앨 수 있습니다.

![x 항의 계수를 맞춘 두 식](/images/boj19532-equation-multiplied.png)

두 식을 빼면 다음과 같습니다.

![x 항을 제거한 식](/images/boj19532-equation-eliminated.png)

따라서 `y`는 다음과 같이 구할 수 있고, `x`도 같은 방식으로 계산합니다.

![y에 대해 정리한 식](/images/boj19532-equation-y.png)

```kotlin
val x = (c * e - b * f) / (a * e - b * d)
val y = (c * d - a * f) / (b * d - a * e)
```

## 코드

### 테스트 코드

```kotlin
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe
import java.io.BufferedReader

class No19532Test : StringSpec({
    "수학은 비대면강의입니다 : https://www.acmicpc.net/problem/19532" {
        val testCases = listOf(
            "1 3 -1 4 1 7" to "2 -1",
            "2 5 8 3 -4 -11" to "-1 2"
        )

        testCases.forEach { (given, expected) ->
            No19532.solve(BufferedReader(given.reader())) shouldBe expected
        }
    }
})
```

### 브루트포스 풀이

```kotlin
import java.io.BufferedReader

object No19532 {
    fun solve(input: BufferedReader): String {
        val (a, b, c, d, e, f) = input.readLine().split(" ").map { it.toInt() }

        for (x in -999..999) {
            for (y in -999..999) {
                if (a * x + b * y == c && d * x + e * y == f) {
                    return "$x $y"
                }
            }
        }
        return ""
    }
}
```

### 연립방정식 풀이

```kotlin
import java.io.BufferedReader

object No19532 {
    fun solve(input: BufferedReader): String {
        val (a, b, c, d, e, f) = input.readLine().split(" ").map { it.toInt() }

        val x = (c * e - b * f) / (a * e - b * d)
        val y = (c * d - a * f) / (b * d - a * e)

        return "$x $y"
    }
}
```

## 결과

![백준 19532번 제출 실행 결과](/images/boj19532-result.png)
