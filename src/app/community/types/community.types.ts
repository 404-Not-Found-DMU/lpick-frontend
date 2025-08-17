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
  board: BoardType; // 게시판 (주제)
  tag?: TagType; // 글머리 (성격)
  image?: string;
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

// 게시판 타입 (주제)
export type BoardType = '자유게시판' | '장비' | '음반' | '아티스트';

// 글머리 타입 (성격)
export type TagType = '질문' | '정보' | '홍보';

export interface Board {
  id: BoardType;
  name: string;
  icon: string;
  count: number;
}

export interface Tag {
  id: TagType;
  name: string;
  color: string;
}

export interface CommunityPageProps {
  // 추후 API 연동 시 사용할 props
  initialPosts?: Post[];
}

export type SortOption = 'latest' | 'popular' | 'views';

export interface CommunityFilters {
  board: BoardType | 'all';
  tag?: TagType;
  sortBy: SortOption;
  searchQuery: string;
}

export interface PostFormData {
  title: string;
  content: string;
  board: BoardType;
  tag?: TagType;
  image?: File | null;
}
