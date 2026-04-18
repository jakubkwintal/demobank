import { LoginPage } from '../pages/LoginPage';
import { Page } from '@playwright/test';

export const loginPageFixture = {
  // This fixture creates a LoginPage instance using the current Playwright page
  // and makes it available in tests as "loginPage"
  loginPage: async (
    { page }: { page: Page },
    use: (loginPage: LoginPage) => Promise<void>
  ) => {
    const loginPage = new LoginPage(page);

    // provide the initialized Page Object to the test
    await use(loginPage);
  },
};