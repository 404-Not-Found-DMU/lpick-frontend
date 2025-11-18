'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getArticleBookmarks } from '../api/article.api';
import { 
  ArticleBookmarkItem, 
  PaginationParams
} from '../types/api.types';

type UseArticleBookmarksParams = PaginationParams;

interface UseArticleBookmarksReturn {
  bookmarks: ArticleBookmarkItem[];
  loading: boolean;
  error: string | null;
  totalElements: number;
  refetch: () => void;
}

/**
 * 사용자의 게시글 북마크 목록을 조회하는 훅
 */
export const useArticleBookmarks = (params: UseArticleBookmarksParams = {}): UseArticleBookmarksReturn => {
  const [bookmarks, setBookmarks] = useState<ArticleBookmarkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);

  // 파라미터를 안정적으로 유지
  const stableParams = useMemo(() => ({
    page: params.page ?? 1,
    size: params.size ?? 20,
  }), [params.page, params.size]);

  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getArticleBookmarks(stableParams);
      setBookmarks(response.content);
      setTotalElements(response.totalElements);
    } catch (err) {
      console.error('Failed to fetch article bookmarks:', err);
      setError(err instanceof Error ? err.message : '게시글 북마크를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [stableParams]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const refetch = useCallback(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return {
    bookmarks,
    loading,
    error,
    totalElements,
    refetch,
  };
};