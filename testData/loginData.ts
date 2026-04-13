// CORRECT DATA
export const validUsers = [
  {
    description: 'poprawne dane, same cyfry',
    username: '12345678',
    password: '12345678',
  },
  {
    description: 'poprawne dane, same litery',
    username: 'AbCdEfGh',
    password: 'oPrStUwY',
  },
  {
    description: 'poprawne dane, różne znaki',
    username: 'a$c&12?H',
    password: '!@A_#e7^',
  },
];

// INCORRECT DATA
export const invalidUsernames = [
  {
    description: 'empty username',
    username: '',
  },
  {
    description: 'too short username',
    username: '1234567',
  },
  {
    description: 'too short username - only one character',
    username: 'x',
  },
];

export const invalidPasswords = [
  {
    description: 'empty password',
    username: '12345678',
    password: '',
  },
  {
    description: 'too short password',
    username: '12345678',
    password: '1234567',
  },
];
