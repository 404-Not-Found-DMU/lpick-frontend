import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  getArticles, 
  getArticle,
  getMyArticles,
  getLikedArticles
} from '../api/article.api';
import {
  ArticleDetail,
  ArticleListItem,
  PaginationParams
} from '../types/api.types';

/**
 * 게시글 목록 조회 훅
 */
export const useArticles = (initialParams?: PaginationParams) => {
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
  }), [
    initialParams?.page,
    initialParams?.size
  ]);

  const fetchArticles = useCallback(async (params?: PaginationParams) => {
    setLoading(true);
    setError(null);
    
    try {
      // 페이지 값 검증
      const validParams = {
        ...params,
        page: Math.max(0, params?.page || 0), // 음수 방지
        size: Math.max(1, params?.size || 10), // 최소 크기 보장
      };
      
      const response = await getArticles(validParams);
      setArticles(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setCurrentPage(response.number);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch articles';
      setError(errorMessage);
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPage = useCallback((page: number) => {
    const validPage = Math.max(1, page); // 1-based 페이징, 음수 방지
    fetchArticles({ ...stableParams, page: validPage });
  }, [fetchArticles, stableParams]);

  const refresh = useCallback(() => {
    fetchArticles({ ...stableParams, page: currentPage });
  }, [fetchArticles, stableParams, currentPage]);

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

/**
 * 게시글 상세 조회 훅
 */
export const useArticle = (articleId: string | null) => {
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getArticle(id);
      setArticle(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch article';
      setError(errorMessage);
      console.error('Error fetching article:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    if (articleId) {
      fetchArticle(articleId);
    }
  }, [articleId, fetchArticle]);

  useEffect(() => {
    if (articleId) {
      fetchArticle(articleId);
    }
  }, [articleId, fetchArticle]);

  return {
    article,
    loading,
    error,
    refresh
  };
};

/**
 * 내 게시글 목록 조회 훅
 */
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
  }), [
    initialParams?.page,
    initialParams?.size
  ]);

  const fetchMyArticles = useCallback(async (params?: PaginationParams) => {
    setLoading(true);
    setError(null);
    
    try {
      // 페이지 값 검증
      const validParams = {
        ...params,
        page: Math.max(0, params?.page || 0), // 음수 방지
        size: Math.max(1, params?.size || 10), // 최소 크기 보장
      };
      
      const response = await getMyArticles(validParams);
      setArticles(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setCurrentPage(response.number);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch my articles';
      setError(errorMessage);
      console.error('Error fetching my articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPage = useCallback((page: number) => {
    const validPage = Math.max(1, page); // 1-based 페이징
    fetchMyArticles({ ...stableParams, page: validPage });
  }, [fetchMyArticles, stableParams]);

  const refresh = useCallback(() => {
    fetchMyArticles({ ...stableParams, page: currentPage });
  }, [fetchMyArticles, stableParams, currentPage]);

  useEffect(() => {
    if (stableParams) {
      fetchMyArticles(stableParams);
    }
  }, [fetchMyArticles, stableParams]);

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

/**
 * 좋아요한 게시글 목록 조회 훅
 */
export const useLikedArticles = (initialParams?: PaginationParams) => {
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
  }), [
    initialParams?.page,
    initialParams?.size
  ]);

  const fetchLikedArticles = useCallback(async (params?: PaginationParams) => {
    setLoading(true);
    setError(null);
    
    try {
      // 페이지 값 검증
      const validParams = {
        ...params,
        page: Math.max(0, params?.page || 0), // 음수 방지
        size: Math.max(1, params?.size || 10), // 최소 크기 보장
      };
      
      const response = await getLikedArticles(validParams);
      setArticles(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setCurrentPage(response.number);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch liked articles';
      setError(errorMessage);
      console.error('Error fetching liked articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPage = useCallback((page: number) => {
    const validPage = Math.max(1, page); // 1-based 페이징
    fetchLikedArticles({ ...stableParams, page: validPage });
  }, [fetchLikedArticles, stableParams]);

  const refresh = useCallback(() => {
    fetchLikedArticles({ ...stableParams, page: currentPage });
  }, [fetchLikedArticles, stableParams, currentPage]);

  useEffect(() => {
    if (stableParams) {
      fetchLikedArticles(stableParams);
    }
  }, [fetchLikedArticles, stableParams]);

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

