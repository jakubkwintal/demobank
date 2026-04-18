import { Payment } from '../testData/payments.types';
import { basePayment } from '../testData/payments.data';

export const paymentsDataFixture = {
  // This fixture provides default payment test data
  // and makes it available in tests as "paymentData"
  paymentData: async ({}: {}, use: (data: Payment) => Promise<void>) => {
    // pass the predefined base payment data to the test
    await use(basePayment);
  },
};