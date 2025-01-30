"use client";

import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/lib/utils";
import {
  button,
  paginationNav,
  paginationRoot,
  paginationSelect,
} from "@shakibdshy/tailwind-theme";
import type { PaginationProps } from "./pagination.types";

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
  isDisabled = false,
  isDisabledPrevious = false,
  isDisabledNext = false,
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

  const handleDotsClick = (direction: "left" | "right") => {
    const jumpSize = siblingCount * 2 + 1;
    if (direction === "left") {
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

    const leftSiblingIndex = Math.max(
      currentPage - siblingCount,
      boundaries + 1
    );
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPages - boundaries
    );

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - boundaries - 1;

    const leftBoundary = range(1, boundaries);
    const rightBoundary = range(totalPages - boundaries + 1, totalPages);

    if (!shouldShowLeftDots && !shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [...leftBoundary, ...middleRange, ...rightBoundary];
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, rightSiblingIndex);
      return [...leftRange, "dots", ...rightBoundary];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(leftSiblingIndex, totalPages);
      return [...leftBoundary, "dots", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        ...leftBoundary,
        "dots",
        ...middleRange,
        "dots",
        ...rightBoundary,
      ];
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
          disabled={isDisabled}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      )}

      <nav className={paginationNav()}>
        <ul className="flex items-center gap-1">
          <li
            onClick={
              isDisabled || isDisabledPrevious || (!isLoop && currentPage === 1)
                ? undefined
                : handlePreviousPage
            }
            className={cn(
              button({
                variant: navigationButtonVariant,
                color: navigationButtonColor,
                size,
                rounded,
              }),
              buttonClassName,
              (isDisabled || isDisabledPrevious || (!isLoop && currentPage === 1))
                ? "pointer-events-none opacity-100"
                : "cursor-pointer"
            )}
            aria-label="Previous page"
            role="button"
            tabIndex={
              isDisabled || isDisabledPrevious || (!isLoop && currentPage === 1)
                ? -1
                : 0
            }
            aria-disabled={
              isDisabled || isDisabledPrevious || (!isLoop && currentPage === 1)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!(isDisabled || isDisabledPrevious || (!isLoop && currentPage === 1))) {
                  handlePreviousPage();
                }
              }
            }}
          >
            {previousIcon}
          </li>

          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === "dots") {
              const isLeftDots = index === 1;
              return (
                <li
                  key={`dots-${index}`}
                  onClick={isDisabled ? undefined : () => handleDotsClick(isLeftDots ? "left" : "right")}
                  className={cn(
                    button({
                      variant,
                      color,
                      size,
                      rounded,
                    }),
                    buttonClassName,
                    isDisabled ? "pointer-events-none opacity-100" : "cursor-pointer"
                  )}
                  aria-label={isLeftDots ? "Previous pages" : "Next pages"}
                  role="button"
                  tabIndex={isDisabled ? -1 : 0}
                  aria-disabled={isDisabled}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (!isDisabled) {
                        handleDotsClick(isLeftDots ? "left" : "right");
                      }
                    }
                  }}
                >
                  {dots}
                </li>
              );
            }

            const isCurrentPage = pageNumber === currentPage;
            return (
              <li
                key={pageNumber}
                onClick={
                  isDisabled || isCurrentPage
                    ? undefined
                    : () => setCurrentPage(pageNumber as number)
                }
                className={cn(
                  button({
                    variant: isCurrentPage ? activeVariant : variant,
                    color: isCurrentPage ? activeColor : color,
                    size,
                    rounded,
                  }),
                  buttonClassName,
                  (isDisabled || isCurrentPage)
                    ? "pointer-events-none opacity-100"
                    : "cursor-pointer"
                )}
                role="button"
                tabIndex={isDisabled || isCurrentPage ? -1 : 0}
                aria-current={isCurrentPage ? "page" : undefined}
                aria-disabled={isDisabled || isCurrentPage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!(isDisabled || isCurrentPage)) {
                      setCurrentPage(pageNumber as number);
                    }
                  }
                }}
              >
                {pageNumber}
              </li>
            );
          })}

          <li
            onClick={
              isDisabled || isDisabledNext || (!isLoop && currentPage === totalPages)
                ? undefined
                : handleNextPage
            }
            className={cn(
              button({
                variant: navigationButtonVariant,
                color: navigationButtonColor,
                size,
                rounded,
              }),
              buttonClassName,
              (isDisabled || isDisabledNext || (!isLoop && currentPage === totalPages))
                ? "pointer-events-none opacity-100"
                : "cursor-pointer"
            )}
            aria-label="Next page"
            role="button"
            tabIndex={
              isDisabled || isDisabledNext || (!isLoop && currentPage === totalPages)
                ? -1
                : 0
            }
            aria-disabled={
              isDisabled || isDisabledNext || (!isLoop && currentPage === totalPages)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!(isDisabled || isDisabledNext || (!isLoop && currentPage === totalPages))) {
                  handleNextPage();
                }
              }
            }}
          >
            {nextIcon}
          </li>
        </ul>
      </nav>
    </div>
  );
}
