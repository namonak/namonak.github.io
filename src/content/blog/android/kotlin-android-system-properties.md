---
title: "[Android] Kotlin을 활용한 android.os.properties 접근"
description: "Kotlin reflection으로 android.os.SystemProperties의 get·set 메서드에 접근하는 예제를 정리합니다."
publishedAt: 2021-05-12
category: "android"
tags: ["android", "kotlin", "system-properties", "reflection"]
draft: false
---

이 글에서 말하는 프로퍼티는 Android 시스템이 관리하는 `android.os.SystemProperties`를 의미합니다. APK 내부에서 사용하는 Java의 `System.getProperty`, `System.setProperty`와는 다릅니다.

Android 시스템 속성을 추가하거나 API로 구현하는 방법은 Android 공식 문서에 정리되어 있습니다.

> - [시스템 속성 추가](https://source.android.com/docs/core/architecture/configuration/add-system-properties)
> - [시스템 속성을 API로 구현](https://source.android.com/docs/core/architecture/configuration/sysprops-apis)

다만 위 방식으로 시스템 속성을 추가하려면 다음과 같은 조건이 필요합니다.

- 플랫폼 빌드에 포함되는 시스템 앱은 `android.os.SystemProperties`를 사용할 수 있습니다.
- 플랫폼 빌드에서 사용하는 키로 앱에 서명해 빌드하면 사용할 수 있습니다.

플랫폼 빌드·패키징 업무와 앱 개발 업무가 분리되어 있다면, 앱 개발 단계에서 위와 같이 시스템 속성을 추가하기 어려울 수 있습니다.

## Reflection을 이용한 접근 예시

Reflection을 이용하면 앱 코드에서 시스템 프로퍼티의 `get`, `set` 메서드에 접근을 시도할 수 있습니다. 다음은 Kotlin 예제입니다.

```kotlin
fun getProperty(key: String): String? {
    var ret: String? = null
    try {
        val systemProperties = Class.forName("android.os.SystemProperties")

        val paramTypes = arrayOf<Class<*>>(String::class.java)
        val get = systemProperties.getMethod("get", *paramTypes)

        ret = get.invoke(systemProperties, key)?.toString()
    } catch (e: IllegalArgumentException) {
        e.printStackTrace()
    } catch (e: Exception) {
        e.printStackTrace()
    }

    return ret
}

@Throws(IllegalArgumentException::class)
fun setProperty(key: String, value: String) {
    try {
        val systemProperties = Class.forName("android.os.SystemProperties")

        val paramTypes = arrayOf<Class<*>>(String::class.java, String::class.java)
        val set = systemProperties.getMethod("set", *paramTypes)

        set.invoke(systemProperties, key, value)
    } catch (e: IllegalArgumentException) {
        e.printStackTrace()
    } catch (e: Exception) {
        e.printStackTrace()
    }
}
```

> **주의:** `android.os.SystemProperties`는 일반 앱용 공개 SDK API가 아닙니다. 위 코드는 과거의 reflection 접근 예시이며, Android 버전·hidden API 정책·기기 제조사 구현에 따라 동작이 제한될 수 있습니다. 일반 앱에서는 공개 API나 앱 자체의 저장소를 우선 검토해야 합니다.

원문 예제: [SystemProperties.kt Gist](https://gist.github.com/namonak/394122a1e382ba8d68723a7ab0acb33a)
