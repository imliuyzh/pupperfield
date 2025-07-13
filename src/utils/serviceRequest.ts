import useUserStore from "@/stores/UserStore";
import type { LogInRequestBody } from "@/types/Auth";

/**
 * Make a request to the API and handle re-authentication automatically.
 * @param url the URL to make the request to
 * @param options the options to pass to the fetch function
 * @returns the response from the server
 */
async function request(url: string, options: RequestInit): Promise<Response> {
  const { email, name } = useUserStore.getState();
  if (email === null || name === null) {
    throw new Error("User is not logged in.");
  }

  let response = await fetch(new Request(url, options));
  if (response.status === 401) {
    const tokenResponse = await requestLogIn({ email, name });
    if (tokenResponse.ok) {
      response = await fetch(new Request(url, options));
    }
  }
  if (response.ok === false) {
    throw await response.text();
  }
  return response;
}

/**
 * Attempts to log in a user by sending their email and name to the login endpoint.
 * If the request is successful, an authentication cookie is included in the response headers.
 * @param email user's email
 * @param name user's name
 * @returns a promise that resolves to a response indicating the outcome of login attempt.
 */
async function requestLogIn({ email, name }: LogInRequestBody): Promise<Response> {
  return await fetch(`${import.meta.env.VITE_PUPPERFIELD_API_BASE_URL as string}/auth/login`, {
    body: JSON.stringify({ email, name }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export {
  request,
  requestLogIn
};
