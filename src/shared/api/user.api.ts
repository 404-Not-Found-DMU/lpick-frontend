/**
 * 사용자 API 함수들
 */

import { fetcher } from '@/hooks/api/fetchers';
import { UserActivityCountResponse, UserSettingsResponse, UserSettings } from '../types/api.types';

/**
 * 사용자 활동 통계 조회
 */
export const getUserActivityCount = async (): Promise<UserActivityCountResponse> => {
  try {
    return await fetcher<UserActivityCountResponse>('/api/v1/user/activity-count');
  } catch (error) {
    console.error('Failed to fetch user activity count:', error);
    throw error;
  }
};

/**
 * 사용자 설정 조회
 */
export const getUserSettings = async (): Promise<UserSettingsResponse> => {
  try {
    return await fetcher<UserSettingsResponse>('/api/v1/user/setting');
  } catch (error) {
    console.error('Failed to fetch user settings:', error);
    throw error;
  }
};

/**
 * 사용자 설정 업데이트 (부분 업데이트)
 */
export const updateUserSettings = async (settings: Partial<UserSettings>): Promise<UserSettingsResponse> => {
  try {
    return await fetcher<UserSettingsResponse>('/api/v1/user/setting', {
      method: 'PATCH',
      body: JSON.stringify(settings),
    });
  } catch (error) {
    console.error('Failed to update user settings:', error);
    throw error;
  }
};

/**
 * 사용자 프로필 업데이트
 */
export const updateUserProfile = async (formData: FormData): Promise<{ message: string }> => {
  try {
    return await fetcher<{ message: string }>('/api/v1/auth', {
      method: 'PATCH',
      body: formData,
      headers: {
        // FormData를 사용할 때는 Content-Type을 설정하지 않음
        // 브라우저가 자동으로 multipart/form-data로 설정
      }
    });
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
};