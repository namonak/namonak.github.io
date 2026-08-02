import { expect, test } from "@playwright/test";

test("homepage exposes navigation and representative posts", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "namonak.dev" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "최신 글" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Astro에서 Markdown/ })).toBeVisible();
});
