interface LogInRequestBody {
  email: string,
  name: string,
};

interface AuthResponse {
  error?: any,
  ok: boolean,
};

async function logIn(body: LogInRequestBody): Promise<AuthResponse> {
  try {
    let response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
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
  } catch (error: any) {
    return {
      error,
      "ok": false,
    };
  }
}

async function logOut(): Promise<AuthResponse> {
  try {
    let response = await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
      credentials: "include",
      method: "POST",
    });

    if (response.ok === false) {
      return {
        "error": response.text(),
        "ok": false,
      };
    }

    return { "ok": true };
  } catch (error: any) {
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
