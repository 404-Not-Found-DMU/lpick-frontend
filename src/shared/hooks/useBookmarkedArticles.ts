'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getBookmarkedArticles } from '../api/article.api';
import { BookmarkItem, PaginationParams } from '../types/api.types';

type UseBookmarkedArticlesParams = PaginationParams;

interface UseBookmarkedArticlesReturn {
  bookmarks: BookmarkItem[];
  loading: boolean;
  error: string | null;
  totalElements: number;
  refetch: () => void;
}

export const useBookmarkedArticles = (initialParams?: UseBookmarkedArticlesParams): UseBookmarkedArticlesReturn => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [totalElements, setTotalElements] = useState(0);
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

  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const validParams = {
        ...stableParams,
        page: Math.max(1, stableParams?.page || 1),
        size: Math.max(1, stableParams?.size || 10),
      };
      
      const response = await getBookmarkedArticles(validParams);
      setBookmarks(response.content);
      setTotalElements(response.totalElements);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch bookmarked articles';
      setError(errorMessage);
      console.error('Error fetching bookmarked articles:', err);
    } finally {
      setLoading(false);
    }
  }, [stableParams]);

  // 초기 데이터 로드
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