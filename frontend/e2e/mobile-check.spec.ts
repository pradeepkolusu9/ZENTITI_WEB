import { test, expect } from '@playwright/test';

test.describe('Mobile Layout Check', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('Case Studies mobile layout', async ({ page }) => {
    await page.evaluate(() => {
      const el = document.getElementById('case-studies');
      if (el) el.scrollIntoView();
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'e2e/screenshots/case-studies-mobile.png', fullPage: false });
  });

  test('Your First Week mobile layout', async ({ page }) => {
    await page.evaluate(() => {
      const el = document.getElementById('your-first-week');
      if (el) el.scrollIntoView();
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'e2e/screenshots/your-first-week-mobile.png', fullPage: false });
  });

  test('Industries mobile layout', async ({ page }) => {
    await page.evaluate(() => {
      const el = document.getElementById('industries');
      if (el) el.scrollIntoView();
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'e2e/screenshots/industries-mobile.png', fullPage: false });
  });

  test('Core Values mobile layout', async ({ page }) => {
    await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach(s => {
        if (s.textContent?.includes('Core Values') || s.textContent?.includes('core-values')) {
          s.scrollIntoView();
        }
      });
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'e2e/screenshots/core-values-mobile.png', fullPage: false });
  });
});
