import { fetcher } from '@/hooks/api/fetchers';
import type {
  UserAlbumsResponse,
  UserAlbumDetailResponse,
  FavoriteAlbumsResponse,
  GenreCountResponse,
  MyPageUserAlbumResponse,
  PaginationParams,
  AlbumRecord,
} from './types';

/**
 * 사용자 소유 앨범 목록 조회
 * GET /api/v1/user-album
 */
export const getUserAlbums = async (params?: PaginationParams): Promise<UserAlbumsResponse> => {
  const searchParams = new URLSearchParams();
  
  // 기본값을 1로 설정 (0-based에서 1-based로 변경)
  const page = params?.page !== undefined ? params.page : 1;
  const size = params?.size !== undefined ? params.size : 12;
  
  searchParams.append('page', page.toString());
  searchParams.append('size', size.toString());
  
  if (params?.sort) {
    searchParams.append('sort', params.sort);
  }

  const queryString = searchParams.toString();
  const path = `/api/v1/user-album${queryString ? `?${queryString}` : ''}`;

  try {
    return await fetcher<UserAlbumsResponse>(path, {
      method: 'GET',
    });
  } catch (error: unknown) {
    // 백엔드 SQL 오류 등 서버 오류를 사용자 친화적 메시지로 변환
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('JDBC') || errorMessage.includes('SQL')) {
        throw new Error('서버에서 데이터를 처리하는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
    if (error && typeof error === 'object' && 'httpStatus' in error && error.httpStatus === 'INTERNAL_SERVER_ERROR') {
      throw new Error('서버 내부 오류가 발생했습니다. 관리자에게 문의해주세요.');
    }
    throw error;
  }
};

/**
 * 사용자 앨범 상세 조회
 * GET /api/v1/user-album/{userAlbumId}
 */
export const getUserAlbumDetail = async (userAlbumId: string): Promise<UserAlbumDetailResponse> => {
  return fetcher<UserAlbumDetailResponse>(`/api/v1/user-album/${userAlbumId}`, {
    method: 'GET',
  });
};

/**
 * 즐겨찾기 앨범 목록 조회
 * GET /api/v1/user-album/favorite
 */
export const getFavoriteAlbums = async (): Promise<FavoriteAlbumsResponse> => {
  return fetcher<FavoriteAlbumsResponse>('/api/v1/user-album/favorite', {
    method: 'GET',
  });
};

/**
 * 장르별 앨범 개수 조회
 * GET /api/v1/user-album/count
 */
export const getAlbumCountByGenre = async (): Promise<GenreCountResponse> => {
  try {
    return await fetcher<GenreCountResponse>('/api/v1/user-album/count', {
      method: 'GET',
    });
  } catch (error: unknown) {
    // 백엔드 오류를 사용자 친화적 메시지로 변환
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('JDBC') || errorMessage.includes('SQL')) {
        throw new Error('장르별 통계를 불러오는 중 문제가 발생했습니다.');
      }
    }
    if (error && typeof error === 'object' && 'httpStatus' in error && error.httpStatus === 'INTERNAL_SERVER_ERROR') {
      throw new Error('서버 내부 오류가 발생했습니다.');
    }
    throw error;
  }
};

/**
 * 특정 사용자의 앨범 목록 조회 (마이페이지용)
 * GET /api/v1/my-page/{oauthId}/user-album
 */
export const getUserAlbumsByOauthId = async (
  oauthId: string,
  params?: PaginationParams
): Promise<MyPageUserAlbumResponse> => {
  const searchParams = new URLSearchParams();
  
  // 기본값을 1로 설정 (0-based에서 1-based로 변경)
  const page = params?.page !== undefined ? params.page : 1;
  const size = params?.size !== undefined ? params.size : 12;
  
  searchParams.append('page', page.toString());
  searchParams.append('size', size.toString());
  
  if (params?.sort) {
    searchParams.append('sort', params.sort);
  }

  const queryString = searchParams.toString();
  const path = `/api/v1/my-page/${oauthId}/user-album${queryString ? `?${queryString}` : ''}`;

  return fetcher<MyPageUserAlbumResponse>(path, {
    method: 'GET',
  });
};

/**
 * 앨범 즐겨찾기 토글 (추정 API - 실제 스펙 확인 필요)
 * POST/DELETE /api/v1/user-album/{userAlbumId}/favorite
 */
export const toggleAlbumFavorite = async (
  userAlbumId: string,
  isFavorite: boolean
): Promise<void> => {
  const method = isFavorite ? 'POST' : 'DELETE';
  
  return fetcher<void>(`/api/v1/user-album/${userAlbumId}/favorite`, {
    method,
  });
};

/**
 * 앨범 삭제
 * DELETE /api/v1/user-album/{userAlbumId}
 */
export const deleteUserAlbum = async (userAlbumId: string): Promise<void> => {
  try {
    return await fetcher<void>(`/api/v1/user-album/${userAlbumId}`, {
      method: 'DELETE',
    });
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'httpStatus' in error) {
      if (error.httpStatus === 'NOT_FOUND') {
        throw new Error('삭제하려는 앨범을 찾을 수 없습니다.');
      }
      if (error.httpStatus === 'FORBIDDEN') {
        throw new Error('앨범을 삭제할 권한이 없습니다.');
      }
    }
    throw error;
  }
};

/**
 * 앨범 레코드 파일 조회
 * GET /api/v1/user-album/{userAlbumId}/record
 */
export const getUserAlbumRecord = async (userAlbumId: string): Promise<AlbumRecord> => {
  try {
    return await fetcher<AlbumRecord>(`/api/v1/user-album/${userAlbumId}/record`, {
      method: 'PATCH',
    });
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'httpStatus' in error && error.httpStatus === 'NOT_FOUND') {
      throw new Error('앨범 레코드를 찾을 수 없습니다.');
    }
    throw error;
  }
};

/**
 * 사용자 소유 앨범에 대한 녹음 파일 제거
 * DELETE /api/v1/user-album/{userAlbumId}/record
 */
export const deleteUserAlbumRecord = async (userAlbumId: string): Promise<void> => {
  try {
    await fetcher<void>(`/api/v1/user-album/${userAlbumId}/record`, {
      method: 'DELETE',
    });
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'httpStatus' in error) {
      if (error.httpStatus === 'NOT_FOUND') {
        throw new Error('앨범 또는 녹음 파일을 찾을 수 없습니다.');
      }
      if (error.httpStatus === 'FORBIDDEN') {
        throw new Error('녹음 파일을 삭제할 권한이 없습니다.');
      }
    }
    throw error;
  }
};

/**
 * 사용자 소유 앨범 추가
 * POST /api/v1/user-album
 */
export const addUserAlbum = async (albumData: { albumId: string }): Promise<UserAlbumDetailResponse> => {
  try {
    return await fetcher<UserAlbumDetailResponse>('/api/v1/user-album', {
      method: 'POST',
      body: JSON.stringify(albumData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'httpStatus' in error) {
      if (error.httpStatus === 'NOT_FOUND') {
        throw new Error('해당 앨범을 서비스에서 찾을 수 없습니다.');
      }
      if (error.httpStatus === 'CONFLICT') {
        throw new Error('이미 소유하고 있는 앨범입니다.');
      }
      if (error.httpStatus === 'BAD_REQUEST') {
        throw new Error('잘못된 앨범 정보입니다.');
      }
    }
    throw error;
  }
};