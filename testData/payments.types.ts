export type PaymentsData = {
  accounts: {
    fromAccountValue: string;
    receiverNameValue: string;
    toAccountValue: string;
  };
  address?: {
    streetAndNumberValue: string;
    postalCodeAndCityValue: string;
    addressAdditionalFieldValue: string;
  };
  amount: {
    amountValue: string;
  };
  title: {
    paymentTitleValue: string;
  };
  transferType: {
    transferTypeValue: 'zwykły' | 'ekspresowy';
  };
  email: {
    wantConfirmationValue: boolean;
    emailConfirmationValue?: string;
  };
  receiver?: {
    wantSaveReceiverValue: boolean;
    receiverToSaveValue?: string;
    asTrustedValue?: boolean;
  };
};