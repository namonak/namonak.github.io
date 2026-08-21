---
title: "[Web Development] CSR (Client-Side Rendering)과 SSR (Server-Side Rendering) 이해하기"
description: "CSR과 SSR이 HTML을 만드는 위치, 요청 흐름, 장단점과 현대 웹에서 함께 고려할 보충 사항을 정리합니다."
publishedAt: 2023-07-26
updatedAt: 2026-08-21
category: "web"
tags: ["web", "csr", "ssr", "rendering", "seo", "performance"]
---

웹페이지를 제공하는 방식에는 CSR(Client-Side Rendering)과 SSR(Server-Side Rendering)이 있습니다. 두 방식의 핵심 차이는 사용자 인터페이스를 화면에 그리는 브라우저의 최종 단계가 아니라, **서버와 클라이언트 중 어디에서 HTML을 준비하는가**에 있습니다.

> 이 글에서 말하는 렌더링은 브라우저가 HTML을 화면에 그리는 과정 자체보다, 서버 또는 클라이언트가 화면을 위한 HTML을 생성하는 과정을 가리킵니다.

## CSR (Client-Side Rendering)

CSR은 클라이언트 측 JavaScript가 데이터를 받아 화면을 구성하는 방식입니다. 첫 요청에서 서버는 비교적 비어 있는 HTML과 JavaScript 파일을 보낼 수 있고, 브라우저가 JavaScript를 실행한 뒤 API에서 받은 데이터로 화면을 채웁니다.

![CSR 요청 흐름: HTML과 JavaScript를 받은 브라우저가 API 데이터를 받아 화면을 완성한다.](/images/csr-rendering-flow.png)

_이미지 출처: [SoluteLabs](https://www.solutelabs.com/blog/client-side-vs-server-side-rendering-what-to-choose-when) — 원문에 사용된 이미지를 로컬에 보존했습니다._

### CSR 작동 방식

1. 사용자가 웹사이트를 요청합니다.
2. CDN 또는 서버가 HTML과 JavaScript 파일의 링크를 응답합니다.
3. 브라우저가 HTML과 JavaScript를 내려받습니다.
4. JavaScript가 실행되어 필요한 데이터를 API에 요청합니다.
5. 서버가 API 응답을 보냅니다.
6. 클라이언트가 받은 데이터를 화면에 채우고 상호작용을 준비합니다.

### CSR의 장점

- 화면 전환과 상호작용을 클라이언트에서 연속적으로 처리하기 좋습니다.
- HTML 생성 작업을 클라이언트로 옮기는 구조에서는 서버의 렌더링 부담을 줄일 수 있습니다.

### CSR의 단점

- JavaScript를 내려받고 실행한 뒤 데이터까지 받아야 의미 있는 화면이 보일 수 있습니다.
- JavaScript에 의존하는 콘텐츠는 크롤러·공유 미리보기·초기 표시를 별도로 검토해야 합니다.

## SSR (Server-Side Rendering)

SSR은 서버가 요청에 맞는 HTML을 먼저 만들어 응답하는 방식입니다. 브라우저는 받은 HTML로 내용을 표시하고, 이후 JavaScript를 내려받아 필요한 상호작용을 연결할 수 있습니다.

![SSR 요청 흐름: 서버가 준비된 HTML을 만들고 브라우저가 이를 표시한 뒤 JavaScript가 상호작용을 연결한다.](/images/ssr-rendering-flow.png)

_이미지 출처: [SoluteLabs](https://www.solutelabs.com/blog/client-side-vs-server-side-rendering-what-to-choose-when) — 원문에 사용된 이미지를 로컬에 보존했습니다._

### SSR 작동 방식

1. 사용자가 웹사이트를 요청합니다.
2. 서버가 요청에 필요한 데이터와 템플릿을 바탕으로 HTML을 생성합니다.
3. 브라우저가 준비된 HTML을 받아 내용을 표시합니다.
4. 필요한 JavaScript를 내려받아 실행합니다.
5. hydration 등을 사용하는 애플리케이션에서는 JavaScript가 이벤트 처리와 상태를 연결해 상호작용이 가능해집니다.

### SSR의 장점

- HTML에 주요 내용이 포함되면 사용자는 JavaScript 실행 전에도 콘텐츠를 볼 수 있습니다.
- 검색 엔진이나 링크 미리보기가 HTML에서 정보를 읽어야 하는 페이지에 유리할 수 있습니다.

### SSR의 단점

- 요청마다 HTML을 생성하면 서버의 계산·데이터 조회 비용이 늘 수 있습니다.
- 서버 왕복이 필요한 페이지 전환은 설계에 따라 사용자 경험에 영향을 줄 수 있습니다.

## 보충: 둘 중 하나만 고르는 문제는 아니다

원문의 흐름도는 개념을 이해하기 위한 단순화된 예입니다. 실제 서비스는 정적 생성, SSR, CSR, 스트리밍, 부분 hydration을 함께 사용하기도 합니다.

- CSR이 항상 빈 화면을 보여 주는 것도, SSR이 항상 더 빠른 것도 아닙니다. HTML 셸, 데이터 요청 방식, JavaScript 크기, 캐시, 네트워크 환경이 함께 영향을 줍니다.
- SSR이 HTML을 제공한다고 해서 모든 검색 노출 문제가 자동으로 해결되지는 않습니다. 제목·설명·콘텐츠·링크와 크롤러가 접근할 수 있는 상태를 함께 점검해야 합니다.
- SSR 뒤에 JavaScript를 연결하지 않는 페이지도 있고, 반대로 SSR 뒤에 hydration을 수행해 상호작용을 제공하는 페이지도 있습니다.

따라서 선택할 때는 "어떤 방식을 쓰는가"보다 사용자에게 언제 의미 있는 콘텐츠가 보이는지, 언제 상호작용할 수 있는지, 서버 비용과 캐시 전략은 어떤지 측정하는 것이 중요합니다.

## 핵심 요약

- CSR은 브라우저의 JavaScript가 데이터를 받아 화면을 구성하는 방식입니다.
- SSR은 서버가 요청에 맞는 HTML을 먼저 만들어 브라우저에 보내는 방식입니다.
- 초기 콘텐츠 표시, 상호작용 시점, 서버 비용, 캐시, SEO 요구 사항을 함께 고려해야 합니다.
- 현대 웹은 CSR과 SSR을 이분법으로만 보지 않고 페이지와 기능별로 조합할 수 있습니다.
