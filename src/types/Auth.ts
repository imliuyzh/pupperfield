export type LogInRequestBody = {
  email: string;
  name: string;
};

export type AuthResponse = {
  error?: unknown;
  ok: boolean;
};