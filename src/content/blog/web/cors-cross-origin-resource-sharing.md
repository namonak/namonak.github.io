---
title: "[Web Development] CORS (Cross-Origin Resource Sharing) 이해하기"
description: "동일 출처 정책을 바탕으로 CORS의 응답 헤더, 단순 요청, preflight 요청과 실무 설정 시 주의할 점을 정리합니다."
publishedAt: 2023-07-17
updatedAt: 2026-08-24
category: "web"
tags: ["web", "cors", "http", "security", "same-origin-policy"]
---

CORS(Cross-Origin Resource Sharing)는 **브라우저가 다른 출처(origin)의 응답을 JavaScript에 공개해도 되는지 판단하는 HTTP 헤더 기반 메커니즘**입니다. 프런트엔드와 API가 서로 다른 출처에 있을 때 자주 만나지만, 출발점은 CORS가 아니라 **동일 출처 정책(Same-Origin Policy, SOP)** 입니다.

> CORS는 서버의 인증·인가를 대신하지 않습니다. 서버가 허용한 응답을 브라우저의 JavaScript가 읽을 수 있게 하는 규칙이며, 서버 간 요청이나 악의적인 클라이언트 자체를 차단하는 방어선은 아닙니다.

## 출처(origin)는 무엇인가

두 URL은 **scheme(프로토콜), host, port가 모두 같을 때만** 같은 출처입니다. 경로·쿼리·프래그먼트는 출처 비교에 포함되지 않습니다.

| 비교 | 결과 | 이유 |
| --- | --- | --- |
| `https://app.example.com/posts` ↔ `https://app.example.com/api/posts` | 같은 출처 | 경로만 다름 |
| `https://app.example.com` ↔ `http://app.example.com` | 다른 출처 | scheme이 다름 |
| `https://app.example.com` ↔ `https://api.example.com` | 다른 출처 | host가 다름 |
| `https://app.example.com` ↔ `https://app.example.com:8443` | 다른 출처 | port가 다름 |

