# Modern Developer Blog Design

## Status

Approved for implementation planning on 2026-08-07.

## Goal

Replace the current WordPress blog with a simple, modern, responsive developer blog hosted on GitHub Pages. The first release proves the layout and technical-content rendering with a small set of representative posts. Existing WordPress posts will move gradually after that release.

## Scope and non-goals

The first release includes a homepage, post pages, category pages, tag pages, an about page, a 404 page, and representative Markdown posts. It must render prose, code blocks, tables, images, and Mermaid diagrams reliably.

It does not migrate WordPress comments, provide site search, add multilingual content, automate RSS, or switch the `blog.joannes.kr` DNS record. Those are future decisions.

## Technology and deployment

Use Astro with Markdown content collections. Deploy the static build output to GitHub Pages through GitHub Actions when changes reach `main`. The repository is the GitHub Pages user-site repository, so the generated site is rooted at `/`.

The custom domain remains on the existing site until the representative posts and responsive layouts have been reviewed successfully. Domain configuration and DNS cutover are separate, explicitly approved work.

## Information architecture

| Route | Purpose |
| --- | --- |
| `/` | Latest posts and category entry points |
| `/{category}/{slug}/` | Post detail; preserves the established WordPress-style permalink shape |
| `/categories/{category}/` | Category archive |
| `/tags/{tag}/` | Tag archive |
| `/about/` | Blog and author introduction |
| `/404/` | Static not-found page |

Posts live under `src/content/blog/<category>/<slug>.md`. Their frontmatter records title, publication date, optional update date, summary, category, tags, draft status, and optional cover image. A primary category is part of the pathname.

## Layout and components

The selected direction is reading-first responsive design:

- **Desktop:** a restrained header, editorial hero, wide post-list column, and compact navigation sidebar.
- **Tablet:** the primary content remains prominent; sidebar links become a short secondary navigation area below the list.
- **Mobile:** only essential header navigation and post content remain visible; the layout is one column.

`BaseLayout` owns the document shell, header, navigation, and footer. `PostCard` owns a post summary. `PostLayout` owns article metadata, readable body width, tags, and adjacent-post navigation. Category and tag pages reuse the same list components instead of creating separate presentation logic.

## Markdown and rich technical content

The Markdown pipeline supports GitHub-flavored Markdown, syntax-highlighted code, tables, local images, and Mermaid fenced blocks. Mermaid is rendered to SVG during the build so diagrams do not depend on client-side execution.

Article typography constrains prose to a readable measure. Code blocks and wide tables can scroll horizontally on narrow screens. Mermaid output scales within the article container. Invalid Mermaid must fail local and CI builds rather than deploy a broken diagram.

Representative posts are manually normalized into the new Markdown format. Later WordPress posts are migrated one at a time; exceptional legacy HTML is converted deliberately rather than carried through as an uncontrolled dependency.

## Quality gates

Every production change must pass content/type validation and a production build. Before release, representative articles are inspected at desktop, tablet, and mobile breakpoints, including a page containing a code block, table, image, and Mermaid diagram.

## Codex harness

The repository gains the following durable guidance surfaces:

| Surface | Responsibility |
| --- | --- |
| `AGENTS.md` | Working rules, safe commands, validation requirements, content constraints, and review expectations |
| `ARCHITECTURE.md` | Concise map of routes, component boundaries, content flow, and deployment flow |
| `docs/adr/` | Decision records for long-lived choices such as Astro, Markdown, Mermaid, and deployment |
| `docs/content-guide.md` | Frontmatter, Markdown, image, code, table, and Mermaid authoring rules |
| `.codex/config.toml` | Only trusted project-scoped Codex settings when a setting is needed |

`AGENTS.md` stays concise and points to the longer architecture and content documents. It does not carry temporary task history.

Hooks are deliberately deferred. A hook may be proposed only after the same manual check has recurred across multiple changes and its value is clear. Each proposal must state the lifecycle event, exact command, inputs, timeout, failure behavior, trust scope, and a non-hook alternative. Adding or changing a hook requires explicit user approval.

## Commit policy for this migration

Each commit represents a meaningful, independently reviewable change; empty commits are prohibited. For this migration only, commit author and committer dates run from 2026-07-24 through 2026-08-06 with at most two meaningful commits per calendar day. Commits dated 2026-08-07 onward use the actual time. This temporary cadence belongs to the migration plan, not to the permanent `AGENTS.md` rules.

