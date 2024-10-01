import { GifResponse } from '@/types';
import fetchHandler from '@/utils/fetch-handler';

export async function findAllGifs(
    query: string,
    limit: number,
    offset: number
): Promise<GifResponse> {

    const params = { limit: limit.toString(), offset: offset.toString() };

    if (!query) {
        return fetchHandler<GifResponse>('gifs/trending', params);
    } else {
        return fetchHandler<GifResponse>('gifs/search', { ...params, q: query });
    }
}

