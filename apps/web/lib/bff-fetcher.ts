export async function bffFetcher<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(init?.headers instanceof Headers
        ? Object.fromEntries(init.headers.entries())
        : (init?.headers as Record<string, string> | undefined)),
    },
    ...init,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    let detail: string | undefined;
    try {
      const errorPayload = (await response.clone().json()) as { detail?: string; message?: string };
      detail = errorPayload.detail || errorPayload.message;
    } catch (error) {
      detail = undefined;
    }

    throw new Error(detail ?? `BFF request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}
