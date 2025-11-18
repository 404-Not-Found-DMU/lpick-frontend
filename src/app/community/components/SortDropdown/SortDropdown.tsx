'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SortOption } from '../../community.types';
import { SORT_OPTIONS } from '../../constants';

interface SortDropdownProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const CommunitySortDropdown = ({ sortBy, onSortChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = SORT_OPTIONS.find((option) => option.value === sortBy);
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

  const handleOptionSelect = (option: SortOption) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-w-[120px] items-center justify-between gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition-all hover:bg-gray-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
      >
        <div className="flex items-center gap-2">
          {CurrentIcon && <CurrentIcon className="h-4 w-4" />}
          <span>{currentOption?.label}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-full min-w-[140px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {SORT_OPTIONS.map((option) => {
            const OptionIcon = option.icon;
            const isSelected = option.value === sortBy;

            return (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  isSelected
                    ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <OptionIcon
                  className={`h-4 w-4 ${
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
  );
};
