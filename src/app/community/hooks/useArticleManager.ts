import { useState, useCallback } from 'react';
import {
  createArticle,
  updateArticle,
  deleteArticle,
  likeArticle,
  unlikeArticle,
  bookmarkArticle,
  unbookmarkArticle
} from '@/shared/api';
import {
  CreateArticleRequest,
  UpdateArticleRequest
} from '@/shared/types';

/**
 * 게시글 관리 훅 (CRUD 작업)
 */
export const useArticleManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 게시글 생성
  const createNewArticle = useCallback(async (data: CreateArticleRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      await createArticle(data);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create article';
      setError(errorMessage);
      console.error('Error creating article:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // 게시글 수정
  const updateExistingArticle = useCallback(async (articleId: string, data: UpdateArticleRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      await updateArticle(articleId, data);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update article';
      setError(errorMessage);
      console.error('Error updating article:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // 게시글 삭제
  const deleteExistingArticle = useCallback(async (articleId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await deleteArticle(articleId);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete article';
      setError(errorMessage);
      console.error('Error deleting article:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createNewArticle,
    updateExistingArticle,
    deleteExistingArticle
  };
};

/**
 * 게시글 상호작용 훅 (좋아요, 북마크)
 */
export const useArticleInteractions = () => {
  const [error, setError] = useState<string | null>(null);

  // 좋아요 토글 (로딩 상태 없이 백그라운드 실행)
  const toggleLike = useCallback(async (articleId: string, isLiked: boolean) => {
    setError(null);
    
    try {
      if (isLiked) {
        await unlikeArticle(articleId);
      } else {
        await likeArticle(articleId);
      }
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle like';
      setError(errorMessage);
      console.error('Error toggling like:', err);
      return false;
    }
  }, []);

  // 북마크 토글 (로딩 상태 없이 백그라운드 실행)
  const toggleBookmark = useCallback(async (articleId: string, isBookmarked: boolean) => {
    setError(null);
    
    try {
      if (isBookmarked) {
        await unbookmarkArticle(articleId);
      } else {
        await bookmarkArticle(articleId);
      }
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle bookmark';
      setError(errorMessage);
      console.error('Error toggling bookmark:', err);
      return false;
    }
  }, []);

  return {
    error,
    toggleLike,
    toggleBookmark
  };
};