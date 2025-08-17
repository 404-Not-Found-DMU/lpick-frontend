'use client';
import { useState, useMemo } from 'react';
import { SortOption, CommunityFilters, BoardType, TagType } from '../types/community.types';

// 임시 데이터 (나중에 API로 대체)
const SAMPLE_POSTS = [
  {
    id: 1,
    title: 'LP 플레이어 추천 좀 해주세요',
    description: '예산 50만원 정도로 생각하고 있는데 추천 부탁드립니다.',
    content: '...',
    author: '음악애호가',
    date: '2024-01-15',
    views: 128,
    likes: 12,
    comments: 8,
    board: '장비' as const,
    tag: '질문' as const,
  },
  {
    id: 2,
    title: '새로 나온 앨범 정보 공유',
    description: '이번 달 새로 발매된 LP 앨범들 정보를 정리해봤습니다.',
    content: '...',
    author: '레코드컬렉터',
    date: '2024-01-14',
    views: 256,
    likes: 24,
    comments: 15,
    board: '음반' as const,
    tag: '정보' as const,
  },
  {
    id: 3,
    title: '오늘 들은 음악 이야기',
    description: '비틀즈 앨범을 처음 LP로 들어봤는데 정말 다르네요.',
    content: '...',
    author: 'LP초보',
    date: '2024-01-13',
    views: 89,
    likes: 7,
    comments: 5,
    board: '자유게시판' as const,
  },
  {
    id: 4,
    title: '다음 주 LP 페어 홍보',
    description: '서울 코엑스에서 열리는 LP 페어 안내입니다.',
    content: '...',
    author: '이벤트알림',
    date: '2024-01-12',
    views: 445,
    likes: 35,
    comments: 22,
    board: '자유게시판' as const,
    tag: '홍보' as const,
  },
  {
    id: 5,
    title: 'IU 신곡 어떠세요?',
    description: '최근 발매된 IU 신곡에 대한 의견을 들어보고 싶습니다.',
    content: '...',
    author: '아이유팬',
    date: '2024-01-11',
    views: 667,
    likes: 89,
    comments: 43,
    board: '아티스트' as const,
  },
];

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
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  // 추천 게시물 (좋아요 순 상위 3개)
  const featuredPosts = useMemo(() => {
    return [...SAMPLE_POSTS].sort((a, b) => b.likes - a.likes).slice(0, 3);
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
