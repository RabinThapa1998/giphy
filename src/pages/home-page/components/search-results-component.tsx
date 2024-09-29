import  { memo, useEffect, useState } from 'react';
import {  TrendingResponse } from '../../../../types';
import { APP_KEY } from '../../../config';
import GifLoader from '../../../common/gif/gif-loader';

function SearchResultsComponent({ query }: { query: string }) {
    const [data, setData] = useState<TrendingResponse | null>(null);

    useEffect(() => {
        if (!query) {
            fetch('http://localhost:3000/data')
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                })
                .catch((error) =>
                    console.error('Error fetching trending gifs:', error)
                );
        } else {
            fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=${APP_KEY}&q=${query}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                })
                .catch((error) =>
                    console.error('Error fetching search results:', error)
                );
        }
    }, [query]);

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
