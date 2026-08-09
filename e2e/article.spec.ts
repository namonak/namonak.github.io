import { expect, test } from "@playwright/test";

test("representative article renders code, diagram, and metadata", async ({
  page,
}) => {
  await page.goto("/web/markdown-mermaid-rendering/");
  await expect(page.locator("pre code")).toBeVisible();
  await expect(page.locator("article svg")).toBeVisible();
  await expect(page.locator("article time")).toHaveCount(1);
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
