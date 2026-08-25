---
title: "Test Driven Development(테스트 주도 개발, TDD)"
description: "테스트를 먼저 작성하고 리팩터링을 반복하는 TDD의 개념, 이유, 순환 과정과 원칙을 정리합니다."
publishedAt: 2022-04-28
category: "software-development"
tags: ["tdd", "test-driven-development", "refactoring", "unit-test"]
---

# Test Driven Development(테스트 주도 개발, TDD) 란?

TDD는 Test Driven Development의 약자로, ‘테스트 주도 개발’이라고 합니다.

일반적인 개발 과정에서는 요구사항을 분석한 후 설계를 마친 뒤에 프로덕션 코드(Production code)를 작성합니다. 상황에 따라 프로덕션 코드를 작성한 후에 테스트 코드를 추가할 수도 있는데, 이는 단위 테스트이며 TDD와는 다릅니다.

TDD는 요구사항을 분석한 후에 테스트 코드를 먼저 작성(Test First Development)하고 이후에 프로덕션 코드를 작성합니다. 이후에 프로덕션 코드와 테스트 코드를 리팩터링하는 과정을 반복하여 코드의 완성도를 높입니다.

**TDD = TFD(Test First Development) + Refactoring**

> Refactoring: 설계의 과정 중 하나로, 기능의 변화 없이 클래스 구조와 메서드 분리를 하는 설계의 과정입니다.
>
> TDD의 아이러니 중 하나는 테스트 기술이 아니라는 점이다. TDD는 분석 기술이며, 설계 기술이기도 하다.
> [Kent Beck](https://ko.wikipedia.org/wiki/%EC%BC%84%ED%8A%B8_%EB%B2%A1), _Test Driven Development by Example_ 중

# TDD를 하는 이유

- 디버깅 시간을 줄임
- 동작하는 문서 역할
- 코드 리팩터링에 대한 두려움을 줄여줌

# TDD 싸이클

![TDD 싸이클](/images/tdd-cycle.png)

- 실패하는 테스트를 구현합니다.
- 테스트가 성공하도록 프로덕션 코드를 구현합니다.
- 프로덕션 코드와 테스트 코드를 리팩터링합니다.

# TDD 원칙

- 원칙 1 — 실패하는 단위 테스트를 작성할 때까지 프로덕션 코드를 작성하지 않습니다.
- 원칙 2 — 컴파일은 실패하지 않으면서 실행이 실패하는 정도로만 단위 테스트를 작성합니다.
- 원칙 3 — 현재 실패하는 테스트를 통과할 정도로만 실제 코드를 작성합니다.
