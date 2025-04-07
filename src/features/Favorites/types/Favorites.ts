import type { Dog } from "@/types/Dog";

export type FavoritesState = {
  favoriteDogs: Record<string, Dog>;
};

export type FavoritesActions = {
  addFavoriteDog: (dog: Dog) => void;
  removeFavoriteDog: (dogId: string) => void;
  resetFavoriteDogs: () => void;
};

export type DogMatchResponse = {
  error?: unknown;
  match: string | null;
};