import { memo, useMemo, useState, forwardRef, useImperativeHandle, Ref } from 'react';
import GifLoader from '../../../common/gif/gif-loader';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getQueryParams } from '../../../utils/router-handler';
import { PaginationConfig, SearchResultsRef } from '../../../../types/config';
import PaginationComponent from './pagination-component';
import { limit, offset } from '../../../constants';
import { findAllGifs } from '../../../services/gif.service';
import { Datum } from '../../../../types';
import useWindowSize from '../../../hooks/useWindowSize';

const getPaginationConfigFromUrl = (): PaginationConfig => {
    const params = getQueryParams();
    return {
        limit: Number(params.get('limit')) || limit,
        offset: Number(params.get('offset')) || offset,
        currentPage:
            Number(params.get('offset')) / Number(params.get('limit')) || 0,
    };
};

function SearchResultsComponent({ query }: { query: string }, ref: Ref<SearchResultsRef>) {
    const windowSize = useWindowSize();
    const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>(
        getPaginationConfigFromUrl
    );

    //* exposing reset pagination config for parent 
    useImperativeHandle(ref, () => ({
        resetPagination() {
            setPaginationConfig({
                limit,
                offset,
                currentPage: 0,
            });
        },
    }));

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

    const columnCount = useMemo(
        () => (windowSize.width > 1024 ? 3 : 2),
        [windowSize]
    );

    const columns = useMemo(() => {
        const cols: Datum[][] = Array.from({ length: columnCount }, () => []);
        data?.data?.forEach((gif, index) => {
            cols[index % columnCount].push(gif);
        });
        return cols;
    }, [data?.data, columnCount]);

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
            <div className="giflist grid grid-cols-2 lg:grid-cols-3 gap-x-4 mt-2">
                {columns?.map((column, index) => (
                    <div className="flex flex-col gap-4" key={index}>
                        {column?.map((gif) => (
                            <GifLoader key={gif.id} gif={gif} />
                        ))}
                    </div>
                ))}
            </div>
            <PaginationComponent
                paginationConfig={paginationConfig}
                setPaginationConfig={setPaginationConfig}
                totalCount={data?.pagination?.total_count || 0}
            />
        </section>
    );
}

export default memo(forwardRef(SearchResultsComponent));
