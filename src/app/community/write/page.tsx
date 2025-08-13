'use client';

import { EnhancedPostForm, WriteHeader } from './components';
import { usePostForm } from './hooks/usePostForm';

const WritePage = () => {
  const { formData, isSubmitting, updateFormData, handleSubmitWrapper } = usePostForm();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          <WriteHeader />
          <EnhancedPostForm
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmitWrapper}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default WritePage;
