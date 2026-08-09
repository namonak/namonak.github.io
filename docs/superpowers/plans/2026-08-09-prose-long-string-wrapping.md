# Prose Long-String Wrapping Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent unbroken strings inside rendered article prose from widening the document while preserving existing table and fenced-code scrolling.

**Architecture:** Exercise the real production prose CSS by injecting controlled long-string elements into a rendered article during Playwright tests. Add one inherited `overflow-wrap` declaration to `.prose`; leave specialized table and preformatted-code rules unchanged.

**Tech Stack:** Astro 7, global CSS, Playwright

## Global Constraints

- Modify only `.prose` long-string wrapping and its browser regression coverage.
- Do not modify Markdown content, tables, fenced-code scrolling, article titles, metadata, navigation, or cards.
- Apply the defense at every viewport width; let it affect rendering only when a string cannot fit.
- Do not commit or push before user visual approval.

---

### Task 1: Defend prose against unbroken strings

**Files:**

- Modify: `e2e/article.spec.ts`
- Modify: `src/styles/global.css`

**Interfaces:**

- Consumes: rendered Markdown content inside `.prose`
- Produces: emergency wrapping for unbroken prose and inline-code strings without changing specialized horizontal scroll containers

- [x] **Step 1: Write the failing browser test**

Open a real article and append a paragraph containing a long raw URL, a paragraph containing a long inline-code identifier, and a preformatted block containing a long code line. Assert that the document remains within the viewport and that the preformatted block still scrolls internally.

```ts
test("long prose strings wrap without widening the document", async ({ page }) => {
  await page.goto("/web/markdown-mermaid-rendering/");
  const prose = page.locator(".prose");

  await prose.evaluate((element) => {
    const rawUrl = document.createElement("p");
    rawUrl.textContent = `https://example.com/${"unbroken".repeat(48)}`;

    const inlineCodeParagraph = document.createElement("p");
    const inlineCode = document.createElement("code");
    inlineCode.textContent = `VeryLongIdentifier${"Segment".repeat(48)}`;
    inlineCodeParagraph.append(inlineCode);

    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = `const ${"longIdentifier".repeat(48)} = true;`;
    pre.append(code);

    element.append(rawUrl, inlineCodeParagraph, pre);
  });

  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    ),
  ).toBe(0);

  const injectedPre = prose.locator("pre").last();
  expect(
    await injectedPre.evaluate((element) => element.scrollWidth > element.clientWidth),
  ).toBe(true);
});
```

- [x] **Step 2: Run the test and verify RED**

Run the test against the existing production build for desktop, tablet, and mobile. Expected: each project fails because the raw URL or inline identifier widens the document.

- [x] **Step 3: Apply the minimal CSS**

Add the approved inherited rule:

```css
.prose {
  max-width: var(--article-width);
  overflow-wrap: anywhere;
}
```

- [x] **Step 4: Rebuild and verify GREEN**

Build the production site and rerun the targeted browser test. Expected: desktop, tablet, and mobile pass; the injected preformatted code remains internally scrollable.

- [x] **Step 5: Run complete verification**

Run `npm run check`, `npm run test`, `npm run build`, and the full Playwright suite against the production preview. Inspect the representative test fixture at mobile width.

- [x] **Step 6: Stop for visual review**

Keep a production preview available, report uncommitted files, and provide a local URL. Do not commit or push.
