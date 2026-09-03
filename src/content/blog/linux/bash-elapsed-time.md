---
title: "[bash] 경과시간 출력하기"
description: "date, bc, awk를 이용해 Bash 스크립트 작업의 경과 시간을 초 단위로 출력하는 방법을 정리합니다."
publishedAt: 2020-04-29
category: "linux"
tags: ["bash", "shell-script", "date", "bc", "awk", "performance"]
draft: false
---

Bash 스크립트로 작업을 처리한 뒤 경과 시간을 측정하고 싶을 때가 있습니다. 스크립트 특성상 다양한 방법이 있겠지만, 여기서는 `date`, `bc`, `awk`를 이용합니다.

```bash
#!/bin/bash
beginTime=$(date +%s%N)

# 여기에 작업 내용을 구현한다
sleep 1

endTime=$(date +%s%N)
elapsed=`echo "($endTime - $beginTime) / 1000000" | bc`
elapsedSec=`echo "scale=6;$elapsed / 1000" | bc | awk '{printf "%.6f", $1}'`
echo TOTAL: $elapsedSec sec
```

`date`로 나노초 단위의 시간을 얻어 차이를 구합니다. 이후 `bc`로 초 단위의 부동소수 계산을 하고, 결과를 `awk`에 넘겨 출력 형식을 만듭니다.

실행 결과는 다음과 같습니다.

```text
TOTAL: 1.003000 sec
```

> 참고: 이 예제는 Linux의 `date +%s%N` 출력을 전제로 합니다. `%N`의 지원 여부와 정밀도는 사용하는 `date` 구현에 따라 다를 수 있습니다.

## 참고 자료

- [Date (Unix)](http://en.wikipedia.org/wiki/Date_(Unix))
- [Shell float number in expr](http://stackoverflow.com/questions/2362154/shell-float-number-in-expr)
- [Floating point arithmetic using expr](http://unix.ittoolbox.com/groups/technical-functional/shellscript-l/floating-point-arithmetic-using-expr-859937)
- [Expression of floating point on Linux shell](http://theeye.pe.kr/entry/expression-of-floating-point-on-linux-shell)
- 출처: [Service for Every Master](https://netmaid.tistory.com/34)
