'use client';
import { useState, useMemo } from 'react';
import { SortOption, CommunityFilters, BoardType, TagType } from '../types/community.types';
import { SAMPLE_POSTS, FEATURED_POSTS } from '../temp/community.temp';

export const useCommunity = () => {
  const [filters, setFilters] = useState<CommunityFilters>({
    board: 'all',
    sortBy: 'latest',
    searchQuery: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // 필터링된 게시물들
  const filteredPosts = useMemo(() => {
    let filtered = [...SAMPLE_POSTS];

    // 게시판 필터
    if (filters.board !== 'all') {
      filtered = filtered.filter((post) => post.board === filters.board);
    }

    // 글머리 필터
    if (filters.tag) {
      filtered = filtered.filter((post) => post.tag === filters.tag);
    }

    // 검색어 필터
    if (filters.searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          post.description?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(filters.searchQuery.toLowerCase()),
      );
    }

    // 정렬
    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.likeCount || b.likes || 0) - (a.likeCount || a.likes || 0));
        break;
      case 'views':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'latest':
      default:
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    return filtered;
  }, [filters]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  // 추천 게시물 (좋아요 순 상위 8개)
  const featuredPosts = useMemo(() => {
    return FEATURED_POSTS.slice(0, 8);
  }, []);

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
    setCurrentPage(1);
  };

  const setBoardFilter = (board: BoardType | 'all') => {
    setFilters((prev) => ({ ...prev, board }));
    setCurrentPage(1);
  };

  const setTagFilter = (tag?: TagType) => {
    setFilters((prev) => ({ ...prev, tag }));
    setCurrentPage(1);
  };

  const setSortBy = (sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
    setCurrentPage(1);
  };

  return {
    featuredPosts,
    recentPosts: currentPosts,
    filters,
    currentPage,
    totalPages,
    setSearchQuery,
    setBoardFilter,
    setTagFilter,
    setSortBy,
    setCurrentPage,
  };
};
