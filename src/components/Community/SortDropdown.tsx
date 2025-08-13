'use client';
import { SortOption } from '../../app/community/types/community.types';

interface SortDropdownProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions = [
  { value: 'latest' as SortOption, label: '최신순' },
  { value: 'popular' as SortOption, label: '인기순' },
  { value: 'views' as SortOption, label: '조회순' },
];

export const CommunitySortDropdown = ({ sortBy, onSortChange }: SortDropdownProps) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value as SortOption)}
      className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-lavender-500 focus:ring-lavender-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
