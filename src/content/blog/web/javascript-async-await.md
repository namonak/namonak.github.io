---
title: "async/await에서 오류와 취소를 분리하는 기준"
description: "비동기 함수의 성공, 예상 가능한 오류, 취소 흐름을 호출자가 다루기 쉽게 만드는 방법입니다."
publishedAt: 2026-08-02
category: "web"
tags: ["javascript", "async-await"]
---

`async/await`는 비동기 코드를 동기 코드처럼 읽게 해 주지만, 모든 실패를 같은 방식으로 처리하라는 뜻은 아닙니다. 호출자가 복구할 수 있는 오류와 작업을 중단해야 하는 신호를 구분해야 합니다.

## 결과를 좁게 만들기

네트워크 요청 함수는 성공한 데이터만 반환하고, HTTP 오류는 호출자가 판단할 수 있는 오류로 바꿉니다.

```js
async function loadProfile(id, { signal } = {}) {
  const response = await fetch(`/api/profiles/${id}`, { signal });

  if (!response.ok) {
    throw new Error(`프로필을 불러오지 못했습니다: ${response.status}`);
  }

  return response.json();
}
```

1. 요청을 시작할 때 취소 가능한 `AbortSignal`을 전달합니다.
2. 최신 요청이 시작되면 이전 요청을 취소합니다.
3. `AbortError`는 사용자에게 오류 화면으로 표시하지 않습니다.

이 기준을 지키면 화면 상태는 사용자 행동에 맞춰 바뀌고, 오래된 응답이 새 화면을 덮어쓰는 일을 막을 수 있습니다.
