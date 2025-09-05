const API_BASE =
  import.meta.env.PROD
    ? "https://collaborative-storytelling-app-dbf7.onrender.com"
    : "http://localhost:5000";

export async function apiRequest(
  url: string,
  options: RequestInit = {},
  token?: string
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
    credentials: "include", // important for refresh cookies
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
