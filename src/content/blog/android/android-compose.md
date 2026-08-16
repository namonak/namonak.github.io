---
title: "[Android] Android Compose 소개"
description: "Jetpack Compose의 기본 개념과 Android Studio에서 Compose 프로젝트를 만들고 미리보기로 확인하는 방법을 소개합니다."
publishedAt: 2024-02-29
category: "android"
tags: ["android", "jetpack-compose", "kotlin"]
---

Android 개발 환경은 계속해서 진화하고 있으며, 이러한 변화의 최전선에는 Jetpack Compose가 있습니다. Compose는 Android UI를 선언적으로 구성하는 새로운 방법을 제공하여 개발자들이 더 직관적이고 유연하게 앱을 설계할 수 있게 해줍니다. 이 글에서는 Compose의 기본 개념부터 시작하여, Composable 함수, 주요 레이아웃 패턴을 다룹니다.

## Android Compose 프로젝트 생성

1. **Welcome to Android Studio** 대화상자에서 **New Project**를 선택합니다.
2. **New Project** 대화상자에서 **Empty Activity**를 선택한 다음 **Next**를 클릭합니다.
3. **Name** 필드에 `AndroidCompose`를 입력한 다음 **Minimum SDK** 필드에서 최소 API 수준 24(Nougat)를 선택하고 **Finish**를 클릭합니다.

프로젝트가 생성되면 기본적으로 아래와 같은 `MainActivity.kt` 코드가 생성됩니다.

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AndroidComposeTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Greeting("Android")
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    AndroidComposeTheme {
        Greeting("Android")
    }
}
```

### MainActivity 클래스

`MainActivity`는 애플리케이션의 진입점입니다. 이 클래스는 `ComponentActivity`를 상속받아, Android의 생명주기와 관련된 기능을 수행합니다. `onCreate` 메서드는 액티비티가 생성될 때 호출되며, UI의 초기 설정을 담당합니다.

```kotlin
setContent {
    AndroidComposeTheme {
        // UI 컴포넌트 정의
    }
}
```

`setContent` 블록 내부에서는 Compose를 사용하여 UI를 정의합니다. `AndroidComposeTheme`을 사용하면 애플리케이션 전반에 걸쳐 일관된 디자인 테마를 적용할 수 있습니다.

### Surface 컴포넌트

```kotlin
Surface(
    modifier = Modifier.fillMaxSize(),
    color = MaterialTheme.colorScheme.background
) {
    Greeting("Android")
}
```

`Surface` 컴포넌트는 UI의 배경을 설정하는 컨테이너 역할을 합니다. 여기서 `Modifier.fillMaxSize()`는 해당 컴포넌트를 화면 전체 크기로 만듭니다. `color` 속성을 통해 배경색을 지정할 수 있으며, `MaterialTheme.colorScheme.background`를 사용하여 테마에 정의된 배경색을 적용합니다.

### Greeting 함수

```kotlin
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}
```

`Greeting` 함수는 인사말을 화면에 표시하는 컴포저블 함수입니다. `@Composable` 어노테이션은 이 함수가 Compose UI 라이브러리의 일부임을 나타냅니다. `name` 파라미터를 통해 동적인 인사말을 생성할 수 있으며, `modifier`를 사용하여 스타일을 커스터마이즈할 수 있습니다.

### GreetingPreview 함수

```kotlin
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    AndroidComposeTheme {
        Greeting("Android")
    }
}
```

`@Preview` 어노테이션을 사용한 `GreetingPreview` 함수는 Android Studio의 디자인 툴에서 해당 컴포저블 함수의 미리보기를 제공합니다. 이를 통해 개발자는 코드 변경 사항을 실시간으로 시각적으로 확인할 수 있습니다.

아래와 같이 Android Studio 우측 상단의 ![Split 버튼](/images/android-studio-split.png) Split 버튼을 클릭하면, @Preview 어노테이션의 적용된 GreetingPreview 함수의 변경 내용을 실시간으로 확인가능합니다.

![GreetingPreview 함수의 Android Studio 미리보기](/images/android-compose-preview.png)

## Android Jetpack Compose 기초

### Composable 함수란?

[Composable](https://developer.android.com/reference/kotlin/androidx/compose/runtime/Composable) 함수는 Jetpack Compose를 통해 UI를 구성하는 데 사용되는 특별한 종류의 함수입니다. `@Composable` 어노테이션이 붙은 함수는 UI 요소나 레이아웃을 정의하며, 이를 통해 개발자는 선언적 방식으로 UI를 구성할 수 있게 됩니다. 즉, UI의 상태와 구성을 직접 선언함으로써, 상태 변화에 따라 UI가 자동으로 업데이트되는 동적인 인터페이스를 손쉽게 구현할 수 있습니다.

### @Composable과 @Preview 어노테이션

- `@Composable`: Composable 함수를 정의할 때 사용하는 어노테이션입니다. 이를 통해, 해당 함수가 UI 구성 요소를 반환하도록 Compose 컴파일러에 지시합니다.
- `@Preview`: 개발 중인 Compose UI를 안드로이드 스튜디오의 미리보기 패널에서 시각적으로 확인할 수 있게 해주는 어노테이션입니다. 다양한 디바이스 크기나 테마 설정에서의 UI 디자인을 손쉽게 확인하고, 개선할 수 있게 합니다.
