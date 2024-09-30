import { TrendingResponse } from '../../types';
import fetchHandler from '../utils/fetch-handler';
import {
    limit as DefaultLimit,
    offset as DefaultOffset,
} from '../constants/index';

export async function findAllGifs(
    query: string,
    limit: number,
    offset: number
): Promise<TrendingResponse> {
    let params;

    if (!query) {
        params = {
            limit: DefaultLimit.toString(),
            offset: DefaultOffset.toString(),
        };
        return fetchHandler<TrendingResponse>('gifs/trending', params);
    } else {
        params = { limit: limit.toString(), offset: offset.toString() };
        return fetchHandler<TrendingResponse>('gifs/search', { ...params, q: query });
    }
}

