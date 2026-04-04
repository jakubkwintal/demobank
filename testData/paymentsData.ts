// make payment

export const accountsData = {
  fromAccountValue: '[KO] konto na życie',
  receiverNameValue: 'Franek Kimono',
  toAccountValue: '00 1111 2222 4444 5555 6666 77778',
};

export const receiverAddressData = {
  streetAndNumberValue: 'Wodnika Szuwarka 243D/11',
  postalCodeAndCityValue: '89-200 Szubin',
  addressAdditionalFieldValue: 'powiat nakielski',
};

export const amountData = {
  amountValue: '954,25',
};

export const paymentTitleData = {
  paymentTitleValue: 'Tytuł przelewu testowego',
};

export const transferTypeData = {
  transferTypeValue: 'ekspresowy' as const,
};

export const emailConfirmationData = {
  wantConfirmationValue: true,
  emailConfirmationValue: 'my_email@testset.com',
};

export const receiverToSaveData = {
    wantSaveReceiverValue: true,
    receiverToSaveValue: 'Franek Kimono PRIV',
    asTrustedValue: true
};
