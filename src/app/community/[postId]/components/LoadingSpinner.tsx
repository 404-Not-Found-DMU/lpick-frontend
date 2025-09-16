'use client';

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-violet-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/30">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-500 dark:border-violet-800 dark:border-t-violet-400"></div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            게시글을 불러오는 중...
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">잠시만 기다려주세요</p>
        </div>
      </div>
    </div>
  );
};
