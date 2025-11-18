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