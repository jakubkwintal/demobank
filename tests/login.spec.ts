import { test, expect } from '../fixtures/test';
import {
  validUsers,
  invalidUsernames,
  invalidPasswords,
} from '../testData/login.data';

test.describe('Login', () => {
  // Login tests - successful and unsuccessful scenarios
  // Login fixture is not used here to avoid pre-authenticated state
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
  });

  // SUCCESSFUL LOGIN
  for (const user of validUsers) {
    test(`should login successfully - ${user.description}`, async ({
      loginPage,
      dashboardPage
    }) => {
      await loginPage.login(user.username, user.password);

      await dashboardPage.assertUserLoggedIn();
    });
  }

  // UNSUCCESSFUL LOGIN

  for (const user of invalidUsernames) {
    test(`should show error for invalid username - ${user.description}`, async ({
      loginPage,
    }) => {
      await loginPage.fillUsername(user.username);
      await expect(loginPage.nextButton).toBeDisabled();

      await user.assertion(loginPage);
    });
  }

  for (const user of invalidPasswords) {
    test(`should show error for invalid password - ${user.description}`, async ({
      loginPage,
    }) => {
      await loginPage.fillUsername(user.username);
      await loginPage.clickNext();

      await loginPage.fillPassword(user.password);
      await expect(loginPage.loginButton).toBeDisabled();

      await user.assertion(loginPage);
    });
  }
});
