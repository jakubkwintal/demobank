import { test, expect } from '../fixtures/test';
import { DashboardPage } from '../pages/DashboardPage';
import { quickTransfers } from '../testData/dashboadData';


test.only('Make quick transfer', async ({ loginPage, page }) => {
  
    await loginPage.goTo()

     await loginPage.login('12345678', '12345678');
    const dashboardPage = new DashboardPage(page);

    for (const transferData of quickTransfers) {
    await dashboardPage.makeQuickTransfer(transferData.receiver, transferData.amount, transferData.title);
    await dashboardPage.assertQuickTransfer(transferData.receiver, transferData.amount, transferData.title);
  }

});

