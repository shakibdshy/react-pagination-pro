export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface PaginationInfo extends PaginationState {
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  startIndex: number;
  endIndex: number;
  /** Whether data is currently being fetched */
  isLoading?: boolean;
}

export interface UsePaginationProps extends Partial<PaginationState> {
  defaultCurrentPage?: number;
  defaultPageSize?: number;
  /** Callback when pagination state changes */
  onChange?: (state: PaginationState) => void;
  /** For server-side pagination */
  mode?: 'client' | 'server';
  /** Server-side data fetching function */
  onPageChange?: (page: number, pageSize: number) => Promise<void>;
  /** Whether to disable pagination during loading */
  isLoading?: boolean;
}

export interface PaginationActions {
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
} 