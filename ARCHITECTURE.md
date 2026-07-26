# Architecture

## Overview

The site is an Astro static site. Markdown entries in `src/content/blog/` are validated by the typed `blog` content collection and rendered into static GitHub Pages files at build time.

## Content flow

```text
src/content/blog/<category>/<slug>.md
  -> src/content.config.ts (frontmatter validation)
  -> src/lib/posts.ts (published, category, tag, and adjacent-post queries)
  -> routes in src/pages/
  -> layouts and components
  -> dist/ static files
```

Only entries with `draft: false` or no `draft` field become public pages. The canonical detail URL is `/{category}/{slug}/`.

## Route ownership

| Route | Page | Layout | Components | Content source |
| --- | --- | --- | --- | --- |
| `/` | `src/pages/index.astro` | `BaseLayout` | `PostCard` | all published posts |
| `/{category}/{slug}/` | `src/pages/[...slug].astro` | `PostLayout` → `BaseLayout` | post metadata and adjacent navigation | one blog entry |
| `/categories/` and `/categories/{category}/` | `src/pages/categories/*` | `BaseLayout` | `PostCard` | grouped published posts |
| `/tags/{tag}/` | `src/pages/tags/[tag].astro` | `BaseLayout` | `PostCard` | tagged published posts |
| `/about/`, `/404/` | static page modules | `BaseLayout` | site shell | local page copy |

`BaseLayout` owns document metadata, the site header, global styles, and footer. `PostLayout` owns the article header, rendered Markdown body, tags, and adjacent-post navigation. Presentational components do not query content collections directly.

## Rendering policies

- `remark-gfm` renders tables, task lists, and other GitHub-flavored Markdown.
- Astro's built-in Shiki highlighting renders fenced code blocks.
- `rehype-mermaid` converts Mermaid fences to inline SVG during the build. Invalid diagrams must stop validation or the build.
- Images live in `public/images/` and are referenced with root-relative paths in Markdown.
- No comment system, client-side search, or WordPress runtime is part of this architecture.

## Deployment flow

Pull requests run type checking, unit tests, the static build, and browser tests. A push to `main` builds `dist/` and deploys that artifact through GitHub Pages Actions.
