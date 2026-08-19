---
title: "[Software Development] API Design 101: 기본부터 모범 사례까지(From Basics to Best Practices)"
description: "HTTP 의미론, 오류 계약, 호환성, OpenAPI를 중심으로 오래 가는 API 계약을 설계하는 방법을 정리합니다."
publishedAt: 2023-12-28
updatedAt: 2026-08-19
category: "software-development"
tags: ["api", "http", "rest", "graphql", "grpc", "openapi", "cors", "versioning"]
---

> 원문: [[MEDIUM] API Design 101: From Basics to Best Practices](https://levelup.gitconnected.com/api-design-101-from-basics-to-best-practices-a0261cdf8886)

## API 설계는 엔드포인트 목록이 아니라 계약이다

API는 클라이언트와 서버가 독립적으로 바뀌기 위한 약속이다. 좋은 계약에는 URL과 JSON 필드만이 아니라 요청의 의미, 성공·실패 응답, 재시도 가능 여부, 변경 절차가 포함된다. 구현을 먼저 정하고 API를 덧붙이면 이 약속이 코드 곳곳에 흩어진다. 반대로 계약을 먼저 합의하면 웹, 모바일, 백엔드가 같은 경계를 기준으로 작업할 수 있다.

아래 예시는 주문 도메인을 기준으로 한다.

```text
GET  /v1/orders?customerId=cus_123&limit=20&cursor=...
GET  /v1/orders/{orderId}
POST /v1/orders
PATCH /v1/orders/{orderId}
DELETE /v1/orders/{orderId}
```

`orders`는 리소스의 복수형 이름이고, `orderId`는 특정 리소스를 식별한다. `POST /orders/create`처럼 동사를 URL에 반복하기보다 HTTP 메서드가 행위를 표현하게 하는 편이 계약을 읽기 쉽다. 다만 결제 승인처럼 리소스의 일반적인 CRUD로 표현하기 어려운 도메인 동작은 `POST /v1/orders/{orderId}/cancel`처럼 명시적인 작업으로 모델링할 수 있다. 중요한 것은 예외를 숨기지 않고 입력·결과·실패 조건을 문서화하는 것이다.

## 1. 메서드의 의미와 재시도를 함께 정한다

HTTP 메서드는 단순한 관례가 아니다. RFC 9110은 안전한 메서드와 `PUT`, `DELETE`를 멱등으로 정의한다. 즉 같은 요청을 여러 번 보내더라도 **의도한 서버 상태**가 한 번 보냈을 때와 같아야 한다.[^http-semantics]

| 메서드 | 주된 용도 | 재시도 관점 |
| --- | --- | --- |
| `GET` | 조회 | 안전하고 멱등이다. 서버 상태를 바꾸는 동작을 숨기지 않는다. |
| `POST` | 생성 또는 명시적 도메인 작업 | 보통 멱등이 아니다. 네트워크 실패 뒤 재시도가 필요하다면 멱등 키의 규칙을 계약에 넣는다. |
| `PUT` | 표현의 전체 교체 | 같은 표현을 반복해도 의도한 결과가 같아야 한다. |
| `PATCH` | 부분 변경 | 패치 형식과 충돌·재시도 규칙을 별도로 명시한다. |
| `DELETE` | 제거 또는 비활성화 | 같은 삭제 요청을 반복해도 최종 상태가 같아야 한다. |

멱등성은 응답 바이트가 항상 같다는 뜻이 아니다. 첫 삭제는 `204`, 이미 없는 리소스는 `404`일 수 있다. 클라이언트가 실패한 요청을 안전하게 다시 보낼 수 있는지와, 서버 상태에 어떤 결과를 기대해야 하는지를 분명히 하는 성질이다.

## 2. 목록 조회는 필터·정렬·페이지 경계를 계약한다

목록 API는 빠르게 복잡해진다. 처음부터 다음 항목을 정해 둔다.

- **필터**: `customerId`, `status`, 기간처럼 허용하는 필드와 조합 규칙
- **정렬**: 기본 정렬과 동률을 깨는 안정적인 보조 키. 페이지를 넘길 때 결과가 흔들리는 일을 줄인다.
- **페이지 방식**: 작은 고정 데이터는 `page`/`size`도 충분하지만, 지속적으로 추가되는 큰 목록은 `cursor`가 더 안전할 수 있다.
- **상한**: `limit`의 기본값과 최댓값, 총 개수 제공 비용을 명시한다.

예를 들어 `GET /v1/orders?status=paid&limit=20&cursor=...`의 응답에는 다음 페이지를 위한 토큰을 함께 둔다. 토큰의 내부 구조는 클라이언트가 의존하지 않도록 불투명하게 취급한다.

```json
{
  "items": [{ "id": "ord_42", "status": "paid" }],
  "nextCursor": "eyJjcmVhdGVkQXQiOiIyMDI2LTA4LTE5In0"
}
```

## 3. 실패도 API의 일부다

`400` 또는 `500` 하나만으로는 소비자가 무엇을 고쳐야 하는지 알기 어렵다. 상태 코드는 HTTP 수준의 분류에 쓰고, 기계가 읽을 수 있는 안정적인 오류 형식을 추가한다. RFC 9457의 Problem Details는 `type`, `title`, `status`, `detail`, `instance` 같은 멤버로 오류 세부 정보를 전달하는 표준 형식이다.[^problem-details]

```http
HTTP/1.1 422 Unprocessable Content
Content-Type: application/problem+json
```

```json
{
  "type": "https://api.example.com/problems/invalid-order",
  "title": "주문을 생성할 수 없습니다.",
  "status": 422,
  "detail": "items는 비어 있을 수 없습니다.",
  "instance": "/requests/01J...",
  "invalidParams": [{ "name": "items", "reason": "must not be empty" }]
}
```

상태 코드는 일관되게 사용한다. 예를 들어 유효하지 않은 요청은 `400`, 인증되지 않은 호출은 `401`, 권한 없는 호출은 `403`, 없는 리소스는 `404`, 현재 상태와 충돌하는 요청은 `409`로 구분할 수 있다. 검증 실패를 `422`로 표현할지 여부와 필드 오류의 모양도 API 전체에서 하나로 통일한다. 오류 응답에는 비밀값, 내부 예외, 다른 사용자의 존재 여부처럼 노출하면 안 되는 정보를 넣지 않는다.

## 4. 호환성은 버전 번호보다 작은 변경의 규칙에서 시작한다

새 선택적 응답 필드의 추가처럼 기존 소비자를 깨지 않는 변경은 대개 새 버전을 만들 이유가 없다. 반대로 필수 요청 필드 추가, 필드 제거·의미 변경, enum 값 제거, 성공 응답 구조 변경은 호환성 검토가 필요한 변경이다.

버전을 올려야 한다면 URL, 헤더, 미디어 타입 중 팀의 전달 환경에 맞는 하나를 정하고 혼용하지 않는다. 더 중요한 것은 다음 정보를 미리 공개하는 일이다.

1. 영향을 받는 소비자와 마이그레이션 방법
2. 구 버전의 지원 종료일과 대체 API
3. 제거 전 검증할 사용량·오류 지표

OpenAPI Description은 API 표면과 의미를 형식적으로 표현하며, 문서·클라이언트·서버·테스트 도구에 사용할 수 있다.[^openapi] 명세를 배포물로 관리하고 CI에서 요청·응답 예제와 호환성 변경을 검사하면, 문서와 구현이 서로 다른 계약으로 자라는 위험을 낮출 수 있다.

## 5. 인증, 인가, CORS, 속도 제한은 서로 다른 문제다

- **인증(Authentication)**: 호출자가 누구인지 확인한다.
- **인가(Authorization)**: 그 호출자가 특정 주문을 읽거나 취소할 수 있는지 결정한다.
- **CORS**: 브라우저가 다른 출처의 API에 요청하도록 허용할지를 제어한다. 서버 간 호출의 인증·인가를 대신하지 않는다.
- **속도 제한(Rate limit)**: 사용자·토큰·IP·엔드포인트 단위의 자원 사용을 조절한다. 한도, 관찰 단위, 초과 시 응답을 문서화한다.

이 네 가지를 한 설정으로 취급하면 운영 중 원인을 찾기 어렵다. 특히 CORS 허용은 사용자 권한이 아니며, 실제 민감 데이터의 접근 제어는 서버에서 인증과 인가로 수행해야 한다.

## 배포 전 계약 점검표

- 리소스 이름, 요청·응답 스키마, 필수·선택 필드가 문서에 있는가?
- 각 메서드의 성공 상태, 실패 상태, 재시도 규칙이 분명한가?
- 목록 API의 필터·정렬·페이지 경계와 상한이 정해졌는가?
- 오류 형식과 안정적인 오류 코드가 모든 엔드포인트에서 일관적인가?
- 호환성을 깨는 변경의 공지·지원 종료·검증 계획이 있는가?
- OpenAPI 명세와 예제가 구현·테스트와 함께 갱신되는가?

REST, GraphQL, gRPC 중 어느 방식을 고르든 이 질문은 남는다. 기술 선택보다 먼저, 소비자가 예측 가능한 계약을 만들고 그 계약을 바꾸는 비용을 관리하는 것이 API 설계의 핵심이다.

[^http-semantics]: [RFC 9110: HTTP Semantics, §9.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2)
[^problem-details]: [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html)
[^openapi]: [OpenAPI Specification v3.2.0, OpenAPI Description](https://spec.openapis.org/oas/latest.html#openapi-description)
