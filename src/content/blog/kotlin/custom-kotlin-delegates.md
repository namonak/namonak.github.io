---
title: "[Kotlin] Custom Kotlin delegates"
description: "Kotlin 위임 메커니즘의 목적과 `by` 키워드, 세 가지 커스텀 대리자 사례를 정리합니다."
publishedAt: 2024-01-24
category: "kotlin"
tags: ["kotlin", "delegation", "delegate"]
---

> 원문: [Custom Kotlin delegates](https://blog.stackademic.com/custom-kotlin-delegates-2ea113382dd4)

코틀린에서는 객체가 특정 행동이나 구현을 다른 객체(대리자)에게 위임함으로써 상속 없이 코드를 재사용하고 중복을 줄이며 모듈성을 제공하는 위임 메커니즘을 제공합니다. `by` 키워드를 사용하여 이를 구현하며, 코드 중복을 줄이고, 가독성 및 유지 보수성을 향상시키며, 코드 재사용을 가능하게 합니다. 본문에서는 세 가지 유용한 커스텀 대리자 예시(`resettableLazy`, `hasListeners`, `viewPropertyObserver`)를 소개하며, 각각의 사용 방법과 장점에 대해 설명합니다.

1. **resettableLazy**: `lazy` 대리자를 확장하여 값의 장기 저장 없이 필요할 때마다 초기화를 가능하게 하는 대리자입니다.
2. **hasListeners**: Observer 패턴을 구현하여 객체 상태 변화를 다른 객체에 알리는 데 사용되는 대리자입니다.
3. **viewPropertyObserver**: Android View에서 속성 변경 시 뷰를 자동으로 다시 그리게 하는 대리자입니다.

## 핵심 요약

- 코틀린의 위임 메커니즘은 코드 재사용, 중복 감소, 모듈성 제공을 위해 다른 객체에게 특정 행동이나 구현을 위임합니다.
- `resettableLazy`는 지연 초기화된 속성을 필요에 따라 재설정할 수 있게 합니다.
- `hasListeners`는 Observer 패턴을 쉽게 구현하여 객체 간의 상태 변화를 알릴 수 있습니다.
- `viewPropertyObserver`는 Android View의 속성 변경 시 자동으로 뷰를 다시 그리게 합니다.

## 용어 정리

- **위임(Delegation)**: 한 객체가 특정 기능을 다른 객체에게 위임하여 해당 기능을 실행하게 하는 패턴입니다.
- **Observer 패턴**: 한 객체의 상태 변화를 관찰하고, 그 변화에 따라 다른 객체들이 자동으로 업데이트되는 디자인 패턴입니다.
- **지연 초기화(Lazy Initialization)**: 객체의 속성이나 리소스의 초기화를 그 값이 실제로 필요할 때까지 지연시키는 기법입니다.
