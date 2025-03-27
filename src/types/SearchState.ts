export type PageSize = "25" | "50" | "75" | "100";

export type SortField = "age" | "breed" | "name";

export type SortOrder = "asc" | "desc";

export type SearchState = {
  breed: string | undefined,
  from: number,
  maxAge: number | undefined,
  minAge: number | undefined,
  size: number,
  sortField: SortField,
  sortOrder: SortOrder,
  zipCode: string | undefined,
};

export type SearchStateActions = {
  setBreed: (breed: string) => void,
  setFrom: (from: number) => void,
  setMaxAge: (age: number) => void,
  setMinAge: (age: number) => void,
  setSize: (size: number) => void,
  setSortField: (field: SortField) => void,
  setSortOrder: (order: SortOrder) => void,
  setZipCode: (zipCode: string) => void,
  resetSearchState: () => void,
};