---
title: "[Ubuntu] Python 버전 변경하는 방법"
description: "Ubuntu에서 update-alternatives로 Python 실행 명령을 등록·선택하던 방법과 시스템 Python 변경 시 주의점을 정리합니다."
publishedAt: 2022-11-16
updatedAt: 2026-08-24
category: "linux"
tags: ["ubuntu", "python", "update-alternatives", "linux"]
---

## 소개

Ubuntu에서 여러 Python 버전을 운영할 때 `update-alternatives`를 이용해 `python` 명령의 심볼릭 링크를 관리할 수 있습니다. `update-alternatives`는 Debian 계열 시스템에서 대체 가능한 실행 파일을 관리하는 도구이며, Python 외에 JDK 같은 도구에도 사용할 수 있습니다.

> 보충: 이 글의 명령은 Ubuntu 16.04·Python 2가 널리 쓰이던 시기의 기록입니다. 현대 Ubuntu에서는 시스템 도구가 특정 Python 버전과 `/usr/bin/python3`에 의존할 수 있으므로, 시스템 전역 `/usr/bin/python`을 바꾸기 전에 배포판 문서와 의존성을 반드시 확인해야 합니다. 프로젝트별 버전 관리는 가상 환경이나 해당 프로젝트의 도구를 우선 검토합니다.

## 현재 사용 중인 Python 실행 위치 확인

`which`로 현재 셸이 사용하는 실행 파일 위치를 확인할 수 있습니다.

```bash
$ which python
/usr/bin/python
```

`/usr/bin/python`이 심볼릭 링크인지 확인하려면 다음 명령을 사용합니다.

```bash
$ ls -al /usr/bin/python
lrwxrwxrwx 1 root root 24 6월 24 15:55 /usr/bin/python -> /usr/bin/python2.7
```

설치된 Python 실행 파일은 다음처럼 살펴볼 수 있습니다.

```bash
$ ls /usr/bin/ | grep python
python
python2
python2.7
python3
python3.6
python3.7
...
```

## update-alternatives를 이용한 등록과 변경

### 등록 여부 확인

```bash
$ sudo update-alternatives --config python
update-alternatives: error: no alternatives for python
```

등록된 대체 항목이 없다면 다음 형식으로 등록합니다.

```text
sudo update-alternatives --install [symbolic link path] python [real path] priority
```

예시는 다음과 같습니다.

```bash
$ sudo update-alternatives --install /usr/bin/python python /usr/bin/python2.7 1
$ sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.7 2
```

다시 `update-alternatives --config python`을 실행하면 등록된 버전과 우선순위를 보고 선택할 수 있습니다.

```text
There are 3 choices for the alternative python (providing /usr/bin/python).

  Selection    Path                    Priority   Status
------------------------------------------------------------
  0            /usr/bin/python3.7      2          auto mode
* 1            /usr/bin/python2.7      1          manual mode
  2            /usr/bin/python3.6      1          manual mode
  3            /usr/bin/python3.7      2          manual mode

Press <enter> to keep the current choice[*], or type selection number:
```

숫자를 입력해 원하는 대체 실행 파일을 선택할 수 있습니다. 변경 전후에는 `python --version`, 프로젝트 테스트, 배포판 도구의 동작을 확인해야 합니다.
