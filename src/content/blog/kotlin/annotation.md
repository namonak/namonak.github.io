---
title: "[Kotlin] Annotation"
description: "Kotlin 어노테이션의 개념과 커스텀 어노테이션 정의, 매개변수, 대상 및 보존 정책 지정을 정리합니다."
publishedAt: 2024-01-12
category: "kotlin"
tags: ["kotlin", "annotation"]
---

## 어노테이션(annotation)

어노테이션(annotation)은 코드에 메타데이터를 추가하는 방법으로, 컴파일러에게 정보를 제공하거나 실행 시간(runtime)에 특정 동작을 지정하는 데 사용됩니다. Kotlin에서는 이러한 어노테이션을 사용자가 직접 정의하여 사용할 수 있습니다.

## 커스텀 어노테이션 정의

Kotlin에서 커스텀 어노테이션을 정의하는 것은 간단합니다. `annotation class` 키워드를 사용하여 어노테이션 클래스를 선언합니다. 예를 들어, 특정 함수가 실험적인 기능임을 나타내는 어노테이션을 만들어보겠습니다.

```kotlin
annotation class ExperimentalFeature
```

## 어노테이션 매개변수 추가

어노테이션에는 매개변수를 추가할 수 있어서, 어노테이션을 사용할 때 추가적인 정보를 제공할 수 있습니다. 예를 들어, 버전 정보나 사용해야 하는 이유 등을 매개변수로 받을 수 있습니다. 다음 예시에서는 `since` 매개변수를 추가하여, 어노테이션이 추가된 기능의 시작 버전을 명시할 수 있습니다.

```kotlin
annotation class ExperimentalFeature(val since: String)
```

## 어노테이션 추가 속성 지정

### 대상 지정

Kotlin에서는 어노테이션이 적용되는 대상을 명시적으로 지정할 수 있습니다. `@Target` 어노테이션을 사용하여 대상을 지정합니다. 예를 들어, 어노테이션을 함수에만 사용하고 싶다면 다음과 같이 할 수 있습니다. [enum class AnotationTarget](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.annotation/-annotation-target/)를 참조합니다.

```kotlin
@Target(AnnotationTarget.FUNCTION)
annotation class ExperimentalFeature(val since: String)
```

### 보존 정책 지정

어노테이션이 컴파일된 클래스 파일에 포함되어야 하는지, 런타임에 리플렉션을 통해 접근 가능해야 하는지 등을 지정할 수 있습니다. 이는 `@Retention` 어노테이션으로 지정할 수 있습니다. `AnnotationRetention.SOURCE`, `AnnotationRetention.BINARY`, `AnnotationRetention.RUNTIME` 중에서 선택할 수 있습니다. [enum class AnnotationRetention](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.annotation/-annotation-retention/)를 참조합니다.

```kotlin
@Retention(AnnotationRetention.RUNTIME)
annotation class ExperimentalFeature(val since: String)
```

## 어노테이션 사용

정의한 커스텀 어노테이션은 함수, 클래스, 속성 등 Kotlin의 다양한 요소에 적용할 수 있습니다. 어노테이션을 사용할 때는 해당 요소 앞에 `@` 기호와 함께 어노테이션 이름을 사용합니다. 매개변수가 있는 경우 괄호 안에 값을 제공합니다.

```kotlin
@ExperimentalFeature(since = "1.0")
fun newFeature() {
    println("This is an experimental feature.")
}
```
