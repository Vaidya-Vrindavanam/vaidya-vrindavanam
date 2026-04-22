import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate via navbar links', async ({ page }) => {
    await page.goto('/');

    // Test treatments link
    const treatmentsLink = page.locator('nav a[href="/treatments"]');
    await treatmentsLink.click();
    await page.waitForURL('**/treatments');

    // Test conditions link
    const conditionsLink = page.locator('nav a[href="/conditions"]');
    await conditionsLink.click();
    await page.waitForURL('**/conditions');
  });

  test('should have working internal links', async ({ page }) => {
    await page.goto('/treatments');

    // Navigate to treatment detail
    const allTreatmentLinks = page.locator('main a[href*="/treatments/"]');
    const count = await allTreatmentLinks.count();

    if (count > 1) {
      const firstTreatmentLink = allTreatmentLinks.nth(1);
      const href = await firstTreatmentLink.getAttribute('href');

      if (href && href !== '/treatments') {
        await firstTreatmentLink.click();

        // Should be able to navigate back
        await page.goBack();
        await page.waitForURL('**/treatments');
      }
    }
  });

  test('should have accessible footer links', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    const footerLinks = footer.locator('a');
    const count = await footerLinks.count();

    expect(count).toBeGreaterThan(0);

    // Test clicking first footer link
    const firstFooterLink = footerLinks.first();
    const href = await firstFooterLink.getAttribute('href');

    if (href && href.startsWith('/')) {
      await firstFooterLink.click();
      // Should navigate successfully without errors
      await expect(page).not.toHaveURL(/error/);
    }
  });

  test('should maintain nav state while browsing', async ({ page }) => {
    await page.goto('/');

    // Navigate multiple times
    await page.goto('/treatments');
    await page.goto('/conditions');
    await page.goto('/about');
    await page.goto('/');

    // Should end up on homepage
    await expect(page).toHaveURL('/');
  });
});
