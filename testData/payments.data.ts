import { PaymentsData } from './payments.types';
import { TransferType } from './payments.enums';

export const paymentsData: PaymentsData = {
  accounts: {
    fromAccountValue: '[KO] konto na życie',
    receiverNameValue: 'Franek Kimono',
    toAccountValue: '00 1111 2222 4444 5555 6666 77778',
  },
  address: {
    streetAndNumberValue: 'Wodnika Szuwarka 243D/11',
    postalCodeAndCityValue: '89-200 Szubin',
    addressAdditionalFieldValue: 'powiat nakielski',
  },
  amount: {
    amountValue: '954,25',
  },
  title: {
    paymentTitleValue: 'Tytuł przelewu testowego',
  },
  transferType: {
    transferTypeValue: TransferType.EXPRESS,
  },
  email: {
    wantConfirmationValue: true,
    emailConfirmationValue: 'my_email@testset.com',
  },
  receiver: {
    wantSaveReceiverValue: true,
    receiverToSaveValue: 'Franek Kimono PRIV',
    asTrustedValue: true,
  },
};
