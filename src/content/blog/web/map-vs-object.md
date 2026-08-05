---
title: "JavaScript Map과 일반 객체: 키-값 쌍을 관리하는 방법"
description: "JavaScript의 Map과 일반 객체를 키 유형, 순서, API, 성능 관점에서 비교합니다."
publishedAt: 2024-06-20
category: "web"
tags: ["javascript", "map", "object", "data-structures"]
---

JavaScript에서 키-값 쌍을 관리할 때는 일반 객체(`{}`)와 `Map`을 가장 자주 만납니다. 둘은 비슷해 보이지만 허용하는 키의 유형, 순회 방식, 제공하는 API가 다릅니다.

## 차이점 한눈에 보기

| 항목        | 일반 객체 (`{}`)                               | `Map`                                   |
| ----------- | ---------------------------------------------- | --------------------------------------- |
| 키 유형     | 문자열 또는 심볼                               | 객체·함수를 포함한 모든 값              |
| 삽입 순서   | 정수처럼 보이는 키에는 별도 순서 규칙이 적용됨 | 삽입 순서를 유지                        |
| 크기        | `Object.keys(obj).length` 등으로 계산          | `map.size`                              |
| 기본 API    | 속성 접근, `Object.keys()` 등                  | `set`, `get`, `has`, `delete`, `clear`  |
| 적합한 경우 | JSON 같은 단순한 레코드                        | 동적인 키 집합, 잦은 추가·삭제, 객체 키 |

## 선언과 값 추가

일반 객체는 리터럴로 만들고 대괄호 표기법 또는 점 표기법으로 값을 추가합니다.

```js
const authToken = {};
authToken.exampleCallType = "exampleToken";

console.log(authToken.exampleCallType); // exampleToken
```

`Map`은 생성자와 메서드를 사용합니다.

```js
const authToken = new Map();
authToken.set("exampleCallType", "exampleToken");

console.log(authToken.get("exampleCallType")); // exampleToken
```

`Map`의 키는 문자열에 한정되지 않습니다. 예를 들어 객체 자체를 키로 쓸 수 있습니다.

```js
const request = { id: 1 };
const tokens = new Map();

tokens.set(request, "exampleToken");
console.log(tokens.get(request)); // exampleToken
```

## 동일한 값 저장 예제

응답 객체에서 토큰을 꺼내 호출 유형별로 저장한다고 가정합니다. 단순한 문자열 키라면 일반 객체가 자연스럽습니다.

```js
const authTokens = {};
const exampleCallType = "exampleCallType";
const result = { authToken: "exampleToken" };

authTokens[exampleCallType] = result.authToken;

console.log(authTokens); // { exampleCallType: 'exampleToken' }
```

같은 흐름을 `Map`으로 표현할 수도 있습니다.

```js
const authTokens = new Map();
const exampleCallType = "exampleCallType";
const result = new Map([["authToken", "exampleToken"]]);

authTokens.set(exampleCallType, result.get("authToken"));

console.log(authTokens); // Map(1) { 'exampleCallType' => 'exampleToken' }
```

## 성능을 비교할 때

두 자료형의 삽입·조회·삭제는 일반적으로 상수 시간에 가깝게 동작하지만, 실제 결과는 JavaScript 엔진, 키의 형태, 데이터 크기, 코드 주변 맥락에 따라 달라집니다. 따라서 특정 환경에서 성능이 중요하다면 같은 런타임과 실제 데이터로 측정해야 합니다.

```js
const count = 1_000_000;

console.time("Object insertion");
const object = {};
for (let index = 0; index < count; index += 1) {
  object[index] = index;
}
console.timeEnd("Object insertion");

console.time("Map insertion");
const map = new Map();
for (let index = 0; index < count; index += 1) {
  map.set(index, index);
}
console.timeEnd("Map insertion");
```

성능 측정값 하나만으로 자료형을 고르기보다는 데이터 모델을 먼저 봐야 합니다. 직렬화할 레코드라면 객체가 간결하고, 키의 종류가 넓거나 컬렉션 조작 API가 필요하다면 `Map`이 더 의도를 잘 드러냅니다.

## 정리

- 단순한 문자열 키의 레코드와 JSON 데이터에는 일반 객체가 잘 맞습니다.
- 객체나 함수도 키로 써야 하거나, `size`와 컬렉션 전용 API가 필요하면 `Map`을 선택합니다.
- 대용량 데이터의 성능은 엔진과 작업 패턴에 따라 달라지므로 실제 사용 환경에서 측정합니다.
