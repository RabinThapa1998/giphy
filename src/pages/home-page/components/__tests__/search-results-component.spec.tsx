import { render, screen, waitFor } from '@testing-library/react';
import SearchResultsComponent from '../search-results-component';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    global.IntersectionObserver = vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }));
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
describe('SearchResultsComponent without query', () => {
    test('renders and checks if trending is displayed when query is empty', async () => {
        render(
            <Wrapper>
                <SearchResultsComponent query="" />
            </Wrapper>
        );

        expect(await screen.findByText('Trending')).toBeInTheDocument();
    });
    test('renders and checks if correct number of gifs are displayed"', async () => {
        render(
            <Wrapper>
                <SearchResultsComponent query="" />
            </Wrapper>
        );

        expect(await screen.findAllByTestId('gif')).toHaveLength(3);
    });
    test('renders and check for suspense loading state"', async () => {
        screen.debug();
        const { getByText } = render(
            <Wrapper>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <SearchResultsComponent query="" />
                </React.Suspense>
            </Wrapper>
        );

        const lazyEle = await waitFor(() => getByText(/Next/i));
        expect(lazyEle).toBeInTheDocument();
    });
});

describe('SearchResultsComponent with query', () => {
    test('renders and checks if query name is displayed when query provided"', async () => {
        render(
            <Wrapper>
                <SearchResultsComponent query="Hello World" />
            </Wrapper>
        );

        expect(await screen.findByText(/Hello World/i)).toBeInTheDocument();
    });

    test('renders and checks if correct number of gifs are displayed when query provided"', async () => {
        render(
            <Wrapper>
                <SearchResultsComponent query="Hello World" />
            </Wrapper>
        );

        expect(await screen.findAllByTestId('gif')).toHaveLength(3);
    });
    test('renders and check for suspense', async () => {
        screen.debug();
        const { getByText } = render(
            <Wrapper>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <SearchResultsComponent query="Hello world" />
                </React.Suspense>
            </Wrapper>
        );

        const lazyEle = await waitFor(() => getByText(/Next/i));
        expect(lazyEle).toBeInTheDocument();
    });
});
