---
title: "[Android] View/ViewGroup 개념 정리"
description: "Android UI를 구성하는 View와 ViewGroup, 주요 레이아웃과 속성을 정리합니다."
publishedAt: 2020-09-29
category: "android"
tags: ["android", "view", "viewgroup", "layout"]
---

## View/ViewGroup

안드로이드 어플리케이션 UI에서 버튼, 스위치, 이미지, 상태바 등은 기본적으로 모두 View로 구성되어 있습니다. 이러한 View 들이 위치 정보 등을 보함하여 화면에 구성되기 위해서는 View를 담기 위한 컨테이너가 필요한데 이것이 바로 ViewGroup 입니다. 개발자가 화면을 어떻게 구성하느냐에 따라 ViewGroup은 계층적으로 다수의 ViewGroup과 View를 가질 수 있습니다.

![View와 ViewGroup의 관계](/images/wp591-viewviewgroup.png)

## View

View란 기본적으로 화면에 보이는 것들을 말하는데 흔히 Widget(Control)이라 불리는 UI 구성 요소들이 View 입니다. View를 상속받는 직접적인 자식 클래스로는 ImageView, TextView, ProgressBar 등이 있습니다. 아래에 설명할 ViewGroup 또한 View를 상속받습니다.

### SurfaceView

