import { expect, test } from "@playwright/test";
import { login } from "../utils/utils";

test.describe("search", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test.describe("sorting", () => {
    test.describe("ascending order", () => {
      test.beforeEach(async ({ page }) => {
        await page.getByTestId("dog-card-list").waitFor();
      });

      test("should sort by age:asc", async ({ page }) => {
        await page.getByTestId("sort-selector").click();
        await page.getByTestId("sort-age").click();
        await page.getByTestId("dog-card-list").waitFor();

        const info = await page.locator("div[data-slot=card-description]").first().innerText();
        expect(info.split("\n")[0]).toEqual(expect.stringContaining("0 Year"));
      });
      test("should sort by breed:asc", async ({ page }) => {
        const info = await page.locator("div[data-slot=card-description]").first().innerText();
        expect(info.split("\n")[1]).toEqual(expect.stringContaining("Affenpinscher"));
      });
      test("should sort by name:asc", async ({ page }) => {
        await page.getByTestId("sort-selector").click();
        await page.getByTestId("sort-name").click();
        await page.getByTestId("dog-card-list").waitFor();
        await expect(page.locator("div[data-slot=card-title]").first()).toHaveText("Aaliyah");
      });
    });

    test.describe("descending order", () => {
      test.beforeEach(async ({ page }) => {
        await page.getByTestId("dog-card-list").waitFor();
        await page.getByTestId("sort-desc").click();
        await page.getByTestId("dog-card-list").waitFor();
      });

      test("should sort by age:desc", async ({ page }) => {
        await page.getByTestId("sort-selector").click();
        await page.getByTestId("sort-age").click();
        await page.getByTestId("dog-card-list").waitFor();

        const info = await page.locator("div[data-slot=card-description]").first().innerText();
        expect(info.split("\n")[0]).toEqual(expect.stringContaining("14 Years"));
      });
      test("should sort by breed:desc", async ({ page }) => {
        const info = await page.locator("div[data-slot=card-description]").first().innerText();
        expect(info.split("\n")[1]).toEqual(expect.stringContaining("Yorkshire Terrier"));
      });
      test("should sort by name:desc", async ({ page }) => {
        await page.getByTestId("sort-selector").click();
        await page.getByTestId("sort-name").click();
        await page.getByTestId("dog-card-list").waitFor();
        await expect(page.locator("div[data-slot=card-title]").first()).toHaveText("Zula");
      });
    });
  });

  test.describe("filtering", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId("dog-card-list").waitFor();
      await page.getByTestId("filter-button").click();
    });

    test("filter by breed", async ({ page }) => {
      await page.getByTestId("breed-selector").click();
      for (const element of await page.locator("div[role=option]").all()) {
        await element.waitFor();
        if (await element.innerText() === "American Staffordshire Terrier") {
          await element.dispatchEvent("click");
          break;
        }
      }
      await page.getByTestId("apply-filter-button").dispatchEvent("click");
      await page.getByTestId("dog-card-list").waitFor();

      for (const element of await page.locator("div[data-slot=card-description]").all()) {
        await element.waitFor();
        const info = await element.innerText();
        expect(info.split("\n")[1]).toEqual(expect.stringContaining("American Staffordshire Terrier"));
      }
    });
    test("filter by min age", async ({ page }) => {
      await page.getByTestId("min-age-input").fill("3");
      await page.getByTestId("apply-filter-button").dispatchEvent("click");
      await page.getByTestId("sort-selector").click();
      await page.getByTestId("sort-age").click();
      await page.getByTestId("dog-card-list").waitFor();

      for (const element of await page.locator("div[data-slot=card-description]").all()) {
        await element.waitFor();
        const info = await element.innerText();
        expect(info.split("\n")[0]).toEqual(expect.stringContaining("3 Years"));
      }
    });
    test("filter by max age", async ({ page }) => {
      await page.getByTestId("max-age-input").fill("0");
      await page.getByTestId("apply-filter-button").dispatchEvent("click");
      await page.getByTestId("sort-selector").click();
      await page.getByTestId("sort-age").click();
      await page.getByTestId("sort-desc").click();
      await page.getByTestId("dog-card-list").waitFor();

      for (const element of await page.locator("div[data-slot=card-description]").all()) {
        await element.waitFor();
        const info = await element.innerText();
        expect(info.split("\n")[0]).toEqual(expect.stringContaining("0 Year"));
      }
    });
    test("filter by age 1", async ({ page }) => {
      await page.getByTestId("min-age-input").fill("10");
      await page.getByTestId("max-age-input").fill("10");
      await page.getByTestId("apply-filter-button").dispatchEvent("click");
      await page.getByTestId("dog-card-list").waitFor();
      for (const element of await page.locator("div[data-slot=card-description]").all()) {
        const info = await element.innerText();
        expect(info.split("\n")[0]).toEqual(expect.stringContaining("10 Years"));
      }

      await page.getByTestId("sort-selector").click();
      await page.getByTestId("sort-age").click();
      await page.getByTestId("sort-desc").click();
      await page.getByTestId("dog-card-list").waitFor();
      for (const element of await page.locator("div[data-slot=card-description]").all()) {
        const info = await element.innerText();
        expect(info.split("\n")[0]).toEqual(expect.stringContaining("10 Years"));
      }
    });
    test("filter by age 2", async ({ page }) => {
      await page.getByTestId("min-age-input").fill("100");
      await page.getByTestId("max-age-input").fill("100");
      await page.getByTestId("apply-filter-button").dispatchEvent("click");
      await page.getByTestId("no-result").waitFor();
      await expect(page.getByTestId("no-result")).toHaveText(":-(");
    });
    test("filter by zip code 1", async ({ page }) => {
      await page.getByTestId("zip-code-input").fill("22027");
      await page.getByTestId("apply-filter-button").dispatchEvent("click");
      await page.getByTestId("dog-card-list").waitFor();

      for (const element of await page.locator("div[data-slot=card-description]").all()) {
        await element.waitFor();
        const info = await element.innerText();
        expect(info.split("\n")[2]).toEqual(expect.stringContaining("22027"));
      }
    });
    test("filter by zip code 2", async ({ page }) => {
      await page.getByTestId("zip-code-input").fill("12424-5355");
      await page.getByTestId("apply-filter-button").dispatchEvent("click");
      await page.getByTestId("no-result").waitFor();
      await expect(page.getByTestId("no-result")).toHaveText(":-(");
    });
  });

  test.describe("page items", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId("dog-card-list").waitFor();
    });

    test("should display 25 puppies by default", async ({ page }) => {
      await expect(page.locator("div[data-slot=card]")).toHaveCount(25);
    });
    test("should display 50 puppies when 50 is selected", async ({ page }) => {
      await page.getByTestId("page-size-selector").click();
      await page.getByTestId("page-size-50").dispatchEvent("click");
      await page.getByTestId("dog-card-list").waitFor();
      await expect(page.locator("div[data-slot=card]")).toHaveCount(50);
    });
    test("should display 75 puppies when 75 is selected", async ({ page }) => {
      await page.getByTestId("page-size-selector").click();
      await page.getByTestId("page-size-75").dispatchEvent("click");
      await page.getByTestId("dog-card-list").waitFor();
      await expect(page.locator("div[data-slot=card]")).toHaveCount(75);
    });
    test("should display 100 puppies when 100 is selected", async ({ page }) => {
      await page.getByTestId("page-size-selector").click();
      await page.getByTestId("page-size-100").dispatchEvent("click");
      await page.getByTestId("dog-card-list").waitFor();
      await expect(page.locator("div[data-slot=card]")).toHaveCount(100);
    });
  });

  test.describe("pagination", () => {
    test.describe("pagination input", () => {
      test("should not accept empty input 1", async ({ page }) => {
        await page.getByTestId("page-selector").hover();
        await page.getByTestId("page-selector-input").fill("");
        await page.getByTestId("page-selector-input").press("Enter");
        await expect(page.getByTestId("page-selector-value")).toHaveText(/^1/);
      });
      test("should not accept empty input 2", async ({ page }) => {
        await page.getByTestId("page-selector").hover();
        await page.getByTestId("page-selector-input").fill("            ");
        await page.getByTestId("page-selector-input").press("Enter");
        await expect(page.getByTestId("page-selector-value")).toHaveText(/^1 \(out of/);
      });
      test("should not accept out of range input 1", async ({ page }) => {
        await page.getByTestId("page-selector").hover();
        await page.getByTestId("page-selector-input").fill("0");
        await page.getByTestId("page-selector-input").press("Enter");
        await expect(page.getByTestId("page-selector-value")).toHaveText(/^1 \(out of/);
      });
      test("should not accept out of range input 2", async ({ page }) => {
        await page.getByTestId("page-selector").hover();
        await page.getByTestId("page-selector-input").fill("-1");
        await page.getByTestId("page-selector-input").press("Enter");
        await expect(page.getByTestId("page-selector-value")).toHaveText(/^1 \(out of/);
      });
      test("should not accept out of range input 3", async ({ page }) => {
        await page.getByTestId("page-selector").hover();
        await page.getByTestId("page-selector-input").fill("-23535");
        await page.getByTestId("page-selector-input").press("Enter");
        await expect(page.getByTestId("page-selector-value")).toHaveText(/^1 \(out of/);
      });
      test("should not accept out of range input 4", async ({ page }) => {
        await page.getByTestId("page-selector").hover();
        await page.getByTestId("page-selector-input").fill("1001");
        await page.getByTestId("page-selector-input").press("Enter");
        await expect(page.getByTestId("page-selector-value")).toHaveText(/^1 \(out of/);
      });
      test("should not accept out of range input 5", async ({ page }) => {
        await page.getByTestId("page-selector").hover();
        await page.getByTestId("page-selector-input").fill("23535");
        await page.getByTestId("page-selector-input").press("Enter");
        await expect(page.getByTestId("page-selector-value")).toHaveText(/^1 \(out of/);
      });
    });

    test.describe("pagination buttons", () => {
      test("should not display previous page when on first page", async ({ page }) => {
        await expect(page.getByTestId("previous-page")).toBeHidden();
        await expect(page.getByTestId("next-page")).toBeVisible();
      });
      test("should display both previous and next page when on second page", async ({ page }) => {
        await page.getByTestId("next-page").click();
        await expect(page.getByTestId("previous-page")).toBeVisible();
        await expect(page.getByTestId("next-page")).toBeVisible();
      });
      test("should display both previous and next page when on any page but the first and last", async ({ page }) => {
        await page.getByTestId("page-selector").hover();
        await page.getByTestId("page-selector-input").fill("126");
        await page.getByTestId("page-selector-input").press("Enter");
        await expect(page.getByTestId("previous-page")).toBeVisible();
        await expect(page.getByTestId("next-page")).toBeVisible();
      });
      test("should not display next page when on last page", async ({ page }) => {
        const pageInfo = await page.getByTestId("page-selector-value").innerText();
        const totalPage = /^1 \(out of (\d+)\)$/.exec(pageInfo)![1];

        await page.getByTestId("page-selector").hover();
        await page.getByTestId("page-selector-input").fill(totalPage);
        await page.getByTestId("page-selector-input").press("Enter");
        await expect(page.getByTestId("previous-page")).toBeVisible();
        await expect(page.getByTestId("next-page")).toBeHidden();
      });
    });
  });

  test("reset", async ({ page }) => {
    await page.getByTestId("sort-selector").click();
    await page.getByTestId("sort-name").click();

    await page.getByTestId("sort-desc").click();
    await page.getByTestId("sort-asc").click();
    await page.getByTestId("sort-desc").click();

    await page.getByTestId("filter-button").click();
    await page.getByTestId("breed-selector").click();
    for (const element of await page.locator("div[role=option]").all()) {
      await element.waitFor();
      if (await element.innerText() === "Lhasa") {
        await element.dispatchEvent("click");
        break;
      }
    }
    await page.getByTestId("min-age-input").fill("4");
    await page.getByTestId("max-age-input").fill("8");
    await page.getByTestId("apply-filter-button").dispatchEvent("click");

    await page.getByTestId("page-size-selector").click();
    await page.getByTestId("page-size-50").dispatchEvent("click");

    await page.getByTestId("page-selector").hover();
    await page.getByTestId("page-selector-input").fill("2");
    await page.getByTestId("page-selector-input").press("Enter");

    await page.getByTestId("dog-card-list").waitFor();
    await page.getByTestId("reset-button").click();
    await page.getByTestId("dog-card-list").waitFor();

    expect(await page.getByTestId("sort-field").innerText())
      .toEqual(expect.stringContaining("Breed"));
    await expect(page.getByTestId("sort-desc")).toBeVisible();
    
    await page.getByTestId("page-selector-value").waitFor();
    expect(await page.getByTestId("page-selector-value").innerText())
      .toEqual(expect.stringContaining("1 (out of"));
    expect(await page.getByTestId("page-size").innerText())
      .toEqual(expect.stringContaining("25 Items"));

    await page.getByTestId("filter-button").click();
    expect(await page.getByTestId("breed").innerText())
      .toEqual(expect.stringContaining("Breed"));
    await expect(page.getByTestId("min-age-input")).toHaveValue("");
    await expect(page.getByTestId("max-age-input")).toHaveValue("");
  });
});