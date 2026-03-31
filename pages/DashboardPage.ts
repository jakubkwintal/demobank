import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class DashboardPage {
  readonly page: Page;
  readonly userFullName: Locator;
  readonly logoutButton: Locator;

  readonly myDashboard: Locator;
  readonly quickTransfer: Locator;
  readonly phoneTopUp: Locator;
  readonly calendar: Locator;
  readonly cardBlocking: Locator;
  readonly accounts: Locator;
  readonly payments: Locator;
  readonly reports: Locator;
  readonly charts: Locator;
  readonly settings: Locator;
  readonly menuItems: { name: string; locator: Locator }[];

  readonly quickTransferReceiverList: Locator;
  readonly quickTransferAmount: Locator;
  readonly quickTransferTitle: Locator;
  readonly makeQuickTransferButton: Locator;
  readonly quickTransferMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userFullName = page.locator('#user_name');
    this.logoutButton = page.locator('#log_out');
    this.myDashboard = page.getByRole('link', { name: 'mój pulpit' });
    this.quickTransfer = page.locator('#quick_btn');
    this.phoneTopUp = page.locator('#phone_btn');
    this.calendar = page.getByRole('link', { name: 'kalendarz' });
    this.cardBlocking = page.getByRole('link', { name: 'zastrzeżenia' });
    this.accounts = page.getByRole('link', { name: 'konta osobiste' });
    this.payments = page.getByRole('link', { name: 'płatności' });
    this.reports = page.locator('#reports_btn');
    this.charts = page.locator('#charts_btn');
    this.settings = page.getByRole('link', { name: 'ustawienia' });

    this.menuItems = [
      { name: 'Mój pulpit', locator: this.myDashboard },
      { name: 'Szybki przelew', locator: this.quickTransfer },
      { name: 'Doładowanie telefonu', locator: this.phoneTopUp },
      { name: 'Kalendarz', locator: this.calendar },
      { name: 'Zastrzeżenia', locator: this.cardBlocking },
      { name: 'Konta', locator: this.accounts },
      { name: 'Płatności', locator: this.payments },
      { name: 'Raporty', locator: this.reports },
      { name: 'Wykresy', locator: this.charts },
      { name: 'Ustawienia', locator: this.settings },
    ];

    this.quickTransferReceiverList = page.locator(
      '#widget_1_transfer_receiver',
    );
    this.quickTransferAmount = page.locator('#widget_1_transfer_amount');
    this.quickTransferTitle = page.locator('#widget_1_transfer_title');
    this.makeQuickTransferButton = page.getByRole('button', {
      name: 'wykonaj',
    });
    this.quickTransferMessage = page.locator('#show_messages');
  }

  async goTo() {
    await this.page.goto('/pulpit.html');
  }

  async logout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  // Menu

  async assertMenuVisible() {
    for (const item of this.menuItems) {
      await expect(item.locator, `${item.name} is not visible`).toBeVisible();
    }
  }

  //  Quick transfer

  async selectReceiver(receiver: string) {
    await this.quickTransferReceiverList.selectOption({ label: receiver });
  }

  async makeQuickTransfer(receiver: string, amount: string, title: string) {
    await this.selectReceiver(receiver);
    await this.quickTransferAmount.fill(amount);
    await this.quickTransferTitle.fill(title);
    await this.makeQuickTransferButton.click();
  }

  async assertQuickTransfer(receiver: string, amount: string, title: string) {
    await expect(this.quickTransferMessage).toContainText(
      `Przelew wykonany! ${receiver} - ${amount}PLN - ${title}`,
    );
  }
}
