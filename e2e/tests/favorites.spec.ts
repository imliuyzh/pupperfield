import { test } from "@playwright/test";
import { login } from "../utils/utils";

test.describe("favorites", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });
});
