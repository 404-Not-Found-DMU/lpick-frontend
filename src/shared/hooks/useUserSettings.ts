'use client';

import { useState, useEffect, useCallback } from 'react';
import { getUserSettings, updateUserSettings } from '../api/user.api';
import { UserSettings } from '../types/api.types';

interface UseUserSettingsReturn {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;
  refetch: () => void;
}

/**
 * 사용자 설정을 관리하는 훅
 */
export const useUserSettings = (): UseUserSettingsReturn => {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getUserSettings();
      console.log('User Settings Response:', response);
      
      // API 응답이 직접 데이터인지 래퍼 객체인지 확인
      if (response.data) {
        console.log('Using response.data:', response.data);
        setSettings(response.data);
      } else {
        console.log('Using response directly:', response);
        setSettings(response as unknown as UserSettings);
      }
    } catch (err) {
      console.error('사용자 설정 조회 실패:', err);
      setError(err instanceof Error ? err.message : '설정을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettingsHandler = useCallback(async (newSettings: Partial<UserSettings>) => {
    if (!settings) return;

    setLoading(true);
    setError(null);

    try {
      // PATCH 메서드를 사용하여 변경된 부분만 전송
      const response = await updateUserSettings(newSettings);
      
      if (response.data) {
        setSettings(response.data);
      } else {
        // API 응답이 직접 데이터인 경우, 기존 데이터와 병합
        const updatedSettings = {
          ...settings,
          ...newSettings,
          // nested 객체는 깊은 병합
          privacy: newSettings.privacy ? { ...settings.privacy, ...newSettings.privacy } : settings.privacy,
          notification: newSettings.notification ? { ...settings.notification, ...newSettings.notification } : settings.notification,
        };
        setSettings(updatedSettings);
      }
    } catch (err) {
      console.error('사용자 설정 업데이트 실패:', err);
      setError(err instanceof Error ? err.message : '설정 업데이트 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [settings]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    error,
    updateSettings: updateSettingsHandler,
    refetch: fetchSettings,
  };
};