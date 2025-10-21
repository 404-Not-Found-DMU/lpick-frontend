'use client';

import React, { useState } from 'react';
import { Play, ExternalLink, Heart, Filter, Music } from 'lucide-react';
import { tempAlbums } from '../../temp/mypage.temp';

const AlbumCollection = () => {
  const [selectedGenre, setSelectedGenre] = useState('전체');

  const genres = [
    { name: '전체', count: 27, color: 'bg-gray-500' },
    { name: '록/팝', count: 12, color: 'bg-red-500' },
    { name: '재즈', count: 8, color: 'bg-blue-500' },
    { name: '클래식', count: 4, color: 'bg-violet-500' },
    { name: '기타', count: 3, color: 'bg-green-500' },
  ];

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
        {tempAlbums.slice(0, 12).map((album, index) => (
          <div key={album.id} className="group relative cursor-pointer">
            <div
              className={`aspect-square rounded-2xl ${album.color} relative flex items-center justify-center overflow-hidden shadow-md transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl`}
            >
              {/* Genre Badge */}
              <div className="absolute right-3 top-3 z-10">
                <div
                  className={`h-4 w-4 rounded-full ${genres[(index % 4) + 1].color} shadow-sm`}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/25 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white">
                    <Play className="ml-0.5 h-5 w-5 text-gray-800" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white">
                    <Heart className="h-4 w-4 text-gray-800" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 text-center text-base font-bold leading-tight text-white drop-shadow-lg">
                {album.title}
              </div>
            </div>
            <div className="mt-3 text-center">
              <div className="truncate text-sm font-medium text-gray-600 dark:text-gray-400">
                {album.artist}
              </div>
            </div>
          </div>
        ))}
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
              {genres.find((g) => g.name === selectedGenre)?.count}개
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlbumCollection;
