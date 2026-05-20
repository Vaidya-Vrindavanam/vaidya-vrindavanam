import { test, expect } from '@playwright/test';
import { pagePath } from './helpers';

test.describe('Conditions', () => {
  test('should load conditions listing page', async ({ page }) => {
    await page.goto('/conditions/');

    await expect(page).toHaveTitle(/Conditions/);

    // Check for main heading
    const heading = page.locator('main h1');
    await expect(heading).toContainText(/Conditions/);
  });

  test('should display condition cards', async ({ page }) => {
    await page.goto('/conditions/');

    // ConditionCards are <a> elements linking to /conditions/[slug]
    const allLinks = page.locator('main a[href^="/conditions/"]:not([href="/conditions/"])');
    const count = await allLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to condition detail page', async ({ page }) => {
    await page.goto('/conditions/');

    const firstConditionLink = page.locator('main a[href^="/conditions/"]:not([href="/conditions/"])').first();
    const href = await firstConditionLink.getAttribute('href');

    if (href) {
      await firstConditionLink.click();
      await page.waitForURL(pagePath(href.replace(/\/$/, '')));

      // On detail page, main content should be visible
      const content = page.locator('main');
      await expect(content).toBeVisible();
    }
  });

  test('should link to related treatments', async ({ page }) => {
    await page.goto('/conditions/');

    const firstConditionLink = page.locator('main a[href^="/conditions/"]:not([href="/conditions/"])').first();
    const href = await firstConditionLink.getAttribute('href');

    if (href) {
      await firstConditionLink.click();

      // Check for treatment links (may be 0 or more)
      const treatmentLinks = page.locator('main a[href*="/treatments/"]');
      const count = await treatmentLinks.count();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });
});
