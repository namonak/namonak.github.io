---
title: "[Linux] gcc -E 옵션"
description: "gcc의 -E 옵션이 컴파일·어셈블·링크 단계 전에 멈추고 전처리된 C 소스 코드를 표준 출력으로 보내는 방식을 정리합니다."
publishedAt: 2020-08-11
category: "linux"
tags: ["gcc", "preprocessor", "compiler", "c", "linux"]
draft: false
---

`gcc --help`에서 `-E` 옵션의 설명을 확인할 수 있습니다.

```bash
gcc --help | grep '\\-E'
```

```text
  -E                       Preprocess only; do not compile, assemble or link
```

## 전처리 단계까지만 실행

[GCC 10.2 Manual](https://gcc.gnu.org/onlinedocs/gcc-10.2.0/gcc.pdf)은 `-E` 옵션을 다음과 같이 설명합니다.

> Stop after the preprocessing stage; do not run the compiler proper. The output is in the form of preprocessed source code, which is sent to the standard output. Input files that don't require preprocessing are ignored.

즉 `gcc -E`는 전처리(preprocessing) 단계 뒤에 멈추며, 컴파일·어셈블·링크 단계는 실행하지 않습니다. 결과는 전처리된 소스 코드 형태로 표준 출력에 전달됩니다.

## 전처리 결과 확인

전처리 결과에서는 `#include`로 포함된 헤더와 매크로가 확장된 모습을 확인할 수 있습니다. 소스가 실제 컴파일러로 넘어가기 전 어떤 형태가 되는지 조사할 때 유용합니다.

> 참고: `-E`는 전처리 결과를 보여 주며, 최종 바이너리에 링크되는 라이브러리 정보를 직접 보여 주지는 않습니다. 링크 단계는 이 옵션에서 실행하지 않습니다.
