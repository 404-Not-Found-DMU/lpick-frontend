'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getLikedParentComments } from '../api/comment.api';
import { 
  CommentListItem, 
  ChildComment, 
  PaginationParams
} from '../types/api.types';

type UseMyCommentsParams = PaginationParams;

interface UseMyCommentsReturn {
  comments: (CommentListItem | ChildComment)[];
  loading: boolean;
  error: string | null;
  totalElements: number;
  refetch: () => void;
}

/**
 * 내가 좋아요한 댓글 목록을 조회하는 훅
 * 부모 댓글과 자식 댓글을 모두 조회하여 합친 결과를 반환
 */
export const useMyComments = (params: UseMyCommentsParams = {}): UseMyCommentsReturn => {
  const [comments, setComments] = useState<(CommentListItem | ChildComment)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);

  // 파라미터를 안정적으로 유지
  const stableParams = useMemo(() => ({
    page: params.page ?? 1,
    size: params.size ?? 20,
  }), [params.page, params.size]);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 부모 댓글만 조회 (자식 댓글 API가 아직 구현되지 않음)
      const allComments: (CommentListItem | ChildComment)[] = [];
      let totalCount = 0;

      try {
        const parentCommentsResponse = await getLikedParentComments(stableParams);
        allComments.push(...parentCommentsResponse.content);
        totalCount += parentCommentsResponse.totalElements;
      } catch (parentError) {
        console.warn('Failed to fetch liked parent comments:', parentError);
      }

      // TODO: 자식 댓글 API가 구현되면 추가
      // try {
      //   const childCommentsResponse = await getLikedChildComments(stableParams);
      //   allComments.push(...childCommentsResponse.content);
      //   totalCount += childCommentsResponse.totalElements;
      // } catch (childError) {
      //   console.warn('Failed to fetch liked child comments:', childError);
      // }

      // 날짜순으로 정렬
      allComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setComments(allComments);
      setTotalElements(totalCount);

      // 둘 다 실패했을 경우에만 에러 표시
      if (allComments.length === 0 && totalCount === 0) {
        setError('댓글 데이터를 불러올 수 없습니다.');
      }
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