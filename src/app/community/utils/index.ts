export * from './postUtils';

// 색상 관련 유틸리티 함수들
export const getBoardColor = (board: string): string => {
  const colors: { [key: string]: string } = {
    자유게시판: 'bg-gradient-to-r from-blue-500 to-blue-600',
    장비: 'bg-gradient-to-r from-green-500 to-green-600',
    음반: 'bg-gradient-to-r from-purple-500 to-purple-600',
    아티스트: 'bg-gradient-to-r from-orange-500 to-orange-600',
  };
  return colors[board] || 'bg-gradient-to-r from-gray-500 to-gray-600';
};

export const getTagColor = (tag?: string): string => {
  const colors: { [key: string]: string } = {
    질문: 'bg-blue-500',
    정보: 'bg-green-500',
    홍보: 'bg-orange-500',
  };
  return tag ? colors[tag] || 'bg-gray-500' : '';
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    질문: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    정보: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
    홍보: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
    자유게시판: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    장비: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    음반: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200',
    아티스트: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200',
    추천: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    토론: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
    자유: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  };
  return colors[category] || colors['자유게시판'];
};

export const formatViews = (views: number): string => {
  return views > 999 ? `${Math.floor(views / 1000)}k` : views.toString();
};
