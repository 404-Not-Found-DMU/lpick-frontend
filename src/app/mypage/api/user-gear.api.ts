import { fetcher } from '@/hooks/api/fetchers';
import type {
  UserGearResponse,
  MyPageGearResponse,
  AddGearRequest,
  GearFavoriteToggleRequest,
  GearFavoriteToggleResponse,
} from './types';

/**
 * 사용자 장비 정보 조회
 * GET /api/v1/user/gear
 */
export const getUserGear = async (): Promise<UserGearResponse> => {
  try {
    return await fetcher<UserGearResponse>('/api/v1/user/gear', {
      method: 'GET',
    });
  } catch (error: unknown) {
    // 백엔드 오류를 사용자 친화적 메시지로 변환
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('JDBC') || errorMessage.includes('SQL')) {
        throw new Error('장비 정보를 불러오는 중 문제가 발생했습니다.');
      }
    }
    if (error && typeof error === 'object' && 'httpStatus' in error && error.httpStatus === 'INTERNAL_SERVER_ERROR') {
      throw new Error('서버 내부 오류가 발생했습니다.');
    }
    throw error;
  }
};

/**
 * 마이페이지 장비 정보 조회 (user-album 엔드포인트에서 장비 데이터 포함)
 * GET /api/v1/user-album (장비 데이터가 포함된 응답)
 */
export const getMyPageGear = async (): Promise<MyPageGearResponse> => {
  try {
    return await fetcher<MyPageGearResponse>('/api/v1/user-album', {
      method: 'GET',
    });
  } catch (error: unknown) {
    // 백엔드 오류를 사용자 친화적 메시지로 변환
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('JDBC') || errorMessage.includes('SQL')) {
        throw new Error('마이페이지 장비 정보를 불러오는 중 문제가 발생했습니다.');
      }
    }
    if (error && typeof error === 'object' && 'httpStatus' in error && error.httpStatus === 'INTERNAL_SERVER_ERROR') {
      throw new Error('서버 내부 오류가 발생했습니다.');
    }
    throw error;
  }
};

/**
 * 장비 즐겨찾기 토글
 * POST /api/v1/user/gear/{userGearId}/favorite-toggle
 */
export const toggleGearFavorite = async (
  userGearId: string,
  request: GearFavoriteToggleRequest
): Promise<GearFavoriteToggleResponse> => {
  try {
    return await fetcher<GearFavoriteToggleResponse>(`/api/v1/user/gear/${userGearId}/favorite-toggle`, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'httpStatus' in error && error.httpStatus === 'INTERNAL_SERVER_ERROR') {
      throw new Error('즐겨찾기 설정에 실패했습니다.');
    }
    throw error;
  }
};

/**
 * 사용자 장비 추가
 * POST /api/v1/user/gear
 */
export const addUserGear = async (request: AddGearRequest): Promise<void> => {
  try {
    return await fetcher<void>('/api/v1/user/gear', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  } catch (error: unknown) {
    if (error && typeof error === 'object') {
      if ('message' in error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('JDBC') || errorMessage.includes('SQL')) {
          throw new Error('장비 추가 중 문제가 발생했습니다.');
        }
      }
      if ('httpStatus' in error && error.httpStatus === 'INTERNAL_SERVER_ERROR') {
        throw new Error('서버 내부 오류가 발생했습니다.');
      }
      if ('status' in error) {
        if (error.status === 400) {
          throw new Error('잘못된 장비 정보입니다.');
        }
        if (error.status === 409) {
          throw new Error('이미 등록된 장비입니다.');
        }
      }
    }
    throw error;
  }
};

/**
 * 사용자 장비 삭제
 * DELETE /api/v1/user/gear/{userGearId}
 */
export const deleteUserGear = async (userGearId: string): Promise<void> => {
  try {
    return await fetcher<void>(`/api/v1/user/gear/${userGearId}`, {
      method: 'DELETE',
    });
  } catch (error: unknown) {
    if (error && typeof error === 'object') {
      if ('httpStatus' in error && error.httpStatus === 'INTERNAL_SERVER_ERROR') {
        throw new Error('장비 삭제에 실패했습니다.');
      }
      if ('status' in error && error.status === 404) {
        throw new Error('존재하지 않는 장비입니다.');
      }
    }
    throw error;
  }
};