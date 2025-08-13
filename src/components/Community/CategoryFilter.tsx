'use client';
import { Category } from '../../app/community/types/community.types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CommunityCategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeCategory === category.id
              ? 'bg-lavender-500 text-white shadow-md'
              : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            {category.name}
            <span
              className={`rounded-full px-2 py-1 text-xs font-semibold ${
                activeCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              {category.count}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
};
