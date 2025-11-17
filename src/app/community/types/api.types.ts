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
  articleType: BoardType;
  createdAt: string;
  modifiedAt: string;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  oauthId: string;
  author: string;
  viewCount: number;
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
  author: string;
  liked: boolean;
  bookmarked: boolean;
}

// 게시판 종류
export enum BoardType {
  FREE = 'FREE',       // 자유게시판
  ALBUM = 'ALBUM',     // 앨범
  ARTIST = 'ARTIST',   // 아티스트
  GEAR = 'GEAR'        // 장비
}

// 글머리 (배지)
export enum BadgeType {
  QUESTION = 'QUESTION',     // 질문
  INFO = 'INFO',             // 정보
  PROMOTION = 'PROMOTION'    // 홍보
}

// 게시글 생성/수정 요청
export interface CreateArticleRequest {
  title: string;
  content: string;
  type: BoardType;
  badge: BadgeType;
}

export interface UpdateArticleRequest {
  title: string;
  content: string;
  type: BoardType;
  badge: BadgeType;
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

// 댓글 관련 타입들
export interface ChildComment {
  commentId: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  articleId: string;
  parentCommentId: string;
  oauthId: string;
  author: string;
  liked: boolean;
  likeCount: number;
}

export interface CommentListItem {
  commentId: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  isDel: 'Y' | 'N';
  articleId: string;
  oauthId: string;
  author: string;
  liked: boolean;
  likeCount: number;
  childsCommentList: ChildComment[];
}

// 댓글 생성/수정 요청
export interface CreateCommentRequest {
  comment: string;
}

export interface UpdateCommentRequest {
  comment: string;
}

// 댓글 관련 API 응답 타입들
export type CommentListResponse = PagedResponse<CommentListItem>;
export type LikedParentCommentsResponse = PagedResponse<CommentListItem>;
export type LikedChildCommentsResponse = PagedResponse<CommentListItem>;