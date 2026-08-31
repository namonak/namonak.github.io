---
title: "[Android] 안드로이드 스튜디오 waiting for target device to come online 무한 로딩 해결 방법"
description: "Android Studio 에뮬레이터가 waiting for target device to come online에서 멈출 때 AVD 데이터를 초기화하는 방법을 정리합니다."
publishedAt: 2020-09-11
category: "android"
tags: ["android", "android-studio", "avd", "emulator", "troubleshooting"]
draft: false
---

Android Studio에서 개발 중 에뮬레이터를 실행했을 때 `waiting for target device to come online` 메시지가 표시되며 계속 로딩되는 경우가 있습니다. 이 글에서는 AVD(Android Virtual Device)의 데이터를 초기화해 해결했던 방법을 기록합니다.

## AVD 데이터 초기화

1. Android Studio에서 **Tools > AVD Manager**를 엽니다.
2. **Android Virtual Device Manager**에서 문제가 발생한 Device를 찾습니다.
3. 해당 Device를 우클릭한 뒤 **Wipe Data**를 선택합니다.

![Android Virtual Device Manager에서 Wipe Data 선택](/images/android-avd-wipe-data.png)

AVD에 저장된 데이터를 초기화한 다음 에뮬레이터를 다시 실행합니다.
