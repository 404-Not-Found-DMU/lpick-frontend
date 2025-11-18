'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PostFormData, BoardTypeMapping, BadgeTypeMapping } from '../../community.types';
import { useArticleManager } from '../../hooks/useArticleManager';
import { useArticle } from '../../hooks/useArticles';
import { CreateArticleRequest, UpdateArticleRequest } from '@/shared/types';

export const usePostForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editArticleId = searchParams.get('edit'); // URL에서 edit 파라미터 확인
  const isEditMode = !!editArticleId;
  
  const {
    loading: isSubmitting,
    error,
    createNewArticle,
    updateExistingArticle
  } = useArticleManager();

  // 수정 모드일 때 기존 게시글 데이터 불러오기
  const {
    article: existingArticle,
    loading: articleLoading,
    error: articleError
  } = useArticle(editArticleId || '');

  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    category: '',
    postType: '',
    boardType: '자유게시판',  // 기본값
    badgeType: '질문',       // 기본값
  });

  // 수정 모드일 때 기존 데이터로 폼 초기화
  useEffect(() => {
    if (isEditMode && existingArticle && !articleLoading) {
      setFormData({
        title: existingArticle.title,
        content: existingArticle.content,
        category: '',
        postType: '',
        boardType: '자유게시판', // TODO: API에서 게시판 타입 매핑
        badgeType: '질문',      // TODO: API에서 뱃지 타입 매핑
      });
    }
  }, [isEditMode, existingArticle, articleLoading]);

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
      if (isEditMode && editArticleId) {
        // 수정 모드
        const updateData: UpdateArticleRequest = {
          title: formData.title.trim(),
          content: formData.content.trim(),
          type: BoardTypeMapping.toApi(formData.boardType),
          badge: BadgeTypeMapping.toApi(formData.badgeType),
        };

        const success = await updateExistingArticle(editArticleId, updateData);
        
        if (success) {
          alert('게시글이 성공적으로 수정되었습니다! 🎉');
          router.push(`/community/${editArticleId}`);
        } else {
          alert(`게시글 수정에 실패했습니다. ${error || '다시 시도해주세요.'}`);
        }
      } else {
        // 생성 모드
        const articleData: CreateArticleRequest = {
          title: formData.title.trim(),
          content: formData.content.trim(),
          type: BoardTypeMapping.toApi(formData.boardType),
          badge: BadgeTypeMapping.toApi(formData.badgeType),
        };

        const success = await createNewArticle(articleData);
        
        if (success) {
          alert('게시글이 성공적으로 작성되었습니다! 🎉');
          // 캐시 무효화를 위해 타임스탬프 추가
          router.push(`/community?refresh=${Date.now()}`);
        } else {
          alert(`게시글 작성에 실패했습니다. ${error || '다시 시도해주세요.'}`);
        }
      }
    } catch (err) {
      console.error('게시글 처리 실패:', err);
      alert('게시글 처리에 실패했습니다. 다시 시도해주세요.');
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
  const isLoading = isSubmitting || (isEditMode && articleLoading);

  return {
    formData,
    isSubmitting: isLoading,
    isFormValid,
    isEditMode,
    error: error || articleError,
    updateFormData,
    handleSubmit,
    handleSubmitWrapper,
    handleSaveDraft,
  };
};
