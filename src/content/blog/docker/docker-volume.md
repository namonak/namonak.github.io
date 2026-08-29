---
title: "[Docker] Volume에 대한 이해와 활용"
description: "Docker Volume을 설명하고 상황에 따라 Volume을 활용해 데이터를 관리하는 방법을 기술합니다."
publishedAt: 2021-03-09
category: "docker"
tags: ["docker", "volume", "bind-mount", "tmpfs"]
---

이 글에서는 Docker Volume에 대해서 설명하고 상황에 따라 Volume을 활용해 데이터를 관리하는 방법에 대해서 기술합니다.

# 개요

가장 기본적으로 Docker Container가 생성되면 Writable Layer에 데이터를 저장할 수 있습니다. 그런데 이 방법에는 몇가지 문제가 있습니다.

- Container가 삭제되면 Container 내부에 데이터도 같이 삭제가 됩니다.
- 현재 Container에 저장된 데이터를 다른 Container 혹은 프로세스와 공유하기 어렵습니다.
- Container가 Writable Layer에 Data를 저장하기 위해서는 파일 시스템을 관리하는 스토리지 드라이버가 필요합니다. 그렇기 때문에 기존 호스트 파일 시스템 대비 데이터 읽기 쓰기 속도 성능이 떨어집니다.

> Reference : [About storage drivers](https://docs.docker.com/storage/storagedriver/)

Docker 에서는 데이터 관리를 위해 `volume`, `bind mount`, `tmpfs` 의 총 3가지 방법을 제공하며, 이는 각각의 장점과 단점이 있기 때문에 상황에 맞게 활용해야 합니다.

# 도커에서 데이터를 관리하는 3가지 방법

아래 그림은 도커에서 데이터를 관리하는 방법에 대한 다이어그램입니다.

![](/images/docker-volume-data-management.png)

> Reference : [Use volumes](https://docs.docker.com/storage/volumes/)

먼저 `bind mount` 를 살펴보면 Container 가 호스트 파일 시스템에 직접 접근하고 있습니다. 컨테이너에서 마운트한 경로의 호스트 파일과 디렉토리가 컨테이너 내부에 동일하게 표시되기 때문에 가장 간편한 방법일 수 있습니다. 하지만 호스트 파일 시스템 구조에 의존하기 때문에 호스트 파일 시스템과 컨테이너 내부의 파일 시스템 간의 파일/디렉토리 구조가 다른 경우 문제가 발생할 수 있습니다. (이에 대한 개인적인 경험은 뒤에서 자세하게 다룰 예정입니다.)

두번째로 `volume` 을 살펴보면 호스트 파일 시스템 내부에 Docker area 를 참조하고 있습니다. `volume`은 호스트 파일 시스템 내부에 Docker 에서 직접 관리하는 영역을 생성하여 사용하게 됩니다. `volume`은 Docker에 의해서 관리되기 때문에 호스트 파일 시스템과 완전 분리된다는 점이 있긴 하지만 사용방법은 `bind mount` 와 유사합니다.

마지막으로 `tmpfs` 는 ramfs와 비슷하게 메모리에 마운트를 하는 방법입니다. 이는 여러가지로 활용될 수 있습니다. 데이터베이스 경로를 `tmpfs`로 마운트 시켜 [In-memory 데이터베이스](https://ko.wikipedia.org/wiki/%EC%9D%B8%EB%A9%94%EB%AA%A8%EB%A6%AC_%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4) 형태로 사용하면 디스크에 직접 접근하는 방식보다 빠른 성능을 보장 받을 수 있습니다. 또한, Read-only 옵션을 추가하는 경우 외부의 접근으로 부터 컨테이너 내부를 Immutable 한 상태로 유지할 수 있습니다.

# 실제 사용예제

## bind mount

## volume

```sh
docker volume create workspace

docker volume ls

docker run -v workspace:/data -it --name access_volume busybox

docker cp access_volume:/data local-data
# modify local-data docker
cp local-data access_volume:/data
```

## tmpfs

졸리당… 사용 방법은 내일 정리 하는 걸로다가…
