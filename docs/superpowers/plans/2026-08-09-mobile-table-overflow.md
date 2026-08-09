# Mobile Table Overflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep Markdown tables inside the mobile article width so only the table scrolls horizontally and the document never does.

**Architecture:** Preserve the existing Markdown and Astro rendering pipeline. Add a browser-level regression test against two representative table-heavy articles, then constrain the existing `.prose table` scroll container to the prose width with a minimal global CSS change. Verify every published table-heavy article against the production build.

**Tech Stack:** Astro 7, Markdown content collections, CSS, Playwright

## Global Constraints

- Modify only table overflow behavior and its regression coverage.
- Preserve published post URLs and Markdown content.
- Do not change mobile or tablet category visibility.
- Do not commit or push until the user completes visual review.

---

### Task 1: Contain wide article tables

**Files:**

- Modify: `e2e/article.spec.ts`
- Modify: `src/styles/global.css:141-148`

**Interfaces:**

- Consumes: rendered Markdown tables inside `.prose` on published article routes
- Produces: tables whose visible box is no wider than `.prose`, with any excess content scrolling inside the table rather than expanding the document

- [x] **Step 1: Write the failing browser test**

Add a Playwright test that visits two representative published articles containing different table shapes and asserts three user-visible contracts at the mobile viewport: the document has no horizontal overflow, every rendered table is no wider than its `.prose` container, and naturally wide content remains horizontally scrollable inside the table.

```ts
test("mobile tables scroll without widening the document", async ({ page }) => {
  const tableArticlePaths = [
    "/android/kotlin-coroutines-cancellation/",
    "/web/map-vs-object/",
  ];

  for (const path of tableArticlePaths) {
    await page.goto(path);
    const prose = page.locator(".prose");
    const tables = page.locator(".prose table");
    await expect(tables.first()).toBeVisible();

    const documentOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(documentOverflow, `${path} widens the document`).toBe(0);

    const proseWidth = (await prose.boundingBox())?.width ?? 0;
    for (const table of await tables.all()) {
      expect(
        (await table.boundingBox())?.width,
        `${path} table exceeds prose`,
      ).toBeLessThanOrEqual(proseWidth);
    }

    const hasScrollableTable = await tables.evaluateAll((renderedTables) =>
      renderedTables.some((table) => table.scrollWidth > table.clientWidth),
    );
    expect(
      hasScrollableTable,
      `${path} table content should scroll internally`,
    ).toBe(true);
  }
});
```

- [x] **Step 2: Run the mobile test and verify RED**

Run:

```bash
npm run test:e2e -- --project=mobile --grep "mobile tables scroll"
```

Expected: FAIL on the first table-heavy article because `documentOverflow` is greater than zero.

- [x] **Step 3: Apply the minimal CSS fix**

Replace the content-sized table width with a container-sized width while preserving block-level horizontal scrolling. Keep cell contents on readable lines so their natural width becomes internal scroll content rather than collapsing Korean text character by character.

```css
.prose table {
  display: block;
  overflow-x: auto;
  width: 100%;
  max-width: 100%;
  margin: var(--space-5) 0;
  border-collapse: collapse;
}

.prose th,
.prose td {
  white-space: nowrap;
}
```

- [x] **Step 4: Run the targeted mobile test and verify GREEN**

Run:

```bash
npm run test:e2e -- --project=mobile --grep "mobile tables scroll"
```

Expected: PASS for both representative table-heavy article routes.

- [x] **Step 5: Run repository verification**

Run:

```bash
npm run check
npm run test
npm run build
npm run test:e2e -- --project=mobile
```

Expected: all commands exit successfully with no failed tests. After the build, check all five published table-heavy article routes at 320px, 375px, and 430px and confirm the document has no horizontal overflow.

- [ ] **Step 6: Stop for visual review**

Report the changed files and representative routes to inspect. Do not commit or push.
