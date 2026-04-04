import { Page, Locator, expect } from '@playwright/test';

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

  async fillAccounts(
    fromAccountValue: string,
    receiverNameValue: string,
    toAccountValue: string,
  ) {
    const option = await this.fromAccount
      .locator('option')
      .filter({
        hasText: fromAccountValue,
      })
      .first();

    if (!option) {
      throw new Error(`Nie znaleziono konta ${fromAccountValue}`);
    }

    const value = await option.getAttribute('value');
    if (!value) {
      throw new Error(`Nie znaleziono ${fromAccountValue}`);
    }
    await this.fromAccount.selectOption({ value });

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
      (await this.accountBalance.textContent())
        ?.trim()
        .replace(/ /g, '')
        .replace(',', '.') || '0',
    );

    console.log('accountBalanceValue: ' + accountBalanceValue);

    await this.amount.fill(amountValue);
    await this.amount.blur();

    const accountBalanceAfterTransferValue = parseFloat(
      (await this.accountBalanceAfterTransfer.textContent())
        ?.trim()
        .replace(/ /g, '')
        .replace(',', '.') || '0',
    );

    console.log(
      'accountBalanceAfterTransferValue: ' + accountBalanceAfterTransferValue,
    );

    const amountNumber = parseFloat(amountValue.replace(',', '.'));

    console.log('amount number: ' + amountNumber);

    const balanceDifference =
      accountBalanceValue - accountBalanceAfterTransferValue;

    console.log(
      'accountBalanceValue ' +
        accountBalanceValue +
        ' - ' +
        'accountBalanceAfterTransferValue ' +
        accountBalanceAfterTransferValue +
        ' = ' +
        'balanceDifference ' +
        balanceDifference,
    );

    expect(balanceDifference).toBe(amountNumber);
  }

  async fillPaymentTitle(paymentTitleValue: string) {
    await this.paymentTitle.fill(paymentTitleValue);
  }

  async selectTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const targetDay = tomorrow.getDate().toString();
    const currentMonth = new Date().getMonth();
    const targetMonth = tomorrow.getMonth();

    // otwórz datepicker
    await this.calendarIcon.click();

    const calendar = this.page.locator('#ui-datepicker-div');
    await expect(calendar).toBeVisible();

    // jeśli jutro jest w kolejnym miesiącu → kliknij raz "next"
    if (targetMonth !== currentMonth) {
      await this.page.locator('.ui-datepicker-next').click();
    }

    // kliknij dzień (tylko z aktualnego miesiąca!)
    await this.page.getByRole('link', { name: targetDay, exact: true }).click();
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
    wantConfirmationValue: boolean,
    emailAddressValue?: string,
  ) {
    if (wantConfirmationValue) {
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
    wantSaveReceiverValue: boolean,
    receiverToSaveValue?: string,
    asTrustedValue?: boolean,
  ) {
    if (wantSaveReceiverValue) {
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
