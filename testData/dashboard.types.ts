import { Locator } from '@playwright/test';

export type MenuItem = {
  name: string;
  locator: Locator;
};

export type QuickTransfer = {
  receiver: string;
  amount: string;
  title: string;
};
