export async function requestJson<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!response.ok) {
    let message = `Запрос к серверу завершился ошибкой (${response.status})`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // Response body was not JSON — keep the generic message.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

export async function requestOptionalJson<T>(input: string): Promise<T | null> {
  const response = await fetch(input, { headers: { "Content-Type": "application/json" } });
  if (response.status === 404) return null;
  if (!response.ok) {
    let message = `Запрос к серверу завершился ошибкой (${response.status})`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // Response body was not JSON — keep the generic message.
    }
    throw new Error(message);
  }
  return (await response.json()) as T;
}

export function selectionQuery(selection: unknown): string {
  if (!selection || Object.keys(selection as object).length === 0) return "";
  return `?selection=${encodeURIComponent(JSON.stringify(selection))}`;
}
