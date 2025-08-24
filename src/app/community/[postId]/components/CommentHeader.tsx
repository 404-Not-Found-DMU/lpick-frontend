'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, ChevronDown, Clock, Heart } from 'lucide-react';

export type CommentSortOption = 'latest' | 'popular';

const COMMENT_SORT_OPTIONS = [
  { value: 'latest' as CommentSortOption, label: '최신순', icon: Clock },
  { value: 'popular' as CommentSortOption, label: '인기순', icon: Heart },
] as const;

interface CommentHeaderProps {
  commentCount: number;
  sortBy?: CommentSortOption;
  onSortChange?: (sort: CommentSortOption) => void;
}

export const CommentHeader = ({ commentCount, sortBy, onSortChange }: CommentHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSort, setInternalSort] = useState<CommentSortOption>('latest');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentSort = onSortChange ? sortBy || 'latest' : internalSort;
  const currentOption = COMMENT_SORT_OPTIONS.find((option) => option.value === currentSort);
  const CurrentIcon = currentOption?.icon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: CommentSortOption) => {
    if (onSortChange) {
      onSortChange(option);
    } else {
      setInternalSort(option);
    }
    setIsOpen(false);
  };

  return (
    <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-700 sm:px-6 sm:py-5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white sm:gap-3 sm:text-xl">
          <MessageSquare className="h-5 w-5 text-violet-600 dark:text-violet-400 sm:h-6 sm:w-6" />
          댓글
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-sm text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 sm:px-3 sm:py-1 sm:text-lg">
            {commentCount}
          </span>
        </h3>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex min-w-[100px] items-center justify-between gap-2 rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-800 shadow-sm transition-all hover:bg-gray-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 sm:text-sm"
          >
            <div className="flex items-center gap-1.5">
              {CurrentIcon && <CurrentIcon className="h-3 w-3 sm:h-4 sm:w-4" />}
              <span>{currentOption?.label}</span>
            </div>
            <ChevronDown
              className={`h-3 w-3 text-gray-500 transition-transform duration-200 sm:h-4 sm:w-4 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-full min-w-[120px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              {COMMENT_SORT_OPTIONS.map((option) => {
                const OptionIcon = option.icon;
                const isSelected = option.value === currentSort;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 sm:text-sm ${
                      isSelected
                        ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <OptionIcon
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        isSelected ? 'text-violet-600 dark:text-violet-400' : 'text-gray-400'
                      }`}
                    />
                    <span className="font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
