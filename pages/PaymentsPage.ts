import { Page, Locator, expect } from '@playwright/test';

export class TransferPage {
  readonly page: Page;

  readonly fromAccount: Locator;
  readonly receiverName: Locator;
  readonly toAccount: Locator;
  readonly addressFormToggle: Locator;

  readonly streetAndNumber: Locator;
  readonly postalCodeAndCity: Locator;
  readonly addressAdditionalField: Locator;

  readonly amount: Locator;
  readonly accountBalance: Locator;
  readonly accountBalanceAfterTransfer: Locator;

  readonly paymentTitle: Locator;
  readonly calendarIcon: Locator;

  readonly transferCost: Locator;

  readonly emailConfirmation: Locator;
  readonly emailAddress: Locator;

  readonly addToReceiverList: Locator;
  readonly receiverToSave: Locator;
  readonly asTrusted: Locator;

  readonly confirmTransferButton: Locator;
  readonly transferMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.fromAccount = page.locator('#form_account_from');
    this.receiverName = page.locator('#form_receiver');
    this.toAccount = page.locator('#form_account_to');

    this.addressFormToggle = page.locator('.i-show');
    this.streetAndNumber = page.locator('#form_receiver_address1');
    this.postalCodeAndCity = page.locator('#form_receiver_address2');
    this.addressAdditionalField = page.locator('#form_receiver_address3');

    this.amount = page.locator('#form_amount');
    this.accountBalance = page.locator('#form_account_amount');
    this.accountBalanceAfterTransfer = page.locator('#form_after_transfer');

    this.paymentTitle = page.locator('#form_title');
    this.calendarIcon = page.locator('#form_ico_calendar');

    this.transferCost = page.locator('#form_fee');

    this.emailConfirmation = page.locator('#form_is_email');
    this.emailAddress = page.locator('#form_email');

    this.addToReceiverList = page.locator('#form_add_receiver');
    this.receiverToSave = page.locator('#form_receiver_name');
    this.asTrusted = page.locator('#form_trusted');

    this.confirmTransferButton = page.getByRole('link', { name: 'dalej' });
    this.transferMessage = page.locator('#show_messages');
  }

  //   .fill('00 1111 2222 4444 5555 6666 77778');

  async fillAccounts(
    fromAccountValue: string,
    receiverNameValue: string,
    toAccountValue: string,
  ) {
    await this.fromAccount.selectOption({ label: fromAccountValue });
    await this.receiverName.fill(receiverNameValue);
    await this.toAccount.fill(toAccountValue);
  }

  async fillReceiverAddress(
    streetAndNumberValue: string,
    postalCodeAndCityValue: string,
    addressAdditionalFieldValue: string,
  ) {
    await this.addressFormToggle.click();
    await expect(this.streetAndNumber).toBeVisible();
    await this.streetAndNumber.fill(streetAndNumberValue);
    await this.postalCodeAndCity.fill(postalCodeAndCityValue);
    await this.addressAdditionalField.fill(addressAdditionalFieldValue);
  }

  async fillAmountAndCheckBalance(amountValue: string) {
    const accountBalanceValue = parseFloat(
      (await this.accountBalance.textContent())?.trim() || '0',
    );

    await this.amount.fill(amountValue);
    await this.amount.blur();

    const accountBalanceAfterTransferValue = parseFloat(
      (await this.accountBalanceAfterTransfer.textContent())?.trim() || '0',
    );

    const amountNumber = parseFloat(amountValue);
    const balanceDifference =
      accountBalanceValue - accountBalanceAfterTransferValue;

    expect(balanceDifference).toBe(amountNumber);
  }

  async fillPaymentTitle(paymentTitleValue: string) {
    await this.paymentTitle.fill(paymentTitleValue);
  }

  async selectTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const targetMonth = tomorrow.toLocaleString('pl-PL', { month: 'long' });
    const targetYear = tomorrow.getFullYear().toString();
    const day = tomorrow.getDate().toString();

    const currentMonth = await this.page
      .locator('.ui-datepicker-month')
      .textContent();
    const currentYear = await this.page
      .locator('.ui-datepicker-year')
      .textContent();

    if (currentMonth !== targetMonth || currentYear !== targetYear) {
      await this.page.locator('.ui-datepicker-next').click();
    }

    await this.page
      .locator('.ui-datepicker-calendar a', { hasText: day })
      .click();
  }

  async selectTransferType(type: 'ekspresowy' | 'zwykły') {
    await this.page.getByRole('radio', { name: type }).check();

    if (type === 'zwykły') {
      expect(this.transferCost).toHaveText('0,00');
    } else {
      expect(this.transferCost).toHaveText('5,00');
    }
  }

  async sendEmailConfirmation(
    wantConfirmation: boolean,
    emailAddressValue?: string,
  ) {
    if (wantConfirmation) {
      await this.emailConfirmation.check();

      if (!emailAddressValue?.trim()) {
        throw new Error('Podaj adres email');
      }

      await this.emailAddress.fill(emailAddressValue);
    } else {
      await this.emailConfirmation.uncheck();
    }
  }

  async saveReceiver(
    wantSaveReceiver: boolean,
    receiverToSaveValue?: string,
    asTrustedValue?: boolean,
  ) {
    if (wantSaveReceiver) {
      await this.addToReceiverList.check();

      if (!receiverToSaveValue?.trim()) {
        throw new Error('Podaj nazwę odbiorcy');
      }

      await this.receiverToSave.fill(receiverToSaveValue.trim());

      if (asTrustedValue) {
        await this.asTrusted.click();
      }
    } else {
      await this.addToReceiverList.uncheck();
    }
  }

  async completeTransfer() {
    await expect(this.confirmTransferButton).toBeEnabled();
    await this.confirmTransferButton.click();
    await expect(this.transferMessage).toBeVisible();
  }
}
