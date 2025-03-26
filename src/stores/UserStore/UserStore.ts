import type { UserActions, UserState } from "@/types/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
    { name: "pupperfield-user-state" },
  ),
);

export {
  useUserStore as default,
};
