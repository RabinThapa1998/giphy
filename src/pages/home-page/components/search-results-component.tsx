import { memo, useState } from 'react';
import GifLoader from '../../../common/gif/gif-loader';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getQueryParams } from '../../../utils/router-handler';
import { PaginationConfig } from '../../../../types/config';
import PaginationComponent from './pagination-component';
import { limit, offset } from '../../../constants';
import { findAllGifs } from '../../../services/gif.service';

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
            findAllGifs(query, paginationConfig.limit, paginationConfig.offset),
    });

    const firstColumn = data?.data?.filter((_, index) => index % 3 === 0);
    const secondColumn = data?.data?.filter((_, index) => index % 3 === 1);
    const thirdColumn = data?.data?.filter((_, index) => index % 3 === 2);

    return (
        <section>
            <div className="flex text-gray-500 gap-2 justify-end mt-4 italic">
                {query ? (
                    <>
                        <p className="">Results for "{query}"</p>/
                        <p>Total {data?.pagination?.total_count} results</p>/
                        <p>Page {paginationConfig.currentPage + 1}</p>
                    </>
                ) : (
                    <>
                    <p>Trending</p>/
                    <p>Total {data?.pagination?.total_count} results</p>/
                    <p>Page {paginationConfig.currentPage + 1}</p>
                    </>
                )}
            </div>
            <div className="giflist grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-4 mt-2">
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
            <PaginationComponent
                paginationConfig={paginationConfig}
                setPaginationConfig={setPaginationConfig}
                totalCount={data?.pagination?.total_count || 0}
            />
        </section>
    );
}

export default memo(SearchResultsComponent);
