import React, { useState, useEffect } from 'react';
import {
  getUserGear,
  getMyPageGear,
  toggleGearFavorite,
  addUserGear,
  deleteUserGear,
} from '../api/user-gear.api';
import type {
  UserGearResponse,
  MyPageGearResponse,
  UserGear,
  AddGearRequest,
  GearFavoriteToggleRequest,
} from '../api/types';

/**
 * 사용자 장비 정보 조회 훅
 */
export const useUserGear = () => {
  const [data, setData] = useState<UserGearResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserGear = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserGear();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '장비 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserGear();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchUserGear,
  };
};

/**
 * 마이페이지 장비 정보 조회 훅
 */
export const useMyPageGear = () => {
  const [data, setData] = useState<MyPageGearResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyPageGear = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMyPageGear();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '마이페이지 장비 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPageGear();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchMyPageGear,
  };
};

/**
 * 장비 즐겨찾기 토글 훅
 */
export const useGearFavoriteToggle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFavorite = async (userGearId: string, isFavorite: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const request: GearFavoriteToggleRequest = { favorite: isFavorite };
      await toggleGearFavorite(userGearId, request);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '즐겨찾기 설정에 실패했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    toggleFavorite,
    loading,
    error,
  };
};

/**
 * 장비 추가 훅
 */
export const useAddGear = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addGear = async (request: AddGearRequest) => {
    try {
      setLoading(true);
      setError(null);
      await addUserGear(request);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '장비 추가에 실패했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    addGear,
    loading,
    error,
  };
};

/**
 * 장비 삭제 훅
 */
export const useDeleteGear = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteGear = async (userGearId: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteUserGear(userGearId);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '장비 삭제에 실패했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteGear,
    loading,
    error,
  };
};

/**
 * 장비 관리 통합 훅 (CRUD 모든 기능 포함)
 */
export const useGearManager = () => {
  const { data, loading: fetchLoading, error: fetchError, refetch } = useUserGear();
  const { toggleFavorite, loading: toggleLoading, error: toggleError } = useGearFavoriteToggle();
  const { addGear, loading: addLoading, error: addError } = useAddGear();
  const { deleteGear, loading: deleteLoading, error: deleteError } = useDeleteGear();

  const isLoading = fetchLoading || toggleLoading || addLoading || deleteLoading;
  const error = fetchError || toggleError || addError || deleteError;

  // 액션 후 데이터 새로고침을 포함한 래퍼 함수들
  const handleToggleFavorite = async (userGearId: string, isFavorite: boolean) => {
    const success = await toggleFavorite(userGearId, isFavorite);
    if (success) {
      await refetch(); // 성공 시 데이터 새로고침
    }
    return success;
  };

  const handleAddGear = async (request: AddGearRequest) => {
    const success = await addGear(request);
    if (success) {
      await refetch(); // 성공 시 데이터 새로고침
    }
    return success;
  };

  const handleDeleteGear = async (userGearId: string) => {
    const success = await deleteGear(userGearId);
    if (success) {
      await refetch(); // 성공 시 데이터 새로고침
    }
    return success;
  };

  return {
    // 데이터
    data,
    isLoading,
    error,
    
    // 액션들
    toggleFavorite: handleToggleFavorite,
    addGear: handleAddGear,
    deleteGear: handleDeleteGear,
    refetch,
  };
};

/**
 * 장비 목록을 배열로 변환하는 유틸리티 훅
 */
export const useGearList = (gearData: UserGearResponse | null) => {
  const gearList = React.useMemo(() => {
    if (!gearData) return [];
    
    const gears: Array<UserGear & { type: string }> = [];
    
    if (gearData.ownedSpeaker) {
      gears.push({ ...gearData.ownedSpeaker, type: 'Speaker' });
    }
    
    if (gearData.ownedHeadPhone) {
      gears.push({ ...gearData.ownedHeadPhone, type: 'Headphone' });
    }
    
    if (gearData.ownedTurnTable) {
      gears.push({ ...gearData.ownedTurnTable, type: 'Turntable' });
    }
    
    return gears;
  }, [gearData]);

  return gearList;
};