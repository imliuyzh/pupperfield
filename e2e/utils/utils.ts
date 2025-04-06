import type { Page } from "@playwright/test";

/**
 * Automates the login process by navigating to the login page,
 * filling in the user's name and email, and clicking the login button.
 * @param page Playwright's object used to interact with the browser.
 */
async function login(page: Page): Promise<void> {
  await page.goto("#/login");
  await page.getByRole("textbox", { name: "name" }).fill("John Doe");
  await page.getByRole("textbox", { name: "email" }).fill("johndoe@email.com");
  await page.getByRole("button", { name: "Log In" }).click();

  // Wait for the header to load to ensure the log in process is completed.
  await page.locator("header").waitFor();
}

export {
  login
};