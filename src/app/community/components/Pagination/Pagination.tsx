'use client';
import { Button } from '@/components/Button/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getVisiblePages = () => {
    const delta = window.innerWidth < 640 ? 1 : 2; // 모바일에서는 더 적은 페이지 표시
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-2">
      {/* 모바일에서 현재 페이지 정보를 상단에 표시 */}
      <div className="order-first text-sm text-gray-500 dark:text-gray-400 sm:hidden">
        {currentPage} / {totalPages}
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
        >
          <span className="hidden sm:inline">이전</span>
          <span className="sm:hidden">‹</span>
        </Button>

        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-1 py-1.5 text-xs text-gray-500 sm:px-3 sm:py-2 sm:text-sm">
                ...
              </span>
            ) : (
              <Button
                variant={page === currentPage ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page as number)}
                className="min-w-[2rem] px-2 py-1.5 text-xs sm:min-w-[2.5rem] sm:px-3 sm:py-2 sm:text-sm"
              >
                {page}
              </Button>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
        >
          <span className="hidden sm:inline">다음</span>
          <span className="sm:hidden">›</span>
        </Button>
      </div>

      {/* 데스크톱에서 페이지 정보를 오른쪽에 표시 */}
      <div className="ml-4 hidden text-sm text-gray-500 dark:text-gray-400 sm:block">
        {currentPage} / {totalPages}
      </div>
    </div>
  );
};
