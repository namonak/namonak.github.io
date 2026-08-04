---
title: "Kotlin 유용한 표준 라이브러리 함수 정리"
description: "컬렉션을 다룰 때 자주 쓰는 Kotlin 표준 라이브러리 함수를 Shape 예제로 정리합니다."
publishedAt: 2024-07-16
category: "kotlin"
tags: ["kotlin", "collections", "standard-library"]
---

> 원문: [Kotlin library useful functions](https://medium.com/@KaushalVasava/kotlin-library-useful-functions-4a85e182fd1b)

Kotlin 표준 라이브러리에는 읽기 쉽고 유지하기 쉬운 컬렉션 코드를 만드는 함수가 많습니다. 아래 `Shape` 목록을 공통 예제로 사용해 자주 쓰는 함수를 살펴봅니다.

```kotlin
data class Shape(val id: Int, val name: String)

val listOfShape = listOf(
    Shape(1, "Triangle"),
    Shape(2, "Circle"),
    Shape(3, "Square"),
    Shape(4, "Rectangle"),
)
```

## `indexOfFirst`

[`indexOfFirst`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/index-of-first.html)는 조건에 맞는 첫 요소의 인덱스를 반환합니다. 맞는 요소가 없으면 `-1`입니다.

```kotlin
val shapeName = "Square"
val indexOfElement = listOfShape.indexOfFirst { it.name == shapeName }
```

이 경우 `indexOfElement`는 `2`입니다.

## `find`

[`find`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/find.html)는 조건에 맞는 첫 요소 자체를 반환합니다. 없으면 `null`입니다.

```kotlin
val shapeName = "Square"
val shape: Shape? = listOfShape.find { it.name == shapeName }
```

## `any`, `none`, `all`

세 함수는 조건을 만족하는 요소의 존재 여부를 명확하게 표현합니다.

| 함수                                                                                | `true`가 되는 조건                    |
| ----------------------------------------------------------------------------------- | ------------------------------------- |
| [`any`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-any/)                  | 조건을 만족하는 요소가 하나 이상 있음 |
| [`none`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/none.html) | 조건을 만족하는 요소가 없음           |
| [`all`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/all.html)   | 모든 요소가 조건을 만족함             |

```kotlin
val shapeName = "Square"

val hasSquareElement = listOfShape.any { it.name == shapeName }
val isNotSquare = listOfShape.none { it.name == shapeName }
val hasSameName = listOfShape.all { it.name == shapeName }
```

위 목록에서는 각각 `true`, `false`, `false`가 됩니다.

## `count`

[`count`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/count.html)는 전체 요소 수 또는 조건에 맞는 요소 수를 반환합니다.

```kotlin
val totalElement = listOfShape.count()
val totalSquareElement = listOfShape.count { it.name == "Square" }
```

결과는 각각 `4`, `1`입니다.

## `fold`와 `foldIndexed`

[`fold`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/fold.html)는 초기값에서 시작해 왼쪽부터 누적 연산을 적용합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val sum = numbers.fold(0) { acc, element -> acc + element }

println("Sum of numbers: $sum") // Sum of numbers: 15
```

[`foldIndexed`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/fold-indexed.html)는 현재 인덱스도 함께 제공합니다.

```kotlin
val words = listOf("apple", "banana", "cherry")
val result = words.foldIndexed("") { index, acc, element ->
    acc + "[$index: $element] "
}

println(result) // [0: apple] [1: banana] [2: cherry]
```

## `slice`

[`slice`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/slice.html)는 지정한 인덱스의 부분 목록을 만듭니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9)
val result = numbers.slice(listOf(2, 4, 6))

println(result) // [3, 5, 7]
```

## 요약

- 첫 인덱스가 필요하면 `indexOfFirst`, 첫 요소가 필요하면 `find`를 사용합니다.
- 조건의 존재 여부는 `any`, `none`, `all`로 의도를 드러냅니다.
- 개수는 `count`, 누적 계산은 `fold`와 `foldIndexed`, 선택적 추출은 `slice`로 표현할 수 있습니다.
