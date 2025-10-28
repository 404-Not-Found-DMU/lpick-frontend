import { useState, useEffect, useCallback } from 'react';
import {
  getUserAlbums,
  getUserAlbumDetail,
  getFavoriteAlbums,
  getAlbumCountByGenre,
  getUserAlbumsByOauthId,
  toggleAlbumFavorite,
  deleteUserAlbum,
  getUserAlbumRecord,
  toggleAlbumFavoriteNew,
} from '../api/user-album.api';
import type {
  UserAlbumsResponse,
  UserAlbumDetailResponse,
  FavoriteAlbumsResponse,
  GenreCountResponse,
  MyPageUserAlbumResponse,
  PaginationParams,
} from '../api/types';

/**
 * 사용자 앨범 목록 조회 훅
 */
export const useUserAlbums = (params?: PaginationParams) => {
  const [data, setData] = useState<UserAlbumsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserAlbums = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserAlbums(params);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '앨범 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchUserAlbums();
  }, [fetchUserAlbums]);

  return {
    data,
    loading,
    error,
    refetch: fetchUserAlbums,
  };
};

/**
 * 사용자 앨범 상세 조회 훅
 */
export const useUserAlbumDetail = (userAlbumId: string | null) => {
  const [data, setData] = useState<UserAlbumDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbumDetail = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserAlbumDetail(id);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '앨범 상세정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userAlbumId) {
      fetchAlbumDetail(userAlbumId);
    }
  }, [userAlbumId]);

  return {
    data,
    loading,
    error,
    refetch: () => userAlbumId && fetchAlbumDetail(userAlbumId),
  };
};

/**
 * 즐겨찾기 앨범 목록 조회 훅
 */
export const useFavoriteAlbums = () => {
  const [data, setData] = useState<FavoriteAlbumsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavoriteAlbums = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getFavoriteAlbums();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '즐겨찾기 앨범을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteAlbums();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchFavoriteAlbums,
  };
};

/**
 * 장르별 앨범 개수 조회 훅
 */
export const useAlbumCountByGenre = () => {
  const [data, setData] = useState<GenreCountResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGenreCounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAlbumCountByGenre();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '장르별 통계를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenreCounts();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchGenreCounts,
  };
};

/**
 * 특정 사용자 앨범 목록 조회 훅 (마이페이지용)
 */
export const useUserAlbumsByOauthId = (oauthId: string | null, params?: PaginationParams) => {
  const [data, setData] = useState<MyPageUserAlbumResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserAlbumsByOauthId = useCallback(async (oauthId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserAlbumsByOauthId(oauthId, params);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '사용자 앨범을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    if (oauthId) {
      fetchUserAlbumsByOauthId(oauthId);
    }
  }, [fetchUserAlbumsByOauthId, oauthId]);

  return {
    data,
    loading,
    error,
    refetch: () => oauthId && fetchUserAlbumsByOauthId(oauthId),
  };
};

/**
 * 앨범 즐겨찾기 토글 훅
 */
export const useAlbumFavoriteToggle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFavorite = async (userAlbumId: string, isFavorite: boolean) => {
    try {
      setLoading(true);
      setError(null);
      await toggleAlbumFavorite(userAlbumId, isFavorite);
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
 * 앨범 관리 통합 훅 (CRUD + 즐겨찾기)
 */
export const useAlbumManager = () => {
  const [data, setData] = useState<UserAlbumsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 앨범 목록 조회
  const fetchAlbums = async (params?: PaginationParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserAlbums(params);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '앨범 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 앨범 삭제
  const deleteAlbum = async (userAlbumId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await deleteUserAlbum(userAlbumId);
      
      // 삭제 후 목록 새로고침
      await fetchAlbums();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '앨범 삭제에 실패했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 앨범 즐겨찾기 토글 (새로운 API 사용)
  const toggleFavorite = async (userAlbumId: string, favorite: boolean): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await toggleAlbumFavoriteNew(userAlbumId, favorite);
      
      // 토글 후 목록 새로고침
      await fetchAlbums();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '즐겨찾기 설정에 실패했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 앨범 레코드 조회
  const getAlbumRecord = async (userAlbumId: string) => {
    try {
      setLoading(true);
      setError(null);
      const record = await getUserAlbumRecord(userAlbumId);
      return record;
    } catch (err) {
      setError(err instanceof Error ? err.message : '앨범 레코드를 불러오는데 실패했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchAlbums,
    deleteAlbum,
    toggleFavorite,
    getAlbumRecord,
  };
};

/**
 * 앨범 목록을 평면 배열로 변환하는 유틸리티 훅
 */
export const useAlbumList = (albumData: UserAlbumsResponse | null) => {
  return albumData?.content || [];
};