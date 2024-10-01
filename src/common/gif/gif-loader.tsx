import { useEffect, useState } from 'react';
import { Datum } from '../../../types';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils/cn';

function GifLoader({ gif }: { gif: Datum }) {
    const [ref, isIntersecting] = useIntersectionObserver({
        rootMargin: '0px',
        threshold: 0,
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false); 

    const colorPalette = [
        '#00FF99',
        '#9933ff',
        '#FFF35C',
        '#FF6666',
        '#00CCFF',
    ];

    //*Track if it has ever been visible,once visible ,dont toggle
    useEffect(() => {
        if (isIntersecting) {
            //*Set true when the component enters the viewport for the first time
            setHasBeenVisible(true); 
        }
    }, [isIntersecting]);

    return (
        <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className="gif w-full rounded-primary overflow-hidden"
            style={{
                aspectRatio: `${
                    Number(gif.images.original.width) /
                    Number(gif.images.original.height)
                }`,
            }}
            data-testid="gif"
        >
            {!hasBeenVisible ||
                (!isLoaded && (
                    <div
                        className={cn('w-full h-full  animate-pulse')}
                        style={{
                            backgroundColor:
                                colorPalette[
                                    Math.floor(
                                        Math.random() * colorPalette.length
                                    )
                                ],
                        }}
                        aria-hidden="true"
                    ></div>
                ))}
            {hasBeenVisible && (
                <picture>
                    <source
                        type="image/webp"
                        srcSet={gif.images.original?.webp}
                        media="(min-width: 425px)"
                    />
                    <source
                        type="image/webp"
                        srcSet={gif.images.preview_webp?.url}
                        media="(max-width: 424px)"
                    />
                    <img
                        src={gif.images.preview_gif?.url}
                        alt={gif.title}
                        className={cn(
                            `w-full h-full transition-opacity duration-300`,
                            isLoaded ? 'opacity-100 block' : 'opacity-0 none'
                        )}
                        onLoad={() => setIsLoaded(true)}
                        // onError={(e) => {
                        //     console.log('Error loading image:', e);
                        //     e.currentTarget.src = '/error.png'
                        // }}
                    />
                </picture>
            )}
        </div>
    );
}

export default GifLoader;
