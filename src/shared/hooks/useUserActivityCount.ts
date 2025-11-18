'use client';

import { useState, useEffect, useCallback } from 'react';
import { getUserActivityCount } from '../api/user.api';
import { UserActivityCount } from '../types/api.types';

interface UseUserActivityCountReturn {
  activityCount: UserActivityCount | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * 사용자 활동 통계를 조회하는 훅
 */
export const useUserActivityCount = (): UseUserActivityCountReturn => {
  const [activityCount, setActivityCount] = useState<UserActivityCount | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivityCount = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getUserActivityCount();
      
      // API 응답이 직접 데이터인지 래퍼 객체인지 확인
      if (response.data) {
        setActivityCount(response.data);
      } else {
        setActivityCount(response as unknown as UserActivityCount);
      }
    } catch (err) {
      console.error('활동 통계 조회 실패:', err);
      setError(err instanceof Error ? err.message : '활동 통계를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivityCount();
  }, [fetchActivityCount]);

  return {
    activityCount,
    loading,
    error,
    refetch: fetchActivityCount,
  };
};