---
title: "[Android] Jetpack Compose"
description: "Jetpack Compose의 구성 요소, Compose UI, 상태 관리, 사이드 이펙트와 CompositionLocal을 정리합니다."
publishedAt: 2024-01-01
category: "android"
tags: ["android", "jetpack-compose", "kotlin"]
---

원문: [[MEDIUM] Jetpack Compose: The Android Developer Roadmap — Part 5](https://itnext.io/jetpack-compose-the-android-developer-roadmap-part-5-2753032a021c)

- **Jetpack Compose의 기본 구성 요소**: Jetpack Compose는 Compose 컴파일러, Compose 런타임, Compose UI의 세 가지 주요 구성 요소로 구성되며, 이를 통해 Kotlin에서 UI를 선언적으로 구축할 수 있습니다.
- **Compose UI의 핵심 개념**: Compose UI는 UI 레이아웃을 생성하는 데 사용되는 다양한 컴포넌트를 제공하며, 테마, 수정자, 목록 및 그리드, 애니메이션과 같은 개념을 다룹니다.
- **상태 관리**: Jetpack Compose에서 상태는 UI의 변경을 반영하기 위해 중요한 역할을 하며, 상태의 변화에 따라 UI를 재구성하는 방법을 제공합니다.
- **사이드 이펙트 처리**: Jetpack Compose는 사이드 이펙트를 관리하기 위해 `SideEffect`, `LaunchedEffect`, `DisposableEffect`와 같은 다양한 함수를 제공합니다.
- **CompositionLocal**: UI 트리 내에서 정보를 하위 컴포저블로 전달할 수 있는 메커니즘을 제공하여, 복잡한 UI 구조에서도 유지보수성을 높입니다.
- **XML에서 Compose UI로의 마이그레이션 전략**: Jetpack Compose를 기존 XML 기반 프로젝트에 점진적으로 통합할 수 있는 전략을 제공합니다.

### 핵심 요약

- Jetpack Compose는 Kotlin을 사용하여 UI를 선언적으로 구축할 수 있는 Android의 최신 UI 툴킷입니다.
- Compose UI는 개발자가 레이아웃을 쉽게 구성할 수 있도록 다양한 컴포넌트와 기능을 제공합니다.
- 상태 관리와 사이드 이펙트 처리는 Jetpack Compose에서 UI의 동적인 변화를 관리하기 위한 핵심적인 개념입니다.
- CompositionLocal을 통해 복잡한 UI 트리에서도 데이터를 효율적으로 전달할 수 있습니다.
- 기존 XML 기반 프로젝트를 Jetpack Compose로 마이그레이션하는 전략을 제공하여, 개발자가 점진적으로 새로운 툴킷으로 전환할 수 있도록 지원합니다.

### 용어 정리

- **Compose UI**: Jetpack Compose의 UI 구성을 담당하는 컴포넌트.
- **상태 관리**: 앱의 UI 상태를 관리하고 상태 변화에 따라 UI를 업데이트하는 프로세스.
- **사이드 이펙트**: 프로그램의 다른 부분에 영향을 주는 예상치 못한 변경이나 결과.
- **CompositionLocal**: 상위 컴포저블에서 하위 컴포저블로 데이터를 전달할 수 있는 Jetpack Compose의 기능.
- **마이그레이션**: 기존의 XML 기반 UI를 Jetpack Compose로 전환하는 과정.
