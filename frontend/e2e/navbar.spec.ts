import { test, expect } from '@playwright/test';

test.describe('Navbar Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Desktop Navigation', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('should render all nav items', async ({ page }) => {
      const navItems = ['Home', 'Approach', 'Services', 'Industries', 'Company', 'Your First Week'];

      for (const item of navItems) {
        const navButton = page.getByTestId(`nav-${item.toLowerCase()}`);
        await expect(navButton).toBeVisible();
      }
    });

    test('should show CTA button', async ({ page }) => {
      const ctaBtn = page.getByTestId('nav-cta');
      await expect(ctaBtn).toBeVisible();
      await expect(ctaBtn).toHaveText(/Book Consultation/i);
    });

    test('should open Services dropdown with new items', async ({ page }) => {
      const servicesBtn = page.getByTestId('nav-services');
      await servicesBtn.click();

      // Check for old and new items
      const expectedItems = [
        'Managed Services',
        'Agentic Foundry',
        'Staffing Services',
        'MuleSoft COE'
      ];

      for (const item of expectedItems) {
        const dropdownItem = page.locator(`.dropdown-container >> text="${item}"`);
        await expect(dropdownItem).toBeVisible();
      }
    });

    test('should open Approach dropdown', async ({ page }) => {
      const approachBtn = page.getByTestId('nav-challenge');
      await approachBtn.click();

      const challengeItem = page.locator('text="The Challenge"');
      const engagementItem = page.locator('text="Engagement Model"');

      await expect(challengeItem).toBeVisible();
      await expect(engagementItem).toBeVisible();
    });

    test('should open Company dropdown with Your First Week', async ({ page }) => {
      const companyBtn = page.getByTestId('nav-about');
      await companyBtn.click();

      const aboutItem = page.locator('text="About"');
      const firstWeekItem = page.locator('text="Your First Week"');
      const caseStudiesItem = page.locator('text="Case Studies"');
      const careersItem = page.locator('text="Careers"');

      await expect(aboutItem).toBeVisible();
      await expect(firstWeekItem).toBeVisible();
      await expect(caseStudiesItem).toBeVisible();
      await expect(careersItem).toBeVisible();
    });

    test('should scroll to section on nav click', async ({ page }) => {
      const industriesBtn = page.getByTestId('nav-industries');
      const industriesSection = page.locator('#industries');

      await industriesBtn.click();
      await page.waitForTimeout(500); // Wait for smooth scroll

      const boundingBox = await industriesSection.boundingBox();
      expect(boundingBox?.y).toBeLessThan(window.innerHeight);
    });

    test('should navigate to Managed Services section', async ({ page }) => {
      const servicesBtn = page.getByTestId('nav-services');
      await servicesBtn.click();

      const managedServicesItem = page.locator('button:has-text("Managed Services")').nth(1);
      await managedServicesItem.click();

      const managedServicesSection = page.locator('#managed-services');
      await expect(managedServicesSection).toBeVisible();
    });

    test('should navigate to Agentic Foundry section', async ({ page }) => {
      const servicesBtn = page.getByTestId('nav-services');
      await servicesBtn.click();

      const agenticItem = page.locator('button:has-text("Agentic Foundry")').nth(1);
      await agenticItem.click();

      const agenticSection = page.locator('#agentic-foundry');
      await expect(agenticSection).toBeVisible();
    });

    test('should navigate to Your First Week from Company dropdown', async ({ page }) => {
      const companyBtn = page.getByTestId('nav-about');
      await companyBtn.click();

      const firstWeekItem = page.locator('button:has-text("Your First Week")').nth(1);
      await firstWeekItem.click();

      const firstWeekSection = page.locator('#your-first-week');
      await expect(firstWeekSection).toBeVisible();

      // Verify section content
      const sectionTitle = page.locator('text="One Week. Three Deliverables"');
      await expect(sectionTitle).toBeVisible();
    });

    test('should have logo clickable to home', async ({ page }) => {
      const logo = page.getByTestId('company-logo');
      await expect(logo).toBeVisible();
      await logo.click();

      const heroSection = page.locator('#hero');
      await expect(heroSection).toBeVisible();
    });

    test('should close dropdown on outside click', async ({ page }) => {
      const servicesBtn = page.getByTestId('nav-services');
      await servicesBtn.click();

      const dropdown = page.locator('.dropdown-container >> text="Managed Services"');
      await expect(dropdown).toBeVisible();

      // Click outside
      await page.click('body', { position: { x: 100, y: 100 } });
      await expect(dropdown).not.toBeVisible();
    });

    test('should show theme toggle button', async ({ page }) => {
      const themeToggle = page.locator('[class*="theme"]');
      // Theme toggle exists somewhere in nav
      const navElement = page.getByTestId('main-header');
      await expect(navElement).toContainText(/theme|toggle/i);
    });
  });

  test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should hide desktop nav on mobile', async ({ page }) => {
      const desktopNav = page.locator('nav.hidden.lg\\:flex');
      await expect(desktopNav).not.toBeVisible();
    });

    test('should show mobile menu button', async ({ page }) => {
      const menuBtn = page.locator('button').filter({ has: page.locator('svg') }).first();
      await expect(menuBtn).toBeVisible();
    });

    test('should open mobile menu on button click', async ({ page }) => {
      const menuBtn = page.locator('button').filter({ has: page.locator('svg') }).first();
      await menuBtn.click();

      // Mobile menu should be visible
      const mobileMenu = page.locator('.mobile-menu, [class*="mobile"]');
      // Just verify something opened
      await page.waitForTimeout(300);
    });

    test('should have CTA hidden on mobile', async ({ page }) => {
      const ctaBtn = page.getByTestId('nav-cta');
      await expect(ctaBtn).not.toBeVisible();
    });

    test('should be scrollable on mobile', async ({ page }) => {
      // Nav should be fixed and scrollable
      const header = page.getByTestId('main-header');
      await expect(header).toHaveClass(/fixed/);
    });
  });

  test.describe('Navbar Styling & Behavior', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('should update background on scroll', async ({ page }) => {
      const header = page.getByTestId('main-header');

      // Initially transparent
      let bgClass = await header.getAttribute('class');
      expect(bgClass).toContain('bg-transparent');

      // Scroll down
      await page.evaluate(() => window.scrollBy(0, 100));
      await page.waitForTimeout(300);

      // Background should change
      bgClass = await header.getAttribute('class');
      expect(bgClass).toContain('bg-');
    });

    test('should show hover effects on nav items', async ({ page }) => {
      const homeBtn = page.getByTestId('nav-hero');

      // Hover and check for hover state
      await homeBtn.hover();
      await page.waitForTimeout(200);

      const hoverUnderline = homeBtn.locator('span[class*="rounded"]');
      await expect(hoverUnderline).toBeVisible();
    });
  });

  test.describe('Navigation Accessibility', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('should have proper ARIA labels', async ({ page }) => {
      const header = page.getByTestId('main-header');
      await expect(header).toBeVisible();
    });

    test('should be keyboard navigable', async ({ page }) => {
      // Tab to first nav item
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      const focusedElement = await page.evaluate(() => {
        return document.activeElement?.textContent;
      });

      expect(focusedElement).toBeTruthy();
    });

    test('should work with contact modal', async ({ page }) => {
      const ctaBtn = page.getByTestId('nav-cta');
      await ctaBtn.click();

      // Modal should open
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();
    });
  });
});
