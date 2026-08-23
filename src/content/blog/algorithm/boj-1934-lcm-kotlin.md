---
title: "[BOJ 백준] 1934번 : 최소공배수 – Kotlin[코틀린]"
description: "유클리드 호제법으로 최대공약수를 구하고 최소공배수를 계산하는 백준 1934번 Kotlin 풀이입니다."
publishedAt: 2023-05-22
category: "algorithm"
tags: ["boj", "math", "gcd", "lcm", "kotlin"]
---

## 문제

[백준(BOJ) 1934번: 최소공배수](https://www.acmicpc.net/problem/1934)

## 풀이

두 자연수 `A`, `B`의 최소공배수(LCM)는 최대공약수(GCD)를 이용해 계산합니다.

> LCM = (A × B) / GCD(A, B)

최대공약수는 유클리드 호제법으로 구합니다. `A`를 `B`로 나눈 나머지를 `R`이라고 할 때, `GCD(A, B)`는 `GCD(B, R)`와 같습니다. 나머지가 `0`이 되면 그때의 나누는 수가 최대공약수입니다.

예를 들어 `270`과 `192`는 `270 % 192 = 78`, `192 % 78 = 36`, `78 % 36 = 6`, `36 % 6 = 0`의 순서로 계산하므로 최대공약수는 `6`입니다.

## 코드

### 테스트 코드

```kotlin
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe
import java.io.BufferedReader
import java.io.StringReader

class No1934Test : StringSpec({
    "최소공배수 : https://www.acmicpc.net/problem/1934" {
        val given = "3\n1 45000\n6 10\n13 17"

        No1934.solve(BufferedReader(StringReader(given))) shouldBe "45000\n30\n221"
    }
})
```

### 프로덕션 코드

```kotlin
import java.io.BufferedReader

object No1934 {
    fun solve(input: BufferedReader): String {
        val count = input.readLine().toInt()
        val results = mutableListOf<Int>()

        repeat(count) {
            val (a, b) = input.readLine().split(" ").map { it.toInt() }
            results.add(a * b / gcd(a, b))
        }

        return results.joinToString("\n")
    }

    private fun gcd(a: Int, b: Int): Int = if (b == 0) a else gcd(b, a % b)
}

fun main() = print(No1934.solve(System.`in`.bufferedReader()))
```

## 결과

![백준 1934번 제출 실행 결과](/images/boj1934-result.png)
