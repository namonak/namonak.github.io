---
title: "[Ubuntu 16.04] VIM 8.2 설치"
description: "Ubuntu 16.04 LTS에서 PPA를 이용해 VIM 8.2를 설치하고 삭제하는 방법을 정리합니다."
publishedAt: 2020-12-06
category: "linux"
tags: ["ubuntu", "vim"]
---

보통은 Ubuntu 16.04 LTS에서 `apt-get`을 이용해 VIM을 설치하면 7.4 버전으로 설치됩니다. VIM에서 YCM 등의 플러그인을 사용하기 위해서는 8.1 이상이 설치되어야 합니다.

다음과 같은 커맨드를 입력하여 VIM 8.2를 설치합니다.

```sh
sudo add-apt-repository ppa:jonathonf/vim
sudo apt update
sudo apt install vim
```

삭제하는 경우 아래와 같은 커맨드를 입력합니다.

```sh
sudo apt remove vim
sudo add-apt-repository --remove ppa:jonathonf/vim
```
