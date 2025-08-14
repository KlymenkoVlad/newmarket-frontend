import { test, expect } from '@playwright/test';

test('Login page has title and login form', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  const emailInput = page.getByTestId("email");
  const passwordInput = page.getByTestId("password");
  const button = page.getByTestId('btn-submit');

  await emailInput.fill('test@gmail.com');
  await passwordInput.fill('test1234');

  await button.click();

  await expect(page).toHaveURL('http://localhost:3000/me');
});