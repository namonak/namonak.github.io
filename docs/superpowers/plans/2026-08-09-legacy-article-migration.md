# 기존 글 마이그레이션 실행 계획

> **에이전트 작업자용:** 이 계획은 작업 단위별로 `superpowers:executing-plans`를 사용해 실행합니다. 진행 상태는 체크박스(`- [ ]`)로 기록합니다.

**목표:** `blog.joannes.kr`의 남은 공개 글 70편을 예측 가능한 일일 일정에 따라 Astro 콘텐츠 컬렉션으로 이전하고, 글별 서명 커밋과 Git 동기화로 진행 상황을 관리합니다.

**구조:** WordPress REST API 스냅샷과 WordPress 글 ID를 이전 목록의 기준으로 사용합니다. 원문 글 하나를 `src/content/blog/<category>/<slug>.md`의 검증된 Markdown 글 하나로 변환하고, 필요한 로컬 미디어는 `public/images/`에 저장합니다. 각 글의 커밋에는 해당 체크박스 변경만 포함합니다. 최신 글부터 오래된 글 순서로 진행하고, 글별 검증 후 하루치 작업을 푸시하여 다른 장치에서도 `git pull --ff-only`로 이어서 작업합니다.

**기술 스택:** WordPress REST API, Astro 7 콘텐츠 컬렉션, Markdown/GFM, 빌드 시점 Mermaid SVG, Vitest, Playwright, Git, 서명 커밋, GitHub Pages

## 전역 제약 사항

- 원본 목록 스냅샷은 2026-08-09 기준 공개 WordPress 글 80편입니다. 초안, 비공개 글, 페이지, 댓글은 제외합니다.
- 이미 이전한 글은 `WP#859`, `WP#810`, `WP#848`, `WP#902`와 2026-08-09에 조기 완료한 영어 글 6편입니다. 남은 70편만 이전합니다.
- 남은 70편은 2026-08-10부터 재배정합니다. 평일은 하루 2편, 토요일·일요일은 하루 4편이며, 마지막 2편은 2026-09-06에 배정합니다.
- 일정의 날짜는 작업 순서와 일일 분량을 나타냅니다. **커밋 날짜는 커밋 직전에 사용자의 명시적 확인을 받은 뒤 조정하며, 그 확인 전에는 커밋하지 않습니다.** 사용자의 명시적 지시 없이는 과거 날짜를 사용하지 않습니다.
- 글 하나당 의미 있는 서명 커밋 하나를 만듭니다. 단, `WP#969`, `WP#966`, `WP#958`, `WP#952`, `WP#948`, `WP#939` 영어 글 6편은 사용자 승인에 따라 2026-08-09에 하나의 예외 배치로 완료되었습니다.
- Git이 서명 비밀번호를 요청하면 즉시 중단하고 사용자에게 알립니다. 비밀번호를 요청하거나 입력하지 않습니다.
- 원문의 발행일은 `publishedAt`에 보존합니다. 이전 후 실질적인 정정을 한 경우에만 `updatedAt`을 사용합니다.
- 글은 `/{category}/{slug}/`에 게시합니다. 처음 커밋하기 전에 소문자·URL 안전 카테고리와 간결하고 안정적인 slug를 정하고, 공개된 경로는 가볍게 바꾸지 않습니다.
- 글 본문은 한국어를 기본으로 하되 영어 기술 용어가 더 명확한 경우에는 유지합니다. 영어 학습 글은 한국어 설명과 영어 예문을 그대로 유지할 수 있습니다.
- 댓글을 이전하지 않으며, 검색·자동 RSS·다국어 라우팅·사용자 도메인 DNS 변경을 추가하지 않습니다.
- 편집용 이미지는 `public/images/`에 내려받고, Markdown에서는 루트 상대 경로를 사용합니다. WordPress 미디어를 핫링크하지 않습니다.
- Mermaid 원문은 fenced `mermaid` 블록으로 바꾸어 빌드 시점 SVG로 렌더링합니다. 일반 편집 이미지를 Mermaid로 대체하지 않습니다.
- 원문이 오래되었거나 기술적으로 낡았다는 이유만으로 내용을 조용히 다시 쓰지 않습니다. 역사적 맥락을 보존하고, 사실을 정정해야 하면 명시합니다.
- 하루치 작업을 배포 가능하다고 말하기 전에 `npm run check`, `npm run test`, `npm run build`, `npm run test:e2e`를 실행하고, 해당 날짜의 대표 글을 데스크톱·태블릿·모바일 폭에서 확인합니다.

---

## 범위 기준선

