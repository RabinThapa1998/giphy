import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/home-page';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <HomePage />
        </QueryClientProvider>
    );
}

export default App;
