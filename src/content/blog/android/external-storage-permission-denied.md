---
title: "[Android] 외부저장소에 파일 Read/Write 시에 발생하는 Permission denied 해결 방법"
description: "Android 외부 저장 공간의 파일을 읽거나 쓸 때 발생하는 Permission denied 오류와 권한 설정 방법을 정리합니다."
publishedAt: 2020-09-11
category: "android"
tags: ["android", "permission"]
---

안드로이드 어플리케이션 개발 중, external 저장 공간에 파일을 read 혹은 write 하려고 할때 다음과 같이 `Permission denied` 에러가 발생하는 경우가 있습니다.

```
D/MainActivity: /storage/emulated/0/Pictures/TEST.png
E/MainActivity: FileNotFoundException
W/System.err: java.io.FileNotFoundException: /storage/emulated/0/Pictures/TEST.png (Permission denied)
        at java.io.FileOutputStream.open(Native Method)
        at java.io.FileOutputStream.<init>(FileOutputStream.java:221)
        at java.io.FileOutputStream.<init>(FileOutputStream.java:169)
```

`Permission denied` 에러가 발생하는 이유는 external 저장 공간의 파일에 접근하기 위해서는 별도의 read/write 권한이 필요하기 때문입니다.

AndroidManifest.xml 파일에 다음과 같이 external 저장 공간에 대한 read/write 권한을 선언하면 됩니다. 선언 위치는 `<manifest>` 안에 그리고 `<application>` 밖에 선언하면 됩니다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.capture">

    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

**Stop 'app'** (`Ctrl + F2`) / **Start 'app'** (`Shift + F10`) 을 수행한 뒤에 **Settings > Device, Apps > (앱 선택) > Permissions, Storage** 메뉴로 이동하여 권한을 활성화 합니다.

![앱 권한 설정 화면](/images/wp206-app-permission.png)