아래 4편은 이 계획 이전에 대표 글로 이전되었습니다. 전체 수량의 차감 근거를 명확히 하기 위해 기록합니다.

| WordPress ID | 원문 발행일 | 이전한 글                          |
| ------------ | ----------- | ---------------------------------- |
| `WP#902`     | 2018-05-14  | OSTEP 07. CPU Scheduling           |
| `WP#848`     | 2024-05-27  | MTU와 MSS                          |
| `WP#810`     | 2024-06-20  | JavaScript Map과 일반 객체         |
| `WP#859`     | 2024-07-16  | Kotlin 유용한 표준 라이브러리 함수 |

2026-08-09에는 아래 영어 학습 글 6편을 사용자 승인 예외로 하나의 배치에서 조기 완료했습니다.

| WordPress ID | 원문 발행일 | 이전한 글                 |
| ------------ | ----------- | ------------------------- |
| `WP#969`     | 2026-05-27  | run 구동사 정리           |
| `WP#966`     | 2026-05-20  | get 구동사 정리           |
| `WP#958`     | 2026-05-13  | take 구동사 정리          |
| `WP#952`     | 2026-05-06  | make 구동사 정리          |
| `WP#948`     | 2026-05-04  | pick up 뜻과 예문 정리    |
| `WP#939`     | 2026-05-04  | 구동사 기본 개념과 공부법 |

`공개 글 80편 - 기존 이전 4편 - 조기 완료 6편 = 남은 이전 70편`입니다.

## 파일 구조

| 경로                                                            | 책임                                                   |
| --------------------------------------------------------------- | ------------------------------------------------------ |
| `src/content/blog/<category>/<slug>.md`                         | 검증된 frontmatter와 Markdown 본문을 갖는 이전 글 하나 |
| `public/images/`                                                | 이전 글에서 참조하는 로컬 이미지 자산                  |
| `docs/superpowers/plans/2026-08-09-legacy-article-migration.md` | 원본 목록, 재배정 일정, 장치 간 진행 원장              |
| `docs/content-guide.md`                                         | 필수 frontmatter, 이미지 정책, Mermaid 작성 규칙       |
| `ARCHITECTURE.md`                                               | 콘텐츠 흐름, 라우트 책임, 배포 동작                    |

## 재배정 일정 요약

| 주차  | 일정 범위             | 평일 편수 | 주말 편수 | 합계 | 누계 |
| ----- | --------------------- | --------: | --------: | ---: | ---: |
| 1주차 | 2026-08-10–2026-08-16 |        10 |         8 |   18 |   18 |
| 2주차 | 2026-08-17–2026-08-23 |        10 |         8 |   18 |   36 |
| 3주차 | 2026-08-24–2026-08-30 |        10 |         8 |   18 |   54 |
| 4주차 | 2026-08-31–2026-09-06 |        10 |         6 |   16 |   70 |

이전 계획의 8/10–8/12 영어 글 6편은 실제로 2026-08-09에 완료되었습니다. 이에 따라 남은 70편을 최신순 그대로 2026-08-10부터 다시 배정했습니다. 평일 2편·주말 4편 규칙을 유지하면 2026-09-05까지 68편, 2026-09-06에 마지막 2편까지 총 70편이 됩니다.

## 글별 실행 절차

체크되지 않은 각 일정 항목에 아래 절차를 적용합니다. 체크박스가 장치 간에 공유하는 진행 기록입니다. 영어 글 6편의 조기 완료 배치만 글별 한 커밋 원칙의 승인된 예외입니다.

1. **편집 전 동기화**

   `git status --short --branch`로 설명되지 않은 로컬 변경이 없는지 확인한 뒤 `git pull --ff-only`를 실행합니다. 하루 작업 중 장치를 바꿀 때는 첫 장치에서 완료한 서명 커밋을 먼저 푸시하고, 다른 장치에서 pull한 뒤 이어서 작업합니다.

2. **원문 감사**

   WordPress 원문을 열어 제목, 발행일, 본문 구조, 코드 언어, 표, 링크, 이미지, 캡션, Mermaid 원문을 기록합니다. 제목이 비슷한 글을 혼동하지 않도록 WordPress ID가 일정 항목과 일치하는지 확인합니다.

3. **대상 경로 선택**

   기존의 URL 안전 카테고리와 간결한 소문자 slug를 선택합니다. `src/content/blog/<category>/<slug>.md`가 아직 없는지, `/{category}/{slug}/`가 기존 공개 글과 충돌하지 않는지 확인합니다.

