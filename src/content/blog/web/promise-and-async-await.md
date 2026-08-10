---
title: "[JavaScript] Promise와 async/await"
description: "Promise 체인과 async/await의 개념, 예제, 장단점을 비교합니다."
publishedAt: 2024-07-08
category: "web"
tags: ["javascript", "promise", "async-await", "asynchronous"]
---

## 개요

JavaScript의 비동기 프로그래밍은 웹 개발에서 매우 중요한 부분입니다. 비동기 작업을 효율적으로 관리하기 위해 JavaScript는 [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)와 [`async/await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)라는 두 가지 주요 기능을 제공합니다. 이 글에서는 Promise 체인과 async/await의 개념을 설명하고, 각각의 장단점을 비교해 보겠습니다.

## Promise 체인

### 배경 설명

[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)는 JavaScript에서 비동기 작업을 처리하기 위한 객체입니다. Promise는 비동기 작업의 완료 또는 실패를 나타내며, 그 결과값을 나중에 사용할 수 있게 해줍니다. Promise는 세 가지 상태를 가집니다.

1. `Pending` (대기): 비동기 작업이 아직 완료되지 않은 상태
2. `Fulfilled` (이행): 비동기 작업이 성공적으로 완료된 상태
3. `Rejected` (거부): 비동기 작업이 실패한 상태

### 개념 설명

Promise 체인은 여러 비동기 작업을 순차적으로 수행하기 위해 사용됩니다. 각 비동기 작업은 `then` 메서드를 사용하여 연결되며, `catch` 메서드를 통해 오류를 처리할 수 있습니다.

### 예제 코드

```js
// 비동기 작업을 시뮬레이션하는 함수
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://example.com/data') {
        resolve({ data: 'some data' });
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
}

// Promise 체인 예제
fetchData('https://example.com/data')
  .then((response) => {
    console.log(response.data); // 'some data'
    return fetchData('https://example.com/other-data');
  })
  .then((response) => {
    console.log(response.data); // 'other data'
  })
  .catch((error) => {
    console.error(error); // 'Invalid URL' 또는 다른 에러 메시지
  });
```

## async/await

### 배경 설명

`async/await`는 [ES2017(ES8)](https://262.ecma-international.org/8.0/)에서 도입된 비동기 프로그래밍의 새로운 문법입니다. `async/await`를 사용하면 비동기 코드를 마치 동기 코드처럼 작성할 수 있습니다.

### 개념 설명

`async` 키워드는 함수가 Promise를 반환하도록 만들어주며, `await` 키워드는 Promise가 해결될 때까지 함수 실행을 일시 정지시킵니다. 이를 통해 비동기 작업의 가독성과 유지보수성을 높일 수 있습니다.

### 예제 코드

```js
// 비동기 작업을 시뮬레이션하는 함수
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://example.com/data') {
        resolve({ data: 'some data' });
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
}

// async/await 예제
async function fetchAllData() {
  try {
    const response1 = await fetchData('https://example.com/data');
    console.log(response1.data); // 'some data'

    const response2 = await fetchData('https://example.com/other-data');
    console.log(response2.data); // 'other data'
  } catch (error) {
    console.error(error); // 'Invalid URL' 또는 다른 에러 메시지
  }
}

fetchAllData();
```

## Promise 체인 vs. async/await

### Promise 체인의 장점

- 명확한 구조: `then`, `catch` 메서드를 사용하여 비동기 작업의 흐름을 명확하게 표현할 수 있습니다.
- 병렬 처리: `Promise.all`을 사용하여 여러 비동기 작업을 병렬로 실행할 수 있습니다.

### Promise 체인의 단점

- 복잡한 코드: 중첩된 `then` 메서드 호출로 인해 코드가 복잡해질 수 있습니다.
- 가독성 저하: 긴 체인으로 인해 가독성이 떨어질 수 있습니다.

### async/await의 장점

- 간결한 코드: 동기 코드처럼 작성할 수 있어 코드가 간결하고 이해하기 쉽습니다.
- 가독성 향상: 코드의 흐름이 명확하여 가독성이 높습니다.

### async/await의 단점

- 에러 처리: `try/catch` 블록을 사용해야 하므로 코드가 길어질 수 있습니다.
- 호환성: 오래된 브라우저에서는 지원되지 않을 수 있습니다.

## 핵심 요약

- Promise와 async/await는 JavaScript에서 비동기 작업을 처리하는 두 가지 주요 방법입니다.
- Promise 체인은 `then`과 `catch` 메서드를 사용하여 비동기 작업을 순차적으로 처리하며, 병렬 처리도 가능합니다.
- async/await는 동기 코드처럼 비동기 작업을 작성할 수 있게 해주며, 코드의 가독성과 유지보수성을 높입니다.
- Promise 체인은 구조가 명확하지만 코드가 복잡해질 수 있고, async/await는 코드가 간결하지만 에러 처리 코드가 길어질 수 있습니다.

## 용어 정리

- Promise: 비동기 작업의 완료 또는 실패를 나타내는 객체
- Pending: Promise가 아직 완료되지 않은 상태
- Fulfilled: Promise가 성공적으로 완료된 상태
- Rejected: Promise가 실패한 상태
- async/await: 비동기 코드를 동기 코드처럼 작성할 수 있게 해주는 JavaScript 문법
