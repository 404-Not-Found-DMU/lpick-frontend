'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SortOption, CommunityFilters, BoardType, TagType } from '../types/community.types';
import { POSTS_PER_PAGE } from '../constants';
import { useArticles } from './useArticles';
import { usePopularArticles } from './usePopularArticles';
import { ArticleListItem } from '../types/api.types';

export const useCommunity = () => {
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<CommunityFilters>({
    board: 'all',
    sortBy: 'latest',
    searchQuery: '',
  });

  const [currentPage, setCurrentPage] = useState(1);

  // 메인 게시글 파라미터를 useMemo로 안정화
  const mainParams = useMemo(() => ({
    page: Math.max(1, currentPage),
    size: POSTS_PER_PAGE
  }), [currentPage]);

  // 로그인 상태와 관계없이 public API 사용
  // API 호출을 통한 게시글 데이터 조회
  const {
    articles,
    totalPages: apiTotalPages,
    loading,
    error,
    loadPage,
    refresh
  } = useArticles(mainParams);

  // API 데이터를 커뮤니티 포스트 형태로 변환
  const convertToPostFormat = useCallback((article: ArticleListItem) => {
    // ISO 날짜를 YYYY-MM-DD 형식으로 변환
    const formatDate = (isoString: string) => {
      try {
        return new Date(isoString).toISOString().split('T')[0];
      } catch {
        return isoString; // 파싱 실패 시 원본 반환
      }
    };

    // articleId에서 고유한 숫자 ID 생성 (해시 기반)
    const generateNumericId = (articleId: string) => {
      let hash = 0;
      for (let i = 0; i < articleId.length; i++) {
        const char = articleId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 32비트 정수로 변환
      }
      return Math.abs(hash);
    };

    return {
      id: generateNumericId(article.articleId),
      articleId: article.articleId,
      title: article.title,
      content: '', // 목록에서는 내용 없음
      author: article.author, // API에서 제공하는 author 필드 사용
      oauthId: article.oauthId,
      date: formatDate(article.createdAt),
      board: '자유게시판' as BoardType, // 기본값, 실제로는 게시판 정보 필요
      tag: undefined as TagType | undefined, // 태그 정보 필요
      likes: article.likeCount,
      likeCount: article.likeCount,
      comments: article.commentCount,
      commentCount: article.commentCount,
      bookmarkCount: article.bookmarkCount,
      views: 0, // 조회수 정보 필요
      image: '', // 이미지 정보 필요
    };
  }, []);

  // 현재 페이지의 게시물들
  const currentPosts = useMemo(() => {
    return articles.map(convertToPostFormat);
  }, [articles, convertToPostFormat]);

  // 인기 게시글 (인기 게시글 API 사용)
  const {
    articles: popularArticles,
    loading: popularLoading
  } = usePopularArticles();

  const featuredPosts = useMemo(() => {
    return popularArticles.map(convertToPostFormat);
  }, [popularArticles, convertToPostFormat]);

  const totalPages = apiTotalPages;

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
    setCurrentPage(1);
    // TODO: 검색 API 연동 필요
  }, []);

  const setBoardFilter = useCallback((board: BoardType | 'all') => {
    setFilters((prev) => ({ ...prev, board }));
    setCurrentPage(1);
    // TODO: 게시판 필터 API 연동 필요
  }, []);

  const setTagFilter = useCallback((tag?: TagType) => {
    setFilters((prev) => ({ ...prev, tag }));
    setCurrentPage(1);
    // TODO: 태그 필터 API 연동 필요
  }, []);

  const setSortBy = useCallback((sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
    setCurrentPage(1);
    // TODO: 정렬 기능은 API에서 지원되면 구현
  }, []);

  const setCurrentPageHandler = useCallback((page: number) => {
    setCurrentPage(page);
    loadPage(page); // API는 1-based 페이징
  }, [loadPage]);

  // URL refresh 매개변수 감지하여 자동 새로고침
  useEffect(() => {
    const refreshParam = searchParams.get('refresh');
    if (refreshParam) {
      // refresh 매개변수가 있으면 데이터 새로고침
      refresh();
      // URL에서 refresh 매개변수 제거
      const url = new URL(window.location.href);
      url.searchParams.delete('refresh');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams, refresh]);

  return {
    featuredPosts,
    recentPosts: currentPosts,
    filters,
    currentPage,
    totalPages,
    loading: loading || popularLoading,
    error,
    setSearchQuery,
    setBoardFilter,
    setTagFilter,
    setSortBy,
    setCurrentPage: setCurrentPageHandler,
    refresh,
  };
};
