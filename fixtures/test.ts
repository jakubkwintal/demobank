import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginPageFixture } from './loginPage.fixture';
import { userFixture } from './user.fixture';
import { PaymentsPage } from '../pages/PaymentsPage';
import { paymentsPageFixture } from './paymentsPage.fixture';
import { PaymentsData } from '../testData/payments.types';
import { paymentsDataFixture } from './paymentsData.fixture';
import { DashboardPage } from '../pages/DashboardPage';
import { dashboardPageFixture } from './dashboardPage.fixture';

export const test = base.extend<{
  loginPage: LoginPage;
  user: { username: string; password: string };
  paymentsPage: PaymentsPage;
  paymentsData: PaymentsData;
  dashboardPage: DashboardPage;
}>({
  loginPage: loginPageFixture.loginPage,
  user: userFixture.user,
  paymentsPage: paymentsPageFixture.paymentsPage,
  paymentsData: paymentsDataFixture.paymentData,
  dashboardPage: dashboardPageFixture.dashboardPage,
});

export { expect };
