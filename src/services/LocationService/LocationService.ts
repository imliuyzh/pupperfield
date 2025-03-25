type Location = {
  zip_code: string,
  latitude: number,
  longitude: number,
  city: string,
  state: string,
  county: string,
};

type Coordinates = {
  lat: number,
  lon: number,
};

type LocationInfoResponse = {
  error?: unknown,
  locations: Location[] | null,
};

type GeoBoundingBox1 = {
  top: number,
  left: number,
  bottom: number,
  right: number,
};

type GeoBoundingBox2 = {
  bottom_left: Coordinates,
  top_right: Coordinates,
};

type GeoBoundingBox3 = {
  bottom_right: Coordinates,
  top_left: Coordinates,
};

type LocationSearchRequest = {
  city?: string,
  states?: string[],
  geoBoundingBox?: GeoBoundingBox1 | GeoBoundingBox2 | GeoBoundingBox3,
  size?: number,
  from?: number,
};

type LocationSearchResult = {
  results: Location[],
  total: number,
};

type LocationSearchResponse = {
  data: LocationSearchResult | null,
  error?: unknown,
};

/**
 * Throw out a list of at most 100 zip codes and fetch information about them.
 * @param zipCodes a list of no more than 100 zip codes
 * @returns a list of location information
 */
async function getLocations(zipCodes: string[]): Promise<LocationInfoResponse> {
  try {
    if (zipCodes.length > 100) {
      return {
        error: "More than 100 location IDs received.",
        locations: null,
      };
    }

    const response = await fetch("https://frontend-take-home-service.fetch.com/locations", {
      body: JSON.stringify(zipCodes),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (response.ok === false) {
      return {
        error: await response.text(),
        locations: null,
      };
    }

    return { locations: (await response.json()) as Location[] };
  } catch (error: unknown) {
    return {
      error,
      locations: null,
    };
  }
}

/**
 * Give a set of filters and find matching locations. No condition means
 * getting all locations.
 * @param payload search filters that will be passed in the body
 * @returns search results based on the filters provided
 */
async function searchLocations(payload: LocationSearchRequest): Promise<LocationSearchResponse> {
  try {
    const response = await fetch("https://frontend-take-home-service.fetch.com/locations/search", {
      body: JSON.stringify(payload),
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    if (response.ok === false) {
      return {
        data: null,
        error: await response.text(),
      };
    }

    return { data: (await response.json()) as LocationSearchResult };
  } catch (error: unknown) {
    return {
      data: null,
      error,
    };
  }
}

export {
  getLocations,
  searchLocations,
};