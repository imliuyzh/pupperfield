import type {
  FavoritesActions,
  FavoritesState
} from "@/features/Favorites/types/Favorites";
import type { Dog } from "@/types/Dog";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: FavoritesState = {
  favoriteDogs: {},
};

const useFavoritesStore = create<FavoritesState & FavoritesActions>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        addFavoriteDog: (dog: Dog) => {
          set((state) => {
            state.favoriteDogs[dog.id] = dog;
          });
        },
        removeFavoriteDog: (dogId: string) => {
          set((state) => {
            delete state.favoriteDogs[dogId];  // eslint-disable-line
          });
        },
        resetFavoriteDogs: () => {
          set(initialState);
        },
      })),
      { name: "pupperfield-dog-state" },
    ),
    {
      enabled: import.meta.env.DEV,
      name: "pupperfield-dog-state",
      store: "favorites",
    },
  ),
);

export {
  useFavoritesStore as default
};
