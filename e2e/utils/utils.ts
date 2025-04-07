import type { Page } from "@playwright/test";

/**
 * Automates the login process by navigating to the login page,
 * filling in the user's name and email, and clicking the login button.
 * @param page a Playwright object used to interact with the browser
 * @param name an user's name
 * @param email an user's email
 * @returns an empty promise
 */
async function login(page: Page, name = "John Doe", email = "johndoe@email.com"): Promise<void> {
  await page.goto("#/login");
  await page.getByRole("textbox", { name: "name" }).fill(name);
  await page.getByRole("textbox", { name: "email" }).fill(email);
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByTestId("menu").waitFor();
}

export {
  login
};
