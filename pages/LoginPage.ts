import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly nextButton: Locator;
  readonly emptyUsernameMessage: Locator;
  readonly tooShortUsernameMessage: Locator;
  readonly emptyPasswordMessage: Locator;
  readonly tooShortPasswordMessage: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.locator('#login_id');
    this.passwordInput = page.locator('#login_password');
    this.nextButton = page.getByRole('button', { name: 'dalej' });
    this.loginButton = page.getByRole('button', { name: 'zaloguj się' });
    this.emptyUsernameMessage = page.getByText('pole wymagane');
    this.tooShortUsernameMessage = page.getByText('identyfikator ma min. 8 znaków');
    this.emptyPasswordMessage = page.getByText('pole wymagane');
    this.tooShortPasswordMessage = page.getByText('hasło ma min. 8 znaków');
  }

  async goTo() {
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
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.page.keyboard.press('Tab');
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await expect(this.nextButton).toBeEnabled();
    await this.clickNext();
    await this.passwordInput.click();
    await this.fillPassword(password);
    await this.clickLogin();
  }
  
  async assertEmptyUsername() {
    await expect(this.emptyUsernameMessage).toBeVisible();
  }

  async assertTooShortUsername() {
    await expect(this.tooShortUsernameMessage).toBeVisible();
  }

  async assertEmptyPassword() {
    await expect(this.emptyPasswordMessage).toBeVisible();
  }

  async assertTooShortPassword() {
    await expect(this.tooShortPasswordMessage).toBeVisible();
  }

  async assertLoginVisible() {
    await expect(this.loginButton).toBeVisible();
  }
}
