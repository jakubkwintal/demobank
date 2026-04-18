import { test as base, expect } from '@playwright/test';

// PAGES
import { LoginPage } from '../pages/LoginPage';
import { PaymentsPage } from '../pages/PaymentsPage';
import { DashboardPage } from '../pages/DashboardPage';

// TYPES
import { Payment } from '../testData/payments.types';
import { User } from './user.fixture';

// FIXTURES
import { loginPageFixture } from './loginPage.fixture';
import { userFixture } from './user.fixture';
import { paymentsPageFixture } from './paymentsPage.fixture';
import { paymentsDataFixture } from './paymentsData.fixture';
import { dashboardPageFixture } from './dashboardPage.fixture';

// Extend the base Playwright test by adding custom fixtures
// so they can be used directly in tests (e.g. { loginPage, paymentsPage, dashboardPage })
export const test = base.extend<{
  loginPage: LoginPage;
  user: User;
  paymentsPage: PaymentsPage;
  paymentsData: Payment;
  dashboardPage: DashboardPage;
}>({
  loginPage: loginPageFixture.loginPage,
  user: userFixture.user,
  paymentsPage: paymentsPageFixture.paymentsPage,
  paymentsData: paymentsDataFixture.paymentData,
  dashboardPage: dashboardPageFixture.dashboardPage,
});

export { expect };