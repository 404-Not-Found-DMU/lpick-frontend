import { useState, useCallback } from 'react';
import { getUserGearList, getOtherUserGear } from '../api/user-gear.api';
import type { GearListResponse, OtherUserGearResponse } from '../api/types';

/**
 * 분류별 장비 리스트 조회 훅
 */
export const useGearCategoryList = () => {
  const [gearList, setGearList] = useState<GearListResponse>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGearList = useCallback(async (gearClass: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE') => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getUserGearList(gearClass);
      setGearList(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '장비 목록을 불러오는 중 오류가 발생했습니다.';
      setError(errorMessage);
      setGearList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearGearList = useCallback(() => {
    setGearList([]);
    setError(null);
  }, []);

  return {
    gearList,
    isLoading,
    error,
    fetchGearList,
    clearGearList,
  };
};

/**
 * 다른 사용자 장비 조회 훅
 */
export const useOtherUserGear = () => {
  const [userGearData, setUserGearData] = useState<OtherUserGearResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOtherUserGear = useCallback(async (oauthId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getOtherUserGear(oauthId);
      setUserGearData(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '사용자 장비 정보를 불러오는 중 오류가 발생했습니다.';
      setError(errorMessage);
      setUserGearData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearUserGearData = useCallback(() => {
    setUserGearData(null);
    setError(null);
  }, []);

  return {
    userGearData,
    isLoading,
    error,
    fetchOtherUserGear,
    clearUserGearData,
  };
};