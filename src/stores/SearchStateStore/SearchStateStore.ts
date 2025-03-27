import type { SearchStateActions, SearchState, SortField, SortOrder } from "@/types/SearchState";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState: SearchState = {
  breed: undefined,
  from: 0,
  maxAge: undefined,
  minAge: undefined,
  size: 0,
  sortField: "breed",
  sortOrder: "asc",
  zipCode: undefined,
};

const useSearchStateStore = create<SearchState & SearchStateActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setBreed: (breed: string) => {
          set((state) => ({
            ...state,
            breed
          }));
        },
        setFrom: (from: number) => {
          set((state) => ({
            ...state,
            from,
          }));
        },
        setMaxAge: (age: number) => {
          set((state) => ({
            ...state,
            maxAge: age,
          }));
        },
        setMinAge: (age: number) => {
          set((state) => ({
            ...state,
            minAge: age,
          }));
        },
        setSize: (size: number) => {
          set((state) => ({
            ...state,
            size,
          }));
        },
        setSortField: (field: SortField) => {
          set((state) => ({
            ...state,
            sortField: field,
          }));
        },
        setSortOrder: (order: SortOrder) => {
          set((state) => ({
            ...state,
            sortOrder: order,
          }));
        },
        setZipCode: (zipCode: string) => {
          set((state) => ({
            ...state,
            zipCode,
          }));
        },
        resetSearchState: () => {
          set((state) => ({
            ...state,
            ...initialState,
          }));
        },
      }),
      { name: "pupperfield-search-state" },
    )
  ),
);

export {
  useSearchStateStore as default,
};