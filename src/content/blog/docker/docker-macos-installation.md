---
title: "[Docker] macOS에서 설치하는 방법"
description: "macOS에서 Homebrew로 Docker 클라이언트를 설치하고 Docker Desktop으로 데몬을 설치·확인하는 2020년 기준 절차를 정리합니다."
publishedAt: 2020-08-20
category: "docker"
tags: ["docker", "macos", "homebrew", "docker-desktop", "container"]
draft: false
---

이 글은 2020년 당시 Intel 기반 macOS에서 Docker를 설치한 기록입니다. Homebrew로 설치한 Docker 명령줄 도구와 실제 Docker 데몬을 실행하는 Docker Desktop은 별도라는 점을 중심으로 설명합니다.

## Homebrew로 Docker 클라이언트 설치

먼저 Homebrew로 Docker 클라이언트를 설치합니다.

```bash
brew install docker
```

설치가 끝난 뒤 버전을 확인합니다.

```text
$ docker version
Client: Docker Engine - Community
 Version:           19.03.12
 API version:       1.40
 Go version:        go1.14.4
 Git commit:        48a6621
 Built:             Sat Jul  4 17:04:36 2020
 OS/Arch:           darwin/amd64
 Experimental:      false
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

마지막 줄은 Docker 데몬에 연결할 수 없다는 뜻입니다. 위 Homebrew 명령은 Docker 클라이언트만 설치했으므로, 컨테이너를 실행할 Docker 데몬은 아직 준비되지 않은 상태입니다.

## Docker Desktop 설치

[Docker.dmg](https://download.docker.com/mac/stable/Docker.dmg)를 내려받아 마운트한 뒤, Docker를 `Applications`로 끌어 놓아 설치합니다.

![Docker 애플리케이션을 Applications 폴더로 옮기는 설치 화면](/images/docker-macos-installation.png)

설치를 마친 뒤 Docker Desktop을 실행하고 다시 버전을 확인합니다. 이번에는 Client와 Server 정보가 모두 출력되어야 합니다.

```text
$ docker version
Client: Docker Engine - Community
 Version:           19.03.12
 API version:       1.40
 Go version:        go1.13.10
 Git commit:        48a66213fe
 Built:             Mon Jun 22 15:41:33 2020
 OS/Arch:           darwin/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          19.03.12
  API version:      1.40 (minimum version 1.12)
  Go version:       go1.13.10
  Git commit:       48a66213fe
  Built:            Mon Jun 22 15:49:27 2020
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          v1.2.13
  GitCommit:        7ad184331fa3e55e52b890ea95e65ba581ae3429
 runc:
  Version:          1.0.0-rc10
  GitCommit:        dc9208a3303feef5b3839f4323d9beb36df0a9dd
 docker-init:
  Version:          0.18.0
  GitCommit:        fec3683
```

> 참고: 현재 Docker Desktop의 설치 방식과 지원 대상은 2020년과 달라질 수 있습니다. 이 글의 명령과 예시 출력은 원문이 작성된 당시의 Intel macOS 환경을 보존한 것입니다.
