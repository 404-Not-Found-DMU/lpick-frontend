'use client';

import { Share2, Flag, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PostHeaderProps {
  onShare?: () => void;
  onReport?: () => void;
}

export const PostHeader = ({ onShare, onReport }: PostHeaderProps) => {
  const router = useRouter();

  return (
    <div className="mb-8 flex items-center justify-between">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="group flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-gray-700 shadow-lg transition-all hover:scale-105 hover:bg-gray-50 hover:shadow-xl dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">돌아가기</span>
      </button>

      {/* 액션 버튼들 */}
      <div className="flex items-center gap-3">
        <button
          onClick={onShare}
          className="group flex items-center gap-2 rounded-2xl bg-white px-5 py-4 text-gray-700 shadow-lg transition-all hover:scale-105 hover:bg-blue-50 hover:text-blue-600 hover:shadow-xl dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <Share2 className="h-5 w-5 transition-colors" />
          <span className="hidden font-medium sm:inline">공유</span>
        </button>

        <button
          onClick={onReport}
          className="group flex items-center gap-2 rounded-2xl bg-white px-5 py-4 text-gray-700 shadow-lg transition-all hover:scale-105 hover:bg-red-50 hover:text-red-600 hover:shadow-xl dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <Flag className="h-5 w-5 transition-colors" />
          <span className="hidden font-medium sm:inline">신고</span>
        </button>
      </div>
    </div>
  );
};
