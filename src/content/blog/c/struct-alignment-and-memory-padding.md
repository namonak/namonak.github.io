---
title: "[C] 구조체 정렬(메모리 패딩)"
description: "C 구조체의 멤버 배치, 정렬 단위, 패딩으로 인해 sizeof 결과가 예상보다 커지는 이유를 예제로 정리합니다."
publishedAt: 2020-08-21
category: "c"
tags: ["c", "memory", "memory-alignment", "memory-padding", "struct"]
draft: false
---

## 개요

C 언어에서 구조체가 메모리에 적재될 때 멤버는 선언된 순서에 따라 배치됩니다. 첫 번째 멤버의 오프셋은 0이며, 이후 멤버의 위치와 구조체 전체 크기는 데이터 타입의 크기뿐 아니라 정렬(alignment) 조건의 영향을 받습니다.

다음 구조체는 `char`가 1바이트, `int`가 4바이트이므로 멤버 크기의 합만 보면 5바이트로 예상할 수 있습니다.

```c
#include <stdio.h>

struct s {
    char c;
    int i;
};

int main(void)
{
    struct s st = {'A', 12};

    printf("%zu %zu %zu\n", sizeof(st.c), sizeof(st.i), sizeof(st));
    return 0;
}
```

많은 32비트·64비트 ABI 환경에서는 이 구조체의 `sizeof(st)`가 8이 됩니다.

## 메모리 패딩

컴파일러는 CPU가 데이터를 효율적으로 읽을 수 있도록 멤버를 특정 경계에 맞춰 배치합니다. 위 예제에서 `int`는 흔히 4바이트 경계에 정렬되므로, `char` 뒤에 3바이트의 빈 공간이 추가될 수 있습니다.

| 오프셋 | 내용 |
| --- | --- |
| 0 | `char c` (1바이트) |
| 1–3 | `int` 정렬을 위한 패딩 (3바이트) |
| 4–7 | `int i` (4바이트) |

이처럼 정렬을 위해 추가되는 빈 공간을 메모리 패딩(memory padding)이라고 합니다. 패딩은 메모리 사용량을 늘릴 수 있지만, 정렬되지 않은 메모리 접근에 따른 비용을 줄이기 위한 일반적인 방식입니다.

> 정렬 기준과 `sizeof` 결과는 컴파일러, 대상 아키텍처, ABI에 따라 달라질 수 있습니다. 실제 결과는 사용 중인 환경에서 확인하는 것이 안전합니다.