동일 출처 정책은 한 사이트에서 실행된 스크립트가 사용자가 로그인한 다른 사이트의 응답을 마음대로 읽지 못하게 격리합니다. 예를 들어 악성 페이지가 브라우저를 통해 메일이나 사내 서비스의 데이터를 읽어가는 일을 막는 중요한 기반입니다. 출처의 정확한 정의는 [RFC 6454](https://www.rfc-editor.org/rfc/rfc6454)와 [MDN의 동일 출처 정책 안내](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy)에서 확인할 수 있습니다.

## CORS는 어떻게 동작하는가

`https://app.example.com`에서 실행 중인 코드가 `https://api.example.com/profile`을 `fetch()`로 호출한다고 가정해 보겠습니다. 브라우저는 요청에 `Origin: https://app.example.com`을 포함할 수 있고, API는 응답으로 허용할 출처를 명시합니다.

```http
Access-Control-Allow-Origin: https://app.example.com
```

이 값이 요청 출처와 맞으면 브라우저는 응답을 JavaScript에 전달합니다. 값이 없거나 일치하지 않으면, 요청이 서버에 도달했더라도 브라우저는 응답 내용을 JavaScript가 읽지 못하게 합니다.

![서로 다른 출처의 페이지와 서버 사이에서 CORS 응답 헤더로 접근을 제어하는 흐름](/images/cors-request-flow.svg)

_이미지 출처: [MDN Web Docs — CORS mechanism diagram](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS), Mozilla Contributors, [CC BY-SA 2.5 이상](https://creativecommons.org/licenses/by-sa/2.5/). 로컬 사본이며 변경하지 않았습니다._

### 단순 요청과 preflight 요청

모든 교차 출처 요청 전에 `OPTIONS`가 발생하는 것은 아닙니다. `GET`, `HEAD`, 특정 조건의 `POST`처럼 제한된 형태의 요청은 바로 전송될 수 있습니다. 다만 메서드가 `PUT`, `PATCH`, `DELETE`이거나, 비표준 요청 헤더 또는 특정 `Content-Type`을 사용하면 브라우저는 실제 요청 전에 **preflight 요청**을 보냅니다.

preflight는 서버에 다음을 묻는 과정입니다.

```http
OPTIONS /profile HTTP/1.1
Origin: https://app.example.com
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: content-type, authorization
```

서버는 실제 요청을 허용할지 다음과 같은 응답 헤더로 알립니다.

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

![교차 출처 preflight 요청에서 OPTIONS 확인 뒤 실제 요청을 보내는 시퀀스](/images/cors-preflight-request.svg)

_이미지 출처: [MDN Web Docs — Diagram of a preflight request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS#preflighted_requests), Mozilla Contributors, [CC BY-SA 2.5 이상](https://creativecommons.org/licenses/by-sa/2.5/). 로컬 사본이며 변경하지 않았습니다._

`Access-Control-Max-Age`는 preflight 결과를 캐시할 수 있는 시간을 뜻합니다. 실제 적용 상한은 브라우저마다 다를 수 있으므로, 값만 크게 설정해 성능 문제가 해결된다고 가정하지 않는 편이 좋습니다.

## 자주 혼동하는 지점

### CORS는 CSRF 방어가 아니다

교차 출처의 단순 요청은 서버에 도달할 수 있습니다. CORS는 주로 **응답을 읽을 수 있는지**를 제어하므로, 상태를 바꾸는 요청에 대한 CSRF 방어를 제공하지 않습니다. 세션 쿠키를 이용하는 서비스라면 CSRF 토큰, `SameSite` 쿠키, 요청 출처 검증 같은 별도의 방어책을 설계해야 합니다.

### 와일드카드와 자격 증명은 함께 쓸 수 없다

쿠키나 HTTP 인증 정보를 포함하는 요청은 클라이언트에서 `credentials: "include"` 같은 별도 설정이 필요합니다. 이때 서버는 `Access-Control-Allow-Credentials: true`를 보내야 하며, `Access-Control-Allow-Origin: *` 대신 구체적인 출처를 응답해야 합니다.

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true
Vary: Origin
```

허용 출처를 반사(reflect)하는 구현이라면 신뢰할 수 있는 출처 목록과 정확히 비교해야 합니다. 인증이 필요한 API에서 무분별하게 모든 출처를 허용하면 의도하지 않은 웹사이트에 응답을 공개할 수 있습니다.

### WebSocket의 Origin 검증은 별도로 이해한다

WebSocket 연결은 일반 `fetch()` 요청과 같은 CORS 절차로 처리되지 않지만, 핸드셰이크에는 `Origin` 헤더가 포함될 수 있습니다. 과거 SockJS 기반 채팅을 배포할 때 `wss://chat.example.com` 엔드포인트에서 403을 만났고, Spring의 엔드포인트 허용 출처 설정을 추가해 해결한 경험이 있습니다.

```kotlin
@Configuration
@EnableWebSocketMessageBroker
class WebSocketConfig : WebSocketMessageBrokerConfigurer {
    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        registry.addEndpoint("/chat-websocket")
            .setAllowedOrigins(System.getenv("HOST_ENDPOINT"))
            .withSockJS()
    }
}
```

이는 WebSocket/SockJS 엔드포인트의 Origin 검증 설정에 관한 사례입니다. 프레임워크 버전에 따라 권장 API와 허용 출처 패턴 설정이 다를 수 있으므로, 현재 사용하는 Spring 문서를 함께 확인해야 합니다.

## 문제를 만났을 때 확인할 순서

1. 브라우저 개발자 도구의 Network 탭에서 실제 요청과 `OPTIONS` 요청을 구분합니다.
2. 요청의 `Origin`, 응답의 `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` 값을 함께 비교합니다.
3. 인증 정보를 포함한다면 `Access-Control-Allow-Credentials`와 와일드카드 사용 여부를 확인합니다.
4. 리버스 프록시, CDN, 애플리케이션 서버 중 **어느 계층이 최종 응답 헤더를 만드는지** 확인합니다.
5. 브라우저에서만 재현되는지와 서버 간 호출에서도 실패하는지를 분리합니다. 후자는 보통 CORS 문제가 아닙니다.

## 핵심 요약

- 출처는 scheme, host, port의 조합으로 결정됩니다.
- CORS는 서버가 HTTP 응답 헤더로 특정 출처의 브라우저 JavaScript에 응답 읽기를 허용하는 방식입니다.
- 일부 요청은 preflight 없이 전송되며, CORS는 CSRF 방어를 대신하지 않습니다.
- 자격 증명 요청에는 구체적인 허용 출처와 `Access-Control-Allow-Credentials: true`가 필요합니다.
- 오류를 해결할 때는 브라우저 요청·응답 헤더와 실제 헤더를 생성하는 서버 계층을 함께 확인해야 합니다.
