/**
 * 커뮤니티 API 타입 정의 (Swagger 기반)
 */

// 사용자 설정
export interface UserPrivacySettings {
  allowViewActCount: boolean;
  allowViewRecentAct: boolean;
  allowViewGear: boolean;
  allowViewCollection: boolean;
}

export interface UserNotificationSettings {
  isAlarmWikiEdit: boolean;
  isAlarmNewDebateAnswer: boolean;
  isAlarmCommented: boolean;
  isAlarmEvent: boolean;
}

export interface UserSettings {
  privacy: UserPrivacySettings;
  theme: 'LIGHT' | 'DARK';
  notification: UserNotificationSettings;
}

export interface UserSettingsResponse {
  success: boolean;
  message: string;
  data: UserSettings;
}

// 사용자 활동 통계
export interface UserActivityCount {
  articleCount: number;
  commentCount: number;
  wikiEditCount: number;
  debateChatCount: number;
}

// API 응답은 직접 데이터이거나 래퍼 객체일 수 있음
export type UserActivityCountResponse = UserActivityCount | {
  success: boolean;
  message: string;
  data: UserActivityCount;
};

// 댓글 필터 타입
export type MyCommentFilter = 'ALL' | 'ONLY_COMMENT' | 'ONLY_REPLY' | 'LIKE_DESC';

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
  viewCount: number;
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
  authorProfile?: string;
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

// 북마크 관련 타입
export interface BookmarkItem {
  articleId: string;
  title: string;
  content: string;
  boardType: BoardType;
  viewCount: number;
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
  authorName: string;
  authorProfileImage: string;
  createdAt: string;
  updatedAt: string;
}

// 새로운 게시글 북마크 API 타입
export interface ArticleBookmarkItem {
  articleId?: string; // 게시글 ID 추가
  writerName: string;
  articleCreatedAt: string;
  articleTitle: string;
  articleContent: string;
  likeCount: number;
  viewCount: number;
}

// 새로운 위키 북마크 API 타입
export interface WikiBookmarkItem {
  wikiBookmarkId: string;
  wikiPageId: string;
  wikiTitle: string;
  wikiPageClass: string;
}

// 북마크 응답 타입
export type BookmarkedArticlesResponse = PagedResponse<BookmarkItem>;
export type ArticleBookmarksResponse = PagedResponse<ArticleBookmarkItem>;
export type WikiBookmarksResponse = PagedResponse<WikiBookmarkItem>;
export type BookmarkedWikisResponse = WikiBookmarksResponse; // 호환성을 위해 유지

// 내 댓글 관련 타입
export interface MyCommentItem {
  isReplyComment: boolean;
  parentCommentWriterName: string | null;
  commentValue: string;
  createdAt: string;
  articleId: string;
  articleTitle: string;
  articleWriterName: string;
  commentLikeCount: number;
}

export interface MyCommentsParams extends PaginationParams {
  filter?: MyCommentFilter;
}

export type MyCommentsResponse = PagedResponse<MyCommentItem>;