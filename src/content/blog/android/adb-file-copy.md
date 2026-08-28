---
title: "[Android] ADB를 이용한 파일 복사(adb pull / push)"
description: "ADB의 push와 pull 명령으로 호스트 컴퓨터와 Android 기기 사이에서 파일을 복사하는 방법을 정리합니다."
publishedAt: 2021-03-09
category: "android"
tags: ["android", "adb", "command-line", "file-transfer"]
draft: false
---

## 개요

Android 플랫폼을 개발할 때 MTP로 파일을 주고받기 어려운 경우가 있습니다. 이때 [ADB](https://developer.android.com/tools/adb)의 `pull`, `push` 명령을 사용하면 호스트 컴퓨터와 Android 기기 사이에서 파일을 복사할 수 있습니다.

## ADB 디버깅 설정

ADB를 사용하려면 Android 기기에서 USB 디버깅 옵션을 활성화해야 합니다.

1. **설정 > 기기 환경설정 > 정보 > 빌드**를 7번 이상 선택해 개발자 옵션을 활성화합니다.
2. 개발자 옵션이 활성화되면 **설정 > 기기 환경설정 > 개발자 옵션 > USB 디버깅**을 활성화합니다.

기기 제조사나 Android 버전에 따라 메뉴 이름과 위치는 조금씩 다를 수 있습니다.

## `adb push`와 `adb pull`

### `adb push`: 호스트에서 Android 기기로 파일 복사

```bash
adb push <local> <remote>

# 예: 현재 호스트의 image.jpg를 기기 저장소로 복사
adb push ~/image.jpg /sdcard/
```

### `adb pull`: Android 기기에서 호스트로 파일 복사

```bash
adb pull <remote> <local>

# 예: 기기의 /sdcard/ 디렉터리를 호스트 홈 디렉터리로 복사
adb pull /sdcard/ ~/
```

연결된 기기가 여러 대라면 명령 앞에 `-s <serial>`을 붙여 대상을 지정할 수 있습니다. 파일 접근 가능 여부는 기기의 권한과 Android 버전에 따라 달라질 수 있습니다.
