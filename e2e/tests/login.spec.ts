import { expect, test } from "@playwright/test";
import { login } from "../utils/utils";

test.describe("login", () => {
  test.describe("valid input", () => {
    test("should go to home page when everything is ok", async ({ page }) => {
      await login(page);
      await expect(page.locator("header")).toBeVisible();
    });
    test("should go to home page even when the name is unusual", async ({ page }) => {
      await page.goto("#/login");
      await page.getByRole("textbox", { name: "name" }).fill("#((*Y$#@YY##$Y#$|#%##$+$");
      await page.getByRole("textbox", { name: "email" }).fill("randomname@email.com");
      await page.getByRole("button", { name: "Log In" }).click();
      await expect(page.locator("header")).toBeVisible();
    });
  });

  test.describe("invalid input", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("#/login");
    });
    test("should stay on login page when there is no input", async ({ page }) => {
      await page.getByRole("button", { name: "Log In" }).click();
      await expect(page.getByText("Name is required.")).toBeVisible();
      await expect(page.getByText("Email is required.")).toBeVisible();
      await expect(page).toHaveURL(/login/);
    });
    test("should stay on login page when the name is invalid", async ({ page }) => {
      await page.getByRole("textbox", { name: "name" }).fill("          ");
      await page.getByRole("textbox", { name: "email" }).fill("name@email.com");
      await page.getByRole("button", { name: "Log In" }).click();
      await expect(page.getByText("Name is required.")).toBeVisible();
      await expect(page).toHaveURL(/login/);
    });
    test("should stay on login page when the email address is invalid 1", async ({ page }) => {
      await page.getByRole("textbox", { name: "name" }).fill("Name");
      await page.getByRole("textbox", { name: "email" }).fill("Email address");
      await page.getByRole("button", { name: "Log In" }).click();
      await expect(page.getByText("Email is required.")).toBeVisible();
      await expect(page).toHaveURL(/login/);
    });
    test("should stay on login page when the email address is invalid 2", async ({ page }) => {
      await page.getByRole("textbox", { name: "name" }).fill("Name");
      await page.getByRole("textbox", { name: "email" }).fill("name@email.c");
      await page.getByRole("button", { name: "Log In" }).click();
      await expect(page.getByText("Email is required.")).toBeVisible();
      await expect(page).toHaveURL(/login/);
    });
    test("should stay on login page when the email address is invalid 3", async ({ page }) => {
      await page.getByRole("textbox", { name: "name" }).fill("Name");
      await page.getByRole("textbox", { name: "email" }).fill("         ");
      await page.getByRole("button", { name: "Log In" }).click();
      await expect(page.getByText("Email is required.")).toBeVisible();
      await expect(page).toHaveURL(/login/);
    });
  });
});
