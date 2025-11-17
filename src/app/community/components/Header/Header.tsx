'use client';
import { Search, PenSquare, Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { BoardType, TagType } from '../../community.types';
import { BOARD_OPTIONS, TAG_OPTIONS } from '../../constants';
import { usePostNavigation } from '../../hooks/usePostNavigation';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeBoard: BoardType | 'all';
  onBoardChange: (board: BoardType | 'all') => void;
  activeTag?: TagType;
  onTagChange: (tag?: TagType) => void;
}

export const Header = ({
  searchQuery,
  onSearchChange,
  activeBoard,
  onBoardChange,
  activeTag,
  onTagChange,
}: HeaderProps) => {
  const { navigateToWrite } = usePostNavigation();

  return (
    <div className="mb-6 space-y-4">
      {/* 컴팩트한 메인 헤더 섹션 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 p-6 text-white shadow-xl">
        {/* 배경 장식 */}
        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/5"></div>

        <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold lg:text-3xl">LPick 커뮤니티</h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-violet-100">
                <Users className="h-3 w-3" />
                LP와 음악을 사랑하는 사람들이 모인 공간
              </p>
            </div>
          </div>
          <Button
            onClick={navigateToWrite}
            className="flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-violet-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <PenSquare className="h-4 w-4" />
            글쓰기
          </Button>
        </div>
      </div>

      {/* 검색 바 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="게시물 검색..."
          className="w-full rounded-xl border-0 bg-white py-3 pl-12 pr-4 text-gray-900 shadow-md ring-1 ring-gray-200 transition-all focus:ring-2 focus:ring-violet-500 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
        />
      </div>

      {/* 컴팩트한 필터 섹션 */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* 게시판 필터 */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">게시판:</span>
          <div className="flex flex-wrap gap-2">
            {BOARD_OPTIONS.map((board) => (
              <button
                key={board.id}
                onClick={() => onBoardChange(board.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeBoard === board.id
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {board.name}
              </button>
            ))}
          </div>
        </div>

        {/* 글머리 필터 */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">글머리:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onTagChange(undefined)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                !activeTag
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              전체
            </button>
            {TAG_OPTIONS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => onTagChange(tag.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTag === tag.id
                    ? `${tag.color} text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
