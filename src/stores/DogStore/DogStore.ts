import type { Dog, DogActions, DogState } from "@/types/Dog";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState: DogState = {
  favoriteDogs: {},
};

const useDogStore = create<DogState & DogActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        addFavoriteDog: (dog: Dog) => {
          set((state) => {
            const map = { ...state.favoriteDogs };
            map[dog.id] = dog;
            return {
              ...state,
              favoriteDogs: map
            };
          });
        },
        removeFavoriteDog: (dogId: string) => {
          set((state) => {
            const map = { ...state.favoriteDogs };
            delete map[dogId];  // eslint-disable-line
            return {
              ...state,
              favoriteDogs: map
            };
          });
        },
        resetFavoriteDogs: () => {
          set((state) => ({
            ...state,
            ...initialState
          }));
        },
      }),
      { name: "pupperfield-dog-state" },
    )
  ),
);

export {
  useDogStore as default
};
