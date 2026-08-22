---
title: "[Kotlin] Array<Int>와 IntArray의 차이점"
description: "Kotlin/JVM에서 Array<Int>와 IntArray의 표현, 박싱, Java 상호 운용성과 선택 기준을 정리합니다."
publishedAt: 2023-07-10
updatedAt: 2026-08-24
category: "kotlin"
tags: ["kotlin", "array", "intarray", "performance", "java-interoperability"]
---

Kotlin에서 정수 배열을 선언할 때 `Array<Int>`와 `IntArray`를 사용할 수 있습니다. 둘 다 정수 목록을 표현하지만 Kotlin/JVM에서는 저장 방식과 Java 상호 운용성이 다릅니다.

## 1. 표현 방식

```kotlin
val boxed: Array<Int> = arrayOf(1, 2, 3)
val primitives: IntArray = intArrayOf(1, 2, 3)
```

`Array<Int>`는 일반 배열에 `Int` 값을 담는 형태입니다. JVM에서는 제네릭 배열의 요소가 박싱되어 `Integer[]`와 상호 운용됩니다. 반면 `IntArray`는 JVM의 `int[]`에 대응하는 특수화된 배열입니다.

## 2. 메모리와 성능

많은 정수를 저장하거나 반복 계산하는 경우 `IntArray`는 박싱 객체를 만들지 않아 메모리와 실행 비용을 줄일 수 있습니다. 예를 들어 알고리즘 문제의 점화식 테이블처럼 원시 정수 연산이 중심인 경우에 적합합니다.

다만 실제 성능은 배열 크기, 컬렉션 API 사용, JVM 최적화에 따라 달라집니다. 먼저 필요한 API와 Java 라이브러리의 시그니처를 확인하고, 측정이 필요한 경로에서만 성능을 비교하는 편이 좋습니다.

## 3. Java 상호 운용성

| Kotlin 타입 | JVM에서 주로 대응하는 타입 | 사용할 때 |
| --- | --- | --- |
| `Array<Int>` | `Integer[]` | 제네릭 배열이나 boxed 값 배열을 요구하는 API |
| `IntArray` | `int[]` | 원시 `int` 배열을 요구하거나 큰 정수 배열을 다룰 때 |

## 요약

- `Array<Int>`와 `IntArray`는 같은 문법의 일반 배열이 아니라 목적이 다른 타입입니다.
- Kotlin/JVM에서 `IntArray`는 원시 `int[]`에 대응합니다.
- Java API의 요구 타입, 필요한 배열 API, 실제 메모리·성능 요구 사항을 기준으로 선택합니다.

Kotlin의 다른 기본형 배열도 같은 방식으로 제공됩니다. 예를 들어 `LongArray`, `DoubleArray`, `BooleanArray`가 있습니다.
