---
title: "[Software Development] 모바일 애플리케이션 아키텍처 vs. 디자인 패턴"
description: "모바일 애플리케이션의 전체 구조를 다루는 아키텍처와 개별 문제의 해법인 디자인 패턴의 차이를 정리합니다."
publishedAt: 2023-12-27
category: "software-development"
tags: ["mobile", "software-architecture", "design-patterns", "mvc", "mvvm", "clean-architecture"]
---

> 원문: [[MEDIUM] Mobile Application Architecture vs. Design Patterns](https://levelup.gitconnected.com/mobile-application-architecture-vs-design-patterns-5f97f67046fa)

## 모바일 애플리케이션 아키텍처: 기반 체계 설계

- **정의**: 애플리케이션의 전체 구조와 조직을 설계하는 청사진입니다. 고수준 구성 요소, 구성 요소 간 상호작용, 데이터 흐름을 정의합니다.
- **대표적인 아키텍처 패턴**
  - **MVC(Model-View-Controller)**: 데이터와 비즈니스 로직(Model), 프레젠테이션과 UI(View), 사용자 입력에 따른 Model·View 업데이트(Controller)로 나눕니다.
  - **MVVM(Model-View-ViewModel)**: MVC의 진화형으로, 비즈니스 로직과 UI의 분리를 강조합니다.
  - **Clean Architecture**: 관심사의 분리와 의존성 역전을 강조합니다.
  - **Redux Architecture**: 중앙 집중식 상태 관리와 단방향 데이터 흐름을 제공합니다.
- **핵심 고려사항**: 아키텍처는 애플리케이션의 전반적 구조를 결정하며, 확장성과 유지보수성을 높이는 기반이 됩니다.

## 디자인 패턴: 특정 문제 해결을 위한 솔루션

- **재사용 가능한 솔루션**: 개발 과정에서 자주 마주치는 문제에 대한 모범 사례를 제공합니다.
- **자주 사용하는 디자인 패턴**
  - **Singleton Pattern**: 클래스의 인스턴스가 하나만 존재하도록 보장합니다.
  - **Observer Pattern**: 객체 간 일대다 의존성을 설정하고, 상태 변경 시 의존 객체에 알립니다.
  - **Adapter Pattern**: 기존 클래스의 인터페이스를 다른 인터페이스로 사용할 수 있게 합니다.
  - **Decorator Pattern**: 객체에 동적으로 추가 책임을 부여합니다.
- **세부적 문제 해결**: 디자인 패턴은 아키텍처 안에서 발생하는 특정 문제에 유연한 해결책을 제공합니다.

## 아키텍처와 디자인 패턴의 차이

- **범위와 규모**: 아키텍처는 애플리케이션 전체 구조를 다루고, 디자인 패턴은 특정 문제를 해결합니다.
- **추상화 수준**: 아키텍처는 고수준 구성 요소와 상호작용을, 디자인 패턴은 세부적인 설계·코딩 문제를 다룹니다.
- **유연성과 적응성**: 아키텍처는 앱의 기반을 설정하고, 디자인 패턴은 변화에 쉽게 적응할 수 있는 유연성을 제공합니다.

## 핵심 요약

모바일 애플리케이션 개발에서는 견고한 아키텍처와 적절히 적용한 디자인 패턴을 함께 고려해야 합니다. 아키텍처는 프로젝트 전체 구조를 결정하고, 디자인 패턴은 더 세부적인 문제를 해결하는 도구를 제공합니다. 두 요소를 함께 사용하면 장기적으로 확장 가능하고 유지보수하기 쉬운 애플리케이션을 만드는 데 도움이 됩니다.

## 용어 정리

- **MVC(Model-View-Controller)**: 데이터(Model), 사용자 인터페이스(View), 사용자 입력 처리(Controller)로 구성된 소프트웨어 디자인 패턴입니다.
- **MVVM(Model-View-ViewModel)**: ViewModel을 통해 View와 Model 사이의 의존성을 줄이는 패턴입니다.
- **Clean Architecture**: 소프트웨어 설계에서 관심사의 분리를 강조하는 아키텍처 패턴입니다.
- **Redux Architecture**: 예측 가능한 상태 관리를 위해 중앙 상태와 단방향 데이터 흐름을 사용하는 아키텍처입니다.
