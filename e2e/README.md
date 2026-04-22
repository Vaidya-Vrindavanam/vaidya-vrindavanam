# E2E Tests for Vaidya Vrindavanam Frontend

Playwright-based end-to-end tests for the Astro static site.

## Test Coverage

- **homepage.spec.ts** — Hero section, navbar, footer, WhatsApp button, navigation links
- **treatments.spec.ts** — Treatments listing, treatment cards, detail pages
- **conditions.spec.ts** — Conditions listing, condition cards, detail pages, related treatments
- **pages.spec.ts** — About, packages, contact, blog listing, blog detail, 404 page
- **navigation.spec.ts** — Navigation flow, breadcrumbs, footer links, page navigation consistency

## Running Tests

### Development mode (auto-reload on changes)
```bash
npm run dev    # Terminal 1: Start Astro dev server
npm run test:e2e   # Terminal 2: Run all tests
```

### With UI mode (visual test runner)
```bash
npm run test:e2e:ui
```
Opens Playwright Inspector where you can see each test step, reruns, and DOM snapshots.

### Debug mode (step-through debugging)
```bash
npm run test:e2e:debug
```

### Headed mode (see browser window)
```bash
npm run test:e2e:headed
```

## Configuration

- **baseURL:** `http://localhost:4321` (Astro dev server)
- **testDir:** `./e2e/`
- **browsers:** Chromium, Firefox, Safari
- **reporters:** HTML report generated in `playwright-report/`

## Adding New Tests

1. Create a new file in `e2e/` with `.spec.ts` extension
2. Use Playwright's test API:
   ```ts
   import { test, expect } from '@playwright/test';
   
   test('should do something', async ({ page }) => {
     await page.goto('/path');
     await expect(page.locator('h1')).toBeVisible();
   });
   ```
3. Run `npm run test:e2e` to execute

## Tips

- Use `await page.pause()` to pause execution during debug
- Use `page.locator('[data-testid="..."]')` for robust element selection
- Tests run in parallel by default; avoid shared state
- Screenshots and traces are captured on test failure
