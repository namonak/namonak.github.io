---
title: "[Kotlin] IntelliJ IDEA 설치(with 학생 인증)"
description: "IntelliJ IDEA의 설치와 학교 이메일을 이용한 학생 라이선스 인증 방법, 자주 쓰는 단축키를 정리합니다."
publishedAt: 2020-09-15
category: "kotlin"
tags: ["kotlin", "intellij", "intellij-idea", "코틀린"]
---

이번 글에서는 IntelliJ IDEA의 설치 및 라이센스 인증 방법에 대해서 설명합니다.

## IntelliJ IDEA 란?

IntelliJ IDEA는 JetBrains사에서 제작한 상용 자바 [통합 개발 환경](https://ko.wikipedia.org/wiki/%ED%86%B5%ED%95%A9_%EA%B0%9C%EB%B0%9C_%ED%99%98%EA%B2%BD)입니다. 줄여서 IntelliJ 혹은 IDEA로도 부릅니다.

2001년 첫 출시 때부터 편리한 [코드 컴플리션](https://en.m.wikipedia.org/wiki/Autocomplete#In_source_code_editors) 및 [리팩토링](https://en.m.wikipedia.org/wiki/Code_refactoring) 기능으로 수많은 Java 개발자들이 IDEA로 유입되었으며, 2009년에 무료 커뮤니티 에디션이 나온 이후에는 본격적으로 Java 개발을 위해 많이 사용되기 시작합니다. IntelliJ는 Java와 Swing을 이용해서 구현되었으며, 플러그인 개발에 사용되는 언어 역시 Java 입니다. 2019년 DeveloperWeek에서 '가장 혁신적인 코딩 툴'로 선정한 바 있으며, 윈도우/macOS/리눅스를 모두 지원합니다.

IntelliJ는 이클립스와 다르게 워크스페이스 개념이 없고, 프로젝트 생성 시 기존에 생성된 빈 디렉토리에 프로젝트를 디렉토리화 시키는 방식입니다. 프로젝트 안에 서브 프로젝트를 생성하는 것도 가능한데, 이러한 서브 프로젝트는 '모듈'이라고 칭합니다. 또한 이클립스의 Project-Specific JRE는 IntelliJ IDEA의 Project SDK와 대응됩니다.

또한 자체 GUI GIT이 내장되어 있어, 별도의 GIT 클라이언트를 설치하지 않고도 간편한 버전 관리가 가능하다.

## 라이센스에 관하여

IntelliJ IDEA는 상업용인 Ultimate 버전과 무료 버전인 Community 버전으로 구분됩니다. 두 버전의 차이는 아래와 같습니다.<br />
Ultimate 버전을 사용하기 위해서는 연간 구독을 신청해야 하기 때문에 비용이 지불됩니다.<br />
**다만, ac.kr 형태의 학교 이메일이 있거나 GitHub 학생 인증(Student Pack)이 되어 있다면 JetBrains 계정과 연동하여 Ultimate 버전을 무료로 이용할 수 있습니다.**

![IntelliJ IDEA Ultimate와 Community 버전 비교](/images/wp209-license-editions.png)

### 학생 인증 및 설치 방법(ac.kr 학교 이메일이 있는 경우)

- 젯브레인스(JetBrains) 사이트에 접속하여 학생 인증을 위한 페이지로 접속합니다. → [https://www.jetbrains.com/](https://www.jetbrains.com/)
- Support > FREE LICENSE PROGRAMS > "Academic Licensing" 클릭

  ![JetBrains Academic Licensing 메뉴](/images/wp209-academic-licensing.png)

- 상단탭에서 "For students and teachers" 클릭 후 웹 페이지 아래 방향으로 이동하여 "Apply Now" 클릭

  ![For students and teachers와 Apply Now 버튼](/images/wp209-for-students-and-teachers.png)

- "Apply with:" 탭에서 "UNIVERSITY EMAIL ADDRESS" 탭을 선택한 뒤에 인증을 위한 정보를 입력합니다.

  ![University Email Address 인증 양식](/images/wp209-university-email-address.png)

- 다음과 같은 화면과 함께 학교 이메일주소로 인증 메일을 받아 볼 수 있습니다.

  ![학교 이메일 인증 메일 발송 안내](/images/wp209-email-verification-sent.png)

- 입력한 학교 이메일 주소로 로그인하여 인증메일을 확인 후 "Confirm Request"를 클릭합니다.

  ![Confirm Request 인증 메일](/images/wp209-confirm-request.png)

- "JetBrains Account" 사이트 창이 열리고, 맨 아래로 스크롤 후 활성화된 "I Accept"를 클릭합니다.

  ![JetBrains Account 약관 동의](/images/wp209-accept-agreement.png)

- JetBrains 회원 가입이 되어있지 않은 경우 우측 하단에 이메일을 입력 후 "Sign Up"을 클릭하여 회원 가입을 진행 합니다.

  ![JetBrains Account Sign Up](/images/wp209-sign-up.png)

- 회원 가입 완료 문구를 확인 후 가입한 이메일에 로그인하여 확인합니다. 이메일 내용중 "Confirm your account" 클릭합니다.

  ![Confirm your account 인증 메일](/images/wp209-confirm-account.png)

- 추가 정보를 입력하여 회원 가입을 마무리 합니다.

  ![JetBrains Account 추가 정보 입력](/images/wp209-account-information.png)

- 이후 로그인 하여 확인 해 보면 학생 인증이 완료되어 라이센스가 발급 된 것을 확인할 수 있습니다.

  ![발급된 학생 라이선스](/images/wp209-license-issued.png)

  ![학생 라이선스 상세 정보](/images/wp209-license-details.png)

- Ultimate 버전을 다운로드 하여 설치 합니다. → [https://www.jetbrains.com/idea/download/#section=windows](https://www.jetbrains.com/idea/download/#section=windows)<br />
  (자신의 OS 맞게 다운로드하시기 바랍니다. 본 문서에서는 Windows르 기본으로 합니다. 자세한 설치 내용은 생략합니다.)

  ![IntelliJ IDEA Ultimate 다운로드 화면](/images/wp209-idea-download.png)

- IntelliJ IDEA를 설치 후 최초 실행을 하면 아래와 같은 라이센스 인증 창이 실행됩니다. "Get license from:" 에서 "JB Account"를 클릭하고 이전 과정에서 생성한 계정 정보를 입력하여 인증을 완료합니다.

  ![JB Account를 이용한 IntelliJ IDEA 라이선스 인증](/images/wp209-jb-account-license.png)

## 유용한 단축키

IntelliJ IDEA의 단축키 정보는 [IntelliJ IDEA keyboard shortcuts](https://www.jetbrains.com/help/idea/mastering-keyboard-shortcuts.html)에 자세히 정리되어 있습니다. 그 중에서 자주 사용되는 단축키 몇개를 다음과 같이 정리하였습니다.

| 단축키 | 설명 | 사용 예 |
| --- | --- | --- |
| F2 | 에러 순서대로 찾기 | Java 클래스를 Kotlin 클래스로 자동 변환 후 컴파일을 수행하면 무수한 에러가 발생합니다.<br />이때 에러가 발생한 Kotlin 클래스 파일을 클릭 후 F2를 입력하면 에러를 순서대로 찾아가며 에러를 수정할 수 있습니다. |
| Shift + Shift (double shift) | Search Everywhere | 프로젝트에 등록된 모듈(클래스)을 검색합니다. 클래스, 메소드, 프로퍼티, 심볼 등을 검색 할 수 있습니다. |
| Ctrl + B | Go to declaration | 커서가 위치한 심볼의 선언부로 이동합니다. |
| Ctrl + Alt + Left/Right | 이전/이후 포커싱 이동 | 현재를 기준으로 이전/이후에 탐색했던 코드 위치로 이동합니다. |
| Ctrl + G | 라인 찾아가기 | Kotlin 컴파일러에서는 에러 발생시 아래와 같이 에러가 발생한 클래스의 행/열 번호를 모두 출력합니다.<br /><br />`HScreenConfiguration.kt:28:5: error: property must be initialized or be abstract`<br /><br />이런 경우 "Ctrl + G" 입력 후 "28:5"를 입력하여 에러가 발생한 클래스의 정확한 코드 위치로 이동하여 확인 할 수 있습니다. |
| Ctrl + R | 문자 치환(Replacement) | 설명 그대로 문자열을 치환할때 사용합니다.<br />**보통 Java Getter/Setter가 Kotlin 프로퍼티로 정상적으로 변환되지 않은 경우 자주 사용됩니다.**<br />**프로젝트 설정시에 연관 클래스를 모듈로 등록해 두면 Java to Kotlin 변환기에서 클래스 간이 연관성을 참조 후, Java Getter/Setter를 인식하여 Kotlin 프로퍼티로 정상적으로 변환시키지만 그렇지 않은 경우 문자 치환 등을 이용하여 수동으로 변환해야 합니다.** |
