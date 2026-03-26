import { LoginPage } from '../pages/LoginPage';
import { Page } from '@playwright/test';

export const loginPageFixture = {
  loginPage: async (
    { page }: { page: Page },
    use: (loginPage: LoginPage) => Promise<void>
  ) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
};