"use client";

import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/lib/utils";
import {
  paginationNav,
  paginationRoot,
  paginationSelect,
} from "./pagination.styles";
import type { PaginationProps } from "./pagination.types";
import { Button } from "@shakibdshy/react-button-pro";

export function Pagination({
  className,
  buttonClassName,
  showPageSize = false,
  pageSizeOptions = [10, 20, 30, 40, 50],
  size = "md",
  activeVariant = "primary",
  variant = "outline",
  activeColor = "primary",
  color = "primary",
  navigationButtonVariant = "outline",
  navigationButtonColor = "primary",
  rounded = "md",
  previousIcon = "←",
  nextIcon = "→",
  isLoop = false,
  initialPage = 1,
  siblingCount = 1,
  dots = "...",
  ...props
}: PaginationProps) {
  const [
    { currentPage, totalPages, pageSize },
    { setCurrentPage, setPageSize, previousPage, nextPage },
  ] = usePagination({ ...props, defaultCurrentPage: initialPage });

  const handlePreviousPage = () => {
    if (isLoop && currentPage === 1) {
      setCurrentPage(totalPages);
    } else {
      previousPage();
    }
  };

  const handleNextPage = () => {
    if (isLoop && currentPage === totalPages) {
      setCurrentPage(1);
    } else {
      nextPage();
    }
  };

  const handleDotsClick = (direction: 'left' | 'right') => {
    const jumpSize = siblingCount * 2 + 1;
    if (direction === 'left') {
      const targetPage = Math.max(currentPage - jumpSize, 1);
      setCurrentPage(targetPage);
    } else {
      const targetPage = Math.min(currentPage + jumpSize, totalPages);
      setCurrentPage(targetPage);
    }
  };

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const getPaginationRange = () => {
    const totalPageNumbers = siblingCount * 2 + 5;

    /**
     * If the total number of pages is less than or equal to the desired number of page buttons to display,
     * we can show all pages without any ellipsis/dots.
     * 
     * For example, if we want to show 7 page buttons (siblingCount=1), and we only have 5 total pages,
     * we'll return [1,2,3,4,5] instead of adding any dots/ellipsis.
     * 
     * @returns {number[]} Array of consecutive page numbers from 1 to totalPages
     */
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    /**
     * Case 1: Show dots on the right side only
     * Used when current page is near the start of pagination
     * Example: [1, 2, 3, 4, 5, ..., 10]
     * - Shows first {3 + 2 * siblingCount} pages
     * - Followed by dots and last page
     */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, 'dots', totalPages];
    }

    /**
     * Case 2: Show dots on the left side only
     * Used when current page is near the end of pagination
     * Example: [1, ..., 8, 9, 10]
     * - Shows last {3 + 2 * siblingCount} pages
     * - Followed by dots and first page
     */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, 'dots', ...rightRange];
    }

    /**
     * Case 3: Show both left and right dots
     * Used when current page is in the middle of pagination
     * Example: [1, ..., 4, 5, 6, ..., 10]
     * - Shows pages around the current page
     * - Followed by dots on both sides
     */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, 'dots', ...middleRange, 'dots', totalPages];
    }

    return range(1, totalPages);
  };

  const paginationRange = getPaginationRange();

  return (
    <div className={cn(paginationRoot(), className)}>
      {showPageSize && (
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className={paginationSelect()}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      )}

      <nav className={paginationNav()}>
        <Button
          onClick={handlePreviousPage}
          disabled={!isLoop && currentPage === 1}
          className={cn(buttonClassName)}
          aria-label="Previous page"
          size={size}
          variant={navigationButtonVariant}
          color={navigationButtonColor}
          rounded={rounded}
          as="button"
        >
          {previousIcon}
        </Button>

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === 'dots') {
            // Determine if this is the left or right dots
            const isLeftDots = index === 1;
            return (
              <Button
                key={`dots-${index}`}
                onClick={() => handleDotsClick(isLeftDots ? 'left' : 'right')}
                className={cn(buttonClassName)}
                variant="ghost"
                color={color}
                size={size}
                rounded={rounded}
                as="button"
                aria-label={isLeftDots ? "Previous pages" : "Next pages"}
              >
                {dots}
              </Button>
            );
          }

          return (
            <Button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber as number)}
              disabled={pageNumber === currentPage}
              variant={pageNumber === currentPage ? activeVariant : variant}
              color={pageNumber === currentPage ? activeColor : color}
              size={size}
              rounded={rounded}
              className={cn(buttonClassName)}
              as="button"
            >
              {pageNumber}
            </Button>
          );
        })}

        <Button
          onClick={handleNextPage}
          disabled={!isLoop && currentPage === totalPages}
          className={cn(buttonClassName)}
          aria-label="Next page"
          size={size}
          variant={navigationButtonVariant}
          color={navigationButtonColor}
          rounded={rounded}
          as="button"
        >
          {nextIcon}
        </Button>
      </nav>
    </div>
  );
}
