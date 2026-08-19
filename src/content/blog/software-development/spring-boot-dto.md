---
title: "[Software Development] 스프링 부트에서 데이터 전송 객체 (DTO)"
description: "Spring Boot에서 DTO를 사용하는 이유와 생성·매핑·검증·버전 관리 시 고려할 사항을 정리합니다."
publishedAt: 2023-11-29
category: "software-development"
tags: ["spring-boot", "dto", "java", "validation", "modelmapper", "lombok"]
---

> 원문: [[MEDIUM] Data Transfer Object (DTO) in Spring Boot](https://towardsdev.com/data-transfer-object-dto-in-spring-boot-c00678cc5946)

## 1. Data Transfer Object(DTO)란?

DTO는 애플리케이션의 여러 계층 사이에서 데이터를 캡슐화해 전송하는 디자인 패턴입니다. 필요한 필드만 포함하고 비즈니스 로직은 포함하지 않는 경량 객체입니다.

## 2. Spring Boot에서 DTO 사용의 이점

- **데이터 분리**: 내부 도메인 모델과 외부 표현을 분리해 데이터 전송을 관리합니다.
- **오버헤드 감소**: 특정 사용 사례에 필요한 필드만 포함해 네트워크 전송량을 줄입니다.
- **버전 관리와 호환성**: 도메인 모델과 별개로 DTO를 발전시켜 API 변경을 쉽게 관리합니다.
- **보안 강화**: 민감한 정보 노출을 피하고 데이터 접근을 제한합니다.
- **테스트 용이성**: 복잡한 도메인 객체에 의존하지 않고 테스트 시나리오에서 DTO를 쉽게 생성하고 조작할 수 있습니다.

## 3. Spring Boot에서 DTO 사용 방법

### 3.1 수동 DTO 생성

도메인 엔티티 구조를 반영하는 DTO 클래스를 직접 만들고, 도메인 객체와 DTO 사이의 데이터를 매핑합니다.

### 3.2 ModelMapper 사용

ModelMapper 라이브러리로 도메인 객체와 DTO 사이의 매핑을 자동화합니다.

### 3.3 Lombok 사용

Lombok을 사용하면 DTO 클래스 작성에 반복되는 코드를 줄일 수 있습니다.

## 4. DTO에서 다양한 값 유형 포맷팅

날짜와 시간(`@JsonFormat`), 숫자(`@NumberFormat`), 문자열·Enum, 불리언 값 등을 DTO에서 포맷팅할 수 있습니다.

## 5. 추가 고려 사항과 모범 사례

- **DTO 검증**: Spring 검증 어노테이션(`@NotNull`, `@Size` 등)으로 DTO 필드를 검증합니다.
- **복잡한 중첩 객체를 위한 DTO**: 중첩 객체나 관계를 정확히 표현하기 위해 중첩 DTO를 만들 수 있습니다.
- **DTO 버전 관리**: 애플리케이션 변화에 맞춰 DTO를 버전 관리해 하위 호환성을 유지합니다.
- **RESTful API에서 DTO 사용**: 특정 사용 사례와 클라이언트 요구 사항에 맞게 DTO를 선택하고 구조화합니다.

## 6. Spring Validation을 사용한 DTO 검증

컨트롤러 메서드에서 `@Valid` 어노테이션을 사용하면 DTO에 정의한 검증 제약 조건에 따라 검증을 자동으로 실행할 수 있습니다.

## 7. 마이크로서비스 아키텍처에서의 DTO

각 마이크로서비스는 요구 사항에 맞춘 자체 DTO 집합을 가질 수 있습니다. 이는 마이크로서비스 간 느슨한 결합을 보장하고 독립적인 발전을 가능하게 합니다.

## 8. 결론

DTO는 Spring Boot 애플리케이션에서 데이터 분리, 오버헤드 감소, 보안 강화, 테스트 용이성에 도움이 됩니다. 수동 생성, ModelMapper, Lombok 등 다양한 방법으로 DTO를 관리할 수 있습니다.

## 핵심 요약

- DTO는 애플리케이션의 여러 계층에서 데이터를 전송하기 위한 디자인 패턴입니다.
- Spring Boot에서 DTO를 사용하면 데이터 분리, 오버헤드 감소, 보안 강화 등의 이점을 얻을 수 있습니다.
- 수동 생성, ModelMapper, Lombok을 포함한 여러 방법으로 DTO를 구현할 수 있습니다.

## 용어 정리

- **DTO(Data Transfer Object)**: 서로 다른 계층 사이의 데이터 전송에 사용하는 객체입니다.
- **ModelMapper**: 도메인 객체와 DTO 사이의 매핑을 자동화하는 라이브러리입니다.
- **Lombok**: getter, setter처럼 반복되는 코드를 줄이기 위한 Java 라이브러리입니다.
