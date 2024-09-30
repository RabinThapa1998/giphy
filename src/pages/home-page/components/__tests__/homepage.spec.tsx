import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '../..';
import { fireEvent, render, screen } from '@testing-library/react';
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
describe('HomePage', () => {
    test('renders and checks if search input is displayed', async () => {
        const { getByPlaceholderText } = render(
            <Wrapper>
                <HomePage />
            </Wrapper>
        );
        const inputEle = getByPlaceholderText('Search GIFs');

        expect(inputEle).toBeInTheDocument();
        //*change text
        fireEvent.change(inputEle, { target: { value: 'hello world' } });
        expect(inputEle).toHaveValue('hello world');
        //*expect loading... when search
        expect(await screen.findByText(/loading.../i)).toBeInTheDocument();
    });
});
