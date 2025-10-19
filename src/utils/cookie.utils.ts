/**
 * 쿠키 관련 유틸리티 함수들
 */

/**
 * 특정 쿠키가 존재하는지 확인
 */
export const hasCookie = (name: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  const cookies = document.cookie.split(';');
  return cookies.some(cookie => cookie.trim().startsWith(`${name}=`));
};

/**
 * 액세스 토큰 쿠키 존재 확인
 */
export const hasAccessToken = (): boolean => {
  return hasCookie('access_token');
};

/**
 * 리프레시 토큰 쿠키 존재 확인
 */
export const hasRefreshToken = (): boolean => {
  return hasCookie('refresh_token');
};

/**
 * 쿠키 값 가져오기
 */
export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  
  return null;
};

/**
 * 인증 관련 쿠키가 하나라도 있는지 확인
 */
export const hasAnyAuthToken = (): boolean => {
  return hasAccessToken() || hasRefreshToken();
};