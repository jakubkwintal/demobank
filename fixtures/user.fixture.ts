export type User = {
  username: string;
  password: string;
};

export const userFixture = {
  user: async ({}: any, use: (arg0: { username: string; password: string; }) => any) => {
    await use({
      username: 'jakubkwi',
      password: 'pass123!',
    });
  },
};