import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type User = {
  username: string;
  password: string;
};

type MyFixtures = {
  user: User;
  loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  
  user: async ({}, use) => {
    await use({
      username: 'jakubkwi',
      password: 'pass123!',
    });
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

});