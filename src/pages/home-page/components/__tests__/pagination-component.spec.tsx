import { render, screen } from '@testing-library/react';
import PaginationComponent from '../pagination-component';
import { PaginationConfig } from '../../../../../types/config';

const paginationConfig: PaginationConfig = {
    limit: 50,
    offset: 50,
    currentPage: 1,
};
const totalCount = 90;
const mockSetPaginationConfig = vitest.fn();

describe('SearchResultsComponent', () => {
    test('renders and checks if pagination contains correct page number"', async () => {
        render(
            <PaginationComponent
                paginationConfig={paginationConfig}
                setPaginationConfig={mockSetPaginationConfig}
                totalCount={totalCount}
            />
        );

        expect(
            await screen.findByText(paginationConfig.currentPage + 1)
        ).toBeInTheDocument();
    });

    test('renders and checks if pagination next button is disabled', async () => {
        render(
            <PaginationComponent
                paginationConfig={paginationConfig}
                setPaginationConfig={mockSetPaginationConfig}
                totalCount={totalCount}
            />
        );

        expect(await screen.findByText('Next')).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeDisabled();
    });
    test('renders and checks if pagination prev button is disabled', async () => {
        const paginationConfig: PaginationConfig = {
            limit: 50,
            offset: 0,
            currentPage: 0,
        };
        render(
            <PaginationComponent
                paginationConfig={paginationConfig}
                setPaginationConfig={mockSetPaginationConfig}
                totalCount={totalCount}
            />
        );

        expect(await screen.findByText('Prev')).toBeInTheDocument();
        expect(screen.getByText(/Prev/i)).toBeDisabled();
    });
});
