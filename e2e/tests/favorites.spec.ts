import { expect, test } from "@playwright/test";
import { login } from "../utils/utils";

test.describe("favorites", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.getByTestId("dog-card-list").waitFor();
  });

  test("add/remove favorite", async ({ page }) => {
    await page.getByTestId("add-favorite-button").first().click();
    await page.getByTestId("menu").click();
    await page.getByTestId("favorites").click();
    await page.getByTestId("dog-card-list").waitFor();
    await expect(page.getByTestId("remove-favorite-button")).toHaveCount(1);

    await page.getByTestId("remove-favorite-button").first().click();
    await expect(page.getByText("Please mark more puppies as your favorites!")).toBeVisible();
  });

  test("add/clear favorite", async ({ page }) => {
    await page.getByTestId("add-favorite-button").first().click();
    await page.getByTestId("menu").click();
    await page.getByTestId("favorites").click();
    await page.getByTestId("dog-card-list").waitFor();
    await expect(page.getByTestId("remove-favorite-button")).toHaveCount(1);
    await page.getByRole("button", { name: "Clear" }).click();
    await expect(page.getByText("Please mark more puppies as your favorites!")).toBeVisible();
  });

  test("match", async ({ page }) => {
    for (let count = 0; count < 10; count++) {
      await page.getByTestId("add-favorite-button").nth(count).click();
    }
    await page.getByTestId("menu").click();
    await page.getByTestId("favorites").click();
    await page.getByTestId("dog-card-list").waitFor();
    await page.getByRole("button", { name: "Match" }).click();
    await page.locator("div[role=dialog]").waitFor();
    await expect(page.locator("div[role=dialog]")).toBeVisible();
  });
});
