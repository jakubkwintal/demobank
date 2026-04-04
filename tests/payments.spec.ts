import { test, expect } from '../fixtures/test';
import { DashboardPage } from '../pages/DashboardPage';
import { PaymentsPage } from '../pages/PaymentsPage';
import * as paymentsData from '../testData/paymentsData';

test.beforeEach(async ({ page }) => {
  await page.goto('/pulpit.html');
  const dashboardPage = new DashboardPage(page);
  dashboardPage.payments.click();
});

test('Make payment', async ({ page }) => {
  const paymentsPage = new PaymentsPage(page);

  await paymentsPage.fillAccounts(
    paymentsData.accountsData.fromAccountValue,
    paymentsData.accountsData.receiverNameValue,
    paymentsData.accountsData.toAccountValue,
  );

  await paymentsPage.fillReceiverAddress(
    paymentsData.receiverAddressData.streetAndNumberValue,
    paymentsData.receiverAddressData.postalCodeAndCityValue,
    paymentsData.receiverAddressData.addressAdditionalFieldValue,
  );

  await paymentsPage.fillAmountAndCheckBalance(
    paymentsData.amountData.amountValue,
  );

  await paymentsPage.fillPaymentTitle(
    paymentsData.paymentTitleData.paymentTitleValue,
  );

  await paymentsPage.selectTomorrowDate();

  await paymentsPage.selectTransferType(
    paymentsData.transferTypeData.transferTypeValue,
  );

  await paymentsPage.sendEmailConfirmation(
    paymentsData.emailConfirmationData.wantConfirmationValue,
    paymentsData.emailConfirmationData.emailConfirmationValue,
  );

  await paymentsPage.saveReceiver(
    paymentsData.receiverToSaveData.wantSaveReceiverValue,
    paymentsData.receiverToSaveData.receiverToSaveValue,
    paymentsData.receiverToSaveData.asTrustedValue,
  );

  await paymentsPage.completeTransfer();
});
