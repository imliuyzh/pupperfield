import type { SortField, SortOrder } from "@/features/Search/types/SearchState";
import type { Dog } from "@/types/Dog";

export type DogBreedsResponse = {
  error?: unknown;
  breeds: string[] | null;
};

export type DogSearchRequest = {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size: number;
  from: number;
  sort: `${SortField}:${SortOrder}`;
};

export type DogSearchResult = {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
};

export type DogSearchResponse = {
  error?: unknown;
  result: DogSearchResult | null;
};

export type DogInfoResponse = {
  error?: unknown;
  dogs: Dog[] | null;
};