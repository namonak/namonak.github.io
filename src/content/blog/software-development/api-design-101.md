---
title: "[Software Development] API Design 101: 기본부터 모범 사례까지(From Basics to Best Practices)"
description: "API 설계의 범위, CRUD, 통신 방식, 관계, 호환성, 속도 제한과 CORS의 기본 원칙을 정리합니다."
publishedAt: 2023-12-28
category: "software-development"
tags: ["api", "rest", "graphql", "grpc", "cors", "versioning"]
---

> 원문: [[MEDIUM] API Design 101: From Basics to Best Practices](https://levelup.gitconnected.com/api-design-101-from-basics-to-best-practices-a0261cdf8886)

## API 디자인: 기본부터 모범 사례까지

- **API 디자인 개요**: API 디자인은 입력(예: 새 상품의 상세 정보)과 출력(예: 상품 조회 시 반환하는 정보)을 정의하는 데 초점을 둡니다. 낮은 수준의 구현보다 시스템이 상호작용하는 인터페이스를 우선합니다.
- **CRUD 작업**: 생성(Create), 읽기(Read), 업데이트(Update), 삭제(Delete)는 데이터 기반 애플리케이션의 기본 작업입니다. 이 작업은 사용자나 시스템이 전자상거래 API와 상호작용하는 방식을 정의하는 데 중요합니다.
- **통신 프로토콜과 데이터 전송 방식**: HTTP, WebSocket 등의 통신 프로토콜과 JSON, XML, Protocol Buffers 같은 데이터 전송 방식을 결정합니다.
- **API 패러다임**: REST, GraphQL, gRPC 등 다양한 API 패러다임이 있으며, 각각 고유한 프로토콜과 표준을 가집니다.
- **API의 관계 표현**: 전자상거래 시스템에서는 사용자와 주문, 주문과 제품처럼 관계가 생길 수 있습니다. 엔드포인트는 이러한 관계를 반영하도록 설계해야 합니다.
- **쿼리, 제한, GET 요청의 멱등성**: GET 요청은 데이터를 변경하지 않고 조회만을 목적으로 해야 하며, 여러 번 호출해도 결과가 변경되지 않는 멱등성을 가집니다.
- **역호환성과 버전 관리**: 엔드포인트를 수정할 때 기존 클라이언트를 깨뜨리지 않도록 역호환성을 유지하는 것이 중요합니다. 주요 변경 사항은 일반적으로 버전 관리로 다룹니다.
- **속도 제한과 CORS**: 사용자가 일정 시간 동안 보낼 수 있는 요청 수를 제어하기 위해 속도 제한을 설정합니다. 웹 보안을 위해 CORS 설정도 고려합니다.

## 핵심 요약

- API 디자인은 인터페이스에 초점을 맞추며, CRUD 작업으로 사용자와 시스템의 상호작용을 정의합니다.
- REST, GraphQL, gRPC 같은 API 패러다임은 각기 다른 장단점과 특성을 가집니다. 통신 프로토콜과 데이터 전송 방식의 선택도 API 디자인의 일부입니다.
- 역호환성과 버전 관리는 기존 클라이언트를 보호하고, 속도 제한과 CORS 설정은 API의 안정성과 보안을 유지하는 데 도움이 됩니다.

## 용어 정리

- **CRUD**: 생성(Create), 읽기(Read), 업데이트(Update), 삭제(Delete)를 뜻하는 데이터 기반 애플리케이션의 기본 작업입니다.
- **멱등성(Idempotence)**: 동일한 연산을 여러 번 적용해도 결과가 달라지지 않는 성질입니다. GET 요청은 멱등해야 합니다.
- **역호환성(Backward Compatibility)**: 새 버전의 API가 이전 버전과 호환되어 기존 클라이언트가 계속 동작할 수 있는 성질입니다.
- **CORS(Cross-Origin Resource Sharing)**: 웹 페이지가 다른 도메인의 리소스에 접근할 수 있도록 허용하는 메커니즘으로, 웹 보안의 중요한 부분입니다.
