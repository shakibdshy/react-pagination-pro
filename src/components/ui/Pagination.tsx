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
  ...props
}: PaginationProps) {
  const [
    { currentPage, totalPages, pageSize },
    { setCurrentPage, setPageSize, previousPage, nextPage },
  ] = usePagination({ ...props, defaultCurrentPage: initialPage });

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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

        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={page === currentPage}
            variant={page === currentPage ? activeVariant : variant}
            color={page === currentPage ? activeColor : color}
            size={size}
            rounded={rounded}
            className={cn(buttonClassName)}
            as="button"
          >
            {page}
          </Button>
        ))}

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
