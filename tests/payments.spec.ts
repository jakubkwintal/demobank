import { test } from '../fixtures/test';
import { TransferType } from '../testData/payments.enums';

test.describe('Payments', () => {
  test('should complete express payment successfully', async ({ paymentsPage, paymentsData }) => {
    await paymentsPage.makePayment(paymentsData);
    await paymentsPage.completeTransfer();
  });

  test('should complete normal payment with no fee', async ({ paymentsPage, paymentsData }) => {
    const normalPayment = {
      ...paymentsData,
      transferType: { transferTypeValue: TransferType.NORMAL },
    };

    await paymentsPage.makePayment(normalPayment);
    await paymentsPage.completeTransfer();
  });

  test('should complete payment without providing address', async ({
    paymentsPage,
    paymentsData,
  }) => {
    const paymentWithoutAddress = {
      ...paymentsData,
      address: undefined,
      transferType: { transferTypeValue: TransferType.NORMAL },
    };

    await paymentsPage.makePayment(paymentWithoutAddress);
    await paymentsPage.completeTransfer();
  });
});
