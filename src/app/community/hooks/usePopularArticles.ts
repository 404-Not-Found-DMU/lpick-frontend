'use client';
import { useState, useEffect } from 'react';
import { getPopularArticles } from '../api/article.api';
import { ArticleListItem } from '../types/api.types';

export const usePopularArticles = () => {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularArticles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getPopularArticles();
      setArticles(response.content.slice(0, 3)); // 상위 3개만 사용
    } catch (err) {
      console.error('Failed to fetch popular articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch popular articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularArticles();
  }, []);

  return {
    articles,
    loading,
    error,
    refresh: fetchPopularArticles
  };
};