export type User = {
  username: string;
  password: string;
};

export const userFixture = {
  // This fixture provides user credentials from environment variables
  // and makes them available in tests as "user"
  user: async ({}: {}, use: (user: User) => Promise<void>) => {
    await use({
      username: process.env.USERNAME!,
      password: process.env.PASSWORD!,
    });
  },
};
