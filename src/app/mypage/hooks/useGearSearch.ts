import { useState, useCallback } from 'react';
import { searchGear } from '../api/user-gear.api';
import type { GearSearchResult } from '../api/types';

/**
 * 장비 검색 훅
 */
export const useGearSearch = () => {
  const [searchResults, setSearchResults] = useState<GearSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const search = useCallback(async (keyword: string, eqClass?: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE') => {
    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const results = await searchGear({
        keyword: keyword.trim(),
        eqClass,
        size: 50
      });
      setSearchResults(results);
    } catch (error) {
      setSearchError(error instanceof Error ? error.message : '검색 중 오류가 발생했습니다.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearchError(null);
  }, []);

  return {
    searchResults,
    isSearching,
    searchError,
    search,
    clearSearch,
  };
};

/**
 * 장비 추가 훅
 */
export const useAddGear = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const addGear = useCallback(async (request: AddGearRequest) => {
    setIsAdding(true);
    setAddError(null);

    try {
      await addUserGear(request);
      return true;
    } catch (error) {
      setAddError(error instanceof Error ? error.message : '장비 추가 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsAdding(false);
    }
  }, []);

  return {
    isAdding,
    addError,
    addGear,
  };
};

/**
 * 임시 장비 생성 훅
 */
export const useCreateTempGear = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const createGear = useCallback(async (data: TempGearRequest, imageFile?: File) => {
    setIsCreating(true);
    setCreateError(null);

    try {
      const result = await createTempGear(data, imageFile);
      return result;
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : '임시 장비 생성 중 오류가 발생했습니다.');
      return null;
    } finally {
      setIsCreating(false);
    }
  }, []);

  return {
    isCreating,
    createError,
    createGear,
  };
};