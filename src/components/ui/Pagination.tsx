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
  boundaries = 1,
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
    const totalPageNumbers = boundaries * 2 + siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaries + 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - boundaries);

    const shouldShowLeftDots = leftSiblingIndex > (boundaries + 2);
    const shouldShowRightDots = rightSiblingIndex < (totalPages - boundaries - 1);

    const leftBoundary = range(1, boundaries);
    const rightBoundary = range(totalPages - boundaries + 1, totalPages);

    if (!shouldShowLeftDots && !shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [...leftBoundary, ...middleRange, ...rightBoundary];
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, rightSiblingIndex);
      return [...leftRange, 'dots', ...rightBoundary];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(leftSiblingIndex, totalPages);
      return [...leftBoundary, 'dots', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [...leftBoundary, 'dots', ...middleRange, 'dots', ...rightBoundary];
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
