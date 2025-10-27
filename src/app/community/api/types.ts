/**
 * 커뮤니티 API 타입 정의 (Swagger 기반)
 */

// 공통 페이지네이션 타입
export interface Pageable {
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
  pageSize: number;
  offset: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
}

export interface PagedResponse<T> {
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
  numberOfElements: number;
  size: number;
  content: T[];
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 게시글 목록용 (간단한 정보)
export interface ArticleListItem {
  articleId: string;
  title: string;
  createdAt: string;
  modifiedAt: string;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  oauthId: string;
}

// 게시글 상세 정보
export interface ArticleDetail {
  articleId: string;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  oauthId: string;
  liked: boolean;
  bookmarked: boolean;
}

// 게시글 생성/수정 요청
export interface CreateArticleRequest {
  title: string;
  content: string;
}

export interface UpdateArticleRequest {
  title: string;
  content: string;
}

// API 응답 타입들
export type ArticleListResponse = PagedResponse<ArticleListItem>;
export type MyArticlesResponse = PagedResponse<ArticleListItem>;
export type LikedArticlesResponse = PagedResponse<ArticleListItem>;

// 페이지네이션 파라미터
export interface PaginationParams {
  page?: number;
  size?: number;
}

// 에러 응답
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}