import { memo } from 'react';
import { TrendingResponse } from '../../../../types';
import { APP_KEY } from '../../../config';
import GifLoader from '../../../common/gif/gif-loader';
import { useSuspenseQuery } from '@tanstack/react-query';

async function fetchGifs(query: string): Promise<TrendingResponse> {
    if (!query) {
        return fetch('http://localhost:3000/data').then((res) => res.json());
    } else {
        return fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${APP_KEY}&q=${query}`
        ).then((res) => res.json());
    }
}
function SearchResultsComponent({ query }: { query: string }) {
    const { data } = useSuspenseQuery({
        queryKey: ['gif-list', query],
        queryFn: () => fetchGifs(query),
    });

    const firstColumn = data?.data?.filter((_, index) => index % 3 === 0);
    const secondColumn = data?.data?.filter((_, index) => index % 3 === 1);
    const thirdColumn = data?.data?.filter((_, index) => index % 3 === 2);

    return (
        <div className="giflist grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-4">
            <div className="flex flex-col gap-4">
                {firstColumn?.map((gif) => (
                    <GifLoader key={gif.id} gif={gif} />
                ))}
            </div>
            <div className="flex flex-col gap-4">
                {secondColumn?.map((gif) => (
                    <GifLoader key={gif.id} gif={gif} />
                ))}
            </div>
            <div className="flex flex-col gap-4">
                {thirdColumn?.map((gif) => (
                    <GifLoader key={gif.id} gif={gif} />
                ))}
            </div>
        </div>
    );
}

export default memo(SearchResultsComponent);
