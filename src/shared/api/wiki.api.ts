/**
 * 위키 북마크 API 함수들
 */

import { fetcher } from '@/hooks/api/fetchers';
import {
  BookmarkedWikisResponse,
  PaginationParams
} from '../types/api.types';

// 기본 위키 API URL
const WIKI_API_BASE = '/api/v1/wiki';

/**
 * 위키 북마크
 * @param wikiId 위키 ID
 */
export const bookmarkWiki = async (wikiId: string): Promise<void> => {
  try {
    await fetcher<void>(`${WIKI_API_BASE}/${wikiId}/bookmark`, {
      method: 'POST',
    });
  } catch (error) {
    console.error(`Failed to bookmark wiki ${wikiId}:`, error);
    throw error;
  }
};

/**
 * 위키 북마크 취소
 * @param wikiId 위키 ID
 */
export const unbookmarkWiki = async (wikiId: string): Promise<void> => {
  try {
    await fetcher<void>(`${WIKI_API_BASE}/${wikiId}/bookmark`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Failed to unbookmark wiki ${wikiId}:`, error);
    throw error;
  }
};

/**
 * 북마크한 위키 목록 조회
 * @param params 페이지네이션 파라미터
 */
export const getBookmarkedWikis = async (params?: PaginationParams): Promise<BookmarkedWikisResponse> => {
  try {
    const searchParams = new URLSearchParams();
    
    // 파라미터 검증 및 기본값 설정
    const page = Math.max(1, params?.page || 1); // 1-based 페이징
    const size = Math.max(1, Math.min(100, params?.size || 10));
    
    searchParams.append('page', page.toString());
    searchParams.append('size', size.toString());

    const queryString = searchParams.toString();
    const url = `/api/v1/wiki/bookmark/me?${queryString}`;
    
    return await fetcher<BookmarkedWikisResponse>(url);
  } catch (error) {
    console.error('Failed to fetch bookmarked wikis:', error);
    throw error;
  }
};

/**
 * 위키 북마크 토글
 * @param wikiId 위키 ID
 * @param isBookmarked 현재 북마크 상태
 */
export const toggleWikiBookmark = async (wikiId: string, isBookmarked: boolean): Promise<boolean> => {
  try {
    if (isBookmarked) {
      await unbookmarkWiki(wikiId);
    } else {
      await bookmarkWiki(wikiId);
    }
    return !isBookmarked;
  } catch (error) {
    console.error(`Failed to toggle bookmark for wiki ${wikiId}:`, error);
    return isBookmarked;
  }
};