"use client";

import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/lib/utils";
import {
  button,
  paginationNav,
  paginationRoot,
} from "@shakibdshy/tailwind-theme";
import type { PaginationProps } from "./pagination.types";

/**
 * A fully accessible and customizable pagination component.
 * 
 * @component
 * @example
 * ```tsx
 * <Pagination
 *   totalItems={100}
 *   defaultPageSize={10}
 *   onChange={({ currentPage, pageSize }) => {
 *     // Handle pagination changes
 *   }}
 * />
 * ```
 * 
 * @param props - Component props
 * @param props.className - Additional class name for the root element
 * @param props.buttonClassName - Additional class name for pagination buttons
 * @param props.size - Size of the pagination buttons (default: "md")
 * @param props.activeVariant - Variant for the active page button (default: "primary")
 * @param props.variant - Variant for inactive page buttons (default: "outline")
 * @param props.activeColor - Color for the active page button (default: "primary")
 * @param props.color - Color for inactive page buttons (default: "primary")
 * @param props.navigationButtonVariant - Variant for navigation buttons (default: "outline")
 * @param props.navigationButtonColor - Color for navigation buttons (default: "primary")
 * @param props.rounded - Rounded size for all buttons (default: "md")
 * @param props.previousIcon - Previous button icon (default: "←")
 * @param props.nextIcon - Next button icon (default: "→")
 * @param props.isLoop - Enable pagination loop (default: false)
 * @param props.initialPage - Initial page number (default: 1)
 * @param props.siblingCount - Number of siblings to show on each side (default: 1)
 * @param props.boundaries - Number of pages to show at boundaries (default: 1)
 * @param props.dots - Custom dots/ellipsis element (default: "...")
 * @param props.isDisabled - Disable all buttons (default: false)
 * @param props.isDisabledPrevious - Disable previous button (default: false)
 * @param props.isDisabledNext - Disable next button (default: false)
 */
export function Pagination({
  className,
  buttonClassName,
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
    { currentPage, totalPages },
    { setCurrentPage, previousPage, nextPage },
  ] = usePagination({
    ...props,
    defaultCurrentPage: initialPage,
    isDisabled,
    isDisabledPrevious,
    isDisabledNext,
  });

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
    <div className={cn(paginationRoot(), className)} role="navigation" aria-label="Pagination">
      <nav className={paginationNav()}>
        <ul className="flex items-center gap-1" role="list">
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
                aria-label={`Page ${pageNumber}`}
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
