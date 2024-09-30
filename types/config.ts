export type PaginationConfig = {
    limit: number;
    offset: number;
    currentPage: number;
}


export type SearchResultsRef = {
    resetPagination: () => void;
}