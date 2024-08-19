import { test, expect, Page } from "@playwright/test";

const expectText = async (page: Page, text: string) => {
  const elem = await page.waitForSelector(`text=${text}`, { timeout: 1000 });
  expect(elem).not.toBeNull();
};

test("cannot go to profile without login", async ({ page }) => {
  await page.goto("http://localhost:3000/profile");
  await expectText(page, "404");
});

test("create-account with duplicated username or email should show error", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/create-account");

  await page.getByPlaceholder("email")?.fill("a@zod.com");
  await page.getByPlaceholder("username")?.fill("abcde");
  await page.getByPlaceholder("password")?.fill("1234567890");
  const button = page.getByRole("button", { name: "Create Account" });
  await button.click();
  await expectText(page, "Username already exists");

  await page.getByPlaceholder("username")?.fill("abcdefxxxxx");
  await button.click();
  await expectText(page, "Email already exists");
});

test("log-in with wrong email or password should show error", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/log-in");

  await page.getByPlaceholder("email")?.fill("wrong@email.com");
  await page.getByPlaceholder("password")?.fill("wrongPw");
  const button = page.getByRole("button", { name: "Log in" });
  await button.click();
  await expectText(page, "An account with this email does not exist.");

  await page.getByPlaceholder("email")?.fill("a@zod.com");
  await button.click();
  await expectText(page, "Wrong password.");
});

test("should log-in", async ({ page }) => {
  await page.goto("http://localhost:3000/log-in");
  await page.getByPlaceholder("email")?.fill("a@zod.com");
  await page.getByPlaceholder("password")?.fill("1234567890");
  const button = page.getByRole("button", { name: "Log in" });
  await button.click();
  await expect(page).toHaveURL(/profile/);
});
