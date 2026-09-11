import { test, expect } from '@playwright/test';
import { pagePath } from './helpers';

test.describe('Core Pages', () => {
  test('should load about page', async ({ page }) => {
    await page.goto('/about/');

    await expect(page).toHaveTitle(/About/);
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should load packages page', async ({ page }) => {
    await page.goto('/packages/');

    await expect(page).toHaveTitle(/Packages/);
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should not promote an expired seasonal booking campaign', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#announcement-bar')).toHaveCount(0);
    await expect(page.getByText(/Karkidakam 2026 now booking/i)).toHaveCount(0);
    await expect(page.getByText(/VIEW 2026 PACKAGE/i)).toHaveCount(0);
  });

  test('should explain how package pricing is decided before enquiry', async ({ page }) => {
    await page.goto('/packages/');

    await expect(page.getByText(/Pricing shared after consultation/i).first()).toBeVisible();
    const packageEnquiry = page.getByRole('link', { name: /Request availability & pricing/i }).first();
    await expect(packageEnquiry).toBeVisible();
    await expect(packageEnquiry).toHaveAttribute('href', /availability%2C%20pricing/i);
  });

  test('should load contact page', async ({ page }) => {
    await page.goto('/contact/');

    await expect(page).toHaveTitle(/Contact/);
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should load blog listing page', async ({ page }) => {
    await page.goto('/blog/');

    await expect(page).toHaveTitle(/Blog/);
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should load blog post detail page', async ({ page }) => {
    await page.goto('/blog/');

    const allBlogLinks = page.locator('main a[href^="/blog/"]:not([href="/blog/"])');
    const count = await allBlogLinks.count();

    if (count > 0) {
      const firstBlogLink = allBlogLinks.first();
      const href = await firstBlogLink.getAttribute('href');

      if (href) {
        await firstBlogLink.click();
        await page.waitForURL(pagePath(href.replace(/\/$/, '')));

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
