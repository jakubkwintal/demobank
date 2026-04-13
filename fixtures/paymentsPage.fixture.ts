import { PaymentsPage } from '../pages/PaymentsPage';
import { Page } from '@playwright/test';

export const paymentsPageFixture = {
  paymentsPage: async (
    { page }: { page: Page },
    use: (paymentsPage: PaymentsPage) => Promise<void>
  ) => {
    await page.goto('/przelew_nowy_zew.html');
    const paymentsPage = new PaymentsPage(page);
    await use(paymentsPage);
  },
};