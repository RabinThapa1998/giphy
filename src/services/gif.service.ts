import { TrendingResponse } from '../../types';
import fetchHandler from '../utils/fetch-handler';

export async function findAllGifs(
    query: string,
    limit: number,
    offset: number
): Promise<TrendingResponse> {
    const params = { limit:limit.toString(), offset:offset.toString() };

    if (!query) {
        return fetchHandler('gifs/trending', params);
    } else {
        return fetchHandler('gifs/search', { ...params, q: query });
    }
}
