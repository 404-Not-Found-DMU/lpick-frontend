/**
 * 댓글 API 함수들
 */

import { fetcher } from '@/hooks/api/fetchers';
import {
  CommentListResponse,
  LikedParentCommentsResponse,
  LikedChildCommentsResponse,
  CreateCommentRequest,
  UpdateCommentRequest,
  PaginationParams
} from '../types/api.types';

// 기본 댓글 API URL
const COMMENT_API_BASE = '/api/v1/community/comment';
const PUBLIC_COMMENT_API_BASE = '/api/v1/public/community/comment';

/**
 * 특정 게시글의 댓글 목록 조회 (public API)
 * @param articleId 게시글 ID
 * @param params 페이지네이션 파라미터
 */
export const getComments = async (
  articleId: string,
  params?: PaginationParams
): Promise<CommentListResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page !== undefined) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.size !== undefined) {
      queryParams.append('size', params.size.toString());
    }

    const queryString = queryParams.toString();
    const url = `${PUBLIC_COMMENT_API_BASE}/${articleId}${queryString ? `?${queryString}` : ''}`;
    
    return await fetcher<CommentListResponse>(url);
  } catch (error) {
    console.error(`Failed to fetch comments for article ${articleId}:`, error);
    throw error;
  }
};

/**
 * 좋아요한 부모 댓글 목록 조회
 * @param params 페이지네이션 파라미터
 */
export const getLikedParentComments = async (
  params?: PaginationParams
): Promise<LikedParentCommentsResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page !== undefined) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.size !== undefined) {
      queryParams.append('size', params.size.toString());
    }

    const queryString = queryParams.toString();
    const url = `${COMMENT_API_BASE}/parents/like${queryString ? `?${queryString}` : ''}`;
    
    return await fetcher<LikedParentCommentsResponse>(url);
  } catch (error) {
    console.error('Failed to fetch liked parent comments:', error);
    throw error;
  }
};

/**
 * 좋아요한 자식 댓글 목록 조회
 * @param params 페이지네이션 파라미터
 */
export const getLikedChildComments = async (
  params?: PaginationParams
): Promise<LikedChildCommentsResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page !== undefined) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.size !== undefined) {
      queryParams.append('size', params.size.toString());
    }

    const queryString = queryParams.toString();
    const url = `${COMMENT_API_BASE}/child/like${queryString ? `?${queryString}` : ''}`;
    
    return await fetcher<LikedChildCommentsResponse>(url);
  } catch (error) {
    console.error('Failed to fetch liked child comments:', error);
    throw error;
  }
};

/**
 * 댓글 좋아요/취소
 * @param commentId 댓글 ID
 */
/**
 * 댓글 좋아요 토글 (기존)
 * @param commentId 댓글 ID
 */
export const toggleCommentLike = async (commentId: string): Promise<void> => {
  try {
    await fetcher<void>(`${COMMENT_API_BASE}/like/${commentId}`, {
      method: 'POST',
    });
  } catch (error) {
    console.error(`Failed to toggle like for comment ${commentId}:`, error);
    throw error;
  }
};

/**
 * 댓글 좋아요 추가
 * @param commentId 댓글 ID
 */
export const likeComment = async (commentId: string): Promise<void> => {
  try {
    await fetcher<void>(`${COMMENT_API_BASE}/like/${commentId}`, {
      method: 'POST',
    });
  } catch (error) {
    console.error(`Failed to like comment ${commentId}:`, error);
    throw error;
  }
};

/**
 * 댓글 좋아요 취소 - DELETE 메서드 사용
 * @param commentId 댓글 ID
 */
export const unlikeComment = async (commentId: string): Promise<void> => {
  try {
    await fetcher<void>(`${COMMENT_API_BASE}/like/${commentId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Failed to unlike comment ${commentId}:`, error);
    throw error;
  }
};

/**
 * 댓글 삭제
 * @param commentId 댓글 ID
 */
export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await fetcher<void>(`${COMMENT_API_BASE}/${commentId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Failed to delete comment ${commentId}:`, error);
    throw error;
  }
};

/**
 * 댓글 수정
 * @param commentId 댓글 ID
 * @param data 수정할 댓글 데이터
 */
export const updateComment = async (
  commentId: string,
  data: UpdateCommentRequest
): Promise<void> => {
  try {
    await fetcher<void>(`${COMMENT_API_BASE}/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(`Failed to update comment ${commentId}:`, error);
    throw error;
  }
};

/**
 * 게시글에 댓글 작성
 * @param articleId 게시글 ID
 * @param data 댓글 데이터
 */
export const createComment = async (
  articleId: string,
  data: CreateCommentRequest
): Promise<void> => {
  try {
    await fetcher<void>(`/api/v1/community/${articleId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(`Failed to create comment for article ${articleId}:`, error);
    throw error;
  }
};

/**
 * 댓글에 대댓글 작성
 * @param articleId 게시글 ID
 * @param commentId 부모 댓글 ID
 * @param data 대댓글 데이터
 */
export const createReply = async (
  articleId: string,
  commentId: string,
  data: CreateCommentRequest
): Promise<void> => {
  try {
    await fetcher<void>(`/api/v1/community/${articleId}/comment/${commentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(`Failed to create reply for comment ${commentId}:`, error);
    throw error;
  }
};