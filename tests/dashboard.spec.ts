import { beforeEach } from 'node:test';
import { test } from '../fixtures/test';
import { DashboardPage } from '../pages/DashboardPage';
import { quickTransfers } from '../testData/dashboadData';

test.beforeEach(async ({ page }) => {
  await page.goto('/pulpit.html');
});

test('Make quick transfer', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

  for (const transferData of quickTransfers) {
    await dashboardPage.makeQuickTransfer(
      transferData.receiver,
      transferData.amount,
      transferData.title,
    );
    await dashboardPage.assertQuickTransfer(
      transferData.receiver,
      transferData.amount,
      transferData.title,
    );
  }
});

test.only('Check menu items', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

  await dashboardPage.assertMenuVisible();
});



