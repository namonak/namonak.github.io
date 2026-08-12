---
title: "[Web Development] Window, Document, Navigator, Location, History 객체 정리"
description: "브라우저 환경의 window, document, navigator, location, history 객체의 역할과 주요 API를 예제로 정리합니다."
publishedAt: 2024-06-03
category: "web"
tags: ["javascript", "browser-api", "dom"]
---

웹 개발을 하면서 자주 접하게 되는 중요한 객체들로는 [`window`](https://www.w3schools.com/jsref/obj_window.asp), [`document`](https://www.w3schools.com/jsref/dom_obj_document.asp), [`navigator`](https://www.w3schools.com/jsref/obj_navigator.asp), [`location`](https://www.w3schools.com/jsref/obj_location.asp), [`history`](https://www.w3schools.com/jsref/obj_history.asp)가 있습니다. 이 객체들은 웹 브라우저와 상호 작용하는 데 필수적인 요소들로, 각각의 역할과 기능이 명확히 구분되어 있습니다. 이번 글에서는 각 객체의 개념과 주요 속성, 메서드를 예제 코드와 함께 정리합니다.

## Window 객체

### 개념

[`window`](https://www.w3schools.com/jsref/obj_window.asp) 객체는 브라우저 창 또는 프레임을 나타내는 최상위 객체입니다. 모든 전역 객체와 함수는 `window` 객체의 속성으로 간주됩니다. 따라서 전역 변수는 자동으로 `window` 객체의 속성이 됩니다.

### 주요 속성 및 메서드

#### 속성

- [`window.innerHeight`](https://www.w3schools.com/jsref/prop_win_innerheight.asp): 브라우저 창의 뷰포트 높이
- [`window.innerWidth`](https://www.w3schools.com/jsref/prop_win_innerwidth.asp): 브라우저 창의 뷰포트 너비
- [`window.location`](https://www.w3schools.com/jsref/prop_win_location.asp): 현재 문서의 위치(URL)를 나타내는 객체
- [`window.navigator`](https://www.w3schools.com/jsref/prop_win_navigator.asp): 브라우저의 정보를 제공하는 객체

#### 메서드

- [`window.alert(message)`](https://www.w3schools.com/jsref/met_win_alert.asp): 알림 창을 띄웁니다.
- [`window.open(url, name, specs)`](https://www.w3schools.com/jsref/met_win_open.asp): 새 브라우저 창을 엽니다.
- [`window.close()`](https://www.w3schools.com/jsref/met_win_close.asp): 현재 브라우저 창을 닫습니다.

### 예제 코드

```js
// 브라우저 창의 크기 출력
console.log("Window height: " + window.innerHeight);
console.log("Window width: " + window.innerWidth);

// 알림 창 띄우기
window.alert("Hello, world!");

// 새 창 열기
window.open("https://www.example.com", "_blank");
```

## Document 객체

### 개념

[`document`](https://www.w3schools.com/jsref/dom_obj_document.asp) 객체는 현재 로드된 HTML 문서를 나타내며, 문서의 내용을 프로그래밍적으로 접근하고 조작할 수 있게 해줍니다.

### 주요 속성 및 메서드

#### 속성

- [`document.title`](https://www.w3schools.com/jsref/prop_doc_title.asp): 현재 문서의 제목
- [`document.body`](https://www.w3schools.com/jsref/prop_doc_body.asp): 문서의 `<body>` 요소에 접근
- [`document.URL`](https://www.w3schools.com/jsref/prop_doc_url.asp): 현재 문서의 URL

#### 메서드

- [`document.getElementById(id)`](https://www.w3schools.com/jsref/met_document_getelementbyid.asp): 주어진 id 속성을 가진 요소를 반환합니다.
- [`document.createElement(tagName)`](https://www.w3schools.com/jsref/met_document_createelement.asp): 주어진 태그 이름을 가진 새로운 요소를 만듭니다.
- [`document.querySelector(selector)`](https://www.w3schools.com/jsref/met_document_queryselector.asp): 첫 번째로 일치하는 셀렉터를 반환합니다.

### 예제 코드

```js
// 문서 제목 변경
document.title = "New Title";

// id가 "myElement"인 요소를 가져오기
var element = document.getElementById("myElement");
console.log(element);

// 새로운 div 요소 생성 및 추가
var newDiv = document.createElement("div");
newDiv.textContent = "Hello, Document!";
document.body.appendChild(newDiv);
```

## Navigator 객체

### 개념

[`navigator`](https://www.w3schools.com/jsref/obj_navigator.asp) 객체는 브라우저의 정보와 상태에 대한 정보를 제공합니다. 사용자의 브라우저와 관련된 많은 정보에 접근할 수 있습니다.

### 주요 속성 및 메서드

#### 속성

- [`navigator.userAgent`](https://www.w3schools.com/jsref/prop_nav_useragent.asp): 브라우저의 사용자 에이전트 문자열
- [`navigator.language`](https://www.w3schools.com/jsref/prop_nav_language.asp): 브라우저의 언어 설정
- [`navigator.onLine`](https://www.w3schools.com/jsref/prop_nav_online.asp): 브라우저가 온라인 상태인지 여부를 나타내는 불리언 값

#### 메서드

- [`navigator.geolocation.getCurrentPosition(success, error)`](https://www.w3schools.com/jsref/prop_nav_geolocation.asp): 사용자의 현재 위치를 가져옵니다.

### 예제 코드

```js
// 브라우저 정보 출력
console.log("User Agent: " + navigator.userAgent);
console.log("Language: " + navigator.language);
console.log("Online: " + navigator.onLine);

// 사용자의 현재 위치 가져오기
navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
  },
  function (error) {
    console.error("Error Code: " + error.code);
  },
);
```

## Location 객체

### 개념

[`location`](https://www.w3schools.com/jsref/obj_location.asp) 객체는 현재 문서의 URL을 나타내며, URL을 변경하거나 새 문서로 이동할 수 있는 방법을 제공합니다.

### 주요 속성 및 메서드

#### 속성

- [`location.href`](https://www.w3schools.com/jsref/prop_loc_href.asp): 현재 페이지의 전체 URL
- [`location.hostname`](https://www.w3schools.com/jsref/prop_loc_hostname.asp): 웹 호스트의 이름
- [`location.pathname`](https://www.w3schools.com/jsref/prop_loc_pathname.asp): 호스트 뒤의 경로 부분
- [`location.search`](https://www.w3schools.com/jsref/prop_loc_search.asp): URL의 쿼리 문자열 부분

#### 메서드

- [`location.assign(url)`](https://www.w3schools.com/jsref/met_loc_assign.asp): 지정된 URL로 이동합니다.
- [`location.reload()`](https://www.w3schools.com/jsref/met_loc_reload.asp): 현재 문서를 다시 로드합니다.
- [`location.replace(url)`](https://www.w3schools.com/jsref/met_loc_replace.asp): 현재 URL을 새 URL로 대체합니다.

### 예제 코드

```js
// 현재 URL 출력
console.log("Current URL: " + location.href);

// URL 변경
location.href = "https://www.example.com";

// 페이지 새로고침
location.reload();

// URL 대체
location.replace("https://www.example.com/new-page");
```

## History 객체

### 개념

[`history`](https://www.w3schools.com/jsref/obj_history.asp) 객체는 브라우저의 세션 기록을 나타내며, 사용자가 방문한 페이지의 목록을 유지합니다. 이 객체를 사용하여 페이지 탐색을 제어할 수 있습니다.

### 주요 속성 및 메서드

#### 속성

- [`history.length`](https://www.w3schools.com/jsref/prop_his_length.asp): 세션 기록에 있는 항목 수

#### 메서드

- [`history.back()`](https://www.w3schools.com/jsref/met_his_back.asp): 세션 기록에서 이전 페이지로 이동합니다.
- [`history.forward()`](https://www.w3schools.com/jsref/met_his_forward.asp): 세션 기록에서 다음 페이지로 이동합니다.
- [`history.go(delta)`](https://www.w3schools.com/jsref/met_his_go.asp): 세션 기록에서 지정한 상대 위치로 이동합니다.

### 예제 코드

```js
// 세션 기록의 길이 출력
console.log("History length: " + history.length);

// 이전 페이지로 이동
history.back();

// 다음 페이지로 이동
history.forward();

// 세션 기록에서 두 페이지 뒤로 이동
history.go(-2);
```

### 핵심 요약

- [`window`](https://www.w3schools.com/jsref/obj_window.asp) 객체는 브라우저 창을 나타내며, 전역 객체와 함수에 접근할 수 있습니다.
- [`document`](https://www.w3schools.com/jsref/dom_obj_document.asp) 객체는 현재 로드된 HTML 문서를 나타내며, 문서 내용을 조작할 수 있습니다.
- [`navigator`](https://www.w3schools.com/jsref/obj_navigator.asp) 객체는 브라우저의 정보와 상태에 대한 정보를 제공합니다.
- [`location`](https://www.w3schools.com/jsref/obj_location.asp) 객체는 현재 문서의 URL을 나타내며, URL을 변경하거나 새 문서로 이동할 수 있습니다.
- [`history`](https://www.w3schools.com/jsref/obj_history.asp) 객체는 브라우저의 세션 기록을 관리하며, 페이지 탐색을 제어할 수 있습니다.
