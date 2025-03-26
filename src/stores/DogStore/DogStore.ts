import type { Dog, DogActions, DogState } from "@/types/Dog";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState: DogState = {
  favoriteDogs: new Map<string, Dog>(),
};

const useDogStore = create<DogState & DogActions>()(
  persist(
    (set) => ({
      ...initialState,
      addFavoriteDog: (dog: Dog) => {
        set((state) => {
          const map = new Map(state.favoriteDogs);
          map.set(dog.id, dog);
          return {
            ...state,
            dogs: map,
          };
        });
      },
      removeFavoriteDog: (dogId: string) => {
        set((state) => {
          const map = new Map(state.favoriteDogs);
          map.delete(dogId);
          return {
            ...state,
            dogs: map,
          };
        });
      },
      resetFavoriteDogs: () => {
        set(initialState);
      },
    }),
    { name: "pupperfield-user-state" },
  ),
);

export {
  useDogStore as default,
};