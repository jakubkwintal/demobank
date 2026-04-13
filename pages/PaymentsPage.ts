import { Page, Locator, expect } from '@playwright/test';
import { PaymentsData } from '../testData/payments.types';

export class PaymentsPage {
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

    this.addressFormToggle = page.locator(
      '[data-target="form_address"]:visible',
    );
    this.streetAndNumber = page.locator('#form_receiver_address1');
    this.postalCodeAndCity = page.locator('#form_receiver_address2');
    this.addressAdditionalField = page.locator('#form_receiver_address3');

    this.amount = page.locator('#form_amount');
    this.accountBalance = page.locator('#form_account_amount');
    this.accountBalanceAfterTransfer = page.locator('#form_after_transfer');

    this.paymentTitle = page.locator('#form_title');

    this.calendarIcon = page.locator(
      '#form_ico_calendar i[data-target="form_date"]',
    );

    this.transferCost = page.locator('#form_fee');

    this.emailConfirmation = page.locator('#form_is_email');
    this.emailAddress = page.locator('#form_email');

    this.addToReceiverList = page.locator('#form_add_receiver');
    this.receiverToSave = page.locator('#form_receiver_name');
    this.asTrusted = page.locator('#form_trusted');

    this.confirmTransferButton = page.getByRole('link', { name: 'dalej' });
    this.transferMessage = page.locator('#show_messages');
  }

  async fillAccounts(from: string, receiver: string, to: string) {
  const option = this.fromAccount
    .locator('option')
    .filter({ hasText: from })
    .first();

  await expect(option).toHaveCount(1);

  const value = await option.getAttribute('value');
  if (!value) throw new Error(`Nie znaleziono ${from}`);

  await this.fromAccount.selectOption({ value });

  await this.receiverName.fill(receiver);
  await this.toAccount.fill(to);
}

  async fillReceiverAddress(
    street: string,
    postalCity: string,
    additional: string,
  ) {
    await this.addressFormToggle.click();
    await expect(this.streetAndNumber).toBeVisible();

    await this.streetAndNumber.fill(street);
    await this.postalCodeAndCity.fill(postalCity);
    await this.addressAdditionalField.fill(additional);
  }

  async fillAmountAndCheckBalance(amountValue: string) {
    const balanceBefore = parseFloat(
      (await this.accountBalance.textContent())
        ?.trim()
        .replace(/ /g, '')
        .replace(',', '.') || '0',
    );

    await this.amount.fill(amountValue);
    await this.amount.blur();

    const balanceAfter = parseFloat(
      (await this.accountBalanceAfterTransfer.textContent())
        ?.trim()
        .replace(/ /g, '')
        .replace(',', '.') || '0',
    );

    expect(balanceBefore - balanceAfter).toBe(
      parseFloat(amountValue.replace(',', '.')),
    );
  }

  async fillPaymentTitle(title: string) {
    await this.paymentTitle.fill(title);
  }

  async selectTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const day = tomorrow.getDate().toString();
    const currentMonth = new Date().getMonth();
    const targetMonth = tomorrow.getMonth();

    await this.calendarIcon.click();

    const calendar = this.page.locator('#ui-datepicker-div');
    await expect(calendar).toBeVisible();

    if (targetMonth !== currentMonth) {
      await this.page.locator('.ui-datepicker-next').click();
    }

    await this.page.getByRole('link', { name: day, exact: true }).click();
  }

  async selectTransferType(type: 'ekspresowy' | 'zwykły') {
    await this.page.getByRole('radio', { name: type }).check();

    const expected = type === 'zwykły' ? '0,00' : '5,00';
    await expect(this.transferCost).toHaveText(expected);
  }

  async sendEmailConfirmation(want: boolean, email?: string) {
    if (want) {
      await this.emailConfirmation.check();

      if (!email?.trim()) throw new Error('Podaj adres email');

      await this.emailAddress.fill(email);
    } else {
      await this.emailConfirmation.uncheck();
    }
  }

  async saveReceiver(want: boolean, name?: string, trusted?: boolean) {
    if (want) {
      await this.addToReceiverList.check();

      if (!name?.trim()) throw new Error('Podaj nazwę odbiorcy');

      await this.receiverToSave.fill(name.trim());

      if (trusted) await this.asTrusted.check();
    } else {
      await this.addToReceiverList.uncheck();
    }
  }

  async completeTransfer() {
    await expect(this.confirmTransferButton).toBeEnabled();
    await this.confirmTransferButton.click();
    await expect(this.transferMessage).toBeVisible();
  }

 
  async makePayment(data: PaymentsData) {
    await this.fillAccounts(
      data.accounts.fromAccountValue,
      data.accounts.receiverNameValue,
      data.accounts.toAccountValue,
    );

    if (data.address) {
      await this.fillReceiverAddress(
        data.address.streetAndNumberValue,
        data.address.postalCodeAndCityValue,
        data.address.addressAdditionalFieldValue,
      );
    }

    await this.fillAmountAndCheckBalance(data.amount.amountValue);
    await this.fillPaymentTitle(data.title.paymentTitleValue);
    await this.selectTomorrowDate();
    await this.selectTransferType(data.transferType.transferTypeValue);

    if (data.email) {
      await this.sendEmailConfirmation(
        data.email.wantConfirmationValue,
        data.email.emailConfirmationValue,
      );
    }

    if (data.receiver) {
      await this.saveReceiver(
        data.receiver.wantSaveReceiverValue,
        data.receiver.receiverToSaveValue,
        data.receiver.asTrustedValue,
      );
    }
  }
}
