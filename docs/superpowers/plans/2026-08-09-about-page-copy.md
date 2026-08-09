# About Page Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the About page heading, introduction, and metadata with the approved homepage voice.

**Architecture:** Keep the existing Astro component and styles intact. Replace only three approved strings in `about.astro`, then verify the generated document metadata and visible copy against the production build at all configured viewport widths.

**Tech Stack:** Astro 7, HTML metadata, Playwright visual verification

## Global Constraints

- Keep the eyebrow `About` and document title `소개 — namonak.dev`.
- Keep the existing supporting paragraph unchanged.
- Preserve markup structure, line break, typography, spacing, colors, layout, and every other page.
- Use the approved introductory sentence as both visible copy and meta description.

---

### Task 1: Replace the About page copy

**Files:**

- Modify: `src/pages/about.astro`
- Include: `docs/superpowers/specs/2026-08-09-about-page-copy-design.md`

**Interfaces:**

- Consumes: `BaseLayout` title and description props plus the existing About section markup
- Produces: the approved heading, visible introduction, and matching meta description at `/about/`

- [x] **Step 1: Apply the approved strings**

Set the heading to `문제를 풀며 세운 기준을<br />기록합니다.` and set both `BaseLayout.description` and the first `.prose` paragraph to `개발하며 배운 내용과 선택의 이유, 다시 확인할 지점을 정리하는 개인 기술 블로그입니다.`. Do not change any style or supporting copy.

- [x] **Step 2: Build and inspect the generated page**

Run `npm run build`, serve `dist/`, and inspect `/about/` at desktop, tablet, and mobile widths. Confirm the document title, meta description, heading, introductory paragraph, and supporting paragraph match the approved specification without overflow.

- [x] **Step 3: Run repository verification**

Run `npm run check`, `npm run test`, `npm run build`, and the complete Playwright suite. Do not add a durable automated assertion for exact prose wording; human-facing copy is an intentional content decision rather than a behavioral contract.

- [ ] **Step 4: Commit, push, and verify deployment**

Create a signed commit containing the About page, design spec, and plan. Push `main`, wait for the custom Astro Pages workflow, then verify the live `/about/` metadata and visible copy.
