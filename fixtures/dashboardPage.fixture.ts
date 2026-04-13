import { DashboardPage } from '../pages/DashboardPage';
import { Page } from '@playwright/test';

export const dashboardPageFixture = {
  dashboardPage: async (
    { page }: { page: Page },
    use: (dashboardPage: DashboardPage) => Promise<void>
  ) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
};