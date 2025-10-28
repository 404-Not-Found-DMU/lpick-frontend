'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostFormData, BoardTypeMapping, BadgeTypeMapping } from '../../types/community.types';
import { useArticleManager } from '../../hooks/useArticleManager';
import { CreateArticleRequest } from '../../types/api.types';

export const usePostForm = () => {
  const router = useRouter();
  const {
    loading: isSubmitting,
    error,
    createNewArticle
  } = useArticleManager();

  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    category: '',
    postType: '',
    boardType: '자유게시판',  // 기본값
    badgeType: '질문',       // 기본값
  });

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

    try {
      const articleData: CreateArticleRequest = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        type: BoardTypeMapping.toApi(formData.boardType),
        badge: BadgeTypeMapping.toApi(formData.badgeType),
      };

      const success = await createNewArticle(articleData);
      
      if (success) {
        alert('게시글이 성공적으로 작성되었습니다! 🎉');
        router.push('/community');
      } else {
        alert(`게시글 작성에 실패했습니다. ${error || '다시 시도해주세요.'}`);
      }
    } catch (err) {
      console.error('게시글 작성 실패:', err);
      alert('게시글 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSaveDraft = async () => {
    try {
      // TODO: 임시저장 API 호출 (현재 API에는 없음)
      console.log('임시저장:', formData);
      alert('임시저장은 아직 지원되지 않습니다.');
    } catch (err) {
      console.error('임시저장 실패:', err);
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
    error,
    updateFormData,
    handleSubmit,
    handleSubmitWrapper,
    handleSaveDraft,
  };
};
