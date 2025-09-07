'use client';

import { Button } from '@/components/Button/Button';
import { FileX, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-violet-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/30">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
            <FileX className="h-10 w-10 text-gray-400" />
          </div>

          <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
            게시글을 찾을 수 없습니다
          </h1>

          <p className="mb-8 text-gray-600 dark:text-gray-400">
            요청하신 게시글이 삭제되었거나 존재하지 않습니다.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={() => router.back()}
              className="flex items-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-200 hover:shadow-md dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              뒤로가기
            </Button>

            <Button
              onClick={() => router.push('/community')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 font-medium text-white shadow-md transition-all hover:from-violet-600 hover:to-purple-700 hover:shadow-lg"
            >
              <Home className="h-4 w-4" />
              커뮤니티로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
