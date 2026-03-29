import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class DashboardPage {
  readonly page: Page;
  readonly userFullName: Locator;
  readonly logoutButton: Locator;
  readonly quickTransferReceiverList: Locator;
  readonly quickTransferAmount: Locator;
  readonly quickTransferTitle: Locator;
  readonly quickTransferButton: Locator;
  readonly quickTransferMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userFullName = page.locator('#user_name'); // bez hasText
    this.logoutButton = page.locator('#log_out');

    this.quickTransferReceiverList = page.locator(
      '#widget_1_transfer_receiver',
    );
    this.quickTransferAmount = page.locator('#widget_1_transfer_amount');
    this.quickTransferTitle = page.locator('#widget_1_transfer_title');
    this.quickTransferButton = page.getByRole('button', { name: 'wykonaj' });
    this.quickTransferMessage = page.locator('#show_messages');
  }

  async goTo() {
    await this.page.goto('/pulpit.html');
  }

  async logout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  //  Quick transfer

  async selectReceiver(receiver: string) {
    await this.quickTransferReceiverList.selectOption({ label: receiver });
  }

  async makeQuickTransfer(receiver: string, amount: string, title: string) {
    await this.selectReceiver(receiver);
    await this.quickTransferAmount.fill(amount);
    await this.quickTransferTitle.fill(title);
    await this.quickTransferButton.click();
  }

  async assertQuickTransfer(receiver: string, amount: string, title: string) {
    await expect(this.quickTransferMessage).toContainText(
      `Przelew wykonany! ${receiver} - ${amount}PLN - ${title}`,
    );
  }
}
