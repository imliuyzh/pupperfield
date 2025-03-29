import type { PageSize, SearchState, SearchStateActions, SortField, SortOrder } from "@/types/SearchState";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: SearchState = {
  breed: null,
  from: 0,
  maxAge: null,
  minAge: null,
  size: 25,
  sortField: "breed",
  sortOrder: "asc",
  zipCode: null,
};

const useSearchStateStore = create<SearchState & SearchStateActions>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        setBreed: (breed: string | null) => {
          set({ breed });
        },
        setFrom: (from: number) => {
          set({ from });
        },
        setMaxAge: (age: number | null) => {
          set({ maxAge: age });
        },
        setMinAge: (age: number | null) => {
          set({ minAge: age });
        },
        setSize: (size: PageSize) => {
          set({ size });
        },
        setSortField: (field: SortField) => {
          set({ sortField: field });
        },
        setSortOrder: (order: SortOrder) => {
          set({ sortOrder: order });
        },
        setZipCode: (zipCode: string | null) => {
          set({ zipCode });
        },
        resetSearchState: () => {
          set({ ...initialState });
        },
      })),
      { name: "pupperfield-search-state" },
    )
  ),
);

export {
  useSearchStateStore as default
};
