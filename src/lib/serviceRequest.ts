import { getNewToken } from "@/services/AuthService/AuthService";

/**
 * Make a request to the API and handle re-authentication automatically.
 * @param url the URL to make the request to
 * @param options the options to pass to the fetch function
 * @returns the response from the server
 */
export default async function request(url: string, options: RequestInit): Promise<Response> {
  let response = await fetch(new Request(url, options));
  if (response.status === 401) {
    const tokenResponse = await getNewToken();
    if (tokenResponse.ok === false) {
      throw tokenResponse.error;
    }
    response = await fetch(new Request(url, options));
  }
  if (response.ok === false) {
    throw await response.text();
  }
  return response;
}