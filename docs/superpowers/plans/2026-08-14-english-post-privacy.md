# English Post Privacy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the six English-category Markdown posts in the repository while removing every public site route and archive reference to them.

**Architecture:** The existing `draft: true` frontmatter field is consumed by `getPublishedPosts()`, which provides the entries used by the home page, category/tag archives, and static article route generation. Marking each English post as a draft therefore retains its source file without generating a public page.

**Tech Stack:** Astro content collections, TypeScript, Playwright, Vitest.

## Global Constraints

- Preserve all six Markdown files and their existing canonical identifiers in `src/content/blog/english/`.
- Do not change routing code, public URLs for non-draft posts, or repository visibility.
- A private post must be absent from its detail route and from site archives.
- Run `npm run check`, `npm run test`, `npm run build`, and `npm run test:e2e` before release-ready claims.
- Create one signed, meaningful commit with the agreed Codex co-author trailer.

---

### Task 1: Prove the private-site contract in a browser test

**Files:**
- Modify: `e2e/article.spec.ts`

**Interfaces:**
- Consumes: Astro development server at `http://127.0.0.1:4321` from Playwright configuration.
- Produces: A regression test asserting the six retained English source files do not have publicly served article pages.

- [x] **Step 1: Add the failing browser test**

```ts
test("draft English posts are not served publicly", async ({ page }) => {
  for (const slug of ["english/get-phrasal-verbs", "english/make-phrasal-verbs", "english/phrasal-verbs-guide", "english/pick-up-phrasal-verb", "english/run-phrasal-verbs", "english/take-phrasal-verbs"]) {
    const response = await page.goto(`/${slug}/`);
    expect(response?.status()).toBe(404);
  }
});
```

- [x] **Step 2: Run the focused test and verify it fails because the pages are currently public**

Run: `npx playwright test e2e/article.spec.ts --project=desktop --grep "draft English posts"`

Expected: FAIL because each English article currently returns HTTP 200.

### Task 2: Mark retained English sources as private drafts

**Files:**
- Modify: `src/content/blog/english/get-phrasal-verbs.md`
- Modify: `src/content/blog/english/make-phrasal-verbs.md`
- Modify: `src/content/blog/english/phrasal-verbs-guide.md`
- Modify: `src/content/blog/english/pick-up-phrasal-verb.md`
- Modify: `src/content/blog/english/run-phrasal-verbs.md`
- Modify: `src/content/blog/english/take-phrasal-verbs.md`

**Interfaces:**
- Consumes: `draft: true` accepted by the `blog` collection schema in `src/content.config.ts` and filtered by `getPublishedPosts()`.
- Produces: Source files retained in Git but excluded from Astro static paths and all derived public archives.

- [x] **Step 1: Add `draft: true` to each frontmatter block**

```yaml
category: "english"
draft: true
tags: ["english", "phrasal-verbs"]
```

- [x] **Step 2: Run the focused browser test and verify the English article routes now return 404**

Run: `npx playwright test e2e/article.spec.ts --project=desktop --grep "draft English posts"`

Expected: PASS.

### Task 3: Validate static output and commit the privacy change

**Files:**
- Modify: `docs/superpowers/plans/2026-08-14-english-post-privacy.md`

**Interfaces:**
- Consumes: the six draft entries and browser regression test from Tasks 1 and 2.
- Produces: verified private-site behavior committed to `main`.

- [x] **Step 1: Run all required validation**

Run: `npm run check && npm run test && npm run build && npm run test:e2e`

Expected: all checks pass; generated `dist/` has no `dist/english/` directory.

- [x] **Step 2: Review desktop, tablet, and mobile results**

Run: `npx playwright test e2e/article.spec.ts --project=desktop --project=tablet --project=mobile`

Expected: representative published article tests remain green at every breakpoint.

- [x] **Step 3: Mark the plan complete and create the signed commit**

Run:

```bash
git add docs/superpowers/plans/2026-08-14-english-post-privacy.md e2e/article.spec.ts src/content/blog/english
git commit -S -m "content(english): hide migrated posts" -m "Mark the six retained English posts as drafts so GitHub Pages does not publish their article or archive routes." -m "Co-authored-by: Codex (AI-generated) <codex@joannes.kr>"
```

Expected: one signed commit with the agreed co-author trailer.
