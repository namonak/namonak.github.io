---
title: "[Docker] Volume에 대한 이해와 활용"
description: "Docker의 writable layer, volume, bind mount, tmpfs mount를 비교하고 docker run에서 안전하게 사용하는 방법을 정리합니다."
publishedAt: 2021-03-09
updatedAt: 2026-09-07
category: "docker"
tags: ["docker", "volume", "bind-mount", "tmpfs"]
---

컨테이너가 만든 파일은 기본적으로 이미지의 읽기 전용 layer 위에 있는 **writable container layer**에 저장됩니다. 이 layer는 컨테이너마다 독립적이며, 컨테이너를 삭제하면 함께 사라집니다. 또한 다른 컨테이너나 호스트 프로세스가 그 데이터를 공유·관리하기도 어렵습니다.

지속해야 하거나 공유해야 하는 데이터는 writable layer 밖에 두는 편이 좋습니다. Docker는 이를 위해 `volume`, `bind mount`, `tmpfs mount`를 제공합니다. 컨테이너 내부에서는 모두 일반 디렉터리나 파일처럼 보이지만, 데이터의 소유자·수명·사용 목적은 다릅니다.

## 선택 기준

| 방식 | 데이터 위치와 수명 | 적합한 경우 | 주의할 점 |
| --- | --- | --- | --- |
| Volume | Docker daemon이 관리하는 호스트 저장소이며 컨테이너 삭제 뒤에도 남습니다. | 데이터베이스·업로드 파일처럼 영속성과 이식성이 필요한 데이터 | 호스트에서 데이터를 직접 편집하는 것은 지원되지 않습니다. Docker CLI나 컨테이너를 통해 관리합니다. |
| Bind mount | 지정한 호스트 경로를 컨테이너에 직접 연결합니다. | 개발 소스, 빌드 산출물, 호스트 설정 파일 공유 | 호스트 경로 구조에 묶이고 기본적으로 컨테이너가 호스트 파일을 쓸 수 있습니다. |
| tmpfs mount | 호스트 메모리에만 존재하며 컨테이너 중지·재시작 또는 호스트 재부팅 시 사라집니다. | 캐시, 임시 계산 결과, 짧게 보관할 민감 정보 | Linux에서만 지원하며 컨테이너 메모리 한도에 포함되고 컨테이너 간 공유할 수 없습니다. |

## Docker의 데이터 저장 방식

아래 그림은 컨테이너가 writable layer 밖의 데이터를 다루는 세 방법을 단순화해 보여줍니다. 그림의 Docker 영역은 Docker가 관리하는 volume 저장소를 뜻하며, volume 데이터는 호스트 파일시스템에 저장되지만 Docker CLI 또는 Docker API를 통해 관리하는 것이 기준입니다.

![Host의 파일시스템·Docker 관리 영역·메모리에 각각 연결되는 bind mount, volume, tmpfs mount](/images/docker-volume-data-management.png)

