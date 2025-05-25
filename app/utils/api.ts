import { BACKEND_API_URL } from "~/env";

// GET WITHOUT TOKEN
export async function customApiFetch<T>(url: string) {
  const response = await fetch(`${BACKEND_API_URL}${url}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Fetch error: ${response.status} - ${errorText}`);
  }
  const data = (await response.json()) as T;
  return data;
}

// POST AUTH API
export async function apiPostAuth<T>(
  url: string,
  body?: unknown,
  method: string = "POST",
): Promise<T> {
  const response = await fetch(`${process.env.BACKEND_API_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Fetch error: ${response.status} - ${errorText}`);
  }

  const data = (await response.json()) as T;
  return data;
}

// API WITH TOKEN
export async function apiWithToken<T>(
  url: string,
  options: {
    method?: string;
    body?: unknown;
    token: string;
  },
): Promise<T> {
  const { method = "GET", body, token } = options;
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };
  if (body) {
    headers["Content-Type"] = "application/json";
  }
  const response = await fetch(`${process.env.BACKEND_API_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Fetch error: ${response.status} - ${errorText}`);
  }
  return response.json();
}
