import { expect, test } from "@playwright/test";

test("homepage exposes navigation and representative posts", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "namonak.dev" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "최신 글" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Astro에서 Markdown/ })).toBeVisible();
});

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
