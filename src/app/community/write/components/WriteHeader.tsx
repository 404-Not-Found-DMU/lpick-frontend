'use client';

import { PenTool, Edit3 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export const WriteHeader = () => {
  const searchParams = useSearchParams();
  const isEditMode = !!searchParams.get('edit');

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
          {isEditMode ? (
            <Edit3 className="h-6 w-6 text-white" />
          ) : (
            <PenTool className="h-6 w-6 text-white" />
          )}
        </div>

        <h1 className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent dark:from-violet-400 dark:to-purple-400">
          {isEditMode ? '게시글 수정' : '새 게시글 작성'}
        </h1>
      </div>

      <div className="mt-6">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {isEditMode 
            ? '게시글을 수정하고 저장해보세요' 
            : '당신의 이야기를 커뮤니티와 공유해보세요'
          }
        </p>
      </div>
    </div>
  );
};
