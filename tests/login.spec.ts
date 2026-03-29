import { test, expect } from '../fixtures/test';
import { DashboardPage } from '../pages/DashboardPage';
import { validUsers, invalidUsernames, invalidPasswords } from '../testData/loginData';

// TESTY POPRAWNE
validUsers.forEach((user) => {

  test(`Login success: ${user.description}`, async ({ loginPage, page }) => {

    await loginPage.goTo();

    await loginPage.login(user.username, user.password);
    const dashboardPage = new DashboardPage(page);

    await expect(dashboardPage.userFullName).toBeVisible();
  });

});


// TESTY BŁĘDNE
invalidUsernames.forEach((user) => {

  test(`Wrong username: ${user.description}`, async ({ loginPage }) => {

    await loginPage.goTo();

    await loginPage.fillUsername(user.username);
    await expect(loginPage.nextButton).toBeDisabled();

    // asercje zależne od typu błędu
    if (user.description === 'empty username') {
      await loginPage.assertEmptyUsername();
    }

    if (user.description === 'too short username') {
      await loginPage.assertTooShortUsername();
    }
});
  });

invalidPasswords.forEach((user) => {

  test(`Wrong password: ${user.description}`, async ({ loginPage }) => {

    await loginPage.goTo();

    await loginPage.fillUsername(user.username);
    await loginPage.clickNext();

    await loginPage.fillPassword(user.password);
    await expect(loginPage.loginButton).toBeDisabled();

    // asercje zależne od typu błędu
   if (user.description === 'empty password') {
      await loginPage.assertEmptyPassword();
    }

    if (user.description === 'too short password') {
      await loginPage.assertTooShortPassword();
    }
});
  });