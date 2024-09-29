import { memo, useState } from 'react';
import { TrendingResponse } from '../../../../types';
import { APP_KEY } from '../../../config';
import GifLoader from '../../../common/gif/gif-loader';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getQueryParams } from '../../../utils/router-handler';
import { PaginationConfig } from '../../../../types/config';
import PaginationComponent from './pagination-component';
import { limit, offset } from '../../../constants';

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



const getPaginationConfigFromUrl = (): PaginationConfig => {
    const params = getQueryParams();
    return {
        limit: Number(params.get('limit')) || limit,
        offset: Number(params.get('offset')) || offset,
        currentPage:
            Number(params.get('offset')) / Number(params.get('limit')) || 0,
    };
};
function SearchResultsComponent({ query }: { query: string }) {
    const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>(
        getPaginationConfigFromUrl
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

    const firstColumn = data?.data?.filter((_, index) => index % 3 === 0);
    const secondColumn = data?.data?.filter((_, index) => index % 3 === 1);
    const thirdColumn = data?.data?.filter((_, index) => index % 3 === 2);

    return (
        <section>
            <PaginationComponent
                paginationConfig={paginationConfig}
                setPaginationConfig={setPaginationConfig}
                totalCount={data?.pagination?.total_count || 0}
            />
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
