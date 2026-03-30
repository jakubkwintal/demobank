import { test, expect } from '../fixtures/test';
import { DashboardPage } from '../pages/DashboardPage';
import { quickTransfers } from '../testData/dashboadData';

test('Make quick transfer', async ({ page }) => {
  await page.goto('/pulpit.html');

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
