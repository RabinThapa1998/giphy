import React, { memo, useEffect, useState } from 'react';
import { Datum, TrendingResponse } from '../../types';
import { APP_KEY } from '../config';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../lib/cn';

function SearchResults({ query }: { query: string }) {
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
            {/* {data?.data?.map((gif) => 
                <LazyLoadedGif key={gif.id} gif={gif} />
            )} */}
            <div className="flex flex-col gap-4">
            {firstColumn?.map((gif) => (
                <LazyLoadedGif key={gif.id} gif={gif} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
          {secondColumn?.map((gif) => (
                <LazyLoadedGif key={gif.id} gif={gif} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
          {thirdColumn?.map((gif) => (
                <LazyLoadedGif key={gif.id} gif={gif} />
            ))}
          </div>
        </div>
    );
}
function LazyLoadedGif({ gif }: { gif: Datum }) {
    const [ref, isIntersecting] = useIntersectionObserver({
        rootMargin: '0px',
        threshold: 0,
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false); // Track if it has ever been visible

    const colorPalette = [
        '#00FF99',
        '#9933ff',
        '#FFF35C',
        '#FF6666',
        '#00CCFF'
    ]

    useEffect(() => {
        if (isIntersecting) {
            setHasBeenVisible(true); // Set true when the component enters the viewport for the first time
        }
    }, [isIntersecting]);

    return (
        <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className="gif w-full rounded-primary overflow-hidden"
            style={{
                aspectRatio: `${Number(gif.images.original.width) / Number(gif.images.original.height)}`,
              }}
        >
            {!hasBeenVisible || !isLoaded &&(
                <div
                    className={cn("w-full h-full  animate-pulse",
                    )}
                    style={{
                        backgroundColor: colorPalette[Math.floor(Math.random() * colorPalette.length)],
                    }}
                    aria-hidden="true"
                >
                    Loading...
                </div>
            )}
            {hasBeenVisible && (
                <picture>
                    <source
                        type="image/webp"
                        srcSet={gif.images.original.webp}
                        media="(min-width: 425px)"
                    />
                    <source
                        type="image/webp"
                        srcSet={gif.images.preview_webp.url}
                        media="(max-width: 424px)"
                    />
                    <img
                        src={gif.images.preview_gif.url}
                        alt={gif.title}
                        className={`w-full h-full transition-opacity duration-300 ${
                            isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        
                        onLoad={() => setIsLoaded(true)}
                        onError={(e) => {
                            console.error('Error loading image:', e);
                            e.currentTarget.src =
                                '/placeholder.svg?height=100&width=100';
                        }}
                        style={{
                            display: isLoaded ? 'block' : 'none' }} // Prevent flicker
                    />
                </picture>
            )}
        </div>
    );
}
export default memo(SearchResults);
