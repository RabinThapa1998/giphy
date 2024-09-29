import React, { Suspense, useCallback, useEffect, useState, useTransition } from 'react';
import SearchResultsComponent from './components/search-results-component';
import ErrorBoundary from '../../lib/ErrorBoundary';
import useDebounce from '../../hooks/useDebounce';

const getUrlSearchQuery = () => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search');
    return searchQuery || '';
}

function HomePage() {
    const [searchTerm, setSearchTerm] = useState(getUrlSearchQuery);
    const debounced = useDebounce(searchTerm);
    const [, startTransition] = useTransition();

    // useEffect(()=>{
    //     console.log("getUrlSearchQuery",getUrlSearchQuery())
    // },[])

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const query = `?search=${encodeURIComponent(e.target.value)}`;
            window.history.pushState(null, '', query); 
            startTransition(() => {
                setSearchTerm(e.target.value);
            });
        },
        []
    );

    return (
        <div className="container py-4">
            <h1 className="font-bold text-4xl">GIPHY</h1>
            <div className="sticky top-0 z-50 pt-4 pb-4 bg-background">
                <input
                defaultValue={searchTerm}
                    type="text"
                    placeholder="Search GIFs"
                    className="input-field"
                    onChange={handleChange}
                />
            </div>
            <ErrorBoundary>
                <Suspense
                    fallback={
                        <p className="text-white font-bold">Loading...</p>
                    }
                >
                    <SearchResultsComponent query={debounced} />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}

export default HomePage;
