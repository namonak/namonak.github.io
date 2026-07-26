# ADR 0001: Use Astro static generation for the blog

- Status: Accepted
- Date: 2026-07-26

## Context

The blog is moving from a WordPress-hosted site to GitHub Pages. The first release must be easy to maintain, render Markdown well, and avoid a server-side runtime.

## Decision

Use Astro with static output. Store posts as typed Markdown entries under `src/content/blog/`, build the site in GitHub Actions, and publish the generated `dist/` directory to GitHub Pages.

## Consequences

- Content can migrate incrementally through version-controlled Markdown files.
- Pages are fast and have no database, PHP runtime, or WordPress plugin dependency.
- Dynamic WordPress features such as comments and server-side search are intentionally absent.
- A deployment workflow must build successfully before publishing.