4. **Markdown 글과 로컬 자산 작성**

   `docs/content-guide.md`의 필수 frontmatter인 `title`, `description`, `publishedAt`, `category`, `tags`를 사용합니다. 원문 발행일을 보존하고, WordPress HTML을 읽기 좋은 Markdown/GFM으로 변환합니다. 코드에는 언어 식별자를 붙이고, 편집용 미디어는 `public/images/`에 저장합니다.

5. **개별 글 검증**

   다음 명령을 실행합니다.

   ```bash
   npm run check
   npm run test
   npm run build
   ```

   frontmatter 오류, 깨진 Mermaid, 유효하지 않은 콘텐츠 컬렉션 항목, 단위 테스트 회귀가 있으면 커밋하지 않습니다.

6. **반응형 렌더링 확인**

   프로덕션 빌드를 제공하고 새 글을 데스크톱·태블릿·모바일 폭에서 확인합니다. 제목, 코드, 표, 이미지, 인라인 SVG, 링크, 인접 글 탐색이 본문 영역 안에 있고 읽기 쉬운지 점검합니다.

7. **진행 기록과 서명 커밋**

   해당 글의 체크박스만 `- [ ]`에서 `- [x]`로 바꿉니다. 글, 필요한 자산, 이 계획 파일만 stage합니다. **커밋 날짜를 포함한 최종 커밋 조건은 이 단계 직전에 사용자 확인을 받아 결정합니다.**

   ```bash
   git add src/content/blog/<category>/<slug>.md public/images/ docs/superpowers/plans/2026-08-09-legacy-article-migration.md
   git commit -S -m "content(<category>): migrate <slug>"
   ```

   커밋 전에 `git diff --cached --stat`으로 확인하고, 관련 없는 경로는 index에서 제거합니다. 글 하나를 독립적으로 검토 가능한 서명 커밋 하나로 남기는 것이 기준입니다.

## 일일 마감과 동기화

해당 날짜에 배정한 모든 글을 커밋한 뒤 다음을 수행합니다.

- `npm run check`, `npm run test`, `npm run build`, `npm run test:e2e`를 실행합니다.
- 그날 추가한 단순 글 하나와 모든 리치 콘텐츠 글을 데스크톱·태블릿·모바일 폭에서 확인합니다.
- `git log --show-signature -<그날-글-개수>`로 글별 서명을 확인합니다.
- `git status --short --branch`로 작업 트리가 깨끗한지 확인합니다.
- `git push origin main`을 실행하고 GitHub Pages 워크플로가 성공했는지 확인합니다.
- 다른 장치에서 이어 작업하기 전 `git pull --ff-only`를 실행합니다.

일정 날짜를 지나쳤다면 체크박스를 완료로 표시하지 않고 사용자와 커밋 날짜를 먼저 확인합니다. 일일 분량을 임의로 초과하지 않으며, 최신순은 유지합니다.

## 마이그레이션 일정

### 2026-08-10 (월) — 2편

> 경로 결정:
>
> - `WP#855`는 `/web/promise-and-async-await/`에 추가합니다. 오류·취소 처리 중심의 기존 `/web/javascript-async-await/`와 의도가 달라 두 글을 함께 유지합니다.
> - `WP#802`는 `/software-development/base-encoding/`에 추가합니다.
> - 두 원문에는 내려받을 편집용 이미지가 없습니다.

