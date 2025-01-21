import type { UsePaginationProps } from '@/types/pagination';

export interface PaginationProps extends UsePaginationProps {
  /** Additional class name for the root element */
  className?: string;
  /** Additional class name for pagination buttons */
  buttonClassName?: string;
  /** Additional class name for the active page button */
  activeButtonClassName?: string;
  /** Whether to show the page size selector */
  showPageSize?: boolean;
  /** Available options for page size selector */
  pageSizeOptions?: number[];
} 