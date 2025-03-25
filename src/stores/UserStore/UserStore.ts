import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  email: string | null,
  name: string | null,
};

type UserActions = {
  resetUser: () => void,
  setUser: (email: string, name: string) => void,
};

const initialState: UserState = {
  email: null,
  name: null,
};

const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      ...initialState,
      resetUser: () => {
        set(initialState);
      },
      setUser: (email: string, name: string) => {
        set({ email, name });
      },
    }),
    { name: 'pupperfield-user-storage' },
  ),
);

export {
  useUserStore as default, type UserActions, type UserState
};