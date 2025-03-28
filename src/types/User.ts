export type UserState = {
  email: string | null;
  name: string | null;
};

export type UserActions = {
  resetUser: () => void;
  setUser: (email: string, name: string) => void;
};