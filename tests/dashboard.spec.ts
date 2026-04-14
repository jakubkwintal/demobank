import { test } from '../fixtures/test';
import { quickTransfers } from '../testData/dashboad.data';

quickTransfers.forEach((transferData) => {
  test(`should make quick transfer - ${transferData.receiver}`, async ({
    dashboardPage,
  }) => {
    const { receiver, amount, title } = transferData;

    await dashboardPage.makeQuickTransfer(receiver, amount, title);
    await dashboardPage.assertQuickTransfer(receiver, amount, title);
  });
});

test('should display all menu items', async ({ dashboardPage }) => {
  await dashboardPage.checkMenuItemsVisibility();
});
