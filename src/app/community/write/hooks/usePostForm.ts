'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostFormData } from '../../types/community.types';

export const usePostForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    category: '',
    postType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (updates: Partial<PostFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!formData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    // 카테고리가 없으면 기본값 설정
    const finalFormData = {
      ...formData,
      category: formData.category || 'free',
    };

    setIsSubmitting(true);
    try {
      // TODO: API 호출로 게시글 저장
      console.log('게시글 데이터:', finalFormData);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 임시 딜레이

      // 성공 알림 (더 좋은 UX를 위해 toast 라이브러리 사용 권장)
      alert('게시글이 성공적으로 작성되었습니다! 🎉');
      router.push('/community');
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      // TODO: 임시저장 API 호출
      console.log('임시저장:', formData);
      alert('임시저장되었습니다.');
    } catch (error) {
      console.error('임시저장 실패:', error);
      alert('임시저장에 실패했습니다.');
    }
  };

  const handleSubmitWrapper = () => {
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSubmit(fakeEvent);
  };

  const isFormValid = formData.title.trim() && formData.content.trim();

  return {
    formData,
    isSubmitting,
    isFormValid,
    updateFormData,
    handleSubmit,
    handleSubmitWrapper,
    handleSaveDraft,
  };
};
