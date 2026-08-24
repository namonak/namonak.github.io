import { expect, test } from "@playwright/test";

test("representative article renders code, diagram, and metadata", async ({
  page,
}) => {
  await page.goto("/web/markdown-mermaid-rendering/");
  await expect(page.locator("pre code")).toBeVisible();
  await expect(page.locator("article svg")).toBeVisible();
  await expect(page.locator("article time")).toHaveCount(1);
});

test("legacy article hides its migration update date", async ({ page }) => {
  await page.goto("/web/cors-cross-origin-resource-sharing/");

  await expect(page.locator(".dates time")).toHaveCount(1);
  await expect(page.locator(".dates")).toHaveText(/게시 2023년 7월 17일/);
});

test("mobile article keeps rendered diagrams within its content box", async ({
  page,
}) => {
  await page.goto("/web/markdown-mermaid-rendering/");
  const article = page.locator("article");
  const diagram = page.locator("article svg");
  expect((await diagram.boundingBox())?.width).toBeLessThanOrEqual(
    (await article.boundingBox())?.width ?? 0,
  );
});

test("mobile article title wraps long technical identifiers", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "The narrow viewport is the overflow boundary.");

  await page.goto("/java/concurrent-modification-exception/");
  const article = page.locator("article");
  const title = article.locator("header > h1");

  expect((await title.boundingBox())?.width).toBeLessThanOrEqual(
    (await article.boundingBox())?.width ?? 0,
  );
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBe(0);
});

test("long prose strings wrap without widening the document", async ({
  page,
}) => {
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
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBe(0);

  const injectedPre = prose.locator("pre").last();
  expect(
    await injectedPre.evaluate(
      (element) => element.scrollWidth > element.clientWidth,
    ),
  ).toBe(true);
});

test("article tables stay contained and scroll on mobile", async ({
  page,
  isMobile,
}) => {
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

    if (isMobile) {
      const hasScrollableTable = await tables.evaluateAll((renderedTables) =>
        renderedTables.some((table) => table.scrollWidth > table.clientWidth),
      );
      expect(
        hasScrollableTable,
        `${path} table content should scroll internally`,
      ).toBe(true);
    }
  }
});

test("draft English posts are not served publicly", async ({ page }) => {
  const privatePostPaths = [
    "/english/get-phrasal-verbs/",
    "/english/make-phrasal-verbs/",
    "/english/phrasal-verbs-guide/",
    "/english/pick-up-phrasal-verb/",
    "/english/run-phrasal-verbs/",
    "/english/take-phrasal-verbs/",
  ];

  for (const path of privatePostPaths) {
    const response = await page.goto(path);

    expect(response?.status(), `${path} must remain private`).toBe(404);
  }
});

test("retired Medium summaries are not served publicly", async ({ page }) => {
  const retiredPostPaths = [
    "/software-development/ci-cd-best-practices/",
    "/software-development/mobile-application-architecture-vs-design-patterns/",
    "/software-development/software-development-trends-2023-2024/",
    "/software-development/spring-boot-dto/",
  ];

  for (const path of retiredPostPaths) {
    const response = await page.goto(path);

    expect(response?.status(), `${path} must remain retired`).toBe(404);
  }
});
