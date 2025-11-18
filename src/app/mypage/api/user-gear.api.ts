import { fetcher } from '@/hooks/api/fetchers';
import type {
  UserGearResponse,
  MyPageGearResponse,
  AddGearRequest,
  GearFavoriteToggleRequest,
  GearFavoriteToggleResponse,
  UserGearData,
  GearSearchResult,
  TempGearRequest,
  TempGearResponse,
  GearListResponse,
  OtherUserGearResponse,
} from './types';

/**
 * 백엔드 응답의 잘못된 gearClass 값을 보정하는 유틸리티 함수
 * TODO: 백엔드에서 수정되면 이 함수 제거
 */
const normalizeGearClassValues = (data: UserGearData): UserGearData => {
  return {
    ...data,
    ownedSpeaker: {
      ...data.ownedSpeaker,
      gearClass: 'SPEAKER' as const
    },
    ownedHeadPhone: {
      ...data.ownedHeadPhone,
      gearClass: 'HEADPHONE' as const
    },
    ownedTurnTable: {
      ...data.ownedTurnTable,
      gearClass: 'TURNTABLE' as const
    }
  };
};

/**
 * 사용자 장비 정보 조회
 * GET /api/v1/user/gear
 */
export const getUserGear = async (): Promise<UserGearResponse> => {
  try {
    const response = await fetcher<UserGearResponse>('/api/v1/user/gear', {
      method: 'GET',
    });
    
    // 백엔드 gearClass 값 보정 (임시 처리)
    return normalizeGearClassValues(response);
  } catch (error: unknown) {
    // 백엔드 오류를 사용자 친화적 메시지로 변환
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('JDBC') || errorMessage.includes('SQL') || errorMessage.includes('column') || errorMessage.includes('does not exist')) {
        console.error('Database error in gear API:', errorMessage);
        throw new Error('장비 정보를 불러올 수 없습니다. 데이터베이스 문제가 발생했습니다.');
      }
    }
    if (error && typeof error === 'object' && 'httpStatus' in error && error.httpStatus === 'INTERNAL_SERVER_ERROR') {
      console.error('Internal server error in gear API:', error);
      throw new Error('서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  } catch (error: unknown) {
    console.error('Add user gear error:', error);
    if (error && typeof error === 'object') {
      if ('message' in error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('Content-Type') || errorMessage.includes('not supported')) {
          throw new Error('서버에서 요청 형식을 지원하지 않습니다.');
        }
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

/**
 * 장비 검색 (자동완성)
 * GET /api/v1/public/data/autocomplete/gear
 */
export const searchGear = async ({
  keyword,
  eqClass,
  size = 50
}: {
  keyword: string;
  eqClass?: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE';
  size?: number;
}): Promise<GearSearchResult[]> => {
  try {
    const params = new URLSearchParams({
      keyword,
      size: size.toString()
    });
    
    if (eqClass) {
      params.append('eqClass', eqClass);
    }
    
    return await fetcher<GearSearchResult[]>(`/api/v1/public/data/autocomplete/gear?${params}`, {
      method: 'GET',
    });
  } catch (error: unknown) {
    console.error('Gear search error:', error);
    throw new Error('장비 검색 중 오류가 발생했습니다.');
  }
};

/**
 * 임시 장비 추가
 * POST /api/v1/gear/temp-gear
 */
export const createTempGear = async (data: TempGearRequest, imageFile?: File): Promise<TempGearResponse> => {
  try {
    const formData = new FormData();
    
    // JSON 요청 본문을 'req' 파트로 추가
    const requestBody = {
      modelName: data.modelName,
      gearClass: data.gearClass,
      brand: data.brand,
      specJson: {}
    };
    
    // JSON을 Blob으로 변환하여 'req' 파트에 추가
    const jsonBlob = new Blob([JSON.stringify(requestBody)], { 
      type: 'application/json' 
    });
    formData.append('req', jsonBlob);
    
    // 이미지 파일이 있으면 추가
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    return await fetcher<TempGearResponse>('/api/v1/gear/temp-gear', {
      method: 'POST',
      body: formData,
      // Content-Type 헤더는 FormData 사용 시 자동 설정됨 (multipart/form-data)
    });
  } catch (error: unknown) {
    console.error('Temp gear creation error:', error);
    if (error && typeof error === 'object') {
      if ('message' in error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('Content-Type') || errorMessage.includes('not supported')) {
          throw new Error('서버에서 요청 형식을 지원하지 않습니다. 잠시 후 다시 시도해주세요.');
        }
      }
      if ('httpStatus' in error && error.httpStatus === 'INTERNAL_SERVER_ERROR') {
        throw new Error('서버 내부 오류가 발생했습니다.');
      }
    }
    throw new Error('임시 장비 생성 중 오류가 발생했습니다.');
  }
};

/**
 * 분류별 장비 리스트 조회
 * GET /api/v1/user/gear-list/{gearClass}
 */
export const getUserGearList = async (gearClass: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE'): Promise<GearListResponse> => {
  try {
    return await fetcher<GearListResponse>(`/api/v1/user/gear-list/${gearClass}`, {
      method: 'GET',
    });
  } catch (error: unknown) {
    console.error('Get user gear list error:', error);
    if (error && typeof error === 'object') {
      if ('message' in error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('JDBC') || errorMessage.includes('SQL')) {
          throw new Error('장비 목록을 불러오는 중 문제가 발생했습니다.');
        }
      }
      if ('httpStatus' in error && error.httpStatus === 'INTERNAL_SERVER_ERROR') {
        throw new Error('서버 내부 오류가 발생했습니다.');
      }
      if ('status' in error && error.status === 404) {
        throw new Error('해당 장비 분류를 찾을 수 없습니다.');
      }
    }
    throw error;
  }
};

/**
 * 다른 사용자 장비 조회
 * GET /api/v1/my-page/{oauthId}/gear
 */
export const getOtherUserGear = async (oauthId: string): Promise<OtherUserGearResponse> => {
  try {
    const response = await fetcher<OtherUserGearResponse>(`/api/v1/my-page/${oauthId}/gear`, {
      method: 'GET',
    });
    
    // 백엔드 gearClass 값 보정 (임시 처리)
    return {
      ...response,
      data: normalizeGearClassValues(response.data)
    };
  } catch (error: unknown) {
    console.error('Get other user gear error:', error);
    if (error && typeof error === 'object') {
      if ('message' in error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('JDBC') || errorMessage.includes('SQL')) {
          throw new Error('사용자 장비 정보를 불러오는 중 문제가 발생했습니다.');
        }
      }
      if ('httpStatus' in error && error.httpStatus === 'INTERNAL_SERVER_ERROR') {
        throw new Error('서버 내부 오류가 발생했습니다.');
      }
      if ('status' in error) {
        if (error.status === 404) {
          throw new Error('사용자를 찾을 수 없습니다.');
        }
        if (error.status === 403) {
          throw new Error('비공개 프로필입니다.');
        }
      }
    }
    throw error;
  }
};