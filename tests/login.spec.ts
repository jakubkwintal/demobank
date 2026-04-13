import { test, expect } from '../fixtures/test';
import { DashboardPage } from '../pages/DashboardPage';
import {
  validUsers,
  invalidUsernames,
  invalidPasswords,
} from '../testData/loginData';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
  });

  // SUCCESSFUL LOGIN
  validUsers.forEach((user) => {
    test(`Login success: ${user.description}`, async ({ loginPage, page }) => {
      await loginPage.login(user.username, user.password);
      const dashboardPage = new DashboardPage(page);

      await expect(dashboardPage.userFullName).toBeVisible();
    });
  });

  // UNSUCCESSFUL LOGIN
  invalidUsernames.forEach((user) => {
    test(`Wrong username: ${user.description}`, async ({ loginPage }) => {
      await loginPage.fillUsername(user.username);
      await expect(loginPage.nextButton).toBeDisabled();

      // assertions depending on the error type
      if (user.description === 'empty username') {
        await loginPage.assertEmptyUsername();
      }

      if (user.description === 'too short username') {
        await loginPage.assertTooShortUsername();
      }

      if (user.description === 'too short username - only one character') {
        await loginPage.assertTooShortUsername();
      }
    });
  });

  invalidPasswords.forEach((user) => {
    test(`Wrong password: ${user.description}`, async ({ loginPage }) => {
      await loginPage.fillUsername(user.username);
      await loginPage.clickNext();

      await loginPage.fillPassword(user.password);
      await expect(loginPage.loginButton).toBeDisabled();

      // assertions depending on the error type
      if (user.description === 'empty password') {
        await loginPage.assertEmptyPassword();
      }

      if (user.description === 'too short password') {
        await loginPage.assertTooShortPassword();
      }
    });
  });
});
