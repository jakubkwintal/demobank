import { LoginPage } from '../pages/LoginPage';

export type ValidUser = {
  description: string;
  username: string;
  password: string;
};

export type InvalidUsername = {
  description: string;
  username: string;
  assertion: (loginPage: LoginPage) => Promise<void>;
};

export type InvalidPassword = {
  description: string;
  username: string;
  password: string;
  assertion: (loginPage: LoginPage) => Promise<void>;
};