import type { VariantProps } from '@/lib/utils';
import type { UsePaginationProps } from '@/types/pagination';
import { paginationButton } from './pagination.styles';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ButtonColor = 'primary' | 'secondary' | 'neutral' | 'info' | 'error' | 'warning' | 'success';
export type ButtonVariant = 'primary' | 'outline' | 'flat' | 'light' | 'ghost' | 'text';
export type ButtonRounded = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';

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
  /** Size of the pagination buttons */
  size?: ButtonSize;
  /** Variant for the active page button */
  activeVariant?: ButtonVariant;
  /** Variant for inactive page buttons */
  variant?: ButtonVariant;
  /** Color for the active page button */
  activeColor?: ButtonColor;
  /** Color for inactive page buttons */
  color?: ButtonColor;
  /** Variant for navigation buttons (prev/next) */
  navigationButtonVariant?: ButtonVariant;
  /** Color for navigation buttons (prev/next) */
  navigationButtonColor?: ButtonColor;
  /** Rounded size for all buttons */
  rounded?: ButtonRounded;
  /** Previous button Icon */
  previousIcon?: React.ReactNode;
  /** Next button Icon */
  nextIcon?: React.ReactNode;
  /** Enable pagination loop - when reaching last page, next goes to first page and vice versa */
  isLoop?: boolean;
  /** Initial page number (1-based indexing) */
  initialPage?: number;
  /** Number of siblings to show on each side of the current page */
  siblingCount?: number;
  /** Number of pages to show at the beginning and end of the pagination */
  boundaries?: number;
  /** Custom dots/ellipsis element to show between page numbers */
  dots?: React.ReactNode;
}

export type PaginationButtonVariants = VariantProps<typeof paginationButton>; 