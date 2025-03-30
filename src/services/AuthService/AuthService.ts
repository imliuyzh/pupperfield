import { request, requestLogIn } from "@/lib/serviceRequest";
import type { AuthResponse, LogInRequestBody } from "@/types/Auth";

/**
 * Make a request to the login endpoint for a cookie that will be used later.
 * @param body an object containing the email & name of user
 * @returns an object containing the status and error if it exists
 */
async function logIn(body: LogInRequestBody): Promise<AuthResponse> {
  try {
    const response = await requestLogIn(body);
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
  try {
    await request("https://frontend-take-home-service.fetch.com/auth/logout", {
      credentials: "include",
      method: "POST",
    });
    return { "ok": true };
  } catch (error: unknown) {
    return {
      error,
      "ok": false,
    };
  }
}

export {
  logIn,
  logOut
};
