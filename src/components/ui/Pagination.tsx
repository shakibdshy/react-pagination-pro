"use client"

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
  ...props
}: PaginationProps) {
  const [
    { currentPage, totalPages, pageSize },
    { setCurrentPage, setPageSize, previousPage, nextPage },
  ] = usePagination(props);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
          onClick={previousPage}
          disabled={currentPage === 1}
          className={cn(buttonClassName)}
          aria-label="Previous page"
        >
          ←
        </Button>

        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={page === currentPage}
            variant={page === currentPage ? "primary" : "outline"}
            color={page === currentPage ? "secondary" : "primary"}
            className={cn(buttonClassName)}
          >
            {page}
          </Button>
        ))}

        <Button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={cn(buttonClassName)}
          aria-label="Next page"
        >
          →
        </Button>
      </nav>
    </div>
  );
}
