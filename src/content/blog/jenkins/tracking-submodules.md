---
title: "[Jenkins] trackingSubmodules 옵션에 관하여"
description: "Jenkins Git 플러그인의 SubmoduleOption에서 trackingSubmodules가 체크아웃 대상에 미치는 영향을 기록합니다."
publishedAt: 2023-03-14
category: "jenkins"
tags: ["jenkins", "git", "submodule", "ci"]
---

## 사건의 발단

관리하던 미들웨어 저장소에서 일부 모듈을 Git submodule로 분리한 뒤 Jenkins 파이프라인에 submodule 관련 설정을 추가했습니다. 그런데 submodule이 부모 저장소에 기록된 커밋이 아니라 원격의 최신 커밋으로 체크아웃되어 빌드되는 상황을 확인했습니다.

최신 변경 일부는 특정 플랫폼에 아직 반영하면 안 되는 내용이었으므로, 의도한 커밋을 재현하는 체크아웃이 필요했습니다.

## 문제 해결

`trackingSubmodules`를 `true`에서 `false`로 바꾸어 해결했습니다.

```groovy
[$class: 'SubmoduleOption',
    disableSubmodules: false,
    parentCredentials: true,
    recursiveSubmodules: true,
    reference: '',
    trackingSubmodules: false,
]
```

`trackingSubmodules`를 켜면 submodule이 설정한 원격 브랜치를 추적하도록 동작할 수 있습니다. 재현 가능한 빌드가 목적이라면 부모 저장소가 가리키는 submodule 커밋을 체크아웃하는지, Jenkins 로그와 Git 플러그인 설정으로 확인해야 합니다.

## SubmoduleOption의 주요 옵션

- `disableSubmodules`: Git submodule 처리를 비활성화할지 정합니다.
- `parentCredentials`: 부모 저장소의 자격 증명을 submodule 가져오기에 사용할지 정합니다.
- `recursiveSubmodules`: 중첩된 submodule까지 재귀적으로 처리할지 정합니다.
- `reference`: submodule을 갱신할 때 사용할 참조 저장소를 설정합니다.
- `trackingSubmodules`: submodule의 원격 브랜치를 추적할지 정합니다.

플러그인 버전과 파이프라인 정의에 따라 실제 동작이 달라질 수 있으므로, 변경 뒤에는 체크아웃 로그와 빌드에 사용된 커밋 SHA를 함께 기록하는 것이 좋습니다.
