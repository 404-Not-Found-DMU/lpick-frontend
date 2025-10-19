/**
 * 쿠키 관련 유틸리티 함수들
 */

/**
 * 특정 쿠키가 존재하는지 확인
 */
export const hasCookie = (name: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  const cookies = document.cookie.split(';');
  console.log('Current cookies:', document.cookie);
  return cookies.some(cookie => cookie.trim().startsWith(`${name}=`));
};

/**
 * 액세스 토큰 쿠키 존재 확인
 */
export const hasAccessToken = (): boolean => {
  console.log('Checking for access_token cookie', hasCookie('access_token')); 
  return hasCookie('access_token');
};

/**
 * 리프레시 토큰 쿠키 존재 확인
 */
export const hasRefreshToken = (): boolean => {
  console.log('Checking for refresh_token cookie', hasCookie('refresh_token'));
  return hasCookie('refresh_token');
};

/**
 * 인증 관련 쿠키가 하나라도 있는지 확인
 */
export const hasAnyAuthToken = (): boolean => {
  return hasAccessToken() || hasRefreshToken();
};