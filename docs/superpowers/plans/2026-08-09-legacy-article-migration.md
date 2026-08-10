# Legacy Article Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the 76 remaining public articles from `blog.joannes.kr` into the Astro content collection on a predictable daily schedule, with one signed commit per article and Git-based progress synchronization across devices.

**Architecture:** Treat the WordPress REST API snapshot and WordPress post ID as the migration inventory. Convert one source post into one validated Markdown entry under `src/content/blog/<category>/<slug>.md`, store its local media under `public/images/`, and update exactly one schedule checkbox in this document in the same article commit. Work newest-to-oldest, verify each commit independently, and push the completed daily batch once so another device can resume with `git pull --ff-only`.

**Tech Stack:** WordPress REST API, Astro 7 content collections, Markdown/GFM, build-time Mermaid SVG, Vitest, Playwright, Git, signed commits, GitHub Pages

## Global Constraints

- Source inventory snapshot: 80 public WordPress posts as of 2026-08-09; exclude drafts, private posts, pages, and comments.
- Already migrated WordPress posts: `WP#859`, `WP#810`, `WP#848`, and `WP#902`; migrate the remaining 76 posts only.
- Schedule work from 2026-08-10 through 2026-09-08: two articles per weekday and four articles per Saturday or Sunday.
- Use the dates below as planned work dates. Never backdate a commit; use the actual local completion time.
- Create exactly one meaningful signed commit per article, except for the user-approved `WP#969`, `WP#966`, `WP#958`, `WP#952`, `WP#948`, and `WP#939` English batch migrated together on 2026-08-09. Include each article, only its required assets, and its completed checkbox in the applicable commit.
- Stop immediately if Git requests a signing passphrase; never request or enter it.
- Preserve each source post's original publication date in `publishedAt`; use `updatedAt` only when the migrated article receives a substantive correction.
- Publish each article at `/{category}/{slug}/`; choose a lowercase route-safe category and a concise stable slug before the first commit, then do not rename a published route casually.
- Keep article bodies in Korean unless an English technical term is clearer. English-learning articles may retain their Korean explanations and English examples.
- Do not migrate comments and do not add search, automatic RSS, multilingual routing, or custom-domain DNS changes.
- Download editorial images into `public/images/` and use root-relative Markdown paths. Do not hotlink WordPress-hosted media.
- Convert Mermaid sources to fenced `mermaid` blocks so they render as build-time SVG. Do not replace ordinary editorial images with Mermaid.
- A source being old or technically dated is not permission to silently rewrite it. Preserve the historical context and make factual corrections explicit.
- Before claiming a daily batch is release-ready, run `npm run check`, `npm run test`, `npm run build`, and `npm run test:e2e`, then inspect representative migrated articles at desktop, tablet, and mobile widths.

---

## Scope baseline

The four completed migrations are recorded here only to make the subtraction auditable:

| WordPress ID | Source date | Migrated article                   |
| ------------ | ----------- | ---------------------------------- |
| `WP#902`     | 2018-05-14  | OSTEP 07. CPU Scheduling           |
| `WP#848`     | 2024-05-27  | MTU와 MSS                          |
| `WP#810`     | 2024-06-20  | JavaScript Map과 일반 객체         |
| `WP#859`     | 2024-07-16  | Kotlin 유용한 표준 라이브러리 함수 |

`80 public posts - 4 completed migrations = 76 remaining migrations`.

## File structure

| Path                                                            | Responsibility                                                          |
| --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `src/content/blog/<category>/<slug>.md`                         | One migrated article with validated frontmatter and Markdown body       |
| `public/images/`                                                | Local image assets referenced by migrated articles                      |
| `docs/superpowers/plans/2026-08-09-legacy-article-migration.md` | Source inventory, planned dates, and cross-device progress ledger       |
| `docs/content-guide.md`                                         | Required frontmatter, authoring rules, image policy, and Mermaid syntax |
| `ARCHITECTURE.md`                                               | Content flow, route ownership, and deployment behavior                  |

## Original schedule summary

| Week | Planned dates         | Weekdays | Weekend | Articles | Cumulative |
| ---- | --------------------- | -------: | ------: | -------: | ---------: |
| 1    | 2026-08-10–2026-08-16 |       10 |       8 |       18 |         18 |
| 2    | 2026-08-17–2026-08-23 |       10 |       8 |       18 |         36 |
| 3    | 2026-08-24–2026-08-30 |       10 |       8 |       18 |         54 |
| 4    | 2026-08-31–2026-09-06 |       10 |       8 |       18 |         72 |
| 5    | 2026-09-07–2026-09-08 |        4 |       0 |        4 |         76 |

