import type { UserActions, UserState } from "@/types/User";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState: UserState = {
  email: null,
  name: null,
};

const useUserStore = create<UserState & UserActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        resetUser: () => {
          set((state) => ({
            ...state,
            ...initialState,
          }));
        },
        setUser: (email: string, name: string) => {
          set((state) => ({
            ...state,
            email,
            name,
          }));
        },
      }),
      { name: "pupperfield-user-state" },
    )
  ),
);

export {
  useUserStore as default
};
