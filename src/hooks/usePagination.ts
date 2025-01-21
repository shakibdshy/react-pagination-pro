import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PaginationActions, PaginationInfo, UsePaginationProps } from '../types/pagination';

export function usePagination({
  totalItems = 0,
  defaultCurrentPage = 1,
  defaultPageSize = 10,
  onChange,
  mode = 'client',
  onPageChange,
  isLoading: externalLoading,
}: UsePaginationProps = {}): [PaginationInfo, PaginationActions] {
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / pageSize)), [totalItems, pageSize]);

  const handlePageChange = useCallback(async (page: number, size: number) => {
    if (mode === 'server' && onPageChange) {
      setIsLoading(true);
      try {
        await onPageChange(page, size);
      } finally {
        setIsLoading(false);
      }
    }
  }, [mode, onPageChange]);

  const safeSetCurrentPage = useCallback(async (page: number) => {
    const safePage = Math.max(1, Math.min(page, totalPages));
    if (safePage !== currentPage) {
      setCurrentPage(safePage);
      onChange?.({ currentPage: safePage, pageSize, totalItems });
      await handlePageChange(safePage, pageSize);
    }
  }, [currentPage, pageSize, totalItems, totalPages, onChange, handlePageChange]);

  const safeSetPageSize = useCallback(async (size: number) => {
    const safeSize = Math.max(1, size);
    if (safeSize !== pageSize) {
      setPageSize(safeSize);
      const newTotalPages = Math.max(1, Math.ceil(totalItems / safeSize));
      if (currentPage > newTotalPages) {
        await safeSetCurrentPage(newTotalPages);
      } else {
        onChange?.({ currentPage, pageSize: safeSize, totalItems });
        await handlePageChange(currentPage, safeSize);
      }
    }
  }, [currentPage, pageSize, totalItems, onChange, safeSetCurrentPage, handlePageChange]);

  useEffect(() => {
    if (mode === 'server') {
      safeSetCurrentPage(1);
    }
  }, [totalItems, mode, safeSetCurrentPage]);

  const paginationInfo = useMemo((): PaginationInfo => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);

    return {
      currentPage,
      pageSize,
      totalItems,
      totalPages,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
      isFirstPage: currentPage === 1,
      isLastPage: currentPage === totalPages,
      isLoading: isLoading || externalLoading,
    };
  }, [currentPage, pageSize, totalItems, totalPages, isLoading, externalLoading]);

  const actions: PaginationActions = useMemo(() => ({
    setCurrentPage: safeSetCurrentPage,
    setPageSize: safeSetPageSize,
    nextPage: () => safeSetCurrentPage(currentPage + 1),
    previousPage: () => safeSetCurrentPage(currentPage - 1),
    firstPage: () => safeSetCurrentPage(1),
    lastPage: () => safeSetCurrentPage(totalPages),
  }), [currentPage, totalPages, safeSetCurrentPage, safeSetPageSize]);

  return [paginationInfo, actions];
} 