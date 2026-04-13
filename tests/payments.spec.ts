import { test } from '../fixtures/test';
import { TransferType } from '../testData/payments.enums';

test.describe('Payments', () => {
  test('Make express payment', async ({ paymentsPage, paymentsData }) => {
    await paymentsPage.makePayment(paymentsData);
    await paymentsPage.completeTransfer();
  });

  test('Make normal payment', async ({ paymentsPage, paymentsData }) => {
    const normalPayment = {
      ...paymentsData,
      transferType: { transferTypeValue: TransferType.NORMAL },
    };

    await paymentsPage.makePayment(normalPayment);
    await paymentsPage.completeTransfer();
  });

  test('Make payment without address', async ({
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
