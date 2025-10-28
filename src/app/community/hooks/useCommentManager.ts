/**
 * 댓글 CRUD 관리 훅
 */

import { useState, useCallback } from 'react';
import {
  createComment,
  createReply,
  updateComment,
  deleteComment,
  toggleCommentLike,
  likeComment,
  unlikeComment,
} from '../api/comment.api';
import { CreateCommentRequest, UpdateCommentRequest } from '../types/api.types';

/**
 * 에러 객체에서 사용자 친화적인 메시지 추출
 */
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  // API 에러 응답 처리
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) {
      const apiMessage = response.data.message;
      
      // 특정 에러 메시지들을 사용자 친화적으로 변환
      switch (apiMessage) {
        case 'ALREADY_HAS_LIKE':
          return '이미 좋아요를 누른 댓글입니다.';
        case 'COMMENT_NOT_FOUND':
          return '댓글을 찾을 수 없습니다.';
        case 'PERMISSION_DENIED':
          return '권한이 없습니다.';
        default:
          return apiMessage;
      }
    }
  }
  
  // 기본 에러 메시지
  if (typeof error === 'string') {
    return error;
  }
  
  return '알 수 없는 오류가 발생했습니다.';
};

export const useCommentManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 댓글 생성
   */
  const createNewComment = useCallback(async (
    articleId: string,
    data: CreateCommentRequest
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await createComment(articleId, data);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create comment';
      setError(errorMessage);
      console.error('Error creating comment:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 대댓글 생성
   */
  const createNewReply = useCallback(async (
    articleId: string,
    commentId: string,
    data: CreateCommentRequest
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await createReply(articleId, commentId, data);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create reply';
      setError(errorMessage);
      console.error('Error creating reply:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 댓글 수정
   */
  const updateExistingComment = useCallback(async (
    commentId: string,
    data: UpdateCommentRequest
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await updateComment(commentId, data);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update comment';
      setError(errorMessage);
      console.error('Error updating comment:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 댓글 삭제
   */
  const deleteExistingComment = useCallback(async (commentId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await deleteComment(commentId);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete comment';
      setError(errorMessage);
      console.error('Error deleting comment:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createNewComment,
    createNewReply,
    updateExistingComment,
    deleteExistingComment
  };
};

/**
 * 댓글 상호작용 (좋아요) 관리 훅
 */
export const useCommentInteractions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 댓글 좋아요/취소 (기존 toggle 방식)
   */
  const toggleLike = useCallback(async (commentId: string): Promise<{ success: boolean; message?: string }> => {
    console.log('댓글 좋아요 API 호출:', commentId);
    setLoading(true);
    setError(null);
    
    try {
      await toggleCommentLike(commentId);
      console.log('댓글 좋아요 API 성공');
      return { success: true };
    } catch (err) {
      console.error('댓글 좋아요 API 에러:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 댓글 좋아요 추가/취소 (상태 기반)
   */
  const handleCommentLike = useCallback(async (
    commentId: string, 
    isCurrentlyLiked: boolean
  ): Promise<{ success: boolean; message?: string }> => {
    console.log('댓글 좋아요 상태 기반 API 호출:', { commentId, isCurrentlyLiked });
    setLoading(true);
    setError(null);
    
    try {
      if (isCurrentlyLiked) {
        // 이미 좋아요가 눌려있으면 취소
        console.log('좋아요 취소 API 호출 중...');
        await unlikeComment(commentId);
        console.log('댓글 좋아요 취소 성공');
      } else {
        // 좋아요가 안 눌려있으면 추가
        console.log('좋아요 추가 API 호출 중...');
        await likeComment(commentId);
        console.log('댓글 좋아요 추가 성공');
      }
      return { success: true };
    } catch (err) {
      console.error('댓글 좋아요/취소 API 에러:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    toggleLike,
    handleCommentLike,
  };
};