/**
 * 댓글 목록 조회 및 관리 훅
 */

import { useState, useCallback, useMemo } from 'react';
import { 
  getComments,
  getLikedParentComments,
  getLikedChildComments
} from '../api/comment.api';
import { PaginationParams, CommentListItem } from '../types/api.types';

export const useComments = (articleId?: string, initialParams?: PaginationParams) => {
  const [comments, setComments] = useState<CommentListItem[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialParams?.page || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // initialParams를 안정적으로 만들기 위해 useMemo 사용
  const stableParams = useMemo(() => ({
    page: initialParams?.page,
    size: initialParams?.size
  }), [
    initialParams?.page,
    initialParams?.size
  ]);

  const fetchComments = useCallback(async (params?: PaginationParams) => {
    if (!articleId) {
      setError('게시글 ID가 필요합니다.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // 페이지 값 검증
      const validParams = {
        ...params,
        page: Math.max(1, params?.page || 1), // 1-based 페이징
        size: Math.max(1, params?.size || 10), // 최소 크기 보장
      };
      
      const response = await getComments(articleId, validParams);
      setComments(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setCurrentPage(response.number + 1); // API는 0-based, UI는 1-based
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch comments';
      setError(errorMessage);
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  const loadPage = useCallback((page: number) => {
    const validPage = Math.max(1, page); // 1-based 페이징, 음수 방지
    fetchComments({ ...stableParams, page: validPage });
  }, [fetchComments, stableParams]);

  const refresh = useCallback(() => {
    fetchComments({ ...stableParams, page: currentPage });
  }, [fetchComments, stableParams, currentPage]);

  return {
    comments,
    totalElements,
    totalPages,
    currentPage,
    loading,
    error,
    fetchComments,
    loadPage,
    refresh
  };
};

/**
 * 좋아요한 부모 댓글 목록 조회 훅
 */
export const useLikedParentComments = (initialParams?: PaginationParams) => {
  const [comments, setComments] = useState<CommentListItem[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialParams?.page || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // initialParams를 안정적으로 만들기 위해 useMemo 사용
  const stableParams = useMemo(() => ({
    page: initialParams?.page,
    size: initialParams?.size
  }), [
    initialParams?.page,
    initialParams?.size
  ]);

  const fetchLikedComments = useCallback(async (params?: PaginationParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const validParams = {
        ...params,
        page: Math.max(1, params?.page || 1),
        size: Math.max(1, params?.size || 10),
      };
      
      const response = await getLikedParentComments(validParams);
      setComments(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setCurrentPage(response.number + 1);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch liked comments';
      setError(errorMessage);
      console.error('Error fetching liked parent comments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPage = useCallback((page: number) => {
    const validPage = Math.max(1, page);
    fetchLikedComments({ ...stableParams, page: validPage });
  }, [fetchLikedComments, stableParams]);

  const refresh = useCallback(() => {
    fetchLikedComments({ ...stableParams, page: currentPage });
  }, [fetchLikedComments, stableParams, currentPage]);

  return {
    comments,
    totalElements,
    totalPages,
    currentPage,
    loading,
    error,
    fetchLikedComments,
    loadPage,
    refresh
  };
};

/**
 * 좋아요한 자식 댓글 목록 조회 훅
 */
export const useLikedChildComments = (initialParams?: PaginationParams) => {
  const [comments, setComments] = useState<CommentListItem[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialParams?.page || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // initialParams를 안정적으로 만들기 위해 useMemo 사용
  const stableParams = useMemo(() => ({
    page: initialParams?.page,
    size: initialParams?.size
  }), [
    initialParams?.page,
    initialParams?.size
  ]);

  const fetchLikedComments = useCallback(async (params?: PaginationParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const validParams = {
        ...params,
        page: Math.max(1, params?.page || 1),
        size: Math.max(1, params?.size || 10),
      };
      
      const response = await getLikedChildComments(validParams);
      setComments(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setCurrentPage(response.number + 1);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch liked child comments';
      setError(errorMessage);
      console.error('Error fetching liked child comments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPage = useCallback((page: number) => {
    const validPage = Math.max(1, page);
    fetchLikedComments({ ...stableParams, page: validPage });
  }, [fetchLikedComments, stableParams]);

  const refresh = useCallback(() => {
    fetchLikedComments({ ...stableParams, page: currentPage });
  }, [fetchLikedComments, stableParams, currentPage]);

  return {
    comments,
    totalElements,
    totalPages,
    currentPage,
    loading,
    error,
    fetchLikedComments,
    loadPage,
    refresh
  };
};