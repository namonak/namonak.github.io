---
title: "[BOJ 백준] 1904번 : 01타일 – Kotlin[코틀린]"
description: "백준 1904번 01타일을 피보나치 점화식과 동적 계획법으로 해결하는 Kotlin 풀이입니다."
publishedAt: 2024-04-30
category: "algorithm"
tags: ["boj", "dynamic-programming", "kotlin", "fibonacci"]
---

# 문제

[백준(BOJ) 1904번: 01타일](https://www.acmicpc.net/problem/1904)

![백준 1904번 01타일 문제 설명](/images/boj1904.png)

요구사항은 간단합니다. 타일은 두 종류가 주어지는데, `1` 한 개로 이루어진 `1`타일과 `0` 두 개로 이루어진 `00`타일이며, `00`타일은 분해할 수 없습니다. 이 타일들을 조합해 자연수 N이 주어졌을 때 모든 가짓수를 세야 합니다.

## 풀이

가능한 범위까지 경우의 수를 따져보면 패턴이 보이는 경우가 있습니다. 아래는 N = 6까지 경우의 수를 따져본 것입니다.

![N이 1부터 6까지일 때 01타일 조합과 경우의 수](/images/boj1904-result-table.png)

개수를 살펴보면 N = 3은 N = 1과 N = 2의 합임을 알 수 있는데, 이는 [피보나치 수열](https://ko.wikipedia.org/wiki/%ED%94%BC%EB%B3%B4%EB%82%98%EC%B9%98_%EC%88%98)의 점화식과 동일합니다.

> DP[n] = DP[n-1] + DP[n-2]

피보나치 수열은 반복문 혹은 동적 계획법으로 풀 수 있는데, 여기서는 문제의 취지에 맞게 동적 계획법으로 풀이합니다.

## 코드

### 테스트 코드

```kotlin
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe

class No1904Test : StringSpec({
    "01타일 : https://www.acmicpc.net/problem/1904" {
        val testCases = listOf(
            "1" to "1",
            "2" to "2",
            "3" to "3",
            "4" to "5",
            "5" to "8",
            "6" to "13"
        )

        testCases.forEach { (given, expected) ->
            No1904().solve(given.byteInputStream().bufferedReader()) shouldBe expected
        }
    }
})
```

### 프로덕션 코드

문제 요구사항에 따라 결과 값은 15746으로 나눕니다.

```kotlin
import java.io.BufferedReader

fun main() = println(No1904().solve(System.`in`.bufferedReader()))

class No1904 {
    fun solve(input: BufferedReader): String {
        val n = input.readLine().toInt()
        val dp = IntArray(n + 1)

        dp[1] = 1
        if (n > 1) dp[2] = 2

        for (i in 3..n) {
            dp[i] = (dp[i - 1] + dp[i - 2]) % 15746
        }

        return dp[n].toString()
    }
}
```
