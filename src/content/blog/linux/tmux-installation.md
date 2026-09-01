---
title: "[Linux] tmux 설치 방법"
description: "tmux의 세션·윈도우·패인 개념과 Ubuntu에서 소스를 내려받아 빌드·설치하는 절차를 정리합니다."
publishedAt: 2020-08-21
category: "linux"
tags: ["tmux", "terminal", "linux", "ubuntu", "developer-tools"]
draft: false
---

`tmux`는 하나의 터미널에서 여러 프로그램을 실행하고, 세션을 분리(detach)했다가 나중에 다시 연결할 수 있게 해 주는 터미널 멀티플렉서입니다. 여러 터미널 창을 오가는 대신 세션을 유지하고 싶을 때 유용합니다.

## 기본 구성

- **session**: `tmux` 실행의 단위입니다. 하나의 세션에는 여러 window를 둘 수 있습니다.
- **window**: 터미널 화면 단위입니다. 브라우저의 탭처럼 생각할 수 있습니다.
- **pane**: 하나의 window를 나누어 만든 영역입니다.
- **status bar**: 화면 아래에 표시되는 상태 표시줄입니다.

## 소스 빌드로 설치

이 글은 2020년 당시 `tmux 3.1b`를 소스에서 빌드해 설치한 기록입니다. 당시 설정 파일 호환성을 위해 2.6 이상 사용을 권장했습니다.

### 의존성 설치

```bash
sudo apt install libevent-dev libcurses-ocaml-dev
```

### 내려받기와 빌드

릴리스 파일은 [tmux GitHub releases](https://github.com/tmux/tmux/releases)에서 확인할 수 있습니다.

```bash
wget https://github.com/tmux/tmux/releases/download/3.1b/tmux-3.1b.tar.gz
tar zxf tmux-3.1b.tar.gz
cd tmux-3.1b
./configure
make -j8
sudo make install
```

### 설치 확인

```bash
tmux -V
```

예시 출력은 다음과 같습니다.

```text
tmux 3.1b
```

> 참고: 패키지 이름과 최신 tmux 버전은 배포판·시점에 따라 달라질 수 있습니다. 이 명령은 원문이 작성된 당시의 Ubuntu 환경을 보존한 것입니다.
