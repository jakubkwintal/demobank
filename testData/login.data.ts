import { LoginPage } from '../pages/LoginPage';

// CORRECT DATA
export const validUsers = [
  {
    description: 'correct data, only numbers',
    username: '12345678',
    password: '12345678',
  },
  {
    description: 'correct data, only letters',
    username: 'AbCdEfGh',
    password: 'oPrStUwY',
  },
  {
    description: 'correct data, various characters',
    username: 'a$c&12?H',
    password: '!@A_#e7^',
  },
];

// INCORRECT DATA
export const invalidUsernames = [
  {
    description: 'empty username',
    username: '',
    assertion: async (loginPage: LoginPage) => {
      await loginPage.assertEmptyUsername();
    },
  },
  {
    description: 'too short username',
    username: '1234567',
    assertion: async (loginPage: LoginPage) => {
      await loginPage.assertTooShortUsername();
    },
  },
  {
    description: 'too short username - only one character',
    username: 'x',
    assertion: async (loginPage: LoginPage) => {
      await loginPage.assertTooShortUsername();
    },
  },
];

export const invalidPasswords = [
  {
    description: 'empty password',
    username: '12345678',
    password: '',
    assertion: async (loginPage: LoginPage) => {
      await loginPage.assertEmptyPassword();
    },
  },
  {
    description: 'too short password',
    username: '12345678',
    password: '1234567',
    assertion: async (loginPage: LoginPage) => {
      await loginPage.assertTooShortPassword();
    },
  },
  {
    description: 'too short password - only one character',
    username: '12345678',
    password: 'q',
    assertion: async (loginPage: LoginPage) => {
      await loginPage.assertTooShortPassword();
    },
  },
];
