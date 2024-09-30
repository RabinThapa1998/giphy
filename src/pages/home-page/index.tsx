import React, { Suspense, useCallback, useState, useTransition } from 'react';
import SearchResultsComponent from './components/search-results-component';
import ErrorBoundary from '../../lib/ErrorBoundary';
import useDebounce from '../../hooks/useDebounce';
import { getQueryParams, setQueryParams } from '../../utils/router-handler';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

const getUrlSearchQuery = () => {
    const searchQuery = getQueryParams().get('search');
    return searchQuery || '';
};

function HomePage() {
    const [searchTerm, setSearchTerm] = useState(getUrlSearchQuery);
    const debounced = useDebounce(searchTerm);
    const [, startTransition] = useTransition();

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            // const query = `?search=${encodeURIComponent(e.target.value)}`;
            // window.history.pushState(null, '', query);
            setQueryParams({
                search: e.target.value,
            });
            startTransition(() => {
                setSearchTerm(e.target.value);
            });
        },
        []
    );

    return (
        <div className="container pt-6 pb-10">
            <a href="/" className="w-fit inline-block">
                <h1 className="font-bold text-4xl">GIPHY</h1>
            </a>
            <div className="sticky top-0 z-50 pt-4 pb-4 bg-background mb-4">
                <input
                    defaultValue={searchTerm}
                    type="text"
                    placeholder="Search GIFs"
                    className="input-field"
                    onChange={handleChange}
                />
            </div>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary resetQuery={reset}>
                        <Suspense
                            fallback={
                                <p className="text-white font-bold">
                                    Loading...
                                </p>
                            }
                        >
                            <SearchResultsComponent query={debounced} />
                        </Suspense>
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </div>
    );
}

export default HomePage;
