import { test } from '../fixtures/test';
import { DashboardPage } from '../pages/DashboardPage';
import { PaymentsData } from '../testData/payments.types';

test.describe('Payments', () => {
  test('Make express payment', async ({ paymentsPage, paymentsData }) => {
    await paymentsPage.makePayment(paymentsData);
    await paymentsPage.completeTransfer();
  });

  test('Make normal payment', async ({ paymentsPage, paymentsData }) => {
    const normalPayment: PaymentsData = {
      ...paymentsData,
      transferType: { transferTypeValue: 'zwykły' },
    };

    await paymentsPage.makePayment(normalPayment);
    await paymentsPage.completeTransfer();
  });

  test('Make payment without address', async ({
    paymentsPage,
    paymentsData,
  }) => {
    const paymentWithoutAddress: PaymentsData = {
      ...paymentsData,
      address: undefined,
      transferType: { transferTypeValue: 'zwykły' },
    };

    await paymentsPage.makePayment(paymentWithoutAddress);
    await paymentsPage.completeTransfer();
  });
});
