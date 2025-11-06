'use client';

import { Suspense } from 'react';
import { EnhancedPostForm, WriteHeader } from './components';
import { usePostForm } from './hooks/usePostForm';

const WritePageContent = () => {
  const { formData, isSubmitting, updateFormData, handleSubmitWrapper } = usePostForm();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 배경 장식 */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-500/10" />
        <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-500/10" />
        <div className="absolute left-1/3 top-3/4 h-64 w-64 rounded-full bg-blue-200/20 blur-2xl dark:bg-blue-500/5" />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl">
          <WriteHeader />
          <div className="rounded-2xl bg-white/70 p-8 shadow-xl backdrop-blur-sm dark:bg-gray-800/70 dark:shadow-gray-900/20">
            <EnhancedPostForm
              formData={formData}
              updateFormData={updateFormData}
              onSubmit={handleSubmitWrapper}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const WritePage = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">로딩 중...</div>}>
      <WritePageContent />
    </Suspense>
  );
};

export default WritePage;
