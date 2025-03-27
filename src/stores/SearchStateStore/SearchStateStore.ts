import type { SearchStateActions, SearchState, Size, SortField, SortOrder } from "@/types/SearchState";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState: SearchState = {
  breed: null,
  from: 0,
  maxAge: -1,
  minAge: -1,
  size: 25,
  sortField: "breed",
  sortOrder: "asc",
  zipCode: null,
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
        setSize: (size: Size) => {
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