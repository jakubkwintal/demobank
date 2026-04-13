import { test } from '../fixtures/test';
import { quickTransfers } from '../testData/dashboadData';

test.beforeEach(async ({ page }) => {
  await page.goto('/pulpit.html');
});

quickTransfers.forEach((transferData) => {
  test(`Make quick transfer', ${transferData.receiver}`, async ({
    dashboardPage,
  }) => {
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
  });
});

test('Check menu items', async ({ dashboardPage }) => {
  await dashboardPage.checkMenuVisibility();
});
