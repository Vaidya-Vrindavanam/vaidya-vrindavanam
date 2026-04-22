import { test, expect } from '@playwright/test';

test.describe('Core Pages', () => {
  test('should load about page', async ({ page }) => {
    await page.goto('/about');

    await expect(page).toHaveTitle(/About/);
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should load packages page', async ({ page }) => {
    await page.goto('/packages');

    await expect(page).toHaveTitle(/Packages/);
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should load contact page', async ({ page }) => {
    await page.goto('/contact');

    await expect(page).toHaveTitle(/Contact/);
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should load blog listing page', async ({ page }) => {
    await page.goto('/blog');

    await expect(page).toHaveTitle(/Blog/);
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should load blog post detail page', async ({ page }) => {
    await page.goto('/blog');

    const allBlogLinks = page.locator('main a[href*="/blog/"]');
    const count = await allBlogLinks.count();

    if (count > 1) { // There should be listing links
      const firstBlogLink = allBlogLinks.nth(1);
      const href = await firstBlogLink.getAttribute('href');

      if (href && href !== '/blog') {
        await firstBlogLink.click();
        await page.waitForURL(new RegExp(`${href}$`));

        const article = page.locator('main');
        await expect(article).toBeVisible();
      }
    }
  });

  test('should handle 404 page gracefully', async ({ page }) => {
    await page.goto('/nonexistent-page-12345');

    // Should load 404 page without errors
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });
});
