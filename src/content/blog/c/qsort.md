---
title: "[C] qsort() 함수"
description: "C 표준 라이브러리의 qsort() 함수 시그니처와 정수·문자열 배열을 비교 함수로 정렬하는 방법을 정리합니다."
publishedAt: 2023-07-13
updatedAt: 2026-08-24
category: "c"
tags: ["c", "qsort", "sorting", "stdlib"]
---

C에서 배열을 정렬하는 방법 중 하나는 표준 라이브러리 함수인 `qsort()`를 사용하는 것입니다. `qsort()`는 `<stdlib.h>`에 정의되어 있으며, 배열의 요소 타입과 비교 규칙을 호출자가 전달하면 그 규칙에 따라 정렬합니다.

```c
void qsort(void *ptr, size_t count, size_t size,
           int (*comp)(const void *, const void *));
```

- `ptr`: 정렬할 배열의 첫 요소를 가리키는 포인터
- `count`: 배열의 요소 수
- `size`: 요소 하나의 바이트 크기
- `comp`: 두 요소를 비교하는 함수 포인터

비교 함수는 첫 번째 인수가 두 번째보다 작으면 음수, 같으면 `0`, 크면 양수를 반환해야 합니다.

## 정수 배열 오름차순 정렬

```c
#include <stdio.h>
#include <stdlib.h>

int compare_ints(const void *a, const void *b) {
    const int left = *(const int *)a;
    const int right = *(const int *)b;

    return (left > right) - (left < right);
}

int main(void) {
    int values[] = {10, 5, 15, 12, 90, 80};
    const size_t count = sizeof(values) / sizeof(values[0]);

    qsort(values, count, sizeof(values[0]), compare_ints);

    for (size_t i = 0; i < count; i++) {
        printf("%d ", values[i]);
    }
}
```

`compare_ints`는 `void` 포인터를 `int` 포인터로 해석해 두 값을 비교합니다. 원문의 `left - right` 방식은 차이가 `int` 범위를 넘으면 오버플로가 날 수 있으므로, 여기서는 크기 비교 결과를 이용해 같은 의미를 안전하게 표현했습니다.

## 문자열 배열 사전순 정렬

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int compare_strings(const void *a, const void *b) {
    return strcmp(*(const char * const *)a, *(const char * const *)b);
}

int main(void) {
    const char *values[] = {"banana", "apple", "cherry", "blueberry", "grape"};
    const size_t count = sizeof(values) / sizeof(values[0]);

    qsort(values, count, sizeof(values[0]), compare_strings);

    for (size_t i = 0; i < count; i++) {
        printf("%s ", values[i]);
    }
}
```

문자열 배열의 요소는 `const char *`이므로, 비교 함수가 받는 주소는 포인터의 주소입니다. 따라서 `const char * const *`로 한 번 더 역참조한 뒤 `strcmp`에 전달합니다.

> 보충: 함수 이름과 달리 C 표준은 `qsort()`의 내부 정렬 알고리즘이나 안정 정렬 여부를 보장하지 않습니다. 호출자는 비교 함수의 규약과 결과만 가정해야 합니다.
