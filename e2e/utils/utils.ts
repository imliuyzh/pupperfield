import type { Page } from "@playwright/test";

async function login(page: Page): Promise<void> {
  await page.goto("#/login");
  await page.getByRole("textbox", { name: "name" }).fill("John Doe");
  await page.getByRole("textbox", { name: "email" }).fill("johndoe@email.com");
  await page.getByRole("button", { name: "Log In" }).click();
  await page.locator("header").waitFor();
}

export {
  login
};