The original allocation covered 76 migrations over 30 consecutive calendar days. The six English articles originally assigned to 2026-08-10 through 2026-08-12 were completed early on 2026-08-09 in one approved exception commit, leaving 70 individual article migrations. The remaining date allocation will be rebaselined in a separate plan revision.

## Per-article execution protocol

Apply all steps below to each remaining unchecked schedule item. The checkbox itself is the durable progress record. The six-item English batch is the only approved exception to the one-article-per-commit rule.

1. **Step 1: Synchronize before editing**

Run `git status --short --branch`, confirm there are no unexplained local changes, then run `git pull --ff-only`. When changing devices during a daily batch, push completed signed commits from the first device before pulling on the second.

2. **Step 2: Audit the source article**

Open the linked WordPress source and record its title, publication date, body structure, code language, tables, links, images, captions, and any Mermaid source. Confirm the WordPress ID matches the schedule item so similarly titled posts are not confused.

3. **Step 3: Choose the destination route**

Select one established route-safe category and a concise lowercase slug. Confirm that `src/content/blog/<category>/<slug>.md` does not already exist and that the resulting `/{category}/{slug}/` URL does not collide with a published article.

4. **Step 4: Create the Markdown entry and local assets**

Create the article using the exact required frontmatter from `docs/content-guide.md`: `title`, `description`, `publishedAt`, `category`, and `tags`. Preserve the source publication date, convert WordPress markup to readable Markdown/GFM, add fenced language identifiers to code, and download referenced editorial media into `public/images/`.

5. **Step 5: Validate the individual article**

Run:

```bash
npm run check
npm run test
npm run build
```

Expected: all three commands exit with status 0; malformed frontmatter, broken Mermaid, invalid collection entries, and unit regressions block the commit.

6. **Step 6: Inspect responsive rendering**

Serve the production build and inspect the new article at desktop, tablet, and mobile widths. Confirm headings, code, tables, images, inline SVG, links, and adjacent navigation remain inside the article layout and are readable.

7. **Step 7: Record progress and create one signed commit**

Change only that article's schedule marker from `- [ ]` to `- [x]`. Stage the Markdown entry, its assets, and this plan file, then create one signed commit:

```bash
git add src/content/blog/<category>/<slug>.md public/images/ docs/superpowers/plans/2026-08-09-legacy-article-migration.md
git commit -S -m "content(<category>): migrate <slug>"
```

Before confirming, inspect `git diff --cached --stat` and remove unrelated paths from the index. Expected: one independently reviewable signed commit for one migrated WordPress article.

## Daily closeout and synchronization

After all articles planned for the date are committed:

- Run `npm run check`, `npm run test`, `npm run build`, and `npm run test:e2e`.
- Inspect at least one simple article and every rich-content article added that day at desktop, tablet, and mobile widths.
- Run `git log --show-signature -<daily-article-count>` and confirm every article has its own valid signature.
- Run `git status --short --branch` and confirm the worktree is clean.
- Run `git push origin main`, then confirm the GitHub Pages workflow succeeds.
- On another device, run `git pull --ff-only` before resuming work.

If a planned day is missed, leave its checkboxes unchecked and process those articles first on the next work session. Do not exceed that day's weekday or weekend capacity merely to catch up; the completion date moves later while the newest-to-oldest order remains unchanged.

## Migration calendar

> Early completion: `WP#969`, `WP#966`, `WP#958`, `WP#952`, `WP#948`, and `WP#939` were migrated together on 2026-08-09. Their original date headings remain visible until the 70-item remainder is rebaselined.

### 2026-08-10 (월) — 2개

