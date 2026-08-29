---
title: "[Android] Layout Mechanism 정리"
description: "Android View가 그려지는 과정과 View 생명주기의 측정, 배치, 그리기 단계를 정리합니다."
publishedAt: 2021-02-18
category: "android"
tags: ["android", "view", "layout"]
---

## View가 그려지는 과정

안드로이드의 View 들은 계층구조로 구성됩니다. 먼저 Activity가 포커스를 얻게되면 안드로이드 시스템은 Activity에게 루트 노드를 요청합니다.

> 보통 루트 노드는 MainActivity 클래스의 `onCreate()` 메소드 내부에서 [`setContentView()`](https://developer.android.com/reference/android/view/Window#setContentView(android.view.View,%20android.view.ViewGroup.LayoutParams)) 메소드를 통해 지정되거나, XML 레이아웃의 최상위 레이아웃이 지정됩니다.

아래의 그림에서 좌측은 레이아웃 XML로 작성된 View 구조의 예시이며, 우측은 레이아웃이 구성되는 트리구조를 나타냅니다.

- View는 포커스를 얻으면 레이아웃을 그리도록 요청하는데, 우측에 트리 구조를 기준으로 [전위 순회](https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%A6%AC_%EC%88%9C%ED%9A%8C#%EC%A0%84%EC%9C%84_%EC%88%9C%ED%9A%8C) 방식으로 그려집니다.
- 부모 View는 자식 View가 그려지기전에 그려지고, 형제 View는 전위 순회 방식에 따라 순서대로 그려지게 됩니다.

![레이아웃 XML과 View 트리 구조](/images/android-layout-mechanism-view-hierarchy.png)

전위 순회 순서로 레이아웃이 그려질때 다음과 같이 3가지 과정을 거치게 됩니다.

- Measure: View의 크기를 정하는 과정
- Layout: View의 위치를 정하는 과정
- Draw: 최종적으로 View를 캔버스위에 실제 그리는 과정

### `measure(int widthMeasureSpec, int heightMeasureSpec)`

부모노드에서 자식노드를 경유하며 실행되며, View의 크기를 알아내기 위해 호출됩니다. 실제 View의 크기 측정은 `onMeasure(int, int)`를 통해 이뤄집니다. `measure(int, int)`의 내부에서는 `onMeasure(int, int)`를 호출함으로써 View의 크기를 알아냅니다. 측정 과정에서는 부모 View와 자식 View간의 크기 정보를 전달하기 위해 다음의 2가지의 클래스를 사용합니다.

#### `ViewGroup.LayoutParams`

자식 View가 부모 View에게 자신이 어떻게 측정되고 위치를 정할지 요청하는데 사용됩니다. ViewGroup의 sub class에 따라 다른 ViewGroup.LayoutParams의 sub class가 존재할 수 있습니다. 예를 들어 ViewGroup의 sub class인 RelativeLayout 경우 자신만의 ViewGroup.LayoutParams의 sub class는 자식 View 를 수평적으로 또는 수직적으로 가운데정렬을 할 수 있습니다.

- 정확한 수치 (ex. `android:layout_width="320dp"`)
- MATCH_PARENT (ex. `android:layout_width="match_parent"`)
- WRAP_CONTENT (ex. `android:layout_width="wrap_content"`)

#### `ViewGroup.MeasureSpec`

부모 View가 자식 View에게 요구사항을 전달하는데 사용됩니다.

- UNSPECIFIED - 부모 View는 자식 View가 원하는 치수대로 결정
- EXACTLY - 부모 View가 자식 View에게 정확한 크기를 강요
- AT MOST - 부모 View가 자식 View에게 최대 크기를 강요

### `layout(int l, int t, int r, int b)`

부모노드에서 자식노드를 경유하며 실행되며, View와 자식 View 들의 크기와 위치를 할당할 때 사용됩니다. `measure(int, int)`에 의해 각 View에 저장된 크기를 사용하여 위치를 지정합니다. 내부적으로 `onLayout()`를 호출하고 `onLayout()`에서 실제 View의 위치를 할당하는 구조로 되어있습니다. View의 `measure()`가 반환할 때, View의 `getMeasureWidth()`와 `getMeasureHeight()` 값이 설정됩니다. 만약 자식 View 측정값의 합이 너무 크거나 작을 경우 다시 `measure()` 메서드를 호출하여 크기를 다시 측정합니다.

> `measure()`와 `layout()` 메서드는 내부적으로 각각 `onMeasure()`와 `onLayout()` 메서드를 호출합니다. 이것은 final로 선언된 `measure()`와 `layout()` 대신 `onMeasure()`와 `onLayout()`을 재구현(override)할 것을 장려하기 위함입니다.

![View 생명주기 단계](/images/android-layout-mechanism-view-lifecycle.png)

## View LifeCycle

### Constructor

모든 View는 생성자에서 출발합니다. 생성자에서 초기화를 하고, default 값을 설정합니다. View는 초기설정을 쉽게 세팅하기 위해서 `AttributeSet`이라는 인터페이스를 지원합니다. 먼저 `attrs.xml` 파일을 만들고 이것을 부름으로써 View의 설정값을 쉽게 설정할 수 있습니다.

### onAttachedToWindow

부모 View가 `addView(childView)`를 호출하고 나서 자식 View는 윈도우에 붙게 됩니다(attached). 이때부터 View의 id 를 통해 접근할 수 있습니다.

### onMeasure

View의 크기를 측정하는 단계입니다. 대부분의 경우 레이아웃에 맞게 특정크기를 가져야합니다.

- View가 원하는 사이즈를 계산합니다.
- `MeasureSpec`에 따라 크기와 mode를 가져옵니다.

```java
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    int widthMode = MeasureSpec.getMode(widthMeasureSpec);
    int widthSize = MeasureSpec.getSize(widthMeasureSpec);
    int heightMode = MeasureSpec.getMode(heightMeasureSpec);
    int heightSize = MeasureSpec.getSize(heightMeasureSpec);
}
```

- `MeasureSpec`의 mode를 체크하여 View의 크기를 적용합니다.

```java
int width;

if (widthMode == MeasureSpec.EXACTLY) {
    width = widthSize;
} else if (widthMode == MeasureSpec.AT_MOST) {
    width = Math.min(desiredWidth, widthSize);
} else {
    width = desiredWidth;
}
```

### onLayout

이 단계에서 View의 크기와 위치가 할당됩니다.

### onDraw

View를 실제로 그리는 단계입니다. `Canvas`와 `Paint` 객체를 사용하여 요청된 내용을 그리게 됩니다. `Canvas` 객체는 `onDraw` 메서드의 파라미터로 제공되며, `Canvas`을 이용하여 View의 모양을 그립니다. 또한 `Paint` 객체는 View의 색을 그립니다.

### draw

`onDraw` 메서드를 호출시 많은 시간이 소요됩니다. Scroll 또는 Swipe 등을 할 경우 View는 다시 `onDraw`와 `onLayout`을 다시 호출하게 됩니다. 따라서 `onDraw` 메서드 내에서 객체할당을 피하고 한 번 할당한 객체를 재사용할 것을 권장합니다.

> 다시 말해 `onDraw` 메서드를 override 할때는 내부에서는 draw에 동작과 관련된 부분만 처리하고, 실제 이미지를 그릴때 사용되는 `Canvas`, `Drawable`, `Paint`, `Bitmap`과 같은 객체는 별도의 메서드로 구분하여 구현하는 것을 권장합니다.

### View Update

View Lifecycle을 보면 View를 다시 그리도록 하는 `invalidate()`와 `requestLayout()` 메서드를 볼 수 있습니다. 이것은 런타임에 View를 다시 그릴 수 있게 합니다. 각각의 사용 용도는 아래와 같습니다.

#### invalidate()

단순히 View를 다시 그릴때 사용됩니다. 예를 들어 View의 text 또는 color가 변경되거나, touch interactivity가 발생할 때 `onDraw()` 메서드를 재호출하면서 View를 업데이트합니다.

#### requestLayout()

`measure()` 과정부터 다시 View를 그립니다. View의 사이즈가 변경될 때 View의 사이즈를 다시 측정해야하기 때문에 View Lifecycle에 따라 `onMeasure()` 단계에서부터 View를 다시 그립니다.

### Animation

View의 animation은 frame단위의 프로세스입니다. 예를 들어 View가 점점 커지는 Animation을 갖는다고 가정하면 Frame 단위로 View가 점점 커지게 됩니다. 그리고 각 단계마다 `invalidate()`를 호출하여 View를 그립니다.

> INFO: 애니메이션에 사용되는 클래스는 대표적으로 `ValueAnimator`입니다.

```java
ValueAnimator animator = ValueAnimator.ofInt(0, 100);
animator.setDuration(1000);
animator.setInterpolator(new DecelerateInterpolator());

animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
    public void onAnimationUpdate(ValueAnimator animation) {
        int newRadius = (int) animation.getAnimatedValue();
    }
});
animator.start();
```
