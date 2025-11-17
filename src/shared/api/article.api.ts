import { fetcher } from '@/hooks/api/fetchers';
import {
  ArticleListResponse,
  ArticleDetail,
  CreateArticleRequest,
  UpdateArticleRequest,
  MyArticlesResponse,
  LikedArticlesResponse,
  BookmarkedArticlesResponse,
  PaginationParams
} from '../types/api.types';

/**
 * 커뮤니티 게시글 API
 */

// Public API - 인기 게시글 조회 (비로그인 가능)
export const getPopularArticles = async (): Promise<ArticleListResponse> => {
  try {
    return await fetcher<ArticleListResponse>('/api/v1/public/community/popular/article');
  } catch (error) {
    console.error('Failed to fetch popular articles:', error);
    throw error;
  }
};

// Public API - 게시글 목록 조회 (비로그인 가능)
// 게시글 목록 조회 (public API 사용)
export const getArticles = async (params?: PaginationParams): Promise<ArticleListResponse> => {
  try {
    const searchParams = new URLSearchParams();
    
    // 파라미터 검증 및 기본값 설정
    const page = Math.max(1, params?.page || 1); // 1-based 페이징
    const size = Math.max(1, Math.min(100, params?.size || 10)); // 최대 100개 제한
    
    searchParams.append('page', page.toString());
    searchParams.append('size', size.toString());

    const queryString = searchParams.toString();
    const url = `/api/v1/public/community/article?${queryString}`;
    
    return await fetcher<ArticleListResponse>(url);
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};

// 게시글 상세 조회 (로그인 필요)
// 게시글 상세 조회 (public API 사용)
export const getArticle = async (articleId: string): Promise<ArticleDetail> => {
  try {
    return await fetcher<ArticleDetail>(`/api/v1/public/community/article/${articleId}`);
  } catch (error) {
    console.error(`Failed to fetch article ${articleId}:`, error);
    throw error;
  }
};

// 게시글 생성
export const createArticle = async (data: CreateArticleRequest): Promise<void> => {
  try {
    await fetcher<void>('/api/v1/community/article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Failed to create article:', error);
    throw error;
  }
};

// 게시글 수정
export const updateArticle = async (
  articleId: string, 
  data: UpdateArticleRequest
): Promise<void> => {
  try {
    await fetcher<void>(`/api/v1/community/article/${articleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(`Failed to update article ${articleId}:`, error);
    throw error;
  }
};

// 게시글 삭제
export const deleteArticle = async (articleId: string): Promise<void> => {
  try {
    await fetcher<void>(`/api/v1/community/article/${articleId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Failed to delete article ${articleId}:`, error);
    throw error;
  }
};

// 게시글 좋아요
export const likeArticle = async (articleId: string): Promise<void> => {
  try {
    await fetcher<void>(`/api/v1/community/article/${articleId}/like`, {
      method: 'POST',
    });
  } catch (error) {
    console.error(`Failed to like article ${articleId}:`, error);
    throw error;
  }
};

// 게시글 좋아요 취소
export const unlikeArticle = async (articleId: string): Promise<void> => {
  try {
    await fetcher<void>(`/api/v1/community/article/${articleId}/like`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Failed to unlike article ${articleId}:`, error);
    throw error;
  }
};

// 게시글 북마크
export const bookmarkArticle = async (articleId: string): Promise<void> => {
  try {
    await fetcher<void>(`/api/v1/community/article/${articleId}/bookmark`, {
      method: 'POST',
    });
  } catch (error) {
    console.error(`Failed to bookmark article ${articleId}:`, error);
    throw error;
  }
};

// 게시글 북마크 취소
export const unbookmarkArticle = async (articleId: string): Promise<void> => {
  try {
    await fetcher<void>(`/api/v1/community/article/${articleId}/bookmark`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Failed to unbookmark article ${articleId}:`, error);
    throw error;
  }
};

// 게시글 북마크 토글
export const toggleArticleBookmark = async (articleId: string, isBookmarked: boolean): Promise<boolean> => {
  try {
    if (isBookmarked) {
      await unbookmarkArticle(articleId);
    } else {
      await bookmarkArticle(articleId);
    }
    return !isBookmarked;
  } catch (error) {
    console.error(`Failed to toggle bookmark for article ${articleId}:`, error);
    return isBookmarked;
  }
};

// 내 게시글 목록 조회
export const getMyArticles = async (params?: PaginationParams): Promise<MyArticlesResponse> => {
  try {
    const searchParams = new URLSearchParams();
    
    // 파라미터 검증 및 기본값 설정
    const page = Math.max(1, params?.page || 1); // 1-based 페이징
    const size = Math.max(1, Math.min(100, params?.size || 10));
    
    searchParams.append('page', page.toString());
    searchParams.append('size', size.toString());

    const queryString = searchParams.toString();
    const url = `/api/v1/community/article/me?${queryString}`;
    
    return await fetcher<MyArticlesResponse>(url);
  } catch (error) {
    console.error('Failed to fetch my articles:', error);
    throw error;
  }
};

// 좋아요한 게시글 목록 조회
export const getLikedArticles = async (params?: PaginationParams): Promise<LikedArticlesResponse> => {
  try {
    const searchParams = new URLSearchParams();
    
    // 파라미터 검증 및 기본값 설정
    const page = Math.max(1, params?.page || 1); // 1-based 페이징
    const size = Math.max(1, Math.min(100, params?.size || 10));
    
    searchParams.append('page', page.toString());
    searchParams.append('size', size.toString());

    const queryString = searchParams.toString();
    const url = `/api/v1/community/article/like/me?${queryString}`;
    
    return await fetcher<LikedArticlesResponse>(url);
  } catch (error) {
    console.error('Failed to fetch liked articles:', error);
    throw error;
  }
};

// 북마크한 게시글 목록 조회
export const getBookmarkedArticles = async (params?: PaginationParams): Promise<BookmarkedArticlesResponse> => {
  try {
    const searchParams = new URLSearchParams();
    
    // 파라미터 검증 및 기본값 설정
    const page = Math.max(1, params?.page || 1); // 1-based 페이징
    const size = Math.max(1, Math.min(100, params?.size || 10));
    
    searchParams.append('page', page.toString());
    searchParams.append('size', size.toString());

    const queryString = searchParams.toString();
    const url = `/api/v1/community/article/bookmark/me?${queryString}`;
    
    return await fetcher<BookmarkedArticlesResponse>(url);
  } catch (error) {
    console.error('Failed to fetch bookmarked articles:', error);
    throw error;
  }
};