# namonak.github.io

## 소개

`namonak.dev`의 기술 학습 기록을 담는 정적 개발 블로그입니다. Astro와 Markdown으로 글을 작성하고 GitHub Pages로 배포합니다.

## 개발 환경

- Node.js 22 (`.nvmrc` 참고)
- npm

## 로컬 실행

```bash
npm install
npm run dev
```

개발 서버를 실행한 뒤 터미널에 표시된 주소로 접속합니다.

## 검증

```bash
npm run check
npm run build
npm run test:e2e
```

단위 테스트가 추가된 뒤에는 `npm run test`도 함께 실행합니다.

## 배포

`main` 브랜치에 푸시하면 GitHub Actions가 정적 사이트를 빌드하여 GitHub Pages에 배포합니다. 배포 워크플로는 프로젝트 구성 단계에서 추가합니다.
