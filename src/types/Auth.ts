export type AuthResponse = {
  error?: unknown;
  ok: boolean;
};

export type LogInRequestBody = {
  email: string;
  name: string;
};