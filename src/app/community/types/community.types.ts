// 커뮤니티 관련 타입 정의 (API 스펙 기준)

// API 응답 기본 구조
export interface ApiResponse<T> {
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  size: number;
  content: T[];
  number: number;
  sort: {
    unsorted: boolean;
    empty: boolean;
    sorted: boolean;
  };
  pageable: {
    pageNumber: number;
    unpaged: boolean;
    offset: number;
    sort: {
      unsorted: boolean;
      empty: boolean;
      sorted: boolean;
    };
    paged: boolean;
    pageSize: number;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 게시글 목록용 타입
export interface Article {
  articleId: string;
  title: string;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  oauthId: string;
}

// 게시글 상세용 타입
export interface ArticleDetail {
  articleId: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  oauthId: string;
  liked: boolean;
  bookmarked: boolean;
}

// 기존 호환성을 위한 Post 인터페이스 (temp 데이터용)
export interface Post {
  id: number;
  articleId?: string;
  title: string;
  description?: string;
  content: string;
  author: string;
  oauthId?: string;
  date: string;
  views?: number;
  likes: number;
  likeCount?: number;
  comments: number;
  commentCount?: number;
  bookmarkCount?: number;
  liked?: boolean;
  bookmarked?: boolean;
  board?: BoardType;
  tag?: TagType;
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
