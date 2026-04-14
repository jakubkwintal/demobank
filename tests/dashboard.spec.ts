import { test } from '../fixtures/test';
import { quickTransfers } from '../testData/dashboad.data';

test.describe('Dashboard', () => {
  // Tests covering basic dashboard operations
  for (const transferData of quickTransfers) {
    test(`should complete quick transfer successfully - ${transferData.receiver}`, async ({
      dashboardPage,
    }) => {
      const { receiver, amount, title } = transferData;

      await dashboardPage.makeQuickTransfer(receiver, amount, title);
      await dashboardPage.assertQuickTransfer(receiver, amount, title);
    });
  }

  test('should display all menu items', async ({ dashboardPage }) => {
    await dashboardPage.checkMenuItemsVisibility();
  });
});
