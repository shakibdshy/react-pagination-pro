import { usePagination } from '@/hooks/usePagination';
import { cn } from '@/lib/utils';
import { paginationStyles } from './pagination.styles';
import type { PaginationProps } from './pagination.types';

export function Pagination({
  className,
  buttonClassName,
  activeButtonClassName,
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
    <div className={cn(paginationStyles.root(), className)}>
      {showPageSize && (
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className={paginationStyles.select()}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      )}

      <nav className={paginationStyles.nav()}>
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className={cn(
            paginationStyles.button({ variant: 'outline', size: 'icon' }),
            buttonClassName
          )}
          aria-label="Previous page"
        >
          ←
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={page === currentPage}
            className={cn(
              paginationStyles.button({
                variant: page === currentPage ? 'default' : 'outline',
                size: 'icon',
              }),
              buttonClassName,
              page === currentPage && activeButtonClassName
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={cn(
            paginationStyles.button({ variant: 'outline', size: 'icon' }),
            buttonClassName
          )}
          aria-label="Next page"
        >
          →
        </button>
      </nav>
    </div>
  );
} 