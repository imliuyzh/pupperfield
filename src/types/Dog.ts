export type Dog = {
  id: string,
  img: string,
  name: string,
  age: number,
  zip_code: string,
  breed: string,
};

export type DogCandidate = Dog & { isMatched: boolean };

export type DogState = {
  favoriteDogs: Map<string, DogCandidate>
};

export type DogActions = {
  addFavoriteDog: (dog: DogCandidate) => void,
  removeFavoriteDog: (dogId: string) => void,
  resetFavoriteDogs: () => void,
};

export type DogBreedsResponse = {
  error?: unknown,
  breeds: string[] | null,
};

export type DogSearchRequest = {
  breeds?: string[],
  zipCodes?: string[],
  ageMin?: number,
  ageMax?: number,
  size?: number,
  from?: number,
  sort?: `${"age" | "breed" | "name"}:${"asc" | "desc"}`,
};

export type DogSearchResult = {
  resultIds: string[],
  total: number,
  next?: string,
  prev?: string,
};

export type DogSearchResponse = {
  error?: unknown,
  result: DogSearchResult | null,
};

export type DogInfoResponse = {
  error?: unknown,
  dogs: Dog[] | null,
};

export type DogMatchResponse = {
  error?: unknown,
  match: string | null,
};