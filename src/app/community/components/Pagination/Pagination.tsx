'use client';

import { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // 초기 체크
    checkIsMobile();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const getVisiblePages = () => {
    const delta = isMobile ? 1 : 2;
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
    <div className="mt-12 flex flex-col items-center justify-center gap-6">
      {/* 페이지 정보 */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          전체 <span className="font-bold text-violet-600 dark:text-violet-400">{totalPages}</span>
          페이지 중{' '}
          <span className="font-bold text-violet-600 dark:text-violet-400">{currentPage}</span>
          페이지
        </p>
      </div>

      {/* 페이지네이션 버튼들 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl font-medium transition-all ${
            currentPage === 1
              ? 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800'
              : 'bg-white text-gray-700 shadow-md hover:scale-105 hover:bg-violet-50 hover:text-violet-600 hover:shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          ‹
        </button>

        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="flex h-10 w-10 items-center justify-center text-gray-400">⋯</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`flex h-10 w-10 items-center justify-center rounded-2xl font-bold transition-all ${
                  page === currentPage
                    ? 'scale-110 bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-300/50'
                    : 'bg-white text-gray-700 shadow-md hover:scale-105 hover:bg-violet-50 hover:text-violet-600 hover:shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl font-medium transition-all ${
            currentPage === totalPages
              ? 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800'
              : 'bg-white text-gray-700 shadow-md hover:scale-105 hover:bg-violet-50 hover:text-violet-600 hover:shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          ›
        </button>
      </div>

      {/* 빠른 네비게이션 */}
      {totalPages > 10 && (
        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={() => onPageChange(1)}
            className="rounded-xl bg-gray-100 px-4 py-2 font-medium text-gray-600 transition-all hover:bg-violet-100 hover:text-violet-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            처음
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            className="rounded-xl bg-gray-100 px-4 py-2 font-medium text-gray-600 transition-all hover:bg-violet-100 hover:text-violet-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            마지막
          </button>
        </div>
      )}
    </div>
  );
};
