# Mobile Metadata and Design Docs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the viewport metadata explicit and align durable responsive-design documentation with the existing desktop-only category sidebar.

**Architecture:** Keep the current responsive layout unchanged. Add browser coverage for the viewport declaration and sidebar visibility at the configured desktop, tablet, and mobile projects, then update only `BaseLayout` metadata; retain the approved design-document correction.

**Tech Stack:** Astro 7, HTML metadata, Playwright, Markdown documentation

## Global Constraints

- Preserve the existing sidebar CSS and breakpoint behavior.
- Keep the category sidebar hidden below 1024px and visible at 1024px or wider.
- Do not disable user zoom with `user-scalable=no`, `maximum-scale`, or `minimum-scale`.
- Do not change article, table, navigation, footer, or content layout.
- Do not commit or push before user review.

---

### Task 1: Lock responsive metadata and sidebar behavior

**Files:**

- Modify: `e2e/home.spec.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `docs/superpowers/specs/2026-08-07-modern-dev-blog-design.md`

**Interfaces:**

- Consumes: the document head from `BaseLayout` and homepage category `aside`
- Produces: explicit device-width/initial-scale metadata and browser coverage for the existing responsive category visibility

- [x] **Step 1: Write the failing browser test**

Add a homepage test that requires the exact safe viewport declaration and checks the category sidebar against the configured viewport width.

```ts
test("viewport metadata and category sidebar match the responsive design", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
    "content",
    "width=device-width, initial-scale=1",
  );

  const categorySidebar = page.locator('aside[aria-label="카테고리"]');
  if ((page.viewportSize()?.width ?? 0) >= 1024) {
    await expect(categorySidebar).toBeVisible();
  } else {
    await expect(categorySidebar).toBeHidden();
  }
});
```

- [x] **Step 2: Run the test and verify RED**

Run the new test against the current production build for all three Playwright projects. Expected: all projects fail because the metadata lacks `initial-scale=1`.

- [x] **Step 3: Apply the minimal metadata change**

Change the viewport declaration in `BaseLayout.astro` to:

```astro
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

- [x] **Step 4: Rebuild and verify GREEN**

Build the static site and rerun the targeted browser test. Expected: desktop, tablet, and mobile pass; desktop shows the sidebar while tablet and mobile keep it hidden.

- [x] **Step 5: Run complete verification**

Run `npm run check`, `npm run test`, `npm run build`, and the full Playwright suite against the production preview.

- [x] **Step 6: Stop for review**

Report the exact metadata and documentation changes. Do not commit or push.
