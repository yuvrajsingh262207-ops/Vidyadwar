import { expect, test } from '@playwright/test';

async function expectNoHorizontalOverflow(page: import('@playwright/test').Page) {
  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(overflows).toBe(false);
}

test('Aarav journey exposes the improved explanations and checklist views', async ({ page }, testInfo) => {
  await page.goto('/login');
  await page.getByTestId('load-demo-student-button').click();
  await expect(page.getByTestId('sidebar-profile-name')).toHaveText('Aarav');
  await expect(page.getByTestId('page-heading')).toContainText('Welcome, Aarav');

  await page.goto('/scholarships');
  await expect(page.getByTestId('scholarship-card-national-stem')).toBeVisible();
  await expect(page.getByTestId('condition-match-summary').first()).toContainText('Condition checks');
  await page.goto('/scholarships/national-stem');
  await expect(page.getByTestId('condition-match-summary')).toContainText('3 match');
  await expect(page.getByTestId('eligibility-condition-marks')).toContainText('Your percentage is 82%; the minimum is 75%.');

  await page.goto('/compare');
  await page.getByTestId('compare-check-compatibility-button').click();
  await expect(page.getByTestId('conflict-stage-why')).toContainText('Both records describe a maintenance benefit');
  await expect(page.getByTestId('evidence-explanation-panel')).toBeVisible();

  await page.goto('/documents');
  const domicileRow = page.getByTestId('document-row-doc-domicile');
  await expect(domicileRow).toContainText('Identity');
  await expect(domicileRow).toContainText('National STEM Advancement Scholarship');
  await expect(domicileRow.getByTestId('document-toggle-doc-domicile')).toBeVisible();

  await page.goto('/tracking');
  const deadline = page.getByTestId('tracking-deadline-national-stem');
  await expect(deadline).toContainText('2026-04-30');
  await expect(deadline).toContainText('Prototype');
  await expect(deadline).toContainText('Verify the current deadline');
  await expect(deadline).not.toContainText(/days left|overdue/i);

  if (testInfo.project.name === 'mobile') {
    await page.setViewportSize({ width: 320, height: 844 });
    const routes: Array<[string, string]> = [
      ['/', 'landing-hero-heading'],
      ['/dashboard', 'page-heading'],
      ['/scholarships', 'page-heading'],
      ['/compare', 'page-heading'],
      ['/conflicts/national-stem-maharashtra-support', 'page-heading'],
      ['/documents', 'page-heading'],
      ['/tracking', 'page-heading'],
      ['/profile', 'page-heading'],
    ];
    for (const [route, heading] of routes) {
      await page.goto(route);
      await expect(page.getByTestId(heading)).toBeVisible();
      await expectNoHorizontalOverflow(page);
    }
  }
});