- [x] `WP#855` · 원문 2024-07-08 · **[JavaScript] Promise와 async/await** · [원문](https://blog.joannes.kr/programming/javascript-typescript/javascript-promise%ec%99%80-async-await/)
- [x] `WP#802` · 원문 2024-06-17 · **[Software Development] BASE 인코딩 개념 정리** · [원문](https://blog.joannes.kr/software-development/software-development-base-%ec%9d%b8%ec%bd%94%eb%94%a9-%ea%b0%9c%eb%85%90-%ec%a0%95%eb%a6%ac/)

### 2026-08-11 (화) — 2편

- [x] `WP#795` · 원문 2024-06-11 · **[JavaScript] 싱글톤 패턴(Singleton Pattern)의 이해와 구현 방법** · [원문](https://blog.joannes.kr/programming/javascript-typescript/javascript-%ec%9e%90%eb%b0%94%ec%8a%a4%ed%81%ac%eb%a6%bd%ed%8a%b8-singleton-pattern-%ec%8b%b1%ea%b8%80%ed%86%a4-%ed%8c%a8%ed%84%b4/)
- [x] `WP#791` · 원문 2024-06-11 · **[JavaScript] var, let, const 선언 및 호이스팅(Hoisting) 개념 이해** · [원문](https://blog.joannes.kr/programming/javascript-typescript/javascript-var-let-const-%ec%84%a0%ec%96%b8-%eb%b0%8f-%ed%98%b8%ec%9d%b4%ec%8a%a4%ed%8c%85hoisting-%ea%b0%9c%eb%85%90-%ec%9d%b4%ed%95%b4/)

### 2026-08-12 (수) — 2편

- [x] `WP#775` · 원문 2024-06-03 · **[Web Development] Window, Document, Navigator, Location, History 객체 정리** · [원문](https://blog.joannes.kr/web-development/web-development-window-document-navigator-location-history-%ea%b0%9d%ec%b2%b4-%ec%a0%95%eb%a6%ac/)
- [x] `WP#768` · 원문 2024-04-30 · **[BOJ 백준] 1904번 : 01타일 – Kotlin[코틀린]** · [원문](https://blog.joannes.kr/algorithm/boj/boj-%eb%b0%b1%ec%a4%80-1904%eb%b2%88-01%ed%83%80%ec%9d%bc-kotlin%ec%bd%94%ed%8b%80%eb%a6%b0/)

### 2026-08-13 (목) — 2편

- [x] `WP#783` · 원문 2024-04-18 · **[Java] ConcurrentModificationException의 원인과 해결책** · [원문](https://blog.joannes.kr/programming/java/java-concurrentmodificationexception%ec%9d%98-%ec%9b%90%ec%9d%b8%ea%b3%bc-%ed%95%b4%ea%b2%b0%ec%b1%85/)
- [x] `WP#760` · 원문 2024-03-29 · **[Linux] netstat 명령어 사용법** · [원문](https://blog.joannes.kr/linux/linux-netstat-%eb%aa%85%eb%a0%b9%ec%96%b4-%ec%82%ac%ec%9a%a9%eb%b2%95/)

### 2026-08-14 (금) — 2편

- [x] `WP#748` · 원문 2024-03-18 · **[Linux] tcpdump** · [원문](https://blog.joannes.kr/linux/linux-tcpdump/)
- [x] `WP#741` · 원문 2024-03-18 · **[Linux] nc(Netcat) 사용법에 대한 이해와 활용** · [원문](https://blog.joannes.kr/linux/linux-nc_netcat-%ec%82%ac%ec%9a%a9%eb%b2%95%ec%97%90-%eb%8c%80%ed%95%9c-%ec%9d%b4%ed%95%b4%ec%99%80-%ed%99%9c%ec%9a%a9/)

### 2026-08-15 (토) — 4편

- [x] `WP#720` · 원문 2024-03-14 · **[Git] Git LFS에 대한 이해와 사용법** · [원문](https://blog.joannes.kr/git/git-lfs%ec%97%90-%eb%8c%80%ed%95%9c-%ec%9d%b4%ed%95%b4%ec%99%80-%ec%82%ac%ec%9a%a9%eb%b2%95/)
- [x] `WP#705` · 원문 2024-03-12 · **[Programming] 동적 계획법(Dynamic Programming)** · [원문](https://blog.joannes.kr/programming/programming-%eb%8f%99%ec%a0%81-%ea%b3%84%ed%9a%8d%eb%b2%95dynamic-programming/)
- [x] `WP#699` · 원문 2024-03-12 · **[Programming] 재귀함수(Recursive Function)** · [원문](https://blog.joannes.kr/programming/programming-%ec%9e%ac%ea%b7%80%ed%95%a8%ec%88%98recursive-function/)
- [x] `WP#690` · 원문 2024-03-11 · **[Kotlin] PriorityQueue** · [원문](https://blog.joannes.kr/programming/kotlin/kotlin-priorityqueue-%ec%bd%94%ed%8b%80%eb%a6%b0-%ec%9a%b0%ec%84%a0%ec%88%9c%ec%9c%84%ed%81%90/)

### 2026-08-16 (일) — 4편

- [x] `WP#663` · 원문 2024-02-29 · **[Android] Android Compose 소개** · [원문](https://blog.joannes.kr/android/android-android-compose/)
- [x] `WP#639` · 원문 2024-01-24 · **[Kotlin] Custom Kotlin delegates** · [원문](https://blog.joannes.kr/programming/kotlin/custom-kotlin-delegates/)
- [x] `WP#521` · 원문 2024-01-12 · **[Kotlin] Annotation** · [원문](https://blog.joannes.kr/programming/kotlin/kotlin-custom-annotation-%ec%bb%a4%ec%8a%a4%ed%85%80-%ec%96%b4%eb%85%b8%ed%85%8c%ec%9d%b4%ec%85%98/)
- [x] `WP#754` · 원문 2024-01-11 · **[Software Development] CI/CD 모범 사례** · [원문](https://blog.joannes.kr/software-development/ci-cd-%eb%aa%a8%eb%b2%94-%ec%82%ac%eb%a1%80/)

### 2026-08-17 (월) — 2편

- [x] `WP#633` · 원문 2024-01-05 · **[Software Development] 2023/2024 소프트웨어 개발 동향** · [원문](https://blog.joannes.kr/software-development/software-development-trends-2023-2024/)
- [ ] `WP#682` · 원문 2024-01-01 · **[Android] Jetpack Compose** · [원문](https://blog.joannes.kr/android/android-jetpack-compose/)

### 2026-08-18 (화) — 2편

- [ ] `WP#684` · 원문 2023-12-28 · **[Software Development] API Design 101: 기본부터 모범 사례까지(From Basics to Best Practices)** · [원문](https://blog.joannes.kr/software-development/api-design-101-%ea%b8%b0%eb%b3%b8%eb%b6%80%ed%84%b0-%eb%aa%a8%eb%b2%94-%ec%82%ac%eb%a1%80%ea%b9%8c%ec%a7%80-from-basics-to-best-practices/)
- [ ] `WP#657` · 원문 2023-12-27 · **[Software Development] 모바일 애플리케이션 아키텍처 vs. 디자인 패턴** · [원문](https://blog.joannes.kr/software-development/mobile-application-architecture-vs-design-patterns/)

### 2026-08-19 (수) — 2편

- [ ] `WP#627` · 원문 2023-12-21 · **[Software Development] 기술 부채를 다루는 방법** · [원문](https://blog.joannes.kr/software-development/how-to-deal-with-technical-debt/)
- [ ] `WP#725` · 원문 2023-11-29 · **[Software Development] 스프링 부트에서 데이터 전송 객체 (DTO)** · [원문](https://blog.joannes.kr/article-%ec%a0%95%eb%a6%ac/%ec%8a%a4%ed%94%84%eb%a7%81-%eb%b6%80%ed%8a%b8%ec%97%90%ec%84%9c-%eb%8d%b0%ec%9d%b4%ed%84%b0-%ec%a0%84%ec%86%a1-%ea%b0%9d%ec%b2%b4-dto/)

### 2026-08-20 (목) — 2편

- [ ] `WP#635` · 원문 2023-11-13 · **[Kotlin] 다형성과 인터페이스** · [원문](https://blog.joannes.kr/programming/kotlin/kotlin-%eb%8b%a4%ed%98%95%ec%84%b1%ea%b3%bc-%ec%9d%b8%ed%84%b0%ed%8e%98%ec%9d%b4%ec%8a%a4/)
- [ ] `WP#625` · 원문 2023-09-29 · **[Database] 데이터베이스 유형, 스케일링, 성능 최적화** · [원문](https://blog.joannes.kr/database/database-%eb%8d%b0%ec%9d%b4%ed%84%b0%eb%b2%a0%ec%9d%b4%ec%8a%a4-%ec%9c%a0%ed%98%95-%ec%8a%a4%ec%bc%80%ec%9d%bc%eb%a7%81-%ec%84%b1%eb%8a%a5-%ec%b5%9c%ec%a0%81%ed%99%94/)

### 2026-08-21 (금) — 2편

- [ ] `WP#508` · 원문 2023-07-29 · **[Network] URI, URL 및 URN 정리** · [원문](https://blog.joannes.kr/web-development/network-uri-url-%eb%b0%8f-urn-%ec%a0%95%eb%a6%ac/)
- [ ] `WP#485` · 원문 2023-07-26 · **[Web Development] CSR (Client-Side Rendering)과 SSR (Server-Side Rendering) 이해하기** · [원문](https://blog.joannes.kr/web-development/web-development-csr-client-side-rendering%ea%b3%bc-ssr-server-side-rendering-%ec%9d%b4%ed%95%b4%ed%95%98%ea%b8%b0/)

### 2026-08-22 (토) — 4편

- [ ] `WP#472` · 원문 2023-07-17 · **[Web Development] CORS (Cross-Origin Resource Sharing) 이해하기** · [원문](https://blog.joannes.kr/web-development/cors-cross-origin-resource-sharing-%ec%9d%b4%ed%95%b4/)
- [ ] `WP#468` · 원문 2023-07-13 · **[C] qsort() 함수** · [원문](https://blog.joannes.kr/programming/c/c-qsort-%ed%95%a8%ec%88%98/)
- [ ] `WP#464` · 원문 2023-07-10 · **[Kotlin] Array와 IntArray의 차이점** · [원문](https://blog.joannes.kr/programming/kotlin/kotlin-array%ec%99%80-intarray%ec%9d%98-%ec%b0%a8%ec%9d%b4%ec%a0%90/)
- [ ] `WP#430` · 원문 2023-06-16 · **[BOJ 백준] 19532번 : 수학은 비대면강의입니다 – Kotlin[코틀린]** · [원문](https://blog.joannes.kr/algorithm/boj/boj-%eb%b0%b1%ec%a4%80-19532%eb%b2%88-%ec%88%98%ed%95%99%ec%9d%80-%eb%b9%84%eb%8c%80%eb%a9%b4%ea%b0%95%ec%9d%98%ec%9e%85%eb%8b%88%eb%8b%a4-kotlin%ec%bd%94%ed%8b%80%eb%a6%b0/)

### 2026-08-23 (일) — 4편

- [ ] `WP#423` · 원문 2023-06-07 · **[BOJ 백준] 1193번 : 분수찾기 – Kotlin[코틀린]** · [원문](https://blog.joannes.kr/algorithm/boj/boj-%eb%b0%b1%ec%a4%80-1193%eb%b2%88-%eb%b6%84%ec%88%98%ec%b0%be%ea%b8%b0-kotlin%ec%bd%94%ed%8b%80%eb%a6%b0/)
- [ ] `WP#416` · 원문 2023-05-22 · **[BOJ 백준] 1934번 : 최소공배수 – Kotlin[코틀린]** · [원문](https://blog.joannes.kr/algorithm/boj/boj-%eb%b0%b1%ec%a4%80-1934%eb%b2%88-%ec%b5%9c%ec%86%8c%ea%b3%b5%eb%b0%b0%ec%88%98-kotlin%ec%bd%94%ed%8b%80%eb%a6%b0/)
- [ ] `WP#411` · 원문 2023-03-15 · **[BOJ 백준] 2164번 : 카드2 – Kotlin[코틀린]** · [원문](https://blog.joannes.kr/algorithm/boj/boj-%eb%b0%b1%ec%a4%80-2164%eb%b2%88-%ec%b9%b4%eb%93%9c2-kotlin%ec%bd%94%ed%8b%80%eb%a6%b0/)
- [ ] `WP#408` · 원문 2023-03-14 · **[Jenkins] trackingSubmodules 옵션에 관하여** · [원문](https://blog.joannes.kr/memo/jenkins-trackingsubmodules-%ec%98%b5%ec%85%98%ec%97%90-%ea%b4%80%ed%95%98%ec%97%ac/)

### 2026-08-24 (월) — 2편

- [ ] `WP#404` · 원문 2022-12-11 · **[Review] 넥스트스텝 교육콘서트 2기 간단 후기** · [원문](https://blog.joannes.kr/memo/review-%eb%84%a5%ec%8a%a4%ed%8a%b8%ec%8a%a4%ed%85%9d-%ea%b5%90%ec%9c%a1%ec%bd%98%ec%84%9c%ed%8a%b8-2%ea%b8%b0-%ea%b0%84%eb%8b%a8-%ed%9b%84%ea%b8%b0/)
- [ ] `WP#393` · 원문 2022-11-16 · **[Ubuntu] Python 버전 변경하는 방법** · [원문](https://blog.joannes.kr/linux/ubuntu-python-%eb%b2%84%ec%a0%84-%eb%b3%80%ea%b2%bd%ed%95%98%eb%8a%94-%eb%b0%a9%eb%b2%95/)

### 2026-08-25 (화) — 2편

- [ ] `WP#390` · 원문 2022-04-29 · **[Design Patterns] Model View Controller 패턴** · [원문](https://blog.joannes.kr/design-patterns/design-patterns-model-view-controller-%ed%8c%a8%ed%84%b4/)
- [ ] `WP#384` · 원문 2022-04-28 · **Test Driven Development(테스트 주도 개발, TDD)** · [원문](https://blog.joannes.kr/tdd/test-driven-development%ed%85%8c%ec%8a%a4%ed%8a%b8-%ec%a3%bc%eb%8f%84-%ea%b0%9c%eb%b0%9c-tdd/)

### 2026-08-26 (수) — 2편

- [ ] `WP#532` · 원문 2021-11-30 · **MPEG-2 TS(Transport Stream)** · [원문](https://blog.joannes.kr/mpeg/mpeg-2-ts-transport-stream/)
- [ ] `WP#382` · 원문 2021-09-13 · **[C] 댕글링 포인터(Dangling Pointer)** · [원문](https://blog.joannes.kr/programming/c/c-%eb%8c%95%ea%b8%80%eb%a7%81-%ed%8f%ac%ec%9d%b8%ed%84%b0dangling-pointer/)

### 2026-08-27 (목) — 2편

- [ ] `WP#368` · 원문 2021-09-13 · **[C] 메모리 누수(Memory Leak)** · [원문](https://blog.joannes.kr/programming/c/c-%eb%a9%94%eb%aa%a8%eb%a6%ac-%eb%88%84%ec%88%98memory-leak/)
- [ ] `WP#363` · 원문 2021-09-10 · **[C] 포인터와 메모리** · [원문](https://blog.joannes.kr/programming/c/c-%ed%8f%ac%ec%9d%b8%ed%84%b0%ec%99%80-%eb%a9%94%eb%aa%a8%eb%a6%ac/)

### 2026-08-28 (금) — 2편

- [ ] `WP#351` · 원문 2021-05-12 · **[Android] Kotlin을 활용한 android.os.properties 접근** · [원문](https://blog.joannes.kr/android/kotlin%ec%9d%84-%ed%99%9c%ec%9a%a9%ed%95%9c-android-os-properties-%ec%a0%91%ea%b7%bc/)
- [ ] `WP#339` · 원문 2021-03-09 · **[Android] ADB를 이용한 파일 복사(adb pull / push)** · [원문](https://blog.joannes.kr/android/android-adb%eb%a5%bc-%ec%9d%b4%ec%9a%a9%ed%95%9c-%ed%8c%8c%ec%9d%bc-%eb%b3%b5%ec%82%acadb-pull-push/)

### 2026-08-29 (토) — 4편

- [ ] `WP#320` · 원문 2021-03-09 · **[Docker] Volume에 대한 이해와 활용** · [원문](https://blog.joannes.kr/docker/docker-volume%ec%97%90-%eb%8c%80%ed%95%9c-%ec%9d%b4%ed%95%b4%ec%99%80-%ed%99%9c%ec%9a%a9/)
- [ ] `WP#307` · 원문 2021-03-05 · **[macOS, Big Sur] VirtualBox Kernel driver not installed (rc=-1908) 해결** · [원문](https://blog.joannes.kr/memo/macos-big-sur-virtualbox-kernel-driver-not-installed-rc-1908-%ed%95%b4%ea%b2%b0/)
- [ ] `WP#252` · 원문 2021-02-18 · **[Android] Layout Mechanism 정리** · [원문](https://blog.joannes.kr/android/android-layout-mechanism-%ec%a0%95%eb%a6%ac/)
- [ ] `WP#247` · 원문 2020-12-06 · **[Ubuntu 16.04] VIM 8.2 설치** · [원문](https://blog.joannes.kr/linux/ubuntu-16-04-vim-8-2-%ec%84%a4%ec%b9%98/)

### 2026-08-30 (일) — 4편

- [ ] `WP#566` · 원문 2020-09-30 · **[Android] TV 레이아웃 구성** · [원문](https://blog.joannes.kr/android/android-tv-%eb%a0%88%ec%9d%b4%ec%95%84%ec%9b%83-%ea%b5%ac%ec%84%b1/)
- [ ] `WP#591` · 원문 2020-09-29 · **[Android] View/ViewGroup 개념 정리** · [원문](https://blog.joannes.kr/android/android-view-layout-%ea%b0%9c%eb%85%90-%ec%a0%95%eb%a6%ac/)
- [ ] `WP#209` · 원문 2020-09-15 · **[Kotlin] IntelliJ IDEA 설치(with 학생 인증)** · [원문](https://blog.joannes.kr/programming/kotlin/kotlin-intellij-idea-%ec%84%a4%ec%b9%98with-%ed%95%99%ec%83%9d-%ec%9d%b8%ec%a6%9d/)
- [ ] `WP#206` · 원문 2020-09-11 · **[Android] 외부저장소에 파일 Read/Write 시에 발생하는 Permission denied 해결 방법** · [원문](https://blog.joannes.kr/android/android-%ec%99%b8%eb%b6%80%ec%a0%80%ec%9e%a5%ec%86%8c%ec%97%90-%ed%8c%8c%ec%9d%bc-read-write-%ec%8b%9c%ec%97%90-%eb%b0%9c%ec%83%9d%ed%95%98%eb%8a%94-permission-denied-%ed%95%b4%ea%b2%b0/)

### 2026-08-31 (월) — 2편

- [ ] `WP#202` · 원문 2020-09-11 · **[Android] 안드로이드 스튜디오 waiting for target device to come online 무한 로딩 해결 방법** · [원문](https://blog.joannes.kr/android/android-%ec%95%88%eb%93%9c%eb%a1%9c%ec%9d%b4%eb%93%9c-%ec%8a%a4%ed%8a%9c%eb%94%94%ec%98%a4-waiting-for-target-device-to-come-online-%eb%ac%b4%ed%95%9c-%eb%a1%9c%eb%94%a9-%ed%95%b4%ea%b2%b0/)
- [ ] `WP#147` · 원문 2020-08-21 · **[Ubuntu 16.04] 고정 IP 설정** · [원문](https://blog.joannes.kr/linux/ubuntu-16-04-%ea%b3%a0%ec%a0%95-ip-%ec%84%a4%ec%a0%95/)

### 2026-09-01 (화) — 2편

- [ ] `WP#165` · 원문 2020-08-21 · **[C] 구조체 정렬(메모리 패딩)** · [원문](https://blog.joannes.kr/programming/c/c%ec%96%b8%ec%96%b4-%ea%b5%ac%ec%a1%b0%ec%b2%b4-%ec%a0%95%eb%a0%ac-%eb%a9%94%eb%aa%a8%eb%a6%ac-%ed%8c%a8%eb%94%a9-memory-padding/)
- [ ] `WP#174` · 원문 2020-08-21 · **[Linux] tmux 설치 방법** · [원문](https://blog.joannes.kr/linux/tmux-%ec%84%a4%ec%b9%98-%eb%b0%a9%eb%b2%95/)

### 2026-09-02 (수) — 2편

- [ ] `WP#152` · 원문 2020-08-20 · **[Docker] macOS에서 설치하는 방법** · [원문](https://blog.joannes.kr/docker/docker-macos%ec%97%90%ec%84%9c-%ec%84%a4%ec%b9%98%ed%95%98%eb%8a%94-%eb%b0%a9%eb%b2%95/)
- [ ] `WP#142` · 원문 2020-08-11 · **[Linux] gcc -E 옵션** · [원문](https://blog.joannes.kr/linux/linux-gcc-e-opt/)

### 2026-09-03 (목) — 2편

- [ ] `WP#85` · 원문 2020-08-10 · **[Linux] Process Address** · [원문](https://blog.joannes.kr/linux/linux-process-address/)
- [ ] `WP#81` · 원문 2020-08-09 · **[Ubuntu 16.04] DNS 설정** · [원문](https://blog.joannes.kr/linux/ubuntu-16-04-dns-setting/)

### 2026-09-04 (금) — 2편

- [ ] `WP#51` · 원문 2020-04-29 · **[bash] 경과시간 출력하기** · [원문](https://blog.joannes.kr/linux/bash-%ea%b2%bd%ea%b3%bc%ec%8b%9c%ea%b0%84-%ec%b6%9c%eb%a0%a5%ed%95%98%ea%b8%b0/)
- [ ] `WP#47` · 원문 2020-04-05 · **make 컴파일 에러시 쉘 스크립트 중단** · [원문](https://blog.joannes.kr/linux/make-%ec%bb%b4%ed%8c%8c%ec%9d%bc-%ec%97%90%eb%9f%ac%ec%8b%9c-%ec%89%98-%ec%8a%a4%ed%81%ac%eb%a6%bd%ed%8a%b8-%ec%a4%91%eb%8b%a8/)

### 2026-09-05 (토) — 4편

- [ ] `WP#35` · 원문 2019-08-26 · **[Synology NAS] 리다이렉트(redirect) 설정** · [원문](https://blog.joannes.kr/memo/synology-nas-%eb%a6%ac%eb%8b%a4%ec%9d%b4%eb%a0%89%ed%8a%b8redirect-%ec%84%a4%ec%a0%95/)
- [ ] `WP#930` · 원문 2018-05-18 · **OSTEP 09. Lottery Scheduling** · [원문](https://blog.joannes.kr/operating-system/ostep-09-lottery-scheduling/)
- [ ] `WP#914` · 원문 2018-05-15 · **OSTEP 08. Multi-level Feedback** · [원문](https://blog.joannes.kr/operating-system/ostep-08-multi-level-feedback/)
- [ ] `WP#897` · 원문 2018-05-14 · **OSTEP 06. Direct Execution** · [원문](https://blog.joannes.kr/operating-system/ostep-06-direct-execution/)

### 2026-09-06 (일) — 2편

- [ ] `WP#890` · 원문 2018-05-13 · **OSTEP 05. Process API** · [원문](https://blog.joannes.kr/operating-system/ostep-05-process-api/)
- [ ] `WP#879` · 원문 2018-05-13 · **OSTEP 04. Processes** · [원문](https://blog.joannes.kr/operating-system/os-processes/)
