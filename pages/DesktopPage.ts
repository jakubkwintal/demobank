import { Page, Locator, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';

export class DesktopPage {
  readonly page: Page
  readonly userFullName: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.userFullName = page.getByLabel('Jan Demobankowy')
    this.logoutButton = page.locator('#log_out')
  }

  async goTo(): Promise<void> {
    await this.page.goto('/pulpit.html')
  }

  async logout(): Promise<LoginPage> {
  await this.logoutButton.click()
  return new LoginPage(this.page)
}

}