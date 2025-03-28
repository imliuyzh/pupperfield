import useUserStore from "@/stores/UserStore/UserStore";
import type { AuthResponse, LogInRequestBody } from "@/types/Auth";

/**
 * Make a request to the login endpoint for a cookie that will be used later.
 * @param body an object containing the email & name of user
 * @returns an object containing the status and error if it exists
 */
async function logIn(body: LogInRequestBody): Promise<AuthResponse> {
  try {
    const response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (response.ok === false) {
      return {
        "error": await response.text(),
        "ok": false,
      };
    }
    return { "ok": true };
  } catch (error: unknown) {
    return {
      error,
      "ok": false,
    };
  }
}

/**
 * Make a request to the logout endpoint to remove the cookie.
 * @returns an object containing the status and error if it exists
 */
async function logOut(): Promise<AuthResponse> {
  const url = "https://frontend-take-home-service.fetch.com/auth/logout",
    options: RequestInit = {
      credentials: "include",
      method: "POST",
    };

  try {
    let response = await fetch(new Request(url, options));
    if (response.status === 401) {
      const { ok, error } = await getNewToken();
      if (ok) {
        response = await fetch(new Request(url, options));
      } else {
        return { ok, error };
      }
    }
    if (response.ok === false) {
      throw await response.text();
    }
    return { "ok": true };
  } catch (error: unknown) {
    return {
      error,
      "ok": false,
    };
  }
}

/**
 * Use this function to query the login endpoint once the cookie expired.
 * @returns an object containing the status and error if it exists
 */
async function getNewToken(): Promise<AuthResponse> {
  const { email, name } = useUserStore.getState();
  if (email === null || name === null) {
    return {
      "error": "User is not logged in.",
      "ok": false
    };
  }
  return await logIn({ email, name });
}

export {
  getNewToken,
  logIn,
  logOut
};