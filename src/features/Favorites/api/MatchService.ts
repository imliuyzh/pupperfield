import { DogMatchResponse } from "@/features/Favorites/types/Favorites";
import { request } from "@/utils/serviceRequest";

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
  getDogMatch
};