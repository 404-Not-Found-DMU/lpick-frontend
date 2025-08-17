'use client';

interface CategoryBadgeProps {
  category: string;
  variant?: 'default' | 'outline';
}

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: { bg: string; text: string } } = {
    추천: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-700 dark:text-blue-300',
    },
    질문: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-300',
    },
    토론: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-700 dark:text-purple-300',
    },
    정보: {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-700 dark:text-orange-300',
    },
    자유: {
      bg: 'bg-gray-100 dark:bg-gray-700',
      text: 'text-gray-700 dark:text-gray-300',
    },
  };
  return colors[category] || colors['자유'];
};

export const CommunityCategoryBadge = ({ category }: CategoryBadgeProps) => {
  const colors = getCategoryColor(category);

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
    >
      {category}
    </span>
  );
};
