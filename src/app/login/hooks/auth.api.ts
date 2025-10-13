import { fetcher } from '@/hooks/api/fetchers';

/**
 * 카카오 로그인 URL로 리다이렉트
 */
export const redirectToKakaoLogin = (): void => {
  window.location.href = 'https://lpick.duckdns.org/oauth2/authorization/kakao';
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