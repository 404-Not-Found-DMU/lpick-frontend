'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getLikedArticles } from '../../community/api/article.api';
import { 
  ArticleListItem, 
  PaginationParams, 
  LikedArticlesResponse 
} from '../../community/types/api.types';

interface UseLikedArticlesParams extends PaginationParams {}

interface UseLikedArticlesReturn {
  articles: ArticleListItem[];
  loading: boolean;
  error: string | null;
  totalElements: number;
  refetch: () => void;
}

/**
 * 좋아요한 게시글 목록을 조회하는 훅
 */
export const useLikedArticles = (params: UseLikedArticlesParams = {}): UseLikedArticlesReturn => {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);

  // 파라미터를 안정적으로 유지
  const stableParams = useMemo(() => ({
    page: params.page ?? 1,
    size: params.size ?? 20,
  }), [params.page, params.size]);

  const fetchLikedArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getLikedArticles(stableParams);
      setArticles(response.content);
      setTotalElements(response.totalElements);
    } catch (err) {
      console.error('Failed to fetch liked articles:', err);
      setError(err instanceof Error ? err.message : '좋아요한 게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [stableParams]);

  useEffect(() => {
    fetchLikedArticles();
  }, [fetchLikedArticles]);

  const refetch = useCallback(() => {
    fetchLikedArticles();
  }, [fetchLikedArticles]);

  return {
    articles,
    loading,
    error,
    totalElements,
    refetch,
  };
};