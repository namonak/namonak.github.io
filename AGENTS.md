# Repository Guidance

## Project intent

`namonak.dev` is a static Korean developer blog built with Astro and deployed to GitHub Pages. Keep the design simple, modern, reading-first, and responsive; do not reproduce the former WordPress layout.

## Working rules

- Keep `README.md` in Korean. Technical documentation may be written in English.
- Do not migrate or add comments, search, automatic RSS, multilingual features, or custom-domain DNS changes without explicit approval.
- Preserve published post URLs as `/{category}/{slug}/` and place Markdown posts in `src/content/blog/`.
- Mermaid diagrams must render as build-time SVG. A malformed Mermaid diagram must fail validation or the build.
- Before claiming a change is release-ready, run `npm run check`, `npm run test`, and `npm run build`.
- Review representative articles at desktop, tablet, and mobile breakpoints before a release-ready claim.

## 신규 원본 블로그 글

- 신규 원본 블로그 글을 작성·요약·갱신할 때는 먼저 `skills/blog-post-writer/SKILL.md`와 그 보조 문서를 읽고 따른다.
- 레거시 마이그레이션은 이 스킬의 대상이 아니다. `docs/superpowers/plans/2026-08-09-legacy-article-migration.md`의 절차를 따른다.

## Git safety

- Create signed commits only. If Git asks for a signing passphrase, stop immediately and notify the user; never request or enter the passphrase.
- Make only meaningful, independently reviewable commits. Follow the agreed commit-date schedule and do not create empty commits.

## Project knowledge

Read [ARCHITECTURE.md](ARCHITECTURE.md) before changing routing, content flow, rendering, or deployment. Consult `docs/content-guide.md` before authoring or migrating a post.
