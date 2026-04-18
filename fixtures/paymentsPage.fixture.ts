import { PaymentsPage } from '../pages/PaymentsPage';
import { Page } from '@playwright/test';

export const paymentsPageFixture = {
  // This fixture creates a PaymentsPage instance using the current Playwright page
  // and makes it available in tests as "paymentsPage"
  paymentsPage: async (
    { page }: { page: Page },
    use: (paymentsPage: PaymentsPage) => Promise<void>
  ) => {
    const paymentsPage = new PaymentsPage(page);

    // provide the initialized Page Object to the test
    await use(paymentsPage);
  },
};