import React from 'react';
import { setQueryParams } from '../../../utils/router-handler';
import { PaginationConfig } from '../../../../types/config';

function PaginationComponent({
    paginationConfig,
    setPaginationConfig,
    totalCount,
}: {
    paginationConfig: PaginationConfig;
    setPaginationConfig: React.Dispatch<React.SetStateAction<PaginationConfig>>;
    totalCount: number;
}) {
    const handlePagination = (action: 'next' | 'prev') => {
        if (action === 'next') {
            //*check for total_count in data
            if (totalCount <= paginationConfig.limit + paginationConfig.offset)
                return;
            setPaginationConfig((prev) => {
                const newConfig = {
                    ...prev,
                    offset: (prev.currentPage + 1) * prev.limit,
                    currentPage: prev.currentPage + 1,
                };

                setQueryParams({
                    offset: newConfig.offset.toString(),
                    limit: newConfig.limit.toString(),
                });

                return newConfig;
            });
        } else {
            setPaginationConfig((prev) => {
                const newConfig = {
                    ...prev,
                    offset: Math.max(prev.currentPage - 1, 0) * prev.limit,
                    currentPage: Math.max(prev.currentPage - 1, 0),
                };

                setQueryParams({
                    offset: newConfig.offset.toString(),
                    limit: newConfig.limit.toString(),
                });

                return newConfig;
            });
        }
    };

    return (
        <div className="my-4 flex items-center  justify-end gap-4 text-sm">
            <button
                className="btn-secondary"
                disabled={paginationConfig.offset === 0}
                onClick={() => handlePagination('prev')}
            >
                Prev
            </button>
            <p className='font-bold'>
            {paginationConfig.currentPage + 1}
            </p>
            <button
                className="btn-secondary"
                disabled={
                    totalCount <=
                    paginationConfig.limit + paginationConfig.offset
                }
                onClick={() => handlePagination('next')}
            >
                Next
            </button>
        </div>
    );
}

export default PaginationComponent;
