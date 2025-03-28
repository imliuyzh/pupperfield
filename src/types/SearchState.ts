export type PageSize = "25" | "50" | "75" | "100";

export type SortField = "age" | "breed" | "name";

export type SortOrder = "asc" | "desc";

export type SearchState = {
  breed: string | null;
  from: number;
  maxAge: number | null;
  minAge: number | null;
  size: number;
  sortField: SortField;
  sortOrder: SortOrder;
  zipCode: string | null;
};

export type SearchStateActions = {
  setBreed: (breed: string | null) => void;
  setFrom: (from: number) => void;
  setMaxAge: (age: number | null) => void;
  setMinAge: (age: number | null) => void;
  setSize: (size: number) => void;
  setSortField: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  setZipCode: (zipCode: string | null) => void;
  resetSearchState: () => void;
};