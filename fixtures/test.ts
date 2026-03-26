// ../fixtures/test.ts
import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginPageFixture } from './loginPage.fixture';
import { userFixture } from './user.fixture';

// Tworzymy nowy test, rozszerzając base o nasze fixture
export const test = base.extend<{
  loginPage: LoginPage;
  user: { username: string; password: string };
}>({
  loginPage: loginPageFixture.loginPage, // podłączamy loginPage
  user: userFixture.user,                 // podłączamy user
});

// eksportujemy expect żeby działały normalne asercje
export { expect };