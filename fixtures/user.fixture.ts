export type User = {
  username: string;
  password: string;
};

export const userFixture = {
  user: async (_: unknown, use: (arg0: { username: string; password: string; }) => any) => {
    await use({
      username: process.env.USERNAME!,
      password: process.env.PASSWORD!,
    });
  },
};