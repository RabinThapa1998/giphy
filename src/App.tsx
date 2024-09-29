import React, { Suspense, useCallback, useState, useTransition } from 'react';

import SearchResults from './components/SearchResults';
import useDebounce from './hooks/useDebounce';
import ErrorBoundary from './lib/ErrorBoundary';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const debounced = useDebounce(searchTerm);
    console.log('🚀 ~ App ~ debounced:', debounced);
    const [isPending, startTransition] = useTransition();

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            startTransition(() => {
                setSearchTerm(e.target.value);
            });
        },
        []
    );

    return ( 
        <div className='container py-4'>
            <h1 className="font-bold text-4xl ">GIPHY</h1>
            <input
                type="text"
                placeholder="Search GIFs"
                className='input-field mb-10 mt-4'
                onChange={handleChange}
            />
            {isPending && <div className="text-gray-500">Searching...</div>}
            <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchResults query={debounced} />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}

export default App;
