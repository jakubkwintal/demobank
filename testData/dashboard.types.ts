import { Locator } from '@playwright/test';

export type QuickTransfer = {
  receiver: string;
  amount: string;
  title: string;
};

export type MenuItem = {
  name: string;
  locator: Locator;
};