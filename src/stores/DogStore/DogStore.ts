import type { Dog, DogActions, DogState } from "@/types/Dog";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: DogState = {
  favoriteDogs: {},
};

const useDogStore = create<DogState & DogActions>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        addFavoriteDog: (dog: Dog) => {
          set((state) => {
            const map = { ...state.favoriteDogs };
            map[dog.id] = dog;
            return { favoriteDogs: map };
          });
        },
        removeFavoriteDog: (dogId: string) => {
          set((state) => {
            const map = { ...state.favoriteDogs };
            delete map[dogId];  // eslint-disable-line
            return { favoriteDogs: map };
          });
        },
        resetFavoriteDogs: () => {
          set({ ...initialState });
        },
      })),
      { name: "pupperfield-dog-state" },
    )
  ),
);

export {
  useDogStore as default
};