---
title: "[Kotlin] 다형성과 인터페이스"
description: "Kotlin에서 인터페이스를 계약으로 정의하고 다형성을 통해 구현체를 교체하는 기본 원리를 정리합니다."
publishedAt: 2023-11-13
category: "kotlin"
tags: ["kotlin", "polymorphism", "interface", "object-oriented-programming"]
---

> 원문: [[MEDIUM] Polymorphism and Interfaces in Kotlin: A Powerful Duo](https://blog.stackademic.com/polymorphism-and-interfaces-in-kotlin-a-powerful-duo-7f3ab4e4a1a6)

## 다형성과 인터페이스

다형성(Polymorphism)은 서로 다른 클래스의 객체를 공통 슈퍼타입으로 다룰 수 있게 하는 객체지향 프로그래밍의 원리입니다. 호출하는 쪽은 구체적인 구현 대신 공통 계약에 의존하고, 각 구현체는 같은 동작을 서로 다른 방식으로 제공합니다.

인터페이스(Interface)는 클래스나 객체가 구현할 메서드와 속성의 계약을 정의합니다. Kotlin의 클래스는 하나의 클래스만 상속할 수 있지만 여러 인터페이스를 구현할 수 있으므로, 공통된 역할을 표현하고 구현을 교체하는 데 적합합니다.

### 도형 예시

`Shape`라는 공통 계약을 만들고, 각 도형이 `draw()`를 다른 방식으로 구현할 수 있습니다.

```kotlin
interface Shape {
    fun draw()
}

class Circle : Shape {
    override fun draw() = println("원을 그립니다.")
}

class Square : Shape {
    override fun draw() = println("사각형을 그립니다.")
}

fun drawAll(shapes: List<Shape>) {
    shapes.forEach { it.draw() }
}

drawAll(listOf(Circle(), Square()))
```

`drawAll`은 `Circle`이나 `Square`라는 구체 타입을 알 필요가 없습니다. `Shape`를 구현한 새 도형을 추가해도 호출 코드는 그대로 둘 수 있습니다. 이것이 하나의 인터페이스로 여러 관련 객체를 대표하는 다형성의 예입니다.

### 음악 플레이어 예시

인터페이스는 외부 구현을 바꿀 수 있는 지점에도 사용할 수 있습니다.

```kotlin
interface MusicPlayer {
    fun play(track: String)
}

class SpotifyPlayer : MusicPlayer {
    override fun play(track: String) = println("Spotify: $track")
}

class AppleMusicPlayer : MusicPlayer {
    override fun play(track: String) = println("Apple Music: $track")
}
```

클라이언트 코드는 `MusicPlayer`에만 의존합니다. 따라서 구현체의 생성·선택을 외부로 분리하면 테스트에서는 가짜 구현을, 운영에서는 실제 구현을 사용할 수 있습니다.

## 핵심 요약

- 다형성은 여러 구현체를 하나의 공통 타입으로 다루게 해 호출부가 구체 타입에 덜 의존하도록 합니다.
- 인터페이스는 구현해야 할 동작과 속성의 계약을 정의하며, 서로 다른 클래스의 협업 경계를 만듭니다.
- Kotlin에서는 하나의 클래스 상속과 여러 인터페이스 구현을 조합할 수 있습니다.
- 인터페이스를 사용할 때는 구현체의 종류가 아니라 호출부에 필요한 역할을 먼저 이름 붙이는 것이 중요합니다.

## 용어 정리

- **다형성(Polymorphism)**: 하나의 공통 타입으로 여러 구현체를 참조하고 같은 메시지를 각 구현에 맞게 처리하는 특성입니다.
- **인터페이스(Interface)**: 구현체가 따라야 할 멤버의 계약입니다. Kotlin 인터페이스는 추상 멤버뿐 아니라 기본 구현을 가진 멤버도 선언할 수 있습니다.
- **추상화(Abstraction)**: 구체적인 구현 세부 사항보다 호출에 필요한 역할과 계약에 집중하는 방식입니다.
- **디커플링(Decoupling)**: 호출하는 코드와 구체 구현의 의존을 줄여 각각을 독립적으로 바꾸기 쉽게 만드는 것입니다.

Kotlin 인터페이스의 기본 구현과 다중 인터페이스 구현 규칙은 [Kotlin 공식 문서](https://kotlinlang.org/docs/interfaces.html)에서 확인할 수 있습니다.
