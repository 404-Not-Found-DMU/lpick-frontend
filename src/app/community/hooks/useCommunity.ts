'use client';
import { useState, useMemo } from 'react';
import { SortOption, CommunityFilters, BoardType, TagType } from '../types/community.types';
import { SAMPLE_POSTS, FEATURED_POSTS } from '../temp/community.temp';
import { POSTS_PER_PAGE, FEATURED_POSTS_LIMIT } from '../constants';
import { filterPosts, sortPosts } from '../utils/postUtils';

export const useCommunity = () => {
  const [filters, setFilters] = useState<CommunityFilters>({
    board: 'all',
    sortBy: 'latest',
    searchQuery: '',
  });

  const [currentPage, setCurrentPage] = useState(1);

  // 필터링된 게시물들
  const filteredPosts = useMemo(() => {
    const filtered = filterPosts(SAMPLE_POSTS, filters);
    return sortPosts(filtered, filters.sortBy);
  }, [filters]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  // 추천 게시물 (좋아요 순 상위 8개)
  const featuredPosts = useMemo(() => {
    return FEATURED_POSTS.slice(0, FEATURED_POSTS_LIMIT);
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
