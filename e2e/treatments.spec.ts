import { test, expect } from '@playwright/test';

test.describe('Treatments', () => {
  test('should load treatments listing page', async ({ page }) => {
    await page.goto('/treatments');

    await expect(page).toHaveTitle(/Treatments/);

    // Check for "Our Treatments" heading in main content
    const heading = page.locator('main h1');
    await expect(heading).toContainText(/Treatments/);
  });

  test('should display treatment cards', async ({ page }) => {
    await page.goto('/treatments');

    // TreatmentCards are <a> elements linking to /treatments/[slug]
    const treatmentLinks = page.locator('main').locator('a[href*="/treatments/"]').filter({ hasNot: page.locator('a[href="/treatments"]') });
    // Simpler: count all treatment detail links (avoid self-link)
    const allLinks = page.locator('main a[href*="/treatments/"]');
    const count = await allLinks.count();
    expect(count).toBeGreaterThan(1); // More than just list page link
  });

  test('should navigate to treatment detail page', async ({ page }) => {
    await page.goto('/treatments');

    // Get a treatment detail link (not the listing page link)
    const firstTreatmentLink = page.locator('main a[href*="/treatments/"]').nth(1);
    const href = await firstTreatmentLink.getAttribute('href');

    if (href && href !== '/treatments') {
      await firstTreatmentLink.click();
      await page.waitForURL(new RegExp(`${href}$`));

      // On detail page, check that content loaded
      const content = page.locator('main');
      await expect(content).toBeVisible();
    }
  });

  test('should display treatment details', async ({ page }) => {
    await page.goto('/treatments');

    const firstTreatmentLink = page.locator('main a[href*="/treatments/"]').nth(1);
    const href = await firstTreatmentLink.getAttribute('href');

    if (href && href !== '/treatments') {
      await firstTreatmentLink.click();

      // Check for content that should be on detail page
      const content = page.locator('main');
      await expect(content).toBeVisible();
    }
  });
});
