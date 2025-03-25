type Dog = {
  id: string,
  img: string,
  name: string,
  age: number,
  zip_code: string,
  breed: string,
};

type DogBreedsResponse = {
  error?: unknown,
  breeds: string[] | null,
};

type DogSearchRequest = {
  breeds?: string[],
  zipCodes?: string[],
  ageMin?: number,
  ageMax?: number,
  size?: number,
  from?: number,
  sort?: `${"age" | "breed" | "name"}:${"asc" | "desc"}`,
};

type DogSearchResult = {
  resultIds: string[],
  total: number,
  next?: string,
  prev?: string,
};

type DogSearchResponse = {
  error?: unknown,
  result: DogSearchResult | null,
};

type DogInfoResponse = {
  error?: unknown,
  dogs: Dog[] | null,
};

type DogMatchResponse = {
  error?: unknown,
  match: string | null,
};

/**
 * Fetch a list of dog breeds.
 * @returns an object containing the dog breeds and an error if it exists
 */
async function getDogBreeds(): Promise<DogBreedsResponse> {
  try {
    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs/breeds",
      { credentials: "include" }
    );

    if (response.ok === false) {
      return {
        breeds: null,
        error: await response.text(),
      };
    }

    return { breeds: (await response.json()) as string[] };
  } catch (error: unknown) {
    return {
      breeds: null,
      error,
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
      } else if (typeof value === "number") {
        parameters.set(key, value.toString());
      } else {
        parameters.set(key, value);
      }
    }

    const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
      body: parameters,
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.ok === false) {
      return {
        error: await response.text(),
        result: null,
      };
    }

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
      return {
        dogs: null,
        error: "More than 100 dog IDs received.",
      };
    }

    const response = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
      body: JSON.stringify(ids),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (response.ok === false) {
      return {
        dogs: null,
        error: await response.text(),
      };
    }

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
    const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
      body: JSON.stringify(ids),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (response.ok === false) {
      return {
        error: await response.text(),
        match: null,
      };
    }

    return { match: (await response.json()) as string };
  } catch (error: unknown) {
    return {
      error,
      match: null,
    };
  }
}

export {
  getDogBreeds,
  searchDogs,
  getDogs,
  getDogMatch,
};