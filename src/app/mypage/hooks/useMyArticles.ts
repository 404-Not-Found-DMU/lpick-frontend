'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { getMyArticles } from '../../community/api/article.api';
import { ArticleListItem, PaginationParams } from '../../community/types/api.types';

export const useMyArticles = (initialParams?: PaginationParams) => {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialParams?.page || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // initialParams를 안정적으로 만들기 위해 useMemo 사용
  const stableParams = useMemo(() => ({
    page: initialParams?.page,
    size: initialParams?.size
  }), [initialParams?.page, initialParams?.size]);

  const fetchArticles = useCallback(async (params?: PaginationParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const validParams = {
        ...params,
        page: Math.max(1, params?.page || 1),
        size: Math.max(1, params?.size || 10),
      };
      
      const response = await getMyArticles(validParams);
      setArticles(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setCurrentPage(response.number + 1); // API는 0-based, UI는 1-based
    } catch (err) {
      console.error("Failed to fetch my articles:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch articles");
      setArticles([]);
      setTotalElements(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPage = useCallback(async (page: number) => {
    const params = { page, size: stableParams?.size || 10 };
    await fetchArticles(params);
  }, [fetchArticles, stableParams?.size]);

  const refresh = useCallback(async () => {
    await fetchArticles({ page: currentPage, size: stableParams?.size || 10 });
  }, [fetchArticles, currentPage, stableParams?.size]);

  useEffect(() => {
    if (stableParams) {
      fetchArticles(stableParams);
    }
  }, [fetchArticles, stableParams]);

  return {
    articles,
    totalElements,
    totalPages,
    currentPage,
    loading,
    error,
    loadPage,
    refresh
  };
};