const JSON_HEADERS = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

export const jsonInit = (method: string, body: unknown): RequestInit => ({
    method,
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
});

export async function request<T>(input: string, init?: RequestInit): Promise<T> {
    let response: Response;
    try {
        response = await fetch(input, init);
    } catch {
        throw new Error('Network error — could not reach the server');
    }
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const { data } = await response.json();
    return data as T;
}
