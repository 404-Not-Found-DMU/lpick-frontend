import { Post, CommunityFilters } from '../types/community.types';

/**
 * 게시물 필터링 로직
 */
export const filterPosts = (posts: Post[], filters: CommunityFilters): Post[] => {
  let filtered = [...posts];

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
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description?.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query),
    );
  }

  return filtered;
};

/**
 * 게시물 정렬 로직
 */
export const sortPosts = (posts: Post[], sortBy: string): Post[] => {
  const sorted = [...posts];

  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => (b.likeCount || b.likes || 0) - (a.likeCount || a.likes || 0));
    case 'views':
      return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
    case 'latest':
    default:
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
};