SurfaceView는 기존의 View 클래스를 상속받는 View 입니다. 일반 View는 onDraw 메소드를 자동으로 호출하여 화면을 그리기 때문에 시스템 상황에 따라서 화면이 다소 늦게 그려질수 있지만, SurfaceView는 스레드를 이용해 강제로 화면에 그리기 때문에 원하는 시점에 화면을 그릴 수 있습니다. SurfaceView는 [더블 버퍼링](https://namu.wiki/w/%EB%8D%94%EB%B8%94%20%EB%B2%84%ED%8D%BC%EB%A7%81) 기법을 이용하여 SurfaceHolder가 Surface에 미리 이미지를 그리고 이 Surface가 SurfaceView에 반영되는 방식입니다. 또한, SurfaceView는 자기 영역 크기 만큼의 Window를 뚫어서(punch) 자신이 보여지게끔 하고 Window와 View를 블렌딩하여 화면에 그립니다.

![SurfaceView 구조](/images/wp591-surfaceview.png)

### TextView

TextView는 안드로이드 UI를 구성함에 있어 화면에 텍스트를 표시하는 기능을 담당하며, 안드로이드에서 제공하는 위젯 중 가장 많이 사용되는 위젯입니다. 텍스트 출력 기능을 가진 기본 위젯이므로, 텍스트와 연관된 기능을 포함하는 Button 또는 EditText의 부모 클래스이기도 합니다.

![TextView 예시](/images/wp591-textview.png)

TextView가 안드로이드에서 제공하는 가장 기본이 되는 위젯인 만큼 사용 방법도 간단합니다. 기본 속성을 사용하여 단순한 문자열(Plain Text)을 출력하는 용도라면, Layout 리소스에 TextView를 정의하고 "text" 속성에 출력될 문자열을 지정하면 됩니다.

하지만 간단하다고 해서 확장성이 부족한 것은 아닙니다. TextView는 View 클래스에서 상속받은 속성과 TextView 자신의 속성을 포함하여 아주 많은 종류의 속성을 제공합니다. 이러한 속성들을 사용하여 기본적으로 단순한 TextView에 아주 많은 확장성을 부여할 수 있습니다.

## ViewGroup

ViewGroup은 여러 개의 View들은 묶기 위한 요소로서 주로 View의 배치를 위해 사용됩니다. 앞서 설명했듯이 View 클래스를 상속받고 있기 때문에 View의 속성을 그대로 갖습니다. ViewGroup의 종류는 LinearLayout, RelativeLayout, FrameLayout 등이 있습니다.

그렇기 때문에 아래 그림과 같이 ViewGroup은 여러가지 Layout 형태를 갖으며 다양한 형태의 View 요소를 포함합니다.

![ViewGroup의 레이아웃 형태](/images/wp591-viewviewgroup-detail.png)

> ViewGroup에 LinearLayout, RelativeLayout, FrameLayout 가 포함되기 때문에 ViewGroup은 Layout과 용어적으로 동일하게 취급됩니다. 이는 구글 안드로이드 공식 문서 및 여타 레퍼런스 자료에서도 동일하게 취급됩니다.

### LinearLayout

View가 가로 또는 세로로 순차적으로 나열되는 Layout입니다. 다음과 같이 **android:orientation** 옵션을 통해 가로(**horizontal**) 또는 세로(**vertical**)로 설정할 수 있습니다. (기본값 : **horizontal**)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.android.tv.layouttest"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="텍스트1" />
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="텍스트2" />
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="텍스트3" />
</LinearLayout>
```

![가로 방향 LinearLayout 예시](/images/wp591-linear-layout-horizontal.png)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.android.tv.layouttest"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="텍스트1" />
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="텍스트2" />
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="텍스트3" />
</LinearLayout>
```

![세로 방향 LinearLayout 예시](/images/wp591-linear-layout-vertical.png)

### RelativeLayout

위치를 지정하지 않으면 View 가 Layout의 0, 0 위치에 계속 쌓이는 레이아웃으로, 최상위 부모 레이아웃 상대위치 또는 id를 참조해 특정 뷰에 대해 상대적인 위치를 지정할 수 있습니다.

다음과 같이 위치를 지정하지 않으면 Layout의 0,0 위치에 View가 계속 쌓이는 것을 확인할 수 있습니다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.android.tv.layouttest"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="텍스트1" />
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="텍스트2" />
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="텍스트3" />
</RelativeLayout>
```

![위치를 지정하지 않은 RelativeLayout 예시](/images/wp591-relative-layout-default.png)

위치를 지정하면 다음과 같이 위치가 지정됩니다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.alticast.android.tv.layouttest"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <!-- 부모의 오른쪽 -->
    <TextView
        android:id="@+id/tv1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentRight="true"
        android:text="텍스트1" />

    <!-- tv1의 아래 라인 -->
    <TextView
        android:id="@+id/tv2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/tv1"
        android:text="텍스트2" />

    <!-- tv1의 아래 라인 + 부모의 오른쪽 -->
    <TextView
        android:id="@+id/tv3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/tv1"
        android:layout_alignParentRight="true"
        android:text="텍스트3" />

    <!-- tv3의 왼쪽 라인 -->
    <TextView
        android:id="@+id/tv4"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_toLeftOf="@id/tv3"
        android:text="텍스트4" />

    <!-- 기본 -->
    <TextView
        android:id="@+id/tv5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="텍스트5" />

</RelativeLayout>
```

![위치를 지정한 RelativeLayout 예시](/images/wp591-relative-layout-positioned.png)

### FrameLayout

같은 위치에 자식 View들을 겹치게 한 뒤에, **VISIBLE/INVISIBLE/GONE** 등의 옵션으로 교차하면서 보여줄 수 있습니다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.alticast.android.tv.layouttest"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <FrameLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content">
        <TextView
            android:id="@+id/tv1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="가나다라" />

        <TextView
            android:id="@+id/tv2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:visibility="invisible"
            android:text="ABCDEFG" />
    </FrameLayout>
</RelativeLayout>
```

![첫 번째 FrameLayout 예시](/images/wp591-frame-layout-first.png)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.alticast.android.tv.layouttest"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <FrameLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content">
        <TextView
            android:id="@+id/tv1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:visibility="invisible"
            android:text="가나다라" />

        <TextView
            android:id="@+id/tv2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="ABCDEFG" />
    </FrameLayout>
</RelativeLayout>
```

![두 번째 FrameLayout 예시](/images/wp591-frame-layout-second.png)

> XML 레이아웃의 가장 아래쪽에 선언된 View 가 실제 Layout의 가장 위에 표시됩니다.

주로 버튼 클릭시 기존의 View를 숨기고 다른 View를 표시하는 탭기능에서 사용됩니다. 자바 코드에서는 **View.setVisibility("GONE");** 형식으로 사용한다.

- **visible**: View를 Layout에 표시합니다.
- **invisible**: View를 UI에 표시하지는 않지만, Layout의 크기만큼의 영역은 차지하고 있습니다.
- **gone**: View를 Layout에 표시되지 않으며, View가 영역도 차지 하지 않게 합니다.

## View/ViewGroup 속성

### View 속성

![Widget Cell](/images/wp591-widget-cell.png)

| 속성 | 설명 |
| --- | --- |
| **padding** | View와 View 안에 포함된 View의 간격을 설정합니다. 즉 안쪽 여백입니다.<br />**padding**를 사용하여 상하좌우에 대해 동일한 값을 한번에 지정해 줄수 있으며 **paddingTop/paddingBottom/paddingLeft/paddingRight**를 사용하여 각각 개별적으로 여백 설정이 가능합니다. |
| **min width, min height** | View가 가질 수 있는 최소 크기를 말합니다. |
| **focus** | View가 **focus**를 갖도록 설정하기 위해서는 **requestFocus()**를 호출해 주고, **focus**가 있는지 확인하기 위해서는 **isFocused()**를 호출해 줍니다. |
| **enable** | View가 경우에 따라 사용자 입력을 받을 수 없도록 하기 위해서는 **enable**속성을 사용합니다. **setEnabled()**로 View가 동작을 멈추도록 할 수 있습니다. |
| **selected** | View가 선택되었는지 나타내기 위해서는 **selected**속성이 사용됩니다. View가 선택되었다고 설정하고 싶으면 **setSelected()**를 이용합니다. |

### View/ViewGroup 속성

| 속성 | 설명 |
| --- | --- |
| **android:background** | View의 배경을 설정합니다. |
| **android:visibility** | View를 화면에 보여줄지 말지 선택하게 됩니다 옵션으로는 **VISIBLE/INVISIBLE/GONE** 이 있습니다.<br />– **visible**: View를 Layout에 표시합니다.<br />– **invisible**: View를 Layout에 표시하지는 않지만, View의 크기만큼의 영역은 차지하고 있습니다.<br />– **gone**: View를 Layout에 표시되지 않으며, View가 영역도 차지 하지 않게 합니다. |
| **android:clickable** | View가 touch를 받을 수 있도록 할지 여부를 설정하게 됩니다. **android:clickable="true"** 또는 **android:clickable="false"** 로 사용되어 집니다. |
| **android:focusable** | View가 focus를 가질 수 있는지 여부를 의미합니다. focus를 가진 다는 뜻은 키 이벤트가 발생했을 때 그 값을 받을 수 있는 상태가 되도록 만든다는 의미입니다. |

### View/ViewGroup ID 속성

- **고유 식별자 (android:id)**

  해당 View를 식별하기 위한 유일한 값입니다. XML안에 해당 id값을 문자열로 설정하게 되면 어플리케이션이 컴파일 될때 정수로써 레퍼런스 됩니다.

  - **Inflation**

    XML 레이아웃에 정의된 정보를 메모리 상에서 객체로 만드는 객체화 과정을 말합니다. 어플리 케이션이 시작될 때 이 과정을 거쳐 메모리 상에 만들어진 객체들을 참조하기 위해 ID를 지정합니다.

  - **ID속성은 자바 코드 상에서 [R.id](http://r.id/).[ID]와 같은 형태로 참조합니다.**

    ```xml
    <Button
    android:id="@+id/button"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:text="Layout"
    />
    ```

    버튼의 ID를 추가합니다.

    ```java
    public class SampleLayoutActivity extends Activity {
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState); setContentView(R.layout.main);
            Button button = (Button)findViewById(R.id.button);
        }
    }
    ```

    버튼의 ID를 참조합니다.

### View/ViewGroup 색상 지정

- XML레이아웃에서 색상을 지정할 때는 '#'기호를 앞에 붙인 후, ARGB(A : Alpha, R : RED, G : Green, B : Blue)의 순서대로 색상의 값을 기록합니다.
- 16진수 값을 지정할 때는 여러 가지 포맷을 사용할 수 있습니다.
  - #ff0000으로 지정하면 빨간 색이며, #00ff00으로 지정하면 녹색이 됩니다.
- 알파 값은 투명도를 조절할 수 있습니다.

### View/ViewGroup LayoutParams 속성

| 속성 | 설명 |
| --- | --- |
| **LayoutParams** | LayoutParams는 View의 자체의 속성이 아니라 View가 배치되는 Layout에 따라 달라지는 속성입니다.<br />LayoutParams로 설정된 속성은 View가 아니라 View가 배치된 Layout에서 사용합니다. |
| **layout_width**,<br />**layout_height** | View의 폭과 높이를 설정합니다. 미리 정의된 값을 넣을수도 있으며 사용자가 직접 크기를 입력할 수도 있습니다.<br />또한, **match_parent/wrap_content**과 같이 미리 지정된 속성값도 존재합니다.<br />– **match_parent**: 부모 View 의 크기만큼 width/height를 채웁니다.<br />– **wrap_content**: 내부에 있는 View 의 크기 만큼만 크기를 조정합니다. |
| **layout_margin** | 부모 View 와 자신과의 간격을 설정합니다. 즉, 바깥쪽 여백 입니다.<br />layout_margin를 사용하여 상하좌우에 대해 동일한 값을 한번에 지정해 줄수 있으며 **layout_marginTop/layout_marginBottom/layout_marginLeft/layout_marginRight**를 사용하여 각각 개별적으로 여백 설정이 가능합니다. |
| **layout_gravity** | View의 정렬 값을 나타냅니다. |

### View/ViewGroup 크기 표현 단위

| 단위 | 크기 | 설명 |
| --- | --- | --- |
| **px** | 픽셀 | 화면 픽셀 |
| **in** | 인치 | 1인치 크기의 물리적 길이 |
| **mm** | 밀리미터 | 1밀리미터 크기의 물리적 길이 |
| **em** | 텍스트 크기 | 글꼴과 상관 없이 동일한 텍스트 크기 표시 |
| **dp** | 밀도에 따른 크기(밀도 독립적 픽셀) | 160dpi 화면을 기준으로 한 픽셀 |
| **sp** | 폰트의 가변적 크기(축척 독립적 픽셀) | 가변 글꼴을 기준으로 한 픽셀로 dp와 유사하나 글꼴의 설정에 따라 달라진다. |
