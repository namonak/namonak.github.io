---
title: "[Android] TV 레이아웃 구성"
description: "Android Studio에서 Leanback 기반 TV 앱 프로젝트를 만들고 레이아웃, Activity, 에뮬레이터를 구성하는 예제입니다."
publishedAt: 2020-09-30
category: "android"
tags: ["android", "android-tv", "layout", "leanback"]
---

## Layout 구성 예제

이번 포스트에서는 [Android Studio](https://developer.android.com/studio)에서 실제 TV 레이아웃을 구성하고 편집하는 방법에 대해서 설명합니다.

### Leanback 라이브러리를 활용한 레이아웃 구성

자세한 내용은 안드로이드 개발자 문서의 [Android TV > TV 앱](https://developer.android.com/training/tv/start?hl=ko) 빌드란을 확인하세요. 또한 아래 Reference란에 첨부한 [Creating Layout and Activity](https://www.youtube.com/watch?v=Z6FT4ICaqLM) 유튜브 동영상을 시청하시는 것도 TV 레이아웃을 이해하시는데 큰 도움이 됩니다.

> Android의 Leanback 라이브러리는 Android TV 애플리케이션 개발을 위해 설계된 라이브러리로, TV 사용자 인터페이스를 쉽고 효율적으로 구축할 수 있도록 다양한 사전 정의된 클래스와 인터페이스를 제공합니다. 이 라이브러리는 Android TV 앱 개발 시 필수적인 요소로, 리모컨 입력과 같은 TV 특유의 사용자 상호작용을 쉽게 처리할 수 있게 해줍니다.

#### 프로젝트 생성

- Android Studio를 실행 후 **"Start a new Android Studio project"**를 선택합니다.
- **"Select a Project Template"** 화면에서 **TV** 탭을 선택 후 **"No Activity"**를 선택합니다.

  > 기본값인 **Android TV Activity**를 선택하면 샘플 TV 앱을 구동하기 위한 소스 코드와 메니페스트, 리소스(레이아웃 등)가 포함됩니다. 이러한 세팅 값들은 TV 레이아웃을 이해하기 위한 기본 구성 이해에 방해가 되므로 **No Activity** 상태로 프로젝트를 생성합니다.

  ![TV 프로젝트 템플릿에서 No Activity 선택](/images/wp566-tv-layout-16-27-11.png)

- **"Configure Your Project"** 탭에서 **"Name"**을 지정합니다. 여기서는 **TV-example**로 하겠습니다. **"Package name"**과 **"Save location"**은 **"Name"**을 지정하면 자동으로 설정됩니다.
- **"Minimum SDK"**에서는 해당 앱에서 지원하는 안드로이드 SDK의 최소 버전을 선택합니다. 여기서는 **API 25: Android 7.1.1 (Nougat)**으로 지정하겠습니다. 설정이 완료되면 **"Finish"**를 클릭하여 프로젝트 생성을 완료합니다.

  ![TV 프로젝트의 Minimum SDK 설정](/images/wp566-tv-layout-16-40-17.png)

- 프로젝트가 정상적으로 생성되면 아래와 같은 화면이 나타납니다.

  ![생성된 TV 프로젝트 화면](/images/wp566-tv-layout-16-46-46.png)

  - ![Project 탭 아이콘](/images/wp566-tv-layout-16-48-57.png) 좌측의 "Project" 탭에 안드로이드 어플리케이션 개발을 위한 파일 구조가 보여집니다.
    - manifests: AndroidManifest.xml에 Activity 및 관련된 특정 속성을 선언해야 앱에서 Activity을 사용할 수 있습니다.
    - java: 실제 개발자가 구현해야하는 클래스들이 위치합니다.
    - java (generated): Gradle (빌드 자동화 툴)에 의해 생성된 자바 소스가 위치합니다.
    - res: resource의 약어로 앱에서 사용되는 문자열, 이미지 등이 위치합니다.
  - ![app 오류 아이콘](/images/wp566-tv-layout-16-49-14.png) app으로 표시되는 안드로이드 머리 우측에 X 표시가 되어 있습니다. 안드로이드 어플리케이션이 실행되기 위해서는 최소 1개 이상의 [Activity](https://developer.android.com/guide/components/activities/intro-activities?hl=ko)가 있어야 합니다. 현재 java/com/example/tv_example 자바 패스에 생성된 Activity가 없으므로 위와 같이 표시됩니다.

#### TV 어플리케이션을 위한 manifest 수정

- TV에서 실행되도록 개발하는 애플리케이션은 **manifest**에서 TV 런처 **Activity**를 선언해야 합니다. 이 작업을 위해 **CATEGORY_LEANBACK_LAUNCHER** 인텐트 필터를 사용합니다. 이 필터는 앱이 TV용으로 사용 설정되었음을 나타내며 Google Play에서 TV 앱으로 식별될 수 있도록 허용합니다. 사용자가 TV 홈 화면에서 앱을 선택하면 이 인텐트가 실행할 Activity를 식별합니다.
- **AndroidManifest.xml**에 다음의 코드를 추가합니다.
  - **android.software.leanback** 값을 **true**로 세팅하여 이 어플리케이션은 오직 TV 장치에서만 실행되게 합니다.
  - **android.hardware.touchscreen** 값을 **false**로 세팅하여 터치 스크린을 사용하지 않게 합니다. (TV는 터치 스크린이 필요 없죠? ^^)
  - `<application>` XML 태그 내부에 `<activity>` 태그를 추가합니다. 앞서 설명하였듯이 안드로이드 앱은 최소 1개 이상의 Activity가 있어야 하며 보통 **MainActivity**로 지정합니다.
  - `<activity>` 태그 내부에 `<intent-filter>` 태그를 통해 해당 앱은 **LEANBACK_LAUNCHER**에 의해 분류되는 TV 앱임을 표시합니다.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.example.tv_example">

    <uses-feature android:name="android.software.leanback"
        android:required="false" />

    <uses-feature android:name="android.hardware.touchscreen"
        android:required="false" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/Theme.Leanback"
        tools:ignore="GoogleAppIndexingWarning"
        android:banner="@drawable/lb_background">

        <activity android:name=".MainActivity"
            android:screenOrientation="landscape">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LEANBACK_LAUNCHER"/>
            </intent-filter>
        </activity>
    </application>
</manifest>
```

#### Layout 리소스 생성

- 안드로이드 앱은 XML 레이아웃에 정의된 정보를 메모리 상에서 객체화 하는데 이를 **Inflation**이라고 합니다. 최초에는 Layout 구성을 위한 XML 레이아웃 리소스 파일이 없으므로 생성합니다.
- Project 탭 > app/res 오른쪽 버튼 클릭 > New > Android Resource File을 클릭합니다.
  - **"File name:"**은 기본적으로 **activity_main**으로 합니다. UI 구성에 따라 다수의 Activity를 생성할 수 있는데 기본적으로 가장 주요 레이아웃은 **activity_main**으로 명명합니다.
  - **"Resource type:"**은 **Layout**을 선택합니다.
  - **"Root element:"**에서는 위에서 설명한 ViewGroup의 Layout 형태를 선택할 수 있습니다. 여기서는 **RelativeLayout**을 선택하겠습니다.
  - 설정이 완료되면 "OK" 버튼을 클릭합니다.

    ![Android Resource File 생성 설정](/images/wp566-tv-layout-17-23-40.png)

- XML 레이아웃 리소스 파일이 생성되면 아래와 같이 코드를 추가합니다.
  - `tools:context=".MainActivity"`: 추후 생성될 MainActiviy.java 클래스가 해당 레이아웃 리소스와 연동된다는 것을 의미합니다.
  - `xmlns:tools="`[`http://schemas.android.com/tools`](http://schemas.android.com/tools)`"`: 위에서 tools 속성을 추가하였기 때문에 Android Studio는 해당 속성을 사용하기 위해서 해당 구문을 자동으로 추가합니다.
  - `android:layout_width="match_parent"` / `android:layout_height="match_parent"`: 해당 구문은 기본적으로 설정된 값입니다. width/height 값을 부모 객체(TV 레이아웃)와 일치시킨다는 뜻입니다.
  - `android:orientation="horizontal"`: TV는 기본적으로 Landscape이기 때문에 horizontal로 설정합니다.
  - `android:visibility="visible"`: 해당 레이아웃은 당연히 보여야 하기 때문에 visible로 설정합니다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal"
    android:visibility="visible"
    tools:context=".MainActivity">
</RelativeLayout>
```

#### 레이아웃(ViewGroup)에 View 추가

레이아웃은 XML 편집을 통해서 수정할 수 있지만 Design 탭에서 수정도 가능합니다. 본 예제에서는 Design 탭에서 View를 추가한 뒤에 세부적인 속성들을 XML에서 설정합니다.

- Project 탭 > app/res/layout/activity_xml 더블 클릭 > 우측 상단에 **"Design"** 탭 클릭
- Palette > Text 탭 > TextView 선택 후 레이아웃으로 Drag

  ![Palette에서 TextView를 레이아웃으로 드래그](/images/wp566-tv-layout-18-24-41.png)

- 다음과 같이 "Component Tree"에 TextView가 추가되었으며 실제 레이아웃에도 배치된 것을 확인 할 수 있습니다.
  - 앞서 ViewGroup에서 설명드린대로 RelativeLayout 특성상 TextView가 0, 0 위치에 배치되었습니다.
  - 우측 상단의 **"Code"** 탭으로 이동하여 XML 속성값을 수정해 위치 및 기타 속성 값을 변경하겠습니다.

    ![Component Tree에 추가된 TextView와 Code 탭](/images/wp566-tv-layout-18-26-11.png)

- 레이아웃 XML 수정
  - 위와 같이 레이아웃에 TextView를 추가하면 레이아웃 XML 파일에 다음과 같이 TextView에 대한 정보가 추가되어 있습니다.
  - `android:textSize`, `android:text` 속성을 다음과 변경하여 TextView에 표시되는 텍스트의 내용을 변경합니다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Christina Joannes" />
</RelativeLayout>
```

#### MainActivity 클래스 추가 및 기본 구현

안드로이드 앱은 최소 1개의 Activity가 있어야 실행이 가능합니다. 보통 주요한 Activity 클래스명을 MainActivity로 명명합니다.

- Project 탭 > java 오른쪽 클릭 > New > Java Class 클릭 > MainActivity 입력

  ![MainActivity Java 클래스 생성](/images/wp566-tv-layout-18-30-9.png)

- MainActivity 클래스가 생성되면 다음과 같이 코드를 수정합니다.
  - Activity 클래스를 상속 받습니다.
  - `onCreate()` 메서드를 Override하여 재정의 합니다.
    - `setContentView(R.layout.activity_main);`: res/layout/activity_main.xml 레이아웃 리소스를 객체화하여 UI에 표시합니다.
    - `TextView textView = findViewById(`[`R.id`](http://r.id/)`.textView);`: 지정된 리소스 ID를 통해 View를 찾아 객체화합니다.
    - `textView.setTextSize(50)`: TextView 객체의 텍스트 크기의 50dp로 변경합니다.

```java
package com.example.tv_example;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

import androidx.annotation.Nullable;

public class MainActivity extends Activity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        TextView textView = findViewById(R.id.textView);

        textView.setTextSize(50);
    }
}
```

### 에뮬레이터 실행

Android Studio에서는 앱을 실행해 볼 수 있는 에뮬레이터를 제공합니다. 에뮬레이터를 실행하기 위해서 다음의 과정을 수행합니다.

- Tools > AVD Manager > + Create Virtual Device > TV 선택 > Android TV (1080p) 선택 후 "Next" 클릭

  ![Android TV 가상 기기 선택](/images/wp566-tv-layout-18-48-6.png)

- 앞서 프로젝트 생성시에 **API 25: Android 7.1.1 (Nougat)**으로 API 버전을 선택했으므로 Android 7.1.1 (Android TV)을 다운로드 후 타겟으로 선택하고 "Next" 클릭

  ![Android TV 시스템 이미지 선택](/images/wp566-tv-layout-18-49-9.png)

- 다음 화면에서는 별다른 설정 없이 "Finish" 클릭

  ![Android TV 가상 기기 설정 완료](/images/wp566-tv-layout-18-50-44.png)

- 상단 탭에서 ![에뮬레이터 실행 버튼](/images/wp566-tv-layout-18-51-59.png) 버튼을 클릭하면 에뮬레이터가 실행되고 결과 화면이 표시됩니다.

  ![실행된 Android TV 에뮬레이터](/images/wp566-tv-layout-18-40-47.png)

## Reference

- [Android Developer | TV 앱 시작하기](https://developer.android.com/training/tv/start/start?hl=ko)
