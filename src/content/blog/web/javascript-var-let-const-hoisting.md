---
title: "[JavaScript] var, let, const 선언 및 호이스팅(Hoisting) 개념 이해"
description: "JavaScript의 var, let, const의 스코프·재선언·재할당 특성과 호이스팅을 예제로 설명합니다."
publishedAt: 2024-06-11
category: "web"
tags: ["javascript", "var", "let", "const", "hoisting"]
---

JavaScript는 `var`, `let`, `const`로 변수를 선언합니다. 각 키워드의 특성과 호이스팅을 이해하고 적절히 사용하는 것이 중요합니다.

# var, let, const의 기본 개념

## var

`var`는 함수 스코프를 가지며 같은 함수 안에서 재선언과 재할당이 가능합니다.

```js
function example() {
  var x = 10;
  if (true) { var x = 20; console.log(x); // 20 }
  console.log(x); // 20
}
example();
```

## let

ES2015에서 도입된 `let`은 블록 스코프를 가지며 같은 블록 안에서 재선언할 수 없고 재할당은 가능합니다.

```js
function example() {
  let x = 10;
  if (true) { let x = 20; console.log(x); // 20 }
  console.log(x); // 10
}
example();
```

## const

`const`는 블록 스코프를 가지며 재선언과 재할당이 불가능하고 초기화 시 값을 반드시 할당해야 합니다.

```js
function example() {
  const x = 10;
  if (true) { const x = 20; console.log(x); // 20 }
  console.log(x); // 10
}
example();
```

## const와 let의 도입 시기와 이유

- 블록 레벨 스코프로 가독성과 유지보수성을 높입니다.
- 의도치 않은 재선언을 방지합니다.
- `const`는 값의 변경을 막아 안정성을 높입니다.

## 호이스팅(Hoisting) 개념

호이스팅은 변수 선언과 함수 선언이 해당 스코프의 최상단으로 끌어올려지는 동작입니다.

### var의 호이스팅 예제

```js
console.log(x); // undefined
var x = 10;
console.log(x); // 10
```

`var x`의 선언은 끌어올려지지만 초기화는 그렇지 않아 첫 출력은 `undefined`입니다.

### let과 const의 호이스팅 예제

```js
console.log(y); // ReferenceError: y is not defined
let y = 10;
console.log(z); // ReferenceError: z is not defined
const z = 10;
```

`let`과 `const`는 초기화 전에 접근하면 [ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)가 발생합니다.

# 핵심 요약

- `var`: 함수 스코프, 재선언·재할당 가능
- `let`: 블록 스코프, 재선언 불가·재할당 가능
- `const`: 블록 스코프, 재선언·재할당 불가
- 호이스팅: 변수와 함수 선언이 스코프의 최상단으로 끌어올려지는 현상