- [x] `WP#969` · 원문 2026-05-27 · **run 구동사 정리: run out, run into 뜻과 예문** · [원문](https://blog.joannes.kr/english/run-phrasal-verbs/)
- [x] `WP#966` · 원문 2026-05-20 · **get 구동사 정리: get over, get down, get by, get at 뜻과 예문** · [원문](https://blog.joannes.kr/english/get-phrasal-verbs/)

### 2026-08-11 (화) — 2개

- [x] `WP#958` · 원문 2026-05-13 · **take 구동사 정리: take up, take out, take off, take over 뜻과 예문** · [원문](https://blog.joannes.kr/english/take-phrasal-verbs/)
- [x] `WP#952` · 원문 2026-05-06 · **make 구동사 정리: make up, make out, make of 뜻과 예문** · [원문](https://blog.joannes.kr/english/make-phrasal-verbs/)

### 2026-08-12 (수) — 2개

- [x] `WP#948` · 원문 2026-05-04 · **pick up 뜻과 예문 정리: 줍다, 데리러 가다, 배우다** · [원문](https://blog.joannes.kr/english/pick-up-phrasal-verb/)
- [x] `WP#939` · 원문 2026-05-04 · **구동사(Phrasal Verbs)란? 기본 개념과 공부법** · [원문](https://blog.joannes.kr/english/%ec%98%81%ec%96%b4-%ea%b5%ac%eb%8f%99%ec%82%ac%eb%9e%80-%ea%b8%b0%eb%b3%b8-%ea%b0%9c%eb%85%90%ea%b3%bc-%ea%b3%b5%eb%b6%80%eb%b2%95/)

### 2026-08-13 (목) — 2개

> Route decisions recorded on 2026-08-10:
>
> - `WP#855` will be added at `/web/promise-and-async-await/`. It intentionally coexists with `/web/javascript-async-await/`, whose error-and-cancellation focus is distinct.
> - `WP#802` will be added at `/software-development/base-encoding/`.
> - Neither source has editorial images to download. Each article remains an individual signed commit on 2026-08-13, including only its Markdown entry and completed checkbox.

- [ ] `WP#855` · 원문 2024-07-08 · **[JavaScript] Promise와 async/await** · [원문](https://blog.joannes.kr/programming/javascript-typescript/javascript-promise%ec%99%80-async-await/)
- [ ] `WP#802` · 원문 2024-06-17 · **[Software Development] BASE 인코딩 개념 정리** · [원문](https://blog.joannes.kr/software-development/software-development-base-%ec%9d%b8%ec%bd%94%eb%94%a9-%ea%b0%9c%eb%85%90-%ec%a0%95%eb%a6%ac/)

### 2026-08-14 (금) — 2개

- [ ] `WP#795` · 원문 2024-06-11 · **[JavaScript] 싱글톤 패턴(Singleton Pattern)의 이해와 구현 방법** · [원문](https://blog.joannes.kr/programming/javascript-typescript/javascript-%ec%9e%90%eb%b0%94%ec%8a%a4%ed%81%ac%eb%a6%bd%ed%8a%b8-singleton-pattern-%ec%8b%b1%ea%b8%80%ed%86%a4-%ed%8c%a8%ed%84%b4/)
- [ ] `WP#791` · 원문 2024-06-11 · **[JavaScript] var, let, const 선언 및 호이스팅(Hoisting) 개념 이해** · [원문](https://blog.joannes.kr/programming/javascript-typescript/javascript-var-let-const-%ec%84%a0%ec%96%b8-%eb%b0%8f-%ed%98%b8%ec%9d%b4%ec%8a%a4%ed%8c%85hoisting-%ea%b0%9c%eb%85%90-%ec%9d%b4%ed%95%b4/)

### 2026-08-15 (토) — 4개

- [ ] `WP#775` · 원문 2024-06-03 · **[Web Development] Window, Document, Navigator, Location, History 객체 정리** · [원문](https://blog.joannes.kr/web-development/web-development-window-document-navigator-location-history-%ea%b0%9d%ec%b2%b4-%ec%a0%95%eb%a6%ac/)
- [ ] `WP#768` · 원문 2024-04-30 · **[BOJ 백준] 1904번 : 01타일 – Kotlin[코틀린]** · [원문](https://blog.joannes.kr/algorithm/boj/boj-%eb%b0%b1%ec%a4%80-1904%eb%b2%88-01%ed%83%80%ec%9d%bc-kotlin%ec%bd%94%ed%8b%80%eb%a6%b0/)
- [ ] `WP#783` · 원문 2024-04-18 · **[Java] ConcurrentModificationException의 원인과 해결책** · [원문](https://blog.joannes.kr/programming/java/java-concurrentmodificationexception%ec%9d%98-%ec%9b%90%ec%9d%b8%ea%b3%bc-%ed%95%b4%ea%b2%b0%ec%b1%85/)
- [ ] `WP#760` · 원문 2024-03-29 · **[Linux] netstat 명령어 사용법** · [원문](https://blog.joannes.kr/linux/linux-netstat-%eb%aa%85%eb%a0%b9%ec%96%b4-%ec%82%ac%ec%9a%a9%eb%b2%95/)

### 2026-08-16 (일) — 4개

- [ ] `WP#748` · 원문 2024-03-18 · **[Linux] tcpdump** · [원문](https://blog.joannes.kr/linux/linux-tcpdump/)
- [ ] `WP#741` · 원문 2024-03-18 · **[Linux] nc(Netcat) 사용법에 대한 이해와 활용** · [원문](https://blog.joannes.kr/linux/linux-nc_netcat-%ec%82%ac%ec%9a%a9%eb%b2%95%ec%97%90-%eb%8c%80%ed%95%9c-%ec%9d%b4%ed%95%b4%ec%99%80-%ed%99%9c%ec%9a%a9/)
- [ ] `WP#720` · 원문 2024-03-14 · **[Git] Git LFS에 대한 이해와 사용법** · [원문](https://blog.joannes.kr/git/git-lfs%ec%97%90-%eb%8c%80%ed%95%9c-%ec%9d%b4%ed%95%b4%ec%99%80-%ec%82%ac%ec%9a%a9%eb%b2%95/)
- [ ] `WP#705` · 원문 2024-03-12 · **[Programming] 동적 계획법(Dynamic Programming)** · [원문](https://blog.joannes.kr/programming/programming-%eb%8f%99%ec%a0%81-%ea%b3%84%ed%9a%8d%eb%b2%95dynamic-programming/)

### 2026-08-17 (월) — 2개

- [ ] `WP#699` · 원문 2024-03-12 · **[Programming] 재귀함수(Recursive Function)** · [원문](https://blog.joannes.kr/programming/programming-%ec%9e%ac%ea%b7%80%ed%95%a8%ec%88%98recursive-function/)
- [ ] `WP#690` · 원문 2024-03-11 · **[Kotlin] PriorityQueue** · [원문](https://blog.joannes.kr/programming/kotlin/kotlin-priorityqueue-%ec%bd%94%ed%8b%80%eb%a6%b0-%ec%9a%b0%ec%84%a0%ec%88%9c%ec%9c%84%ed%81%90/)

### 2026-08-18 (화) — 2개

- [ ] `WP#663` · 원문 2024-02-29 · **[Android] Android Compose 소개** · [원문](https://blog.joannes.kr/android/android-android-compose/)
- [ ] `WP#639` · 원문 2024-01-24 · **[Kotlin] Custom Kotlin delegates** · [원문](https://blog.joannes.kr/programming/kotlin/custom-kotlin-delegates/)

### 2026-08-19 (수) — 2개

- [ ] `WP#521` · 원문 2024-01-12 · **[Kotlin] Annotation** · [원문](https://blog.joannes.kr/programming/kotlin/kotlin-custom-annotation-%ec%bb%a4%ec%8a%a4%ed%85%80-%ec%96%b4%eb%85%b8%ed%85%8c%ec%9d%b4%ec%85%98/)
- [ ] `WP#754` · 원문 2024-01-11 · **[Software Development] CI/CD 모범 사례** · [원문](https://blog.joannes.kr/software-development/ci-cd-%eb%aa%a8%eb%b2%94-%ec%82%ac%eb%a1%80/)

### 2026-08-20 (목) — 2개

- [ ] `WP#633` · 원문 2024-01-05 · **[Software Development] 2023/2024 소프트웨어 개발 동향** · [원문](https://blog.joannes.kr/software-development/software-development-trends-2023-2024/)
- [ ] `WP#682` · 원문 2024-01-01 · **[Android] Jetpack Compose** · [원문](https://blog.joannes.kr/android/android-jetpack-compose/)

### 2026-08-21 (금) — 2개

- [ ] `WP#684` · 원문 2023-12-28 · **[Software Development] API Design 101: 기본부터 모범 사례까지(From Basics to Best Practices)** · [원문](https://blog.joannes.kr/software-development/api-design-101-%ea%b8%b0%eb%b3%b8%eb%b6%80%ed%84%b0-%eb%aa%a8%eb%b2%94-%ec%82%ac%eb%a1%80%ea%b9%8c%ec%a7%80-from-basics-to-best-practices/)
- [ ] `WP#657` · 원문 2023-12-27 · **[Software Development] 모바일 애플리케이션 아키텍처 vs. 디자인 패턴** · [원문](https://blog.joannes.kr/software-development/mobile-application-architecture-vs-design-patterns/)

### 2026-08-22 (토) — 4개

- [ ] `WP#627` · 원문 2023-12-21 · **[Software Development] 기술 부채를 다루는 방법** · [원문](https://blog.joannes.kr/software-development/how-to-deal-with-technical-debt/)
- [ ] `WP#725` · 원문 2023-11-29 · **[Software Development] 스프링 부트에서 데이터 전송 객체 (DTO)** · [원문](https://blog.joannes.kr/article-%ec%a0%95%eb%a6%ac/%ec%8a%a4%ed%94%84%eb%a7%81-%eb%b6%80%ed%8a%b8%ec%97%90%ec%84%9c-%eb%8d%b0%ec%9d%b4%ed%84%b0-%ec%a0%84%ec%86%a1-%ea%b0%9d%ec%b2%b4-dto/)
- [ ] `WP#635` · 원문 2023-11-13 · **[Kotlin] 다형성과 인터페이스** · [원문](https://blog.joannes.kr/programming/kotlin/kotlin-%eb%8b%a4%ed%98%95%ec%84%b1%ea%b3%bc-%ec%9d%b8%ed%84%b0%ed%8e%98%ec%9d%b4%ec%8a%a4/)
- [ ] `WP#625` · 원문 2023-09-29 · **[Database] 데이터베이스 유형, 스케일링, 성능 최적화** · [원문](https://blog.joannes.kr/database/database-%eb%8d%b0%ec%9d%b4%ed%84%b0%eb%b2%a0%ec%9d%b4%ec%8a%a4-%ec%9c%a0%ed%98%95-%ec%8a%a4%ec%bc%80%ec%9d%bc%eb%a7%81-%ec%84%b1%eb%8a%a5-%ec%b5%9c%ec%a0%81%ed%99%94/)

### 2026-08-23 (일) — 4개

- [ ] `WP#508` · 원문 2023-07-29 · **[Network] URI, URL 및 URN 정리** · [원문](https://blog.joannes.kr/web-development/network-uri-url-%eb%b0%8f-urn-%ec%a0%95%eb%a6%ac/)
- [ ] `WP#485` · 원문 2023-07-26 · **[Web Development] CSR (Client-Side Rendering)과 SSR (Server-Side Rendering) 이해하기** · [원문](https://blog.joannes.kr/web-development/web-development-csr-client-side-rendering%ea%b3%bc-ssr-server-side-rendering-%ec%9d%b4%ed%95%b4%ed%95%98%ea%b8%b0/)
- [ ] `WP#472` · 원문 2023-07-17 · **[Web Development] CORS (Cross-Origin Resource Sharing) 이해하기** · [원문](https://blog.joannes.kr/web-development/cors-cross-origin-resource-sharing-%ec%9d%b4%ed%95%b4/)
- [ ] `WP#468` · 원문 2023-07-13 · **[C] qsort() 함수** · [원문](https://blog.joannes.kr/programming/c/c-qsort-%ed%95%a8%ec%88%98/)

### 2026-08-24 (월) — 2개

- [ ] `WP#464` · 원문 2023-07-10 · **[Kotlin] Array와 IntArray의 차이점** · [원문](https://blog.joannes.kr/programming/kotlin/kotlin-array%ec%99%80-intarray%ec%9d%98-%ec%b0%a8%ec%9d%b4%ec%a0%90/)
- [ ] `WP#430` · 원문 2023-06-16 · **[BOJ 백준] 19532번 : 수학은 비대면강의입니다 – Kotlin[코틀린]** · [원문](https://blog.joannes.kr/algorithm/boj/boj-%eb%b0%b1%ec%a4%80-19532%eb%b2%88-%ec%88%98%ed%95%99%ec%9d%80-%eb%b9%84%eb%8c%80%eb%a9%b4%ea%b0%95%ec%9d%98%ec%9e%85%eb%8b%88%eb%8b%a4-kotlin%ec%bd%94%ed%8b%80%eb%a6%b0/)

### 2026-08-25 (화) — 2개

- [ ] `WP#423` · 원문 2023-06-07 · **[BOJ 백준] 1193번 : 분수찾기 – Kotlin[코틀린]** · [원문](https://blog.joannes.kr/algorithm/boj/boj-%eb%b0%b1%ec%a4%80-1193%eb%b2%88-%eb%b6%84%ec%88%98%ec%b0%be%ea%b8%b0-kotlin%ec%bd%94%ed%8b%80%eb%a6%b0/)
- [ ] `WP#416` · 원문 2023-05-22 · **[BOJ 백준] 1934번 : 최소공배수 – Kotlin[코틀린]** · [원문](https://blog.joannes.kr/algorithm/boj/boj-%eb%b0%b1%ec%a4%80-1934%eb%b2%88-%ec%b5%9c%ec%86%8c%ea%b3%b5%eb%b0%b0%ec%88%98-kotlin%ec%bd%94%ed%8b%80%eb%a6%b0/)

### 2026-08-26 (수) — 2개

- [ ] `WP#411` · 원문 2023-03-15 · **[BOJ 백준] 2164번 : 카드2 – Kotlin[코틀린]** · [원문](https://blog.joannes.kr/algorithm/boj/boj-%eb%b0%b1%ec%a4%80-2164%eb%b2%88-%ec%b9%b4%eb%93%9c2-kotlin%ec%bd%94%ed%8b%80%eb%a6%b0/)
- [ ] `WP#408` · 원문 2023-03-14 · **[Jenkins] trackingSubmodules 옵션에 관하여** · [원문](https://blog.joannes.kr/memo/jenkins-trackingsubmodules-%ec%98%b5%ec%85%98%ec%97%90-%ea%b4%80%ed%95%98%ec%97%ac/)

### 2026-08-27 (목) — 2개

- [ ] `WP#404` · 원문 2022-12-11 · **[Review] 넥스트스텝 교육콘서트 2기 간단 후기** · [원문](https://blog.joannes.kr/memo/review-%eb%84%a5%ec%8a%a4%ed%8a%b8%ec%8a%a4%ed%85%9d-%ea%b5%90%ec%9c%a1%ec%bd%98%ec%84%9c%ed%8a%b8-2%ea%b8%b0-%ea%b0%84%eb%8b%a8-%ed%9b%84%ea%b8%b0/)
- [ ] `WP#393` · 원문 2022-11-16 · **[Ubuntu] Python 버전 변경하는 방법** · [원문](https://blog.joannes.kr/linux/ubuntu-python-%eb%b2%84%ec%a0%84-%eb%b3%80%ea%b2%bd%ed%95%98%eb%8a%94-%eb%b0%a9%eb%b2%95/)

### 2026-08-28 (금) — 2개

- [ ] `WP#390` · 원문 2022-04-29 · **[Design Patterns] Model View Controller 패턴** · [원문](https://blog.joannes.kr/design-patterns/design-patterns-model-view-controller-%ed%8c%a8%ed%84%b4/)
- [ ] `WP#384` · 원문 2022-04-28 · **Test Driven Development(테스트 주도 개발, TDD)** · [원문](https://blog.joannes.kr/tdd/test-driven-development%ed%85%8c%ec%8a%a4%ed%8a%b8-%ec%a3%bc%eb%8f%84-%ea%b0%9c%eb%b0%9c-tdd/)

### 2026-08-29 (토) — 4개

- [ ] `WP#532` · 원문 2021-11-30 · **MPEG-2 TS(Transport Stream)** · [원문](https://blog.joannes.kr/mpeg/mpeg-2-ts-transport-stream/)
- [ ] `WP#382` · 원문 2021-09-13 · **[C] 댕글링 포인터(Dangling Pointer)** · [원문](https://blog.joannes.kr/programming/c/c-%eb%8c%95%ea%b8%80%eb%a7%81-%ed%8f%ac%ec%9d%b8%ed%84%b0dangling-pointer/)
- [ ] `WP#368` · 원문 2021-09-13 · **[C] 메모리 누수(Memory Leak)** · [원문](https://blog.joannes.kr/programming/c/c-%eb%a9%94%eb%aa%a8%eb%a6%ac-%eb%88%84%ec%88%98memory-leak/)
- [ ] `WP#363` · 원문 2021-09-10 · **[C] 포인터와 메모리** · [원문](https://blog.joannes.kr/programming/c/c-%ed%8f%ac%ec%9d%b8%ed%84%b0%ec%99%80-%eb%a9%94%eb%aa%a8%eb%a6%ac/)

### 2026-08-30 (일) — 4개

- [ ] `WP#351` · 원문 2021-05-12 · **[Android] Kotlin을 활용한 android.os.properties 접근** · [원문](https://blog.joannes.kr/android/kotlin%ec%9d%84-%ed%99%9c%ec%9a%a9%ed%95%9c-android-os-properties-%ec%a0%91%ea%b7%bc/)
- [ ] `WP#339` · 원문 2021-03-09 · **[Android] ADB를 이용한 파일 복사(adb pull / push)** · [원문](https://blog.joannes.kr/android/android-adb%eb%a5%bc-%ec%9d%b4%ec%9a%a9%ed%95%9c-%ed%8c%8c%ec%9d%bc-%eb%b3%b5%ec%82%acadb-pull-push/)
- [ ] `WP#320` · 원문 2021-03-09 · **[Docker] Volume에 대한 이해와 활용** · [원문](https://blog.joannes.kr/docker/docker-volume%ec%97%90-%eb%8c%80%ed%95%9c-%ec%9d%b4%ed%95%b4%ec%99%80-%ed%99%9c%ec%9a%a9/)
- [ ] `WP#307` · 원문 2021-03-05 · **[macOS, Big Sur] VirtualBox Kernel driver not installed (rc=-1908) 해결** · [원문](https://blog.joannes.kr/memo/macos-big-sur-virtualbox-kernel-driver-not-installed-rc-1908-%ed%95%b4%ea%b2%b0/)

### 2026-08-31 (월) — 2개

- [ ] `WP#252` · 원문 2021-02-18 · **[Android] Layout Mechanism 정리** · [원문](https://blog.joannes.kr/android/android-layout-mechanism-%ec%a0%95%eb%a6%ac/)
- [ ] `WP#247` · 원문 2020-12-06 · **[Ubuntu 16.04] VIM 8.2 설치** · [원문](https://blog.joannes.kr/linux/ubuntu-16-04-vim-8-2-%ec%84%a4%ec%b9%98/)

### 2026-09-01 (화) — 2개

- [ ] `WP#566` · 원문 2020-09-30 · **[Android] TV 레이아웃 구성** · [원문](https://blog.joannes.kr/android/android-tv-%eb%a0%88%ec%9d%b4%ec%95%84%ec%9b%83-%ea%b5%ac%ec%84%b1/)
- [ ] `WP#591` · 원문 2020-09-29 · **[Android] View/ViewGroup 개념 정리** · [원문](https://blog.joannes.kr/android/android-view-layout-%ea%b0%9c%eb%85%90-%ec%a0%95%eb%a6%ac/)

### 2026-09-02 (수) — 2개

- [ ] `WP#209` · 원문 2020-09-15 · **[Kotlin] IntelliJ IDEA 설치(with 학생 인증)** · [원문](https://blog.joannes.kr/programming/kotlin/kotlin-intellij-idea-%ec%84%a4%ec%b9%98with-%ed%95%99%ec%83%9d-%ec%9d%b8%ec%a6%9d/)
- [ ] `WP#206` · 원문 2020-09-11 · **[Android] 외부저장소에 파일 Read/Write 시에 발생하는 Permission denied 해결 방법** · [원문](https://blog.joannes.kr/android/android-%ec%99%b8%eb%b6%80%ec%a0%80%ec%9e%a5%ec%86%8c%ec%97%90-%ed%8c%8c%ec%9d%bc-read-write-%ec%8b%9c%ec%97%90-%eb%b0%9c%ec%83%9d%ed%95%98%eb%8a%94-permission-denied-%ed%95%b4%ea%b2%b0/)

### 2026-09-03 (목) — 2개

- [ ] `WP#202` · 원문 2020-09-11 · **[Android] 안드로이드 스튜디오 waiting for target device to come online 무한 로딩 해결 방법** · [원문](https://blog.joannes.kr/android/android-%ec%95%88%eb%93%9c%eb%a1%9c%ec%9d%b4%eb%93%9c-%ec%8a%a4%ed%8a%9c%eb%94%94%ec%98%a4-waiting-for-target-device-to-come-online-%eb%ac%b4%ed%95%9c-%eb%a1%9c%eb%94%a9-%ed%95%b4%ea%b2%b0/)
- [ ] `WP#147` · 원문 2020-08-21 · **[Ubuntu 16.04] 고정 IP 설정** · [원문](https://blog.joannes.kr/linux/ubuntu-16-04-%ea%b3%a0%ec%a0%95-ip-%ec%84%a4%ec%a0%95/)

### 2026-09-04 (금) — 2개

- [ ] `WP#165` · 원문 2020-08-21 · **[C] 구조체 정렬(메모리 패딩)** · [원문](https://blog.joannes.kr/programming/c/c%ec%96%b8%ec%96%b4-%ea%b5%ac%ec%a1%b0%ec%b2%b4-%ec%a0%95%eb%a0%ac-%eb%a9%94%eb%aa%a8%eb%a6%ac-%ed%8c%a8%eb%94%a9-memory-padding/)
- [ ] `WP#174` · 원문 2020-08-21 · **[Linux] tmux 설치 방법** · [원문](https://blog.joannes.kr/linux/tmux-%ec%84%a4%ec%b9%98-%eb%b0%a9%eb%b2%95/)

### 2026-09-05 (토) — 4개

- [ ] `WP#152` · 원문 2020-08-20 · **[Docker] macOS에서 설치하는 방법** · [원문](https://blog.joannes.kr/docker/docker-macos%ec%97%90%ec%84%9c-%ec%84%a4%ec%b9%98%ed%95%98%eb%8a%94-%eb%b0%a9%eb%b2%95/)
- [ ] `WP#142` · 원문 2020-08-11 · **[Linux] gcc -E 옵션** · [원문](https://blog.joannes.kr/linux/linux-gcc-e-opt/)
- [ ] `WP#85` · 원문 2020-08-10 · **[Linux] Process Address** · [원문](https://blog.joannes.kr/linux/linux-process-address/)
- [ ] `WP#81` · 원문 2020-08-09 · **[Ubuntu 16.04] DNS 설정** · [원문](https://blog.joannes.kr/linux/ubuntu-16-04-dns-setting/)

### 2026-09-06 (일) — 4개

- [ ] `WP#51` · 원문 2020-04-29 · **[bash] 경과시간 출력하기** · [원문](https://blog.joannes.kr/linux/bash-%ea%b2%bd%ea%b3%bc%ec%8b%9c%ea%b0%84-%ec%b6%9c%eb%a0%a5%ed%95%98%ea%b8%b0/)
- [ ] `WP#47` · 원문 2020-04-05 · **make 컴파일 에러시 쉘 스크립트 중단** · [원문](https://blog.joannes.kr/linux/make-%ec%bb%b4%ed%8c%8c%ec%9d%bc-%ec%97%90%eb%9f%ac%ec%8b%9c-%ec%89%98-%ec%8a%a4%ed%81%ac%eb%a6%bd%ed%8a%b8-%ec%a4%91%eb%8b%a8/)
- [ ] `WP#35` · 원문 2019-08-26 · **[Synology NAS] 리다이렉트(redirect) 설정** · [원문](https://blog.joannes.kr/memo/synology-nas-%eb%a6%ac%eb%8b%a4%ec%9d%b4%eb%a0%89%ed%8a%b8redirect-%ec%84%a4%ec%a0%95/)
- [ ] `WP#930` · 원문 2018-05-18 · **OSTEP 09. Lottery Scheduling** · [원문](https://blog.joannes.kr/operating-system/ostep-09-lottery-scheduling/)

### 2026-09-07 (월) — 2개

- [ ] `WP#914` · 원문 2018-05-15 · **OSTEP 08. Multi-level Feedback** · [원문](https://blog.joannes.kr/operating-system/ostep-08-multi-level-feedback/)
- [ ] `WP#897` · 원문 2018-05-14 · **OSTEP 06. Direct Execution** · [원문](https://blog.joannes.kr/operating-system/ostep-06-direct-execution/)

### 2026-09-08 (화) — 2개

- [ ] `WP#890` · 원문 2018-05-13 · **OSTEP 05. Process API** · [원문](https://blog.joannes.kr/operating-system/ostep-05-process-api/)
- [ ] `WP#879` · 원문 2018-05-13 · **OSTEP 04. Processes** · [원문](https://blog.joannes.kr/operating-system/os-processes/)
