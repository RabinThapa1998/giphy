import {
    memo,
    useMemo,
    useState,
    forwardRef,
    useImperativeHandle,
    Ref,
} from 'react';
import GifLoader from '@/common/gif/gif-loader';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getQueryParams } from '@/utils/router-handler';
import PaginationComponent from './pagination-component';
import {
    GIFS_COLUMN_LG,
    GIFS_COLUMN_SM,
    limit,
    offset,
    SCREEN_WIDTH_LG,
} from '@/constants';
import { findAllGifs } from '@/services/gif.service';
import { Gif, PaginationConfig, SearchResultsRef } from '@/types';
import useWindowSize from '@/hooks/useWindowSize';
import withSuspenseAndErrorBoundary from '@/hoc/withSuspenseAndErrorBoundary';

const getPaginationConfigFromUrl = (): PaginationConfig => {
    const params = getQueryParams();
    return {
        limit: Number(params.get('limit')) || limit,
        offset: Number(params.get('offset')) || offset,
        currentPage:
            Number(params.get('offset')) / Number(params.get('limit')) || 0,
    };
};

function SearchResults(
    { query }: { query: string },
    ref: Ref<SearchResultsRef>
) {
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

    //*For responsive grid view
    const columnCount = useMemo(
        () =>
            windowSize.width > SCREEN_WIDTH_LG
                ? GIFS_COLUMN_LG
                : GIFS_COLUMN_SM,
        [windowSize]
    );

    //*Auto generate grid columns
    const columns = useMemo(() => {
        const cols: Record<string, Gif[]> = {};
        Array.from({ length: columnCount }, () => []).forEach(() => {
            const randomKey = crypto.randomUUID();
            cols[randomKey] = [];
        });

        data?.data?.forEach((gif, index) => {
            const columnKeys = Object.keys(cols);
            const columnKey = columnKeys[index % columnCount];
            cols[columnKey].push(gif);
        });

        return cols;
    }, [data?.data, columnCount]);

    return (
        <section>
            <div className="flex text-gray-500 gap-2 justify-end mt-4 italic">
                {query ? (
                    <>
                        <p className="">Results for "{query}"</p>
                        {data?.data?.length ? (
                            <>
                                /
                                <p>
                                    Total {data?.pagination?.total_count}{' '}
                                    results
                                </p>
                                /<p>Page {paginationConfig.currentPage + 1}</p>
                            </>
                        ) : null}
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
                {data?.data?.length ? (
                    Object.entries(columns).map(([columnKey, column]) => (
                        <div className="flex flex-col gap-4" key={columnKey}>
                            {column?.map((gif) => (
                                <GifLoader key={gif.id} gif={gif} />
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="border-secondary border rounded-primary flex justify-center items-center w-full py-4 px-4 col-span-3 min-h-40">
                        <h6 className="text-2xl font-semibold">No Data</h6>
                    </div>
                )}
            </div>
            <PaginationComponent
                paginationConfig={paginationConfig}
                setPaginationConfig={setPaginationConfig}
                totalCount={data?.pagination?.total_count || 0}
            />
        </section>
    );
}

const SearchResultsComponent = withSuspenseAndErrorBoundary(memo(forwardRef(SearchResults)));

export default SearchResultsComponent;