_참조: [Docker Storage](https://docs.docker.com/engine/storage/)_

`volume`은 Docker가 생성·관리하는 영속 저장소입니다. `bind mount`는 호스트의 특정 파일 또는 디렉터리를 그대로 노출합니다. `tmpfs mount`는 디스크에 기록하지 않아야 하는 짧은 수명의 데이터를 메모리에 둡니다.

## 공통 문법: `--mount` 우선 사용하기

`docker run`은 `--mount`와 짧은 형식의 `-v` 또는 `--tmpfs`를 모두 지원합니다. 이 글에서는 source·destination·옵션을 명시적으로 보여 주고 모든 mount 종류에 일관되게 쓸 수 있는 `--mount`를 기본 문법으로 사용합니다.

```bash
# volume
docker run --mount type=volume,src=<volume-name>,dst=<container-path> <image>

# bind mount
docker run --mount type=bind,src=<host-path>,dst=<container-path> <image>

# tmpfs mount
docker run --mount type=tmpfs,dst=<container-path> <image>
```

모든 방식에서 컨테이너의 대상 경로에 이미 파일이 있다면 mount가 그 파일을 가립니다. 실행 중인 컨테이너에서 mount만 제거해 원래 파일을 다시 보는 간단한 방법은 없으므로, mount 없이 컨테이너를 다시 만들어야 합니다.

## Volume

Volume은 Docker가 생성하고 관리하는 영속 데이터 저장소입니다. 컨테이너의 writable layer와 별도로 존재하므로 컨테이너를 삭제해도 volume은 자동으로 사라지지 않습니다. 여러 컨테이너가 같은 volume을 동시에 mount할 수도 있습니다.

### named volume 만들기와 확인

먼저 이름이 있는 volume을 만듭니다.

```bash
docker volume create app-data
docker volume ls
docker volume inspect app-data
```

`docker volume inspect`의 `Mountpoint`는 daemon host의 저장 위치를 보여 줍니다. 다만 volume 내부 파일을 호스트에서 직접 수정하는 방식은 지원되지 않으므로, 데이터를 읽고 쓰려면 volume을 컨테이너에 mount하거나 Docker의 관리 명령을 사용합니다.

### 컨테이너에 volume mount하기

다음 예제는 `app-data`를 컨테이너의 `/data`에 mount합니다.

```bash
docker run -d \
  --name volume-demo \
  --mount type=volume,src=app-data,dst=/data \
  nginx:alpine

docker inspect volume-demo --format '{{ json .Mounts }}'
```

출력에서 `Type`이 `volume`, `Name`이 `app-data`, `Destination`이 `/data`인지 확인합니다. 짧은 문법은 아래와 같지만, 옵션이 많아질수록 의미가 불명확해질 수 있습니다.

```bash
docker run -d --name volume-demo-short -v app-data:/data nginx:alpine
```

읽기 전용으로 제공할 때는 `readonly` 또는 `ro`를 지정합니다.

```bash
docker run -d \
  --name volume-reader \
  --mount type=volume,src=app-data,dst=/data,readonly \
  nginx:alpine
```

### 빈 volume의 초기 데이터와 정리

비어 있는 volume을 컨테이너의 기존 파일이 있는 경로에 처음 mount하면, Docker는 기본적으로 그 경로의 파일을 volume에 복사합니다. 예를 들어 nginx 이미지의 기본 HTML이 있는 경로에 새 volume을 mount하면 volume이 초기 콘텐츠로 채워질 수 있습니다. 이 동작이 필요 없다면 `volume-nocopy` 옵션을 사용합니다.

```bash
docker run -d \
  --name nginx-content \
  --mount type=volume,src=site-content,dst=/usr/share/nginx/html,volume-nocopy \
  nginx:alpine
```

컨테이너 삭제와 volume 삭제는 별개입니다. 더 이상 사용하지 않는 volume만 명시적으로 제거합니다.

```bash
docker container rm -f volume-demo volume-demo-short volume-reader nginx-content
docker volume rm app-data site-content
```

## Bind mount

Bind mount는 Docker가 새 저장소를 만드는 방식이 아니라, 호스트의 파일 또는 디렉터리를 컨테이너에 직접 연결하는 방식입니다. 개발 환경에서 소스 코드나 빌드 산출물을 컨테이너와 공유할 때 특히 유용합니다.

### 호스트의 빌드 산출물 공유하기

현재 프로젝트의 `target` 디렉터리를 nginx 컨테이너의 `/app`에서 읽기 전용으로 보이게 하는 예제입니다.

```bash
mkdir -p "$(pwd)/target"

docker run -d \
  --name bind-demo \
  --mount type=bind,src="$(pwd)"/target,dst=/app,readonly \
  nginx:alpine

docker inspect bind-demo --format '{{ json .Mounts }}'
```

`--mount`는 source 경로가 없으면 오류를 냅니다. 이 때문에 오타로 빈 호스트 디렉터리를 만드는 일을 줄일 수 있습니다. 반면 짧은 `-v` 문법은 존재하지 않는 호스트 경로를 디렉터리로 자동 생성할 수 있습니다.

```bash
docker run -d --name bind-demo-short -v "$(pwd)"/target:/app:ro nginx:alpine
```

### 권한과 호스트 의존성

Bind mount는 기본적으로 읽기·쓰기가 가능합니다. 컨테이너 프로세스가 호스트 파일을 생성·수정·삭제할 수 있으므로, 설정 파일이나 소스처럼 변경을 허용하지 않을 데이터에는 `readonly` 또는 `ro`를 지정하는 편이 안전합니다.

또한 컨테이너는 특정 호스트 경로 구조에 의존합니다. 같은 경로와 권한이 없는 다른 host에서는 실행에 실패하거나 다른 결과를 낼 수 있습니다. remote Docker daemon을 사용할 때 bind mount의 source는 Docker client가 아니라 **daemon이 실행되는 host** 기준이라는 점도 확인해야 합니다.

예제를 정리합니다.

```bash
docker container rm -f bind-demo bind-demo-short
```

## tmpfs mount

tmpfs mount는 데이터를 호스트 메모리에만 둡니다. 캐시나 일시적 계산 결과처럼 컨테이너 세션이 끝나면 사라져도 되는 데이터에 적합합니다. 컨테이너를 중지하거나 재시작하면 데이터가 사라지고, 같은 tmpfs mount를 다른 컨테이너와 공유할 수 없습니다.

다만 “메모리에만 있다”는 말이 암호학적 보장을 뜻하지는 않습니다. Docker의 tmpfs는 Linux kernel tmpfs에 직접 대응하므로, host의 swap 설정에 따라 임시 데이터가 swap 파일에 기록될 수 있습니다.

### 크기와 권한을 지정해 mount하기

다음 예제는 `/cache`를 64 MiB 크기의 tmpfs로 mount합니다.

```bash
docker run -d \
  --name tmpfs-demo-short \
  --mount type=tmpfs,dst=/cache,tmpfs-size=67108864,tmpfs-mode=1770 \
  nginx:alpine

docker inspect tmpfs-demo-short --format '{{ json .Mounts }}'
```

짧은 문법에서는 `--tmpfs`를 사용할 수 있습니다.

```bash
docker run -d \
  --name tmpfs-demo \
  --tmpfs /cache:rw,size=64m,mode=1770 \
  nginx:alpine
```

tmpfs에 쓴 데이터는 컨테이너의 메모리 한도에 포함됩니다. `tmpfs-size`를 크게 잡아도 컨테이너 메모리 한도를 늘리지는 않습니다. Docker의 tmpfs mount는 Linux에서만 사용할 수 있으며, mount 대상 경로의 기존 파일은 다른 mount 방식과 마찬가지로 가려집니다.

예제를 정리합니다.

```bash
docker container rm -f tmpfs-demo tmpfs-demo-short
```

## 상황별 선택

- 데이터베이스 데이터, 업로드 파일, 장기 보관 데이터처럼 컨테이너 수명과 분리해야 하는 데이터에는 **volume**을 우선 검토합니다.
- 개발 중인 소스 코드, 로컬 설정 파일, 빌드 산출물을 host와 즉시 공유해야 한다면 **bind mount**를 사용하고 가능하면 읽기 전용으로 mount합니다.
- 캐시나 세션 중간 데이터처럼 디스크에 남길 필요가 없는 데이터에는 **tmpfs mount**를 사용합니다. 메모리 한도와 swap 가능성을 함께 고려합니다.
- 어느 방식이든 mount 대상의 기존 파일을 가린다는 점과, `docker inspect`의 `Mounts`로 실제 type·source·destination·읽기 전용 여부를 확인하는 습관이 중요합니다.

## References

- [Docker Storage](https://docs.docker.com/engine/storage/)
- [Volumes](https://docs.docker.com/engine/storage/volumes/)
- [Bind mounts](https://docs.docker.com/engine/storage/bind-mounts/)
- [tmpfs mounts](https://docs.docker.com/engine/storage/tmpfs/)
