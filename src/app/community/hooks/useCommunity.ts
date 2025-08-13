'use client';
import { useState, useEffect, useMemo } from 'react';
import { SortOption, CommunityFilters } from '../types/community.types';
import { FEATURED_POSTS, RECENT_POSTS } from '../temp/community.temp';

export const useCommunity = () => {
  const [filters, setFilters] = useState<CommunityFilters>({
    category: 'all',
    sortBy: 'latest',
    searchQuery: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // 필터링된 게시물들
  const filteredPosts = useMemo(() => {
    let filtered = [...RECENT_POSTS];

    // 카테고리 필터
    if (filters.category !== 'all') {
      const categoryMap: { [key: string]: string } = {
        recommend: '추천',
        question: '질문',
        discussion: '토론',
        info: '정보',
        free: '자유',
      };
      const categoryName = categoryMap[filters.category];
      if (categoryName) {
        filtered = filtered.filter((post) => post.category === categoryName);
      }
    }

    // 검색 필터
    if (filters.searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(filters.searchQuery.toLowerCase()),
      );
    }

    // 정렬
    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
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
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  // 필터 변경 시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const updateFilter = (key: keyof CommunityFilters, value: string | SortOption) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    // 데이터
    featuredPosts: FEATURED_POSTS,
    recentPosts: paginatedPosts,

    // 필터 상태
    filters,

    // 페이지네이션
    currentPage,
    totalPages,

    // 액션
    setSearchQuery: (query: string) => updateFilter('searchQuery', query),
    setCategoryFilter: (category: string) => updateFilter('category', category),
    setSortBy: (sort: SortOption) => updateFilter('sortBy', sort),
    setCurrentPage,
  };
};
