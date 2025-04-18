import { expect, test } from "@playwright/test";
import { login } from "../utils/utils";

test.describe("routing", () => {
  test.describe("error page", () => {
    test("should go to error page when an invalid route is requested 1", async ({ page }) => {
      await page.goto("#/invalid");
      await expect(page.getByText("Sorry, something is wrong. Do you want to")).toBeVisible();
    });
    test("should go to error page when an invalid route is requested 2", async ({ page }) => {
      await page.goto("#/34b34b34b3b");
      await expect(page.getByText("Sorry, something is wrong. Do you want to")).toBeVisible();
    });
    test("should go to home page when the logo in the error page is clicked and an user is logged in", async ({ page }) => {
      await login(page);
      await page.goto("#/j453h4");
      const logo = page.getByAltText("Logo");
      await expect(logo).toBeVisible();
      await logo.click();
      await expect(page.locator("header")).toBeVisible();
    });
    test("should go to login page when the logo in the error page is clicked and no user is logged in", async ({ page }) => {
      await page.goto("#/j45j547wj453h4?a=3");
      const logo = page.getByAltText("Logo");
      await expect(logo).toBeVisible();
      await logo.click();
      await expect(page).toHaveURL(/login/);
    });
    test("should go to home page when the highlighted text in the error page is clicked and an user is logged in", async ({ page }) => {
      await login(page);
      await page.goto("#/f32f23gf2?b=");
      const text = page.getByText("go back?");
      await expect(text).toBeVisible();
      await text.click();
      await expect(page.locator("header")).toBeVisible();
    });
    test("should go to login page when the highlighted text in the error page is clicked and no user is logged in", async ({ page }) => {
      await page.goto("#/hesdnsgwett3");
      const text = page.getByText("go back?");
      await expect(text).toBeVisible();
      await text.click();
      await expect(page).toHaveURL(/login/);
    });
  });

  test.describe("private routes", () => {
    test("should go to login page when visiting home page and no user is logged in", async ({ page }) => {
      await page.goto("#/");
      await expect(page).toHaveURL(/login/);
    });
    test("should go to login page when visiting favorites page and no user is logged in", async ({ page }) => {
      await page.goto("#/favorites");
      await expect(page).toHaveURL(/login/);
    });
    test("should go to home page when an user is logged in", async ({ page }) => {
      await login(page);
      await expect(page.locator("header")).toBeVisible();
    });
    test("should go to favorites page when an user is logged in", async ({ page }) => {
      await login(page);
      await page.goto("#/favorites");
      await expect(page.getByText("Please mark more puppies as your favorites!")).toBeVisible();
    });
    test("should not be able to visit private routes when an user is logged out", async ({ page }) => {
      await login(page);
      await page.getByTestId("menu").click();
      await page.getByTestId("favorites").click();
      await expect(page).toHaveURL(/favorites/);
      await expect(page.getByText("Please mark more puppies as your favorites!")).toBeVisible();
      await page.getByTestId("menu").click();
      await page.getByTestId("log-out").click();
      await expect(page).toHaveURL(/login/);
      await expect(page.getByTestId("menu")).toBeHidden();
      await page.goto("#/favorites");
      await expect(page.getByTestId("menu")).toBeHidden();
    });
  });

  test.describe("home/favorite page transition", () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
    });

    test("should go to favorites page when the favorites link is clicked", async ({ page }) => {
      await page.getByTestId("menu").click();
      await page.getByTestId("favorites").click();
      await expect(page).toHaveURL(/favorites/);
    });
    test("should go to home page when the home link is clicked", async ({ page }) => {
      await page.goto("#/favorites");
      await page.getByTestId("menu").click();
      await page.getByTestId("home").click();
      await page.getByTestId("menu").waitFor();
      await expect(page).not.toHaveURL(/favorites/);
      await expect(page).toHaveURL(/\//);
    });
  });
});
