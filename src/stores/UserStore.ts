import type { UserActions, UserState } from "@/types/User";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: UserState = {
  email: null,
  name: null,
};

const useUserStore = create<UserState & UserActions>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        resetUser: () => {
          set(initialState);
        },
        setUser: (email: string, name: string) => {
          set({ email, name });
        },
      })),
      { name: "pupperfield-user-state" },
    ),
    {
      enabled: import.meta.env.DEV,
      name: "pupperfield-user-state",
      store: "user",
    },
  ),
);

export {
  useUserStore as default
};
