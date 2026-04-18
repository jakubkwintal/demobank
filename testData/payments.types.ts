import { TransferType } from './payments.enums';

export type Payment = {
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
    transferTypeValue: TransferType;
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
