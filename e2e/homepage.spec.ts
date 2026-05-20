import { test, expect } from '@playwright/test';
import { pagePath } from './helpers';

test.describe('Homepage', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Vaidya Vrindavanam/);

    // Check that main content is visible
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should display navbar', async ({ page }) => {
    await page.goto('/');

    const navbar = page.locator('#main-nav');
    await expect(navbar).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have WhatsApp button', async ({ page }) => {
    await page.goto('/');

    // Check for the floating WhatsApp button (fixed position, bottom-right)
    const whatsappBtn = page.locator('a[aria-label="Chat on WhatsApp"]');
    await expect(whatsappBtn).toBeVisible();
  });

  test('should navigate to treatments page', async ({ page }) => {
    await page.goto('/');

    const treatmentsLink = page.locator('#main-nav a[href="/treatments/"]');
    await treatmentsLink.click();

    await page.waitForURL(pagePath('/treatments'));
    await expect(page).toHaveTitle(/Treatments/);
  });

  test('should navigate to conditions page', async ({ page }) => {
    await page.goto('/');

    const conditionsLink = page.locator('#main-nav a[href="/conditions/"]');
    await conditionsLink.click();

    await page.waitForURL(pagePath('/conditions'));
    await expect(page).toHaveTitle(/Conditions/);
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');

    const aboutLink = page.locator('#main-nav a[href="/about/"], footer a[href="/about/"]').first();
    if (await aboutLink.count() > 0) {
      await aboutLink.click();
      await page.waitForURL(pagePath('/about'));
      await expect(page).toHaveTitle(/About/);
    }
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');

    const contactLink = page.locator('#main-nav a[href="/contact/"], footer a[href="/contact/"]').first();
    if (await contactLink.count() > 0) {
      await contactLink.click();
      await page.waitForURL(pagePath('/contact'));
      await expect(page).toHaveTitle(/Contact/);
    }
  });
});
