import { test } from '../fixtures/test';
import { DesktopPage } from '../pages/DesktopPage';

test.beforeEach(async ({ loginPage }) => {
  // Arrange
  await loginPage.goTo();
});

test('login - valid credentials', async ({ loginPage, user, page }) => {
  // Act
  await loginPage.login(user.username, user.password);

  // Assert
  const desktopPage = new DesktopPage(page);
  await desktopPage.userFullName.isVisible();
});

test('login - invalid (too short) username', async ({ loginPage }) => {
  // Act
  await loginPage.fillUsername('1234567');

  // Assert
  await loginPage.assertWrongUsername();
});

test('login - invalid (too short) password', async ({ loginPage }) => {
  // Act
  await loginPage.fillUsername('12345678');
  await loginPage.clickNext();
  await loginPage.fillPassword('abcdefg');

  // Assert
  await loginPage.assertWrongPassword();
});

test('logout', async ({ page, loginPage, user }) => {
  // Arrange
  const desktopPage = new DesktopPage(page);

  // Act
  await loginPage.login(user.username, user.password);
  await desktopPage.logout();

  // Assert
  await loginPage.assertLoginVisible();
});
