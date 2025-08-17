'use client';
import { Search, PenSquare, Users, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { BoardType, TagType } from '../../types/community.types';

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
  const router = useRouter();

  const handleWriteClick = () => {
    router.push('/community/write');
  };

  const boards = [
    { id: 'all' as const, name: '전체', icon: '📋' },
    { id: '자유게시판' as const, name: '💬 자유게시판', icon: '💬' },
    { id: '장비' as const, name: '📻 장비', icon: '📻' },
    { id: '음반' as const, name: '💿 음반', icon: '💿' },
    { id: '아티스트' as const, name: '🎤 아티스트', icon: '🎤' },
  ];

  const tags = [
    { id: '질문' as const, name: '❓ 질문', color: 'bg-blue-500' },
    { id: '정보' as const, name: '📢 정보', color: 'bg-green-500' },
    { id: '홍보' as const, name: '📣 홍보', color: 'bg-orange-500' },
  ];

  return (
    <div className="mb-8 space-y-6">
      {/* 메인 헤더 섹션 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl">
        {/* 배경 장식 */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5"></div>

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold lg:text-4xl">LPick 커뮤니티</h1>
              <p className="mt-2 flex items-center gap-2 text-violet-100">
                <Users className="h-4 w-4" />
                LP와 음악을 사랑하는 사람들이 모인 공간
              </p>
            </div>
          </div>
          <Button
            onClick={handleWriteClick}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-violet-600 shadow-lg transition-all hover:scale-105 hover:bg-gray-50 hover:shadow-xl"
          >
            <PenSquare className="h-5 w-5" />
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
          className="w-full rounded-2xl border-0 bg-white py-4 pl-12 pr-4 text-gray-900 shadow-lg ring-1 ring-gray-200 transition-all focus:ring-2 focus:ring-violet-500 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
        />
      </div>

      {/* 게시판 필터 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🗂️ 게시판 (주제)</h3>
        <div className="flex flex-wrap gap-3">
          {boards.map((board) => (
            <button
              key={board.id}
              onClick={() => onBoardChange(board.id)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                activeBoard === board.id
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow-md hover:bg-violet-50 hover:text-violet-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {board.name}
            </button>
          ))}
        </div>
      </div>

      {/* 글머리 필터 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🏷️ 글머리 (성격)</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onTagChange(undefined)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              !activeTag
                ? 'bg-gray-600 text-white shadow-lg'
                : 'bg-white text-gray-700 shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            전체 (잡담 포함)
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagChange(tag.id)}
              className={`rounded-xl px-4 py-2 text-sm font-medium text-white transition-all ${
                activeTag === tag.id ? `${tag.color} shadow-lg` : 'bg-gray-400 hover:bg-gray-500'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
