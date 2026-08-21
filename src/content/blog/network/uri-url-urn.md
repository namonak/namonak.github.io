---
title: "[Network] URI, URL 및 URN 정리"
description: "URI, URL, URN의 역할과 URI 구성 요소를 예시로 정리하고, 용어를 구분할 때 주의할 점을 설명합니다."
publishedAt: 2023-07-29
updatedAt: 2026-08-21
category: "network"
tags: ["network", "uri", "url", "urn", "web-standards"]
---

웹을 사용하거나 공부하다 보면 URI와 URL이라는 개념을 자주 접합니다. URI와 URL을 구분할 때 함께 나오는 URN까지, 이 글에서 기본 역할을 정리합니다.

## 1. URI (Uniform Resource Identifier)

URI는 추상적이거나 물리적인 자원을 식별하는 문자열입니다. RFC 3986은 URI를 자원을 식별하기 위한 확장 가능한 수단으로 정의합니다.[^rfc3986]

URI는 자원을 **어떻게 찾는지**뿐 아니라 **무엇을 가리키는지**를 표현할 수 있습니다. 따라서 URI가 있다고 해서 그 자원에 항상 접근할 수 있다는 뜻은 아닙니다.

## 2. URL (Uniform Resource Locator)

URL은 자원을 식별하면서, 일반적으로 그 자원에 접근하는 방법과 위치에 관한 정보도 제공합니다. 웹에서 흔히 보는 주소가 URL의 대표적인 예입니다.

```text
https://www.example.com:443/path/to/resource?lang=ko#overview
│       │               │   │                │       └─ fragment
│       │               │   │                └───────── query
│       │               │   └─────────────────────────── path
│       │               └─────────────────────────────── port
│       └─────────────────────────────────────────────── host
└─────────────────────────────────────────────────────── scheme
```

예를 들어 `https://www.example.com:443/path/to/resource`에서 `https`는 스킴, `www.example.com`은 호스트, `443`은 포트, 나머지는 경로입니다. URL의 실제 구성 요소와 의미는 각 스킴의 명세에 따라 달라질 수 있습니다.

## 3. URN (Uniform Resource Name)

URN은 `urn` 스킴을 사용하는 URI입니다. 위치가 바뀌어도 이름을 통해 자원을 식별하려는 목적을 갖습니다.

```text
urn:isbn:0451450523
```

ISBN을 URN의 예로 들 수 있습니다. 다만 URN이 있다는 사실만으로 해당 자원을 검색하거나 내려받을 수 있는 것은 아닙니다. 이름의 지속성은 스킴 자체보다 식별자를 관리하는 기관과 그 정책에 달려 있습니다.

## URI, URL, URN의 관계

가장 단순하게 기억하면 URL과 URN은 URI와 관련된 용어입니다.

- **URI**: 자원을 식별하는 더 일반적인 개념
- **URL**: 식별과 함께 접근 방법·위치에 관한 정보를 제공하는 URI
- **URN**: 위치와 독립적인 이름을 지향하는 `urn` 스킴의 URI

### 정정 및 보충

원문은 URL과 URN을 URI의 두 하위 분류로 설명했습니다. 입문용 설명으로는 도움이 되지만, RFC 3986은 URI를 locator, name 또는 둘 다의 성격을 가질 수 있다고 설명합니다. 스킴을 URL 또는 URN 중 하나로 고정 분류할 필요는 없습니다.[^rfc3986]

또한 원문이 참고한 RFC 2141은 현재 RFC 8141로 대체되었습니다.[^rfc8141] 이 글에서는 역사적 원문을 보존하되, 현행 URN 문법의 참고 문서를 RFC 8141로 갱신했습니다.

## 쉽게 비유하면

집을 가리키는 방법을 생각해 볼 수 있습니다. `서울시 …번지`처럼 찾아갈 수 있는 주소는 URL에 가깝고, `도서 ISBN …`처럼 위치와 별개로 대상을 식별하는 이름은 URN의 예가 될 수 있습니다. URI는 이처럼 자원을 가리키는 여러 식별 방식을 아우르는 표현입니다.

## 요약

- URI는 자원을 식별하는 일반적인 문자열입니다.
- URL은 자원을 식별하면서 접근 방법이나 위치에 관한 정보도 제공합니다.
- URN은 `urn` 스킴을 이용해 위치와 독립적인 이름을 표현하려는 URI입니다.
- 실무 문서에서는 필요 이상으로 URL·URN을 이분법으로 나누기보다 URI라는 일반 용어를 쓰는 편이 명확한 경우가 많습니다.

[^rfc3986]: [RFC 3986: Uniform Resource Identifier (URI): Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986.html)
[^rfc8141]: [RFC 8141: Uniform Resource Names (URN) Namespace Definition Mechanisms](https://www.rfc-editor.org/rfc/rfc8141.html)
