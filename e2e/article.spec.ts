import { expect, test } from "@playwright/test";

test("representative article renders code, diagram, and metadata", async ({ page }) => {
  await page.goto("/web/markdown-mermaid-rendering/");
  await expect(page.locator("pre code")).toBeVisible();
  await expect(page.locator("article svg")).toBeVisible();
  await expect(page.locator("article time")).toHaveCount(1);
});

test("mobile article keeps rendered diagrams within its content box", async ({ page }) => {
  await page.goto("/web/markdown-mermaid-rendering/");
  const article = page.locator("article");
  const diagram = page.locator("article svg");
  expect((await diagram.boundingBox())?.width).toBeLessThanOrEqual((await article.boundingBox())?.width ?? 0);
});
