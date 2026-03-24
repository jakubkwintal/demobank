import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  // readonly page: Page
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly nextButton: Locator;
  readonly errorLoginMessage: Locator;
  readonly errorPasswordMessage: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#login_id');
    this.passwordInput = page.locator('#login_password');
    this.nextButton = page.getByRole('button', { name: 'dalej' });
    this.loginButton = page.getByRole('button', { name: 'zaloguj się' });
    this.errorLoginMessage = page.getByText('identyfikator ma min. 8 znaków');
    this.errorPasswordMessage = page.getByText('hasło ma min. 8 znaków');
  }

  async goTo(): Promise<void> {
    await this.page.goto('/logowanie_etap_1.html');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
    await this.page.keyboard.press('Tab');
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
    await this.page.keyboard.press('Tab');
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await expect(this.nextButton).toBeEnabled();
    await this.clickNext();
    await this.passwordInput.click();
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async assertWrongUsername(): Promise<void> {
    await expect(this.errorLoginMessage).toBeVisible();
  }

  async assertWrongPassword(): Promise<void> {
    await expect(this.errorPasswordMessage).toBeVisible();
  }

  async assertLoginVisible() {
    await expect(this.loginButton).toBeVisible();
  }
}
