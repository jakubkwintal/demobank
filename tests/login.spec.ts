import { test, expect } from '../fixtures/test';
import { DashboardPage } from '../pages/DashboardPage';
import {
  validUsers,
  invalidUsernames,
  invalidPasswords,
} from '../testData/login.data';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
  });

  // SUCCESSFUL LOGIN
  validUsers.forEach((user) => {
    test(`should login successfully - ${user.description}`, async ({
      loginPage,
      page,
    }) => {
      await loginPage.login(user.username, user.password);
      const dashboardPage = new DashboardPage(page);

      await expect(dashboardPage.userFullName).toBeVisible();
    });
  });

  // UNSUCCESSFUL LOGIN

  invalidUsernames.forEach((user) => {
    test(`should show error for invalid username - ${user.description}`, async ({
      loginPage,
    }) => {
      await loginPage.fillUsername(user.username);
      await expect(loginPage.nextButton).toBeDisabled();

      await user.assertion(loginPage);
    });
  });

  invalidPasswords.forEach((user) => {
    test(`should show error for invalid password - ${user.description}`, async ({
      loginPage,
    }) => {
      await loginPage.fillUsername(user.username);
      await loginPage.clickNext();

      await loginPage.fillPassword(user.password);
      await expect(loginPage.loginButton).toBeDisabled();

      await user.assertion(loginPage);
    });
  });
});
