import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'html',

  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'https://demobank.jaktestowac.pl/',
    storageState: './storage/storageState.json',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'login',
      testMatch: /.*login.*\.spec\.ts/,
      use: { storageState: undefined },
    },
    {
      name: 'tests',
      testIgnore: /.*login.*\.spec\.ts/,
      dependencies: ['setup'],
      use: { storageState: './storage/storageState.json' },
    },
  ],
});