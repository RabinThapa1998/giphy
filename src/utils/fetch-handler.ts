import { APP_KEY, BASE_URL } from '@/config';

async function fetchHandler<T>(
    endpoint: string,
    params: Record<string, string> = {}
): Promise<T> {
    try {
        const url = new URL(`${BASE_URL}/${endpoint}`);
        url.searchParams.append('api_key', APP_KEY);

        for (const key in params) {
            url.searchParams.append(key, params[key]);
        }
        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error in fetchHandler', error);
        throw error;
    }
}

export default fetchHandler;
