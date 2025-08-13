'use client';
import { Search, PenSquare, Users, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { CATEGORIES } from '../../temp/community.temp';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const Header = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: HeaderProps) => {
  const router = useRouter();

  const handleWriteClick = () => {
    router.push('/community/write');
  };

  return (
    <div className="mb-6 sm:mb-8">
      {/* 헤더 섹션 */}
      <div className="mb-6 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 p-4 dark:from-gray-800 dark:to-gray-900 sm:mb-8 sm:rounded-2xl sm:p-6 lg:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="rounded-lg bg-violet-100 p-2 dark:bg-violet-900/30 sm:rounded-xl sm:p-3">
              <MessageCircle className="h-6 w-6 text-violet-600 dark:text-violet-400 sm:h-8 sm:w-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">
                LPick 커뮤니티
              </h1>
              <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                LP와 음악을 사랑하는 사람들이 모인 공간
              </p>
            </div>
          </div>
          <Button
            onClick={handleWriteClick}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-500 px-4 py-2.5 text-sm text-white shadow-lg transition-all hover:bg-violet-600 hover:shadow-xl sm:w-auto sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
          >
            <PenSquare className="h-4 w-4" />
            <span className="sm:inline">글쓰기</span>
          </Button>
        </div>
      </div>

      {/* 검색바 */}
      <div className="relative mb-4 sm:mb-6">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 transform sm:left-4">
          <Search className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
        </div>
        <Input
          placeholder="커뮤니티에서 검색하기..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border-0 bg-gray-50 py-3 pl-10 pr-3 text-sm shadow-sm transition-all focus:bg-white focus:ring-2 focus:ring-violet-500 dark:bg-gray-800 dark:focus:bg-gray-700 sm:rounded-xl sm:py-4 sm:pl-12 sm:pr-4"
        />
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-4 flex flex-wrap gap-2 sm:mb-6 sm:gap-3">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-all hover:scale-105 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm ${
              activeCategory === category.id
                ? 'bg-violet-500 text-white shadow-lg shadow-violet-200 dark:shadow-violet-900/30'
                : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category.name}
            <span className="ml-1 rounded-full bg-black/10 px-1.5 py-0.5 text-xs dark:bg-white/10 sm:ml-1.5 sm:px-2">
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
