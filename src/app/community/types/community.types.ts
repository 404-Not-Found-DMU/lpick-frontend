// 커뮤니티 관련 타입 정의

export interface Post {
  id: number;
  title: string;
  description?: string;
  content: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
  category: string;
  image?: string;
  tags?: string[];
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  parentId?: number; // 대댓글용
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface CommunityPageProps {
  // 추후 API 연동 시 사용할 props
  initialPosts?: Post[];
}

export type SortOption = 'latest' | 'popular' | 'views';

export interface CommunityFilters {
  category: string;
  sortBy: SortOption;
  searchQuery: string;
}

export interface PostFormData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  image?: File | null;
}
