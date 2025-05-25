import { createFetch } from "@better-fetch/fetch";

export function createAuthFetch(token: string) {
  return createFetch({
    baseURL: process.env.BACKEND_API_URL || "http://localhost:3000",
    auth: { type: "Bearer", token },
  });
}

export const $fetch = createFetch({
  baseURL: process.env.BACKEND_API_URL || "http://localhost:3000",
});
