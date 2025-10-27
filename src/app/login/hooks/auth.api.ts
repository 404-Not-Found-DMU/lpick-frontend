import { fetcher } from '@/hooks/api/fetchers';

/**
 * 카카오 로그인 URL로 리다이렉트
 * 백엔드에서 OAuth 처리 후 access_token, refresh_token을 쿠키로 설정해줌
 */
export const redirectToKakaoLogin = (): void => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
};

/**
 * 토큰 갱신 API
 * 성공하면 토큰이 유효, 실패하면 토큰이 만료/무효
 */
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