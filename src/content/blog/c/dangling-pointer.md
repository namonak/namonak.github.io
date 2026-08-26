---
title: "[C] 댕글링 포인터(Dangling Pointer)"
description: "해제된 메모리나 수명이 끝난 자동 변수를 계속 가리키는 댕글링 포인터의 정의, 문제점, 발생 원인을 정리합니다."
publishedAt: 2021-09-13
category: "c"
tags: ["c", "pointer", "memory-management", "dangling-pointer", "undefined-behavior"]
draft: false
---

## 댕글링 포인터 정의

포인터가 이미 해제된 메모리 영역을 계속 가리키고 있다면 이러한 포인터를 댕글링 포인터(Dangling Pointer)라고 합니다. 댕글링 포인터가 가리키는 메모리는 더는 유효하지 않습니다.

댕글링 포인터는 때때로 너무 이른 해제(premature free)라고도 부릅니다.

## 댕글링 포인터의 문제점

- 메모리에 접근할 때 예측할 수 없는 동작이 발생할 수 있습니다.
- 메모리에 접근하지 못하면 segmentation fault가 발생할 수 있습니다.
- 잠재적인 보안 위험이 될 수 있습니다.

## 댕글링 포인터가 생기는 원인

- 메모리를 해제한 뒤 해제된 메모리에 다시 접근하는 경우
- 함수 호출에서 자동 변수를 가리키는 포인터를 반환하는 경우
