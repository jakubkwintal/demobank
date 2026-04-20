import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

setup('save auth state', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);

  await page.context().storageState({ path: './storage/storageState.json' });
});
