import { request } from "@/lib/serviceRequest";
import type {
  Dog,
  DogBreedsResponse,
  DogInfoResponse,
  DogMatchResponse,
  DogSearchRequest,
  DogSearchResponse,
  DogSearchResult
} from "@/types/Dog";

/**
 * Fetch a list of dog breeds.
 * @returns an object containing the dog breeds and an error if it exists
 */
async function getDogBreeds(): Promise<DogBreedsResponse> {
  try {
    const response = await request("https://frontend-take-home-service.fetch.com/dogs/breeds", {
      credentials: "include"
    });
    return { breeds: (await response.json()) as string[] };
  } catch (error: unknown) {
    return {
      breeds: null,
      error
    };
  }
}

/**
 * Give a set of filters and find matching puppies. No condition means
 * getting all dogs.
 * @param payload search filters that will be passed in a query string
 * @returns search results based on the filters provided
 */
async function searchDogs(payload: DogSearchRequest): Promise<DogSearchResponse> {
  try {
    const parameters = new URLSearchParams();
    for (const [key, value] of Object.entries(payload)) {
      if (Array.isArray(value)) {
        parameters.set(key, value.join(","));
      } else {
        parameters.set(key, value.toString());
      }
    }
    const response = await request(`https://frontend-take-home-service.fetch.com/dogs/search?${parameters}`, {
      credentials: "include"
    });
    return { result: (await response.json()) as DogSearchResult };
  } catch (error: unknown) {
    return {
      error,
      result: null,
    };
  }
}

/**
 * Throw out a list of at most 100 dog IDs and fetch information about them.
 * @param ids a list of no more than 100 dog IDs
 * @returns a list of dog information and an error if it exists
 */
async function getDogs(ids: string[]): Promise<DogInfoResponse> {
  try {
    if (ids.length > 100) {
      throw new Error("More than 100 dog IDs received.");
    }
    const response = await request("https://frontend-take-home-service.fetch.com/dogs", {
      body: JSON.stringify(ids),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return { dogs: (await response.json()) as Dog[] };
  } catch (error: unknown) {
    return {
      dogs: null,
      error,
    };
  }
}

/**
 * Throw out a list of dog IDs and hopefully find a match the user likes.
 * @param ids a list of dog IDs
 * @returns a dog ID for the match and an error if it exists
 */
async function getDogMatch(ids: string[]): Promise<DogMatchResponse> {
  try {
    const response = await request("https://frontend-take-home-service.fetch.com/dogs/match", {
      body: JSON.stringify(ids),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return (await response.json()) as DogMatchResponse;
  } catch (error: unknown) {
    return {
      error,
      match: null,
    };
  }
}

export {
  getDogBreeds, getDogMatch, getDogs, searchDogs
};
