import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

/**
 * Pagination компонент
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 7,
}: PaginationProps) {
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    pages.push(1);

    if (shouldShowLeftDots) {
      pages.push('...');
    } else if (leftSiblingIndex === 2) {
      pages.push(2);
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (shouldShowRightDots) {
      pages.push('...');
    } else if (rightSiblingIndex === totalPages - 1) {
      pages.push(totalPages - 1);
    }

    if (totalPages !== 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          p-2
          rounded-lg
          text-gray-400
          hover:text-white
          hover:bg-white/10
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:bg-transparent
          disabled:hover:text-gray-400
          transition-colors
        "
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page, i) => {
        if (page === '...') {
          return (
            <span key={`dots-${i}`} className="px-3 py-2 text-gray-500">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`
              min-w-[40px]
              px-3
              py-2
              rounded-lg
              font-medium
              transition-colors
              ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }
            `}
            aria-label={`Page ${pageNum}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          p-2
          rounded-lg
          text-gray-400
          hover:text-white
          hover:bg-white/10
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:bg-transparent
          disabled:hover:text-gray-400
          transition-colors
        "
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
