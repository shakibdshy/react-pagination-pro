import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PaginationActions, PaginationInfo, UsePaginationProps } from '../types/pagination';
/**
 * A custom hook for handling pagination state and logic.
 * 
 * @remarks
 * This hook provides a complete pagination solution with support for both client-side and server-side pagination.
 * It handles page navigation, page size changes, and provides useful pagination information.
 * 
 * @param options - Configuration options for the pagination hook
 * @param options.totalItems - Total number of items to paginate (default: 0)
 * @param options.defaultCurrentPage - Initial page number to display (default: 1)
 * @param options.defaultPageSize - Initial number of items per page (default: 10)
 * @param options.onChange - Callback fired when pagination state changes
 * @param options.mode - Pagination mode: 'client' or 'server' (default: 'client')
 * @param options.onPageChange - Callback for server-side data fetching
 * @param options.isLoading - External loading state for server-side pagination
 * @param options.isDisabled - Disable all pagination actions
 * @param options.isDisabledPrevious - Disable previous page action
 * @param options.isDisabledNext - Disable next page action
 * 
 * @returns A tuple containing:
 * 1. Pagination information object with current state and computed values
 * 2. Actions object with methods to control pagination
 * 
 * @example
 * ```tsx
 * const [paginationInfo, actions] = usePagination({
 *   totalItems: 100,
 *   defaultPageSize: 10,
 *   onChange: ({ currentPage, pageSize }) => {
 *     // Handle pagination state change
 *   }
 * });
 * 
 * // Access pagination state
 * console.log(paginationInfo.currentPage); // Current page number
 * console.log(paginationInfo.totalPages);  // Total number of pages
 * 
 * // Use pagination actions
 * actions.nextPage();     // Go to next page
 * actions.previousPage(); // Go to previous page
 * actions.setPageSize(20); // Change items per page
 * ```
 */

export function usePagination({
  totalItems = 0,
  defaultCurrentPage = 1,
  defaultPageSize = 10,
  onChange,
  mode = 'client',
  onPageChange,
  isLoading: externalLoading,
  isDisabled = false,
  isDisabledPrevious = false,
  isDisabledNext = false,
}: UsePaginationProps = {}): [PaginationInfo, PaginationActions] {
  // Validate inputs
  if (defaultCurrentPage < 1) {
    console.warn('defaultCurrentPage should be greater than or equal to 1');
    defaultCurrentPage = 1;
  }
  if (defaultPageSize < 1) {
    console.warn('defaultPageSize should be greater than or equal to 1');
    defaultPageSize = 10;
  }
  if (totalItems < 0) {
    console.warn('totalItems should be greater than or equal to 0');
    totalItems = 0;
  }

  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / pageSize)), [totalItems, pageSize]);

  const handlePageChange = useCallback(async (page: number, size: number) => {
    if (mode === 'server' && onPageChange) {
      setIsLoading(true);
      try {
        await onPageChange(page, size);
      } catch (error) {
        console.error('Error during page change:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [mode, onPageChange]);

  const safeSetCurrentPage = useCallback(async (page: number) => {
    if (isDisabled) return;
    const safePage = Math.max(1, Math.min(page, totalPages));
    if (safePage !== currentPage) {
      setCurrentPage(safePage);
      onChange?.({ currentPage: safePage, pageSize, totalItems });
      await handlePageChange(safePage, pageSize);
    }
  }, [currentPage, pageSize, totalItems, totalPages, onChange, handlePageChange, isDisabled]);

  const safeSetPageSize = useCallback(async (size: number) => {
    if (isDisabled) return;
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
  }, [currentPage, pageSize, totalItems, onChange, safeSetCurrentPage, handlePageChange, isDisabled]);

  const previousPage = useCallback(() => {
    if (isDisabled || isDisabledPrevious) return;
    if (currentPage > 1) {
      safeSetCurrentPage(currentPage - 1);
    }
  }, [currentPage, safeSetCurrentPage, isDisabled, isDisabledPrevious]);

  const nextPage = useCallback(() => {
    if (isDisabled || isDisabledNext) return;
    if (currentPage < totalPages) {
      safeSetCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages, safeSetCurrentPage, isDisabled, isDisabledNext]);

  const firstPage = useCallback(() => {
    if (isDisabled || isDisabledPrevious) return;
    safeSetCurrentPage(1);
  }, [safeSetCurrentPage, isDisabled, isDisabledPrevious]);

  const lastPage = useCallback(() => {
    if (isDisabled || isDisabledNext) return;
    safeSetCurrentPage(totalPages);
  }, [safeSetCurrentPage, totalPages, isDisabled, isDisabledNext]);

  useEffect(() => {
    if (mode !== 'server' && totalItems === 0 && !isDisabled) {
      safeSetCurrentPage(1);
    }
  }, [mode, totalItems, safeSetCurrentPage, isDisabled]);

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
      hasNextPage: currentPage < totalPages && !isDisabledNext,
      hasPreviousPage: currentPage > 1 && !isDisabledPrevious,
      isFirstPage: currentPage === 1,
      isLastPage: currentPage === totalPages,
      isLoading: isLoading || externalLoading,
      isDisabled,
      isDisabledPrevious,
      isDisabledNext,
    };
  }, [
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    isLoading,
    externalLoading,
    isDisabled,
    isDisabledPrevious,
    isDisabledNext,
  ]);

  const actions: PaginationActions = useMemo(
    () => ({
      setCurrentPage: safeSetCurrentPage,
      setPageSize: safeSetPageSize,
      nextPage,
      previousPage,
      firstPage,
      lastPage,
    }),
    [safeSetCurrentPage, safeSetPageSize, nextPage, previousPage, firstPage, lastPage]
  );

  return [paginationInfo, actions];
}