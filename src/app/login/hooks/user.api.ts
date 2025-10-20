import { fetcher } from '@/hooks/api/fetchers';
import { UserInfoResponse } from '../types/user.types';

/**
 * 사용자 정보 조회 API
 * @returns 현재 로그인된 사용자의 정보
 */
export const fetchUserInfo = async (): Promise<UserInfoResponse> => {
  try {
    const userInfo = await fetcher<UserInfoResponse>('/api/v1/user-info', {
      method: 'GET',
    });
    return userInfo;
  } catch (error) {
    console.error('사용자 정보 조회 오류:', error);
    throw error;
  }
};