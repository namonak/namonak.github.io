# 품질 게이트

## 초안 생성 전

- `ARCHITECTURE.md`, `docs/content-guide.md`, 콘텐츠 스키마, 기존 카테고리와 공개 경로를 확인합니다.
- 새 파일 경로 `src/content/blog/<category>/<slug>.md`와 공개 URL 충돌을 확인합니다.
- 핵심 주장, 수치, 인용, 버전 의존 설명이 신뢰할 수 있는 출처와 연결됐는지 확인합니다.

## 초안 내용 점검

- frontmatter의 `title`, `description`, `publishedAt`, `category`, `tags`, `draft: true`를 점검합니다.
- GFM 각주 식별자와 링크 대상이 일치하는지 점검합니다.
- 코드 블록의 언어 식별자, 이미지의 `public/images/` 경로, Mermaid 문법을 점검합니다.
- 아티클 기반 글에는 frontmatter 다음의 `> 원문:` 블록과 독립적인 GFM 각주가 모두 있어야 합니다.
- 모든 신규 글에는 본문 도입 전 `## 핵심 요약`과 1~3개의 짧은 서술형 문단이 있어야 합니다. 각 문단은 1~3문장으로 유지하며, 아티클 기반 글에서는 원문 블록 다음에 둡니다.

## 명령 검증

다음 명령을 실행합니다.

```bash
npm run check
npm run test
npm run build
```

Mermaid가 있는 글은 다음 명령도 실행합니다.

```bash
npm run validate:mermaid
```

## 로컬 렌더링 확인

로컬에서 데스크톱, 태블릿, 모바일 폭으로 새 글을 확인합니다.
본문, 코드, 표, 이미지, Mermaid, GFM 각주 이동과 본문 복귀 링크가 읽기 쉬워야 합니다.

## 인계와 금지된 작업

인계에는 초안 경로, 검사 결과, 주요 출처, 남은 확인 사항만 적습니다.
사용자의 명시적 지시 없이는 `draft`를 해제하거나, 커밋하거나, 푸시하지 않습니다.
