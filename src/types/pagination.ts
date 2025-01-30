/**
 * Base state for pagination
 */
export interface PaginationState {
  /** Current active page number (1-based) */
  currentPage: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items */
  totalItems: number;
}

/**
 * Extended pagination information including computed values
 */
export interface PaginationInfo extends PaginationState {
  /** Total number of pages */
  totalPages: number;
  /** Whether there is a next page available */
  hasNextPage: boolean;
  /** Whether there is a previous page available */
  hasPreviousPage: boolean;
  /** Whether current page is the first page */
  isFirstPage: boolean;
  /** Whether current page is the last page */
  isLastPage: boolean;
  /** Start index of current page (0-based) */
  startIndex: number;
  /** End index of current page (0-based) */
  endIndex: number;
  /** Whether data is currently being fetched */
  isLoading?: boolean;
  /** Whether all pagination actions are disabled */
  isDisabled?: boolean;
  /** Whether previous page action is disabled */
  isDisabledPrevious?: boolean;
  /** Whether next page action is disabled */
  isDisabledNext?: boolean;
}

/**
 * Props for usePagination hook
 */
export interface UsePaginationProps extends Partial<PaginationState> {
  /** Initial page number (1-based) */
  defaultCurrentPage?: number;
  /** Initial page size */
  defaultPageSize?: number;
  /** Callback when pagination state changes */
  onChange?: (state: PaginationState) => void;
  /** Pagination mode - client or server side */
  mode?: 'client' | 'server';
  /** Server-side data fetching function */
  onPageChange?: (page: number, pageSize: number) => Promise<void>;
  /** Whether to disable pagination during loading */
  isLoading?: boolean;
  /** Whether to disable all pagination actions */
  isDisabled?: boolean;
  /** Whether to disable previous page action */
  isDisabledPrevious?: boolean;
  /** Whether to disable next page action */
  isDisabledNext?: boolean;
}

/**
 * Available actions for pagination control
 */
export interface PaginationActions {
  /** Set the current page number */
  setCurrentPage: (page: number) => void;
  /** Set the page size */
  setPageSize: (size: number) => void;
  /** Go to next page */
  nextPage: () => void;
  /** Go to previous page */
  previousPage: () => void;
  /** Go to first page */
  firstPage: () => void;
  /** Go to last page */
  lastPage: () => void;
} 