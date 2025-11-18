'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getMyComments } from '../api/comment.api';
import { 
  MyCommentItem, 
  MyCommentsParams
} from '../types/api.types';

type UseMyCommentsParams = MyCommentsParams;

interface UseMyCommentsReturn {
  comments: MyCommentItem[];
  loading: boolean;
  error: string | null;
  totalElements: number;
  refetch: () => void;
}

/**
 * 내 댓글 목록을 조회하는 훅
 */
export const useMyComments = (params: UseMyCommentsParams = {}): UseMyCommentsReturn => {
  const [comments, setComments] = useState<MyCommentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);

  // 파라미터를 안정적으로 유지
  const stableParams = useMemo(() => ({
    page: params.page ?? 1,
    size: params.size ?? 20,
    filter: params.filter ?? 'ALL',
  }), [params.page, params.size, params.filter]);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getMyComments(stableParams);
      setComments(response.content);
      setTotalElements(response.totalElements);
    } catch (err) {
      console.error('Failed to fetch my comments:', err);
      setError(err instanceof Error ? err.message : '댓글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [stableParams]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const refetch = useCallback(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    loading,
    error,
    totalElements,
    refetch,
  };
};