import { fetcher } from '@/hooks/api/fetchers';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const redirectToKakaoLogin = (): void => {
  // 환경 변수를 통해 가져온 BASE_URL을 사용하여 동적으로 URL을 구성
  window.location.href = `${BASE_URL}/oauth2/authorization/kakao`;
};


export const refreshToken = async (): Promise<boolean> => {
  try {
    await fetcher('/api/v1/auth/refresh', {
      method: 'POST',
    });
    return true;
  } catch (error) {
    console.warn('토큰 갱신 실패:', error);
    return false;
  }
};

/**
 * 로그아웃 API
 */
export const logout = async (): Promise<void> => {
  try {
    await fetcher('/api/v1/auth/logout', {
      method: 'POST',
    });
  } catch (error) {
    console.error('로그아웃 API 호출 오류:', error);
    throw error;
  }
};