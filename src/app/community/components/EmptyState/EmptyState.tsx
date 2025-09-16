'use client';
import { MessageSquare } from 'lucide-react';
import { usePostNavigation } from '../../hooks/usePostNavigation';

export const EmptyState = () => {
  const { navigateToWrite } = usePostNavigation();

  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
        <MessageSquare className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        아직 게시물이 없습니다
      </h3>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        커뮤니티의 첫 번째 게시물을 작성해보세요!
      </p>
      <button
        onClick={navigateToWrite}
        className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-violet-700"
      >
        게시물 작성하기
      </button>
    </div>
  );
};
