import { DashboardPage } from '../pages/DashboardPage';
import { Page } from '@playwright/test';

export const dashboardPageFixture = {
  // This fixture creates a DashboardPage instance using the current Playwright page
  // and makes it available in tests as "dashboardPage"
  dashboardPage: async (
    { page }: { page: Page },
    use: (dashboardPage: DashboardPage) => Promise<void>,
  ) => {
    const dashboardPage = new DashboardPage(page);

    // provide the initialized Page Object to the test
    await use(dashboardPage);
  },
};