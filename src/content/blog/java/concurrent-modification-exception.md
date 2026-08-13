---
title: "[Java] ConcurrentModificationException의 원인과 해결책"
description: "Java 컬렉션을 반복 중 수정할 때 발생하는 ConcurrentModificationException의 원인과 해결 방법을 정리합니다."
publishedAt: 2024-04-18
category: "java"
tags: ["java", "collections", "iterator", "concurrency"]
---

# 개요

[ConcurrentModificationException](https://docs.oracle.com/javase/8/docs/api/java/util/ConcurrentModificationException.html)은 Java 프로그래밍에서 다중 스레드 환경이나 컬렉션의 동시 수정 시 자주 발생하는 예외입니다. 이 예외는 주로 컬렉션의 구조가 반복 중에 변경될 때 발생합니다. 이 글에서는 ConcurrentModificationException의 원인과 이를 해결하기 위한 방법들을 설명하겠습니다.

# ConcurrentModificationException의 원인

ConcurrentModificationException은 일반적으로 다음과 같은 상황에서 발생합니다.

1. **다중 스레드 환경에서의 동시 수정**: 여러 스레드가 하나의 컬렉션을 동시에 수정할 때 발생합니다. 한 스레드가 반복문으로 컬렉션을 순회하는 동안 다른 스레드가 해당 컬렉션을 수정하면 예외가 발생할 수 있습니다.
2. **단일 스레드에서의 부적절한 수정**: 단일 스레드에서도 반복문 안에서 컬렉션을 직접 수정하면 발생할 수 있습니다. 예를 들어 `for-each` 반복문을 사용하면서 컬렉션의 요소를 추가하거나 제거하려고 하면 ConcurrentModificationException이 발생합니다.

# 해결책

## Iterator 사용

Iterator를 사용하면 반복 중 안전하게 컬렉션의 요소를 제거할 수 있습니다. [`Iterator`](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html)의 `remove` 메서드를 사용하여 요소를 제거하면 ConcurrentModificationException을 방지할 수 있습니다.

```java
List<String> list = new ArrayList<>(Arrays.asList("one", "two", "three"));
Iterator<String> iterator = list.iterator();

while (iterator.hasNext()) {
    String element = iterator.next();
    if ("two".equals(element)) {
        iterator.remove(); // 안전하게 요소 제거
    }
}
```

## CopyOnWriteArrayList 사용

[`CopyOnWriteArrayList`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CopyOnWriteArrayList.html)는 쓰기 시에 새로운 복사본을 생성하므로, 다중 스레드 환경에서도 안전하게 컬렉션을 수정할 수 있습니다. 다만 쓰기 작업이 빈번하지 않은 경우에만 사용하는 것이 좋습니다.

```java
List<String> list = new CopyOnWriteArrayList<>(Arrays.asList("one", "two", "three"));

for (String element : list) {
    if ("two".equals(element)) {
        list.remove(element); // 안전하게 요소 제거
    }
}
```

## 동기화 사용

컬렉션을 동기화하여 한 번에 하나의 스레드만 접근하도록 할 수 있습니다. [`Collections.synchronizedList`](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#synchronizedList-java.util.List-) 메서드를 사용하면 간단하게 동기화된 리스트를 생성할 수 있습니다.

```java
List<String> list = Collections.synchronizedList(
    new ArrayList<>(Arrays.asList("one", "two", "three"))
);

synchronized (list) {
    Iterator<String> iterator = list.iterator();
    while (iterator.hasNext()) {
        String element = iterator.next();
        if ("two".equals(element)) {
            iterator.remove(); // 안전하게 요소 제거
        }
    }
}
```

# 핵심 요약

- ConcurrentModificationException은 주로 반복 중에 컬렉션이 수정될 때 발생합니다.
- 해결책으로는 Iterator 사용, CopyOnWriteArrayList 사용, 컬렉션 동기화 등이 있습니다.

# 용어 정리

- [ConcurrentModificationException](https://docs.oracle.com/javase/8/docs/api/java/util/ConcurrentModificationException.html): Java에서 반복 중 컬렉션이 수정될 때 발생하는 예외
- [`Iterator`](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html): 컬렉션의 요소를 순회할 수 있는 객체
- [`CopyOnWriteArrayList`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CopyOnWriteArrayList.html): 쓰기 작업 시 새로운 복사본을 생성하는 스레드 안전한 리스트
- 동기화: 여러 스레드가 동시에 하나의 자원에 접근하지 못하도록 제어하는 방법
