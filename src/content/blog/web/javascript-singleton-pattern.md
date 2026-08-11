---
title: "[JavaScript] 싱글톤 패턴(Singleton Pattern)의 이해와 구현 방법"
description: "JavaScript에서 클래스와 클로저로 싱글톤 패턴을 구현하는 방법을 정리합니다."
publishedAt: 2024-06-11
updatedAt: 2024-07-15
category: "web"
tags: ["javascript", "design-patterns", "singleton"]
---

# 싱글톤 패턴(Singleton Pattern)이란?

싱글톤 패턴은 특정 클래스의 인스턴스가 오직 하나만 생성됨을 보장하는 디자인 패턴입니다. 전역적으로 유일한 인스턴스를 제공해 설정 값이나 공통 자원을 관리하는 데 유용합니다.

1. 공통 자원 관리: 데이터베이스 연결, 설정 파일, 로그 등
2. 글로벌 상태 관리: 애플리케이션의 전역 상태 관리

# JavaScript에서 싱글톤 패턴 구현

JavaScript에서는 클래스와 클로저를 사용하는 방법이 일반적입니다.

## 클래스와 정적 메서드를 사용한 싱글톤 패턴

```js
class Singleton {
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    this.data = "싱글톤 데이터";
    Singleton.instance = this;
    return this;
  }

  getData() { return this.data; }
}

const singleton1 = new Singleton();
console.log(singleton1.getData()); // 출력: 싱글톤 데이터
const singleton2 = new Singleton();
console.log(singleton1 === singleton2); // 출력: true
```

처음 생성한 인스턴스를 `Singleton.instance`에 저장하고, 이후 생성 시에는 기존 인스턴스를 반환합니다.

## 클로저를 사용한 싱글톤 패턴

```js
const Singleton = (function () {
  let instance;
  function createInstance() {
    const object = new Object("싱글톤 객체");
    return object;
  }
  return {
    getInstance: function () {
      if (!instance) instance = createInstance();
      return instance;
    },
  };
})();

const singleton1 = Singleton.getInstance();
console.log(singleton1); // 출력: 싱글톤 객체
const singleton2 = Singleton.getInstance();
console.log(singleton1 === singleton2); // 출력: true
```

즉시 실행 함수 표현식(IIFE)으로 `Singleton` 객체를 정의하고 `getInstance`를 통해 유일한 인스턴스를 반환합니다.

# 결론

싱글톤 패턴은 특정 클래스의 인스턴스가 하나만 존재하도록 보장합니다. JavaScript에서는 클래스나 클로저를 사용해 구현할 수 있으며, 상황에 맞게 선택할 수 있습니다.
