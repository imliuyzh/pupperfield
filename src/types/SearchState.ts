export type PageSize = 25 | 50 | 75 | 100;

export type SortField = "age" | "breed" | "name";

export type SortOrder = "asc" | "desc";

export type SearchState = {
  breed: string | null;
  from: number;
  maxAge: number;
  minAge: number;
  size: PageSize;
  sortField: SortField;
  sortOrder: SortOrder;
  zipCode: string | null;
};

export type SearchStateActions = {
  setBreed: (breed: string | null) => void;
  setFrom: (from: number) => void;
  setMaxAge: (age: number) => void;
  setMinAge: (age: number) => void;
  setSize: (size: PageSize) => void;
  setSortField: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  setZipCode: (zipCode: string | null) => void;
  resetSearchState: () => void;
};