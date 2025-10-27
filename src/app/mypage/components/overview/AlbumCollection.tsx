'use client';

import React, { useState } from 'react';
import { Play, ExternalLink, Heart, Filter, Music, Loader2, Trash2, Star } from 'lucide-react';
import { useAlbumManager, useAlbumList, useAlbumCountByGenre } from '../../hooks';
import { useUserStore } from '@/store/userStore';
import type { UserAlbum } from '../../api/types';
import Image from 'next/image';

const AlbumCollection = () => {
  const [selectedGenre, setSelectedGenre] = useState('전체');
  const { userInfo } = useUserStore();
  
  // 새로운 앨범 관리 훅 사용
  const { 
    data: albumsData, 
    loading: albumsLoading, 
    error: albumsError,
    fetchAlbums,
    deleteAlbum,
    toggleFavorite,
    getAlbumRecord
  } = useAlbumManager();
  
  // 앨범 리스트 변환
  const albumList = useAlbumList(albumsData);
  
  const { data: genreCountData, loading: genreLoading } = useAlbumCountByGenre();

  // 컴포넌트 마운트 시 앨범 목록 조회
  React.useEffect(() => {
    fetchAlbums({ page: 0, size: 12 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 이벤트 핸들러들
  const handleToggleFavorite = async (userAlbumId: string, currentFavorite: boolean) => {
    await toggleFavorite(userAlbumId, !currentFavorite);
  };

  const handleDeleteAlbum = async (userAlbumId: string) => {
    if (confirm('정말로 이 앨범을 삭제하시겠습니까?')) {
      await deleteAlbum(userAlbumId);
    }
  };

  const handlePlayRecord = async (userAlbumId: string) => {
    const record = await getAlbumRecord(userAlbumId);
    if (record?.recordFile) {
      // 레코드 파일 재생 로직 (추후 구현)
      console.log('Playing record:', record.recordFile);
    } else {
      alert('재생할 수 있는 레코드 파일이 없습니다.');
    }
  };

  // 장르 데이터 처리
  const genres = React.useMemo(() => {
    const defaultGenres = [
      { name: '전체', count: albumsData?.totalElements || 0, color: 'bg-gray-500' },
    ];
    
    if (genreCountData) {
      const genreEntries = Object.entries(genreCountData).map(([genre, count], index) => ({
        name: genre,
        count: count as number,
        color: ['bg-red-500', 'bg-blue-500', 'bg-violet-500', 'bg-green-500', 'bg-yellow-500'][index % 5]
      }));
      return [...defaultGenres, ...genreEntries];
    }
    
    return defaultGenres;
  }, [albumsData?.totalElements, genreCountData]);

  // 선택된 장르에 따른 앨범 필터링
  const filteredAlbums = React.useMemo(() => {
    if (!albumList) return [];
    
    if (selectedGenre === '전체') {
      return albumList;
    }
    
    // 실제 장르 필터링 로직은 API에서 지원하는 경우 API 호출 파라미터로 처리
    return albumList;
  }, [albumList, selectedGenre]);

  // 에러 처리
  if (albumsError) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Music className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-500 font-semibold">앨범 정보를 불러오는데 실패했습니다</p>
          </div>
        </div>
      </div>
    );
  }
  if (!userInfo) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">로그인 후 앨범 컬렉션을 확인해보세요.</p>
          </div>
        </div>
      </div>
    );
  }

  if (albumsError) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Music className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-500 mb-2 font-semibold">앨범을 불러오는데 실패했습니다</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              잠시 후 다시 시도해주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg">
            <Music className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {selectedGenre === '전체' ? '나의 LP 컬렉션' : `${selectedGenre} 컬렉션`}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              장르별로 분류된 소중한 음반들
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <ExternalLink className="h-4 w-4" />
            전체보기
          </button>
        </div>
      </div>

      {/* Genre Filter */}
      <div className="mb-6 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
        <div className="mb-3 flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">장르별 필터</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre.name}
              onClick={() => setSelectedGenre(genre.name)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedGenre === genre.name
                  ? 'scale-105 bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md'
                  : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <div className={`h-2 w-2 rounded-full ${genre.color}`} />
              {genre.name}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  selectedGenre === genre.name
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
                }`}
              >
                {genre.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Album Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {albumsLoading ? (
          // 로딩 상태
          Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="group relative">
              <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse dark:bg-gray-700" />
              <div className="mt-3 text-center">
                <div className="h-4 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
              </div>
            </div>
          ))
        ) : filteredAlbums.length === 0 ? (
          // 앨범이 없는 경우
          <div className="col-span-full text-center py-12">
            <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">
              {selectedGenre === '전체' ? '등록된 앨범이 없습니다' : `${selectedGenre} 장르의 앨범이 없습니다`}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              첫 번째 앨범을 추가해보세요!
            </p>
          </div>
        ) : (
          // 실제 앨범 데이터
          filteredAlbums.map((album: UserAlbum) => (
            <div key={album.userAlbumId} className="group relative cursor-pointer">
              <div className="aspect-square rounded-2xl relative flex items-center justify-center overflow-hidden shadow-md transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                {/* 앨범 이미지 */}
                {album.profile ? (
                  <Image 
                    src={album.profile} 
                    alt={album.name}
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                    <Music className="h-8 w-8 text-white" />
                  </div>
                )}

                {/* 즐겨찾기 배지 */}
                {album.favorite && (
                  <div className="absolute right-3 top-3 z-10">
                    <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center shadow-sm">
                      <Heart className="h-3 w-3 text-white fill-current" />
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/25 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handlePlayRecord(album.userAlbumId)}
                      disabled={albumsLoading}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white disabled:opacity-50"
                    >
                      <Play className="ml-0.5 h-5 w-5 text-gray-800" />
                    </button>
                    <button 
                      onClick={() => handleToggleFavorite(album.userAlbumId, album.favorite)}
                      disabled={albumsLoading}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white disabled:opacity-50"
                    >
                      <Star className={`h-4 w-4 ${album.favorite ? 'fill-current text-yellow-500' : 'text-gray-800'}`} />
                    </button>
                    <button 
                      onClick={() => handleDeleteAlbum(album.userAlbumId)}
                      disabled={albumsLoading}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* 앨범 제목 오버레이 (이미지가 없는 경우에만) */}
                {!album.profile && (
                  <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                    <div className="text-base font-bold leading-tight text-white drop-shadow-lg">
                      {album.name}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-3 text-center">
                <div className="truncate text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {album.name}
                </div>
                <div className="truncate text-xs text-gray-600 dark:text-gray-400">
                  {album.artistName}
                </div>
                <div className="truncate text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {new Date(album.releaseDate).getFullYear()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>
            선택된 장르:{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{selectedGenre}</span>
          </span>
          <span>
            앨범 수:{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {genreLoading ? (
                <Loader2 className="inline h-4 w-4 animate-spin" />
              ) : (
                `${genres.find((g) => g.name === selectedGenre)?.count || 0}개`
              )}
            </span>
          </span>
        </div>
        
        {/* 로딩 인디케이터 */}
        {(albumsLoading || genreLoading) && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            데이터 로딩 중...
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumCollection;
