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

## Git safety

- Create signed commits only. If Git asks for a signing passphrase, stop immediately and notify the user; never request or enter the passphrase.
- Make only meaningful, independently reviewable commits. Follow the agreed commit-date schedule and do not create empty commits.

## Project knowledge

Read [ARCHITECTURE.md](ARCHITECTURE.md) before changing routing, content flow, rendering, or deployment. Consult `docs/content-guide.md` before authoring or migrating a post.
