import { useState, useLayoutEffect } from 'react';

const useWindowSize = () => {
    const handleWindowResize = () => {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    };

    const [windowSize, setWindowSize] = useState(handleWindowResize);

    useLayoutEffect(() => {
        const handleResize = () => {
            setWindowSize(handleWindowResize);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};

export default useWindowSize;
