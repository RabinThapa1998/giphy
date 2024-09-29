import { memo, useState } from 'react';
import { TrendingResponse } from '../../../../types';
import { APP_KEY } from '../../../config';
import GifLoader from '../../../common/gif/gif-loader';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getQueryParams, setQueryParams } from '../../../utils/router-handler';

async function fetchGifs(
    query: string,
    limit: number,
    offset: number
): Promise<TrendingResponse> {
    if (!query) {
        return fetch('http://localhost:3000/data').then((res) => res.json());
    } else {
        return fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${APP_KEY}&q=${query}&limit=${limit}&offset=${offset}`
        ).then((res) => res.json());
    }
}

const limit = 50;
const offset = 0;

const getPaginationConfigFromUrl = () => {
    const params = getQueryParams();

    return {
        limit: Number(params.get('limit')) || limit,
        offset: Number(params.get('offset')) || offset,
        currentPage:
            Number(params.get('offset')) / Number(params.get('limit')) || 0,
    };
};
function SearchResultsComponent({ query }: { query: string }) {
    const [paginationConfig, setPaginationConfig] = useState(
        getPaginationConfigFromUrl
    );
    console.log(
        '🚀 ~ SearchResultsComponent ~ paginationConfig:',
        paginationConfig
    );
    const { data } = useSuspenseQuery({
        queryKey: [
            'gif-list',
            query,
            paginationConfig.limit,
            paginationConfig.offset,
        ],
        queryFn: () =>
            fetchGifs(query, paginationConfig.limit, paginationConfig.offset),
    });
    console.log('🚀 ~ SearchResultsComponent ~ data:', data);

    const handlePagination = (action: 'next' | 'prev') => {
        if (action === 'next') {
            //*check for total_count in data
            if (
                data?.pagination?.total_count <=
                paginationConfig.limit + paginationConfig.offset
            )
                return;
            setPaginationConfig((prev) => {
                const newConfig = {
                    ...prev,
                    offset: (prev.currentPage + 1) * prev.limit,
                    currentPage: prev.currentPage + 1,
                };

                setQueryParams({
                    offset: newConfig.offset.toString(),
                    limit: newConfig.limit.toString(),
                });

                return newConfig;
            });
        } else {
            setPaginationConfig((prev) => {
                const newConfig = {
                    ...prev,
                    offset: Math.max(prev.currentPage - 1, 0) * prev.limit,
                    currentPage: Math.max(prev.currentPage - 1, 0),
                };

                setQueryParams({
                    offset: newConfig.offset.toString(),
                    limit: newConfig.limit.toString(),
                });

                return newConfig;
            });
        }
    };

    const firstColumn = data?.data?.filter((_, index) => index % 3 === 0);
    const secondColumn = data?.data?.filter((_, index) => index % 3 === 1);
    const thirdColumn = data?.data?.filter((_, index) => index % 3 === 2);

    return (
        <section>
            <div className="my-4 flex  justify-end gap-4">
                <button
                    disabled={paginationConfig.offset === 0}
                    onClick={() => handlePagination('prev')}
                >
                    Prev
                </button>
                {paginationConfig.currentPage + 1}
                <button
                    disabled={
                        data?.pagination?.total_count <=
                        paginationConfig.limit + paginationConfig.offset
                    }
                    onClick={() => handlePagination('next')}
                >
                    Next
                </button>
            </div>
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
        </section>
    );
}

export default memo(SearchResultsComponent);
