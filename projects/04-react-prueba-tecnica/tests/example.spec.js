// @ts-check
import { test, expect } from "@playwright/test";

const LOCALHOST_URL = "http://localhost:5173";
test("app show random fact and image", async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = await page.getByTestId("fact-text");
  const image = await page.getByTestId("fact-image");

  const textContent = await text.textContent();
  const imageSrc = await image.getAttribute("src");

  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(
    imageSrc?.startsWith("https://cataas.com/cat/says")
  ).toBeTruthy();
});
