export async function apiFetch<T>(url: string) {
  const res = await fetch(`${process.env.BACKEND_API_URL}${url}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Fetch error: ${res.status} - ${errorText}`);
  }
  const data = (await res.json()) as T;
  return data;
}

export async function apiWithToken<T>(url: string, token: string): Promise<T> {
  const response = await fetch(`${process.env.BACKEND_API_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Fetch error: ${response.status} - ${errorText}`);
  }

  const data = (await response.json()) as T;
  return data;
}
