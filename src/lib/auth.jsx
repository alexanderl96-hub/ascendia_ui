import { postJSON } from "./api";

/**
 * Login via Spring endpoint
 * Expects your backend to accept: { username, password }
 * And respond with: { token, user, ... } (adjust to your actual shape)
 */
export async function login({ username, password }) {
  const data = await postJSON("/api/v1/auth/login", { username, password });

  // Common patterns:
  // - JWT in `data.token`
  // - Or session cookie only (then no token here)
  if (data?.token) {
    localStorage.setItem("authToken", data.token);
  }

  // You may also want to persist user info:
  if (data?.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
}

/** Register — adjust field names to match your Spring DTO */
export async function register({ username, fullName, email, phone, password }) {
  // If your backend DTO uses "fullName" -> keep it.
  // If it uses "name" instead, rename here.
  const body = { username, password, email, phone, fullName };

  const data = await postJSON("/api/v1/auth/register", body);

  // Some backends auto-login on register and return a token; if so, store it:
  if (data?.token) localStorage.setItem("authToken", data.token);
  if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}
