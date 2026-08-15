---
title: "[Git] Git LFS에 대한 이해와 사용법"
description: "Git LFS의 개념과 동작 원리, 설치·설정 및 대용량 파일 관리 방법을 정리합니다."
publishedAt: 2024-03-14
category: "git"
tags: ["git", "git-lfs", "large-files"]
---

## 서론

[Git LFS(Large File Storage)](https://git-lfs.com/)는 대용량 파일을 효율적으로 관리하기 위해 사용되는 Git 확장입니다. 기본적인 Git 저장소는 소스 코드와 같은 텍스트 파일을 처리하는 데 최적화되어 있으며, 큰 바이너리 파일들(예: 이미지, 비디오, 데이터 세트 등)을 저장할 때는 비효율적일 수 있습니다. 프로젝트에 고해상도 이미지, 비디오 파일, 데이터베이스 파일 등 큰 사이즈의 파일이 포함되어 있을 경우, 이러한 파일들은 Git 저장소의 용량을 급격히 증가시키고, 클론 또는 풀 작업의 시간을 늘립니다. 이에 대한 해결책으로 Git LFS(Large File Storage)가 등장하였습니다.

## Git LFS란?

Git LFS는 대용량 파일을 효율적으로 관리하기 위해 개발된 확장 기능입니다. 이는 대용량 파일을 실제 저장소에 저장하는 대신, 파일의 포인터를 저장소에 저장하고, 실제 파일은 별도의 서버에 저장하는 방식으로 동작합니다. 이로써 저장소의 크기를 효과적으로 관리할 수 있게 됩니다.

### 배경 설명

전통적인 Git 저장소는 모든 파일의 변경 이력을 추적하기 때문에, 대용량 파일이 포함될 경우 저장소의 용량이 급증합니다. 이는 저장소를 복제하거나 업데이트할 때 성능 저하를 일으킬 수 있습니다. Git LFS를 사용하면, 대용량 파일에 대한 포인터만 저장소에 포함되기 때문에, 저장소의 용량이 효과적으로 관리됩니다.

### 기본 원리

Git LFS는 `.gitattributes` 파일에 정의된 규칙에 따라 대용량 파일을 자동으로 식별합니다. 이 파일은 대용량 파일과 관련된 패턴을 포함하고 있으며, Git은 이 패턴에 맞는 파일을 포인터로 대체하여 처리합니다. 실제 대용량 파일은 LFS 서버에 저장되며, Git 저장소에서는 해당 파일에 대한 참조만을 관리합니다.

## Git LFS 설치 및 설정

### 설치 방법

Git LFS를 사용하기 위해서는 먼저 시스템에 Git LFS를 설치해야 합니다. 대부분의 운영 체제에서는 패키지 관리자를 통해 쉽게 설치할 수 있습니다.

```bash
# MacOS의 경우
brew install git-lfs

# Ubuntu의 경우
sudo apt-get install git-lfs
```

### 설정 방법

Git LFS를 설치한 후, 사용하고자 하는 저장소에서 Git LFS를 초기화해야 합니다.

```bash
git lfs install
```

다음으로, `.gitattributes` 파일을 생성하거나 수정하여, Git LFS로 관리할 파일 유형을 정의합니다.

```bash
# 예시: 모든 .png 파일을 Git LFS로 관리하도록 설정
git lfs track "*.png"
```

이후 변경 사항을 커밋하여 `.gitattributes` 파일을 저장소에 추가합니다.

```bash
git add .gitattributes
git commit -m "Configure Git LFS for .png files"
```

## 사용 예제

대용량 파일을 Git LFS로 관리하도록 설정한 후에는, 해당 파일을 평소처럼 Git에 추가하고 커밋하면 됩니다. Git LFS는 설정된 파일 패턴에 맞는 파일을 자동으로 식별하여 LFS 서버에 업로드하고, 해당 파일의 포인터를 저장소에 저장합니다.

```bash
# 대용량 이미지 파일 추가 및 커밋
git add image.png
git commit -m "Add large image file"
git push origin main
```

## 핵심 요약

- Git LFS는 대용량 파일을 효율적으로 관리하기 위한 확장 기능입니다.
- 대용량 파일에 대한 포인터를 Git 저장소에 저장하고, 실제 파일은 LFS 서버에 저장합니다.
- 설치 후 저장소에서 Git LFS를 초기화하고, `.gitattributes` 파일을 통해 관리할 파일 유형을 설정합니다.
- 설정된 파일 유형의 대용량 파일을 커밋하면, Git LFS가 자동으로 해당 파일을 LFS 서버에 업로드합니다.

## 용어 정리

- **Git LFS(Large File Storage):** 대용량 파일을 효율적으로 관리하기 위해 개발된 Git 확장 기능입니다.
- **포인터:** Git 저장소에서 대용량 파일을 대신하여 저장하는 작은 파일로, 실제 파일의 위치와 해시 값을 가리킵니다.
- **`.gitattributes`:** Git LFS로 관리할 파일 유형을 정의하는 파일입니다.
