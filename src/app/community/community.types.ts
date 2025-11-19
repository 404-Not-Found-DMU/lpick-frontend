// 커뮤니티 관련 타입 정의 (API 스펙 기준)
import { BoardType as ApiBoardType, BadgeType as ApiBadgeType, CommentListItem, ChildComment } from '@/shared/types';

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
  liked?: boolean; // 현재 사용자가 좋아요를 눌렀는지 여부
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
  category: string;
  postType: string;
  boardType: BoardType;  // 게시판 종류
  badgeType: TagType;    // 글머리
}

// API 타입과 UI 타입 간 변환 함수들
export const BoardTypeMapping = {
  // API -> UI
  fromApi: (apiType: ApiBoardType): BoardType => {
    switch (apiType) {
      case ApiBoardType.FREE: return '자유게시판';
      case ApiBoardType.ALBUM: return '음반';
      case ApiBoardType.ARTIST: return '아티스트';
      case ApiBoardType.GEAR: return '장비';
      default: return '자유게시판';
    }
  },
  // UI -> API
  toApi: (uiType: BoardType): ApiBoardType => {
    switch (uiType) {
      case '자유게시판': return ApiBoardType.FREE;
      case '음반': return ApiBoardType.ALBUM;
      case '아티스트': return ApiBoardType.ARTIST;
      case '장비': return ApiBoardType.GEAR;
      default: return ApiBoardType.FREE;
    }
  }
};

export const BadgeTypeMapping = {
  // API -> UI
  fromApi: (apiType: ApiBadgeType): TagType => {
    switch (apiType) {
      case ApiBadgeType.QUESTION: return '질문';
      case ApiBadgeType.INFO: return '정보';
      case ApiBadgeType.PROMOTION: return '홍보';
      default: return '질문';
    }
  },
  // UI -> API
  toApi: (uiType: TagType): ApiBadgeType => {
    switch (uiType) {
      case '질문': return ApiBadgeType.QUESTION;
      case '정보': return ApiBadgeType.INFO;
      case '홍보': return ApiBadgeType.PROMOTION;
      default: return ApiBadgeType.QUESTION;
    }
  }
};

// API 댓글 타입을 UI 댓글 타입으로 변환하는 함수들
export const convertApiCommentToUiComment = (apiComment: CommentListItem | ChildComment, articleId: string): Comment => {
  // commentId에서 고유한 숫자 ID 생성 (충돌 방지)
  const generateSimpleId = (commentId: string) => {
    // 전체 commentId를 기반으로 해시 생성하여 고유성 보장
    let hash = 0;
    for (let i = 0; i < commentId.length; i++) {
      const char = commentId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32비트 정수로 변환
    }
    // 양수로 변환하고 애매함 방지를 위해 최소값 보장
    return Math.abs(hash) + 1;
  };

  // ISO 날짜를 YYYY-MM-DD 형식으로 변환
  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toISOString().split('T')[0];
    } catch {
      return isoString; // 파싱 실패 시 원본 반환
    }
  };

  return {
    id: generateSimpleId(apiComment.commentId),
    postId: generateSimpleId(articleId),
    author: apiComment.author,
    content: apiComment.content,
    date: formatDate(apiComment.createdAt),
    likes: apiComment.likeCount,
    liked: apiComment.liked || false, // API에서 제공하는 좋아요 상태
    parentId: 'parentCommentId' in apiComment ? generateSimpleId(apiComment.parentCommentId) : undefined,
  };
};